// Packs one folder into a .zip archive: `zip -qr <out> <folder>` run in <cwd>.
// Uses the `zip` command when it is installed (Linux, macOS, CI). Without it (e.g. Windows) the archive is written
// by Node.js itself (deflate, same folder layout), so the build needs no extra programs.
// PAYNET_ZIP=node forces the built-in packer (used by CI to check it).
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { execFileSync } from 'node:child_process';

let zipCommand;
const hasZipCommand = () => {
  if (zipCommand === undefined) {
    try {
      execFileSync('zip', ['-v'], { stdio: 'ignore' });
      zipCommand = true;
    } catch {
      zipCommand = false;
    }
  }
  return zipCommand;
};

const CRC_TABLE = Array.from({ length: 256 }, (_, n) => {
  let c = n;
  for (let k = 0; k < 8; k += 1) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  return c >>> 0;
});
const crc32 = (buf) => {
  let c = 0xffffffff;
  for (const byte of buf) c = CRC_TABLE[(c ^ byte) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
};
const dosDateTime = (date) => ({
  time: (date.getHours() << 11) | (date.getMinutes() << 5) | Math.floor(date.getSeconds() / 2),
  date: ((Math.max(date.getFullYear(), 1980) - 1980) << 9) | ((date.getMonth() + 1) << 5) | date.getDate(),
});

// Folder entries first, then files, in name order (like `zip -r`); names always use "/".
const collect = (root, rel, out) => {
  out.push({ name: `${rel}/`, full: path.join(root, rel), dir: true });
  for (const entry of fs.readdirSync(path.join(root, rel), { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
    const childRel = `${rel}/${entry.name}`;
    if (entry.isDirectory()) collect(root, childRel, out);
    else if (entry.isFile()) out.push({ name: childRel, full: path.join(root, childRel), dir: false });
  }
  return out;
};

function writeZip(cwd, folder, outFile) {
  const locals = [];
  const centrals = [];
  let offset = 0;
  for (const item of collect(cwd, folder, [])) {
    const name = Buffer.from(item.name, 'utf8');
    const { time, date } = dosDateTime(fs.statSync(item.full).mtime);
    const data = item.dir ? Buffer.alloc(0) : fs.readFileSync(item.full);
    const deflated = item.dir ? data : zlib.deflateRawSync(data, { level: 9 });
    const stored = item.dir || deflated.length >= data.length;
    const body = stored ? data : deflated;
    const crc = item.dir ? 0 : crc32(data);
    const method = stored ? 0 : 8;

    const local = Buffer.alloc(30);
    local.writeUInt32LE(0x04034b50, 0);
    local.writeUInt16LE(20, 4); // version needed
    local.writeUInt16LE(0x0800, 6); // UTF-8 names
    local.writeUInt16LE(method, 8);
    local.writeUInt16LE(time, 10);
    local.writeUInt16LE(date, 12);
    local.writeUInt32LE(crc, 14);
    local.writeUInt32LE(body.length, 18);
    local.writeUInt32LE(data.length, 22);
    local.writeUInt16LE(name.length, 26);
    local.writeUInt16LE(0, 28);
    locals.push(local, name, body);

    const central = Buffer.alloc(46);
    central.writeUInt32LE(0x02014b50, 0);
    central.writeUInt16LE((3 << 8) | 20, 4); // made by: Unix, spec 2.0 (keeps the permissions below)
    central.writeUInt16LE(20, 6);
    central.writeUInt16LE(0x0800, 8);
    central.writeUInt16LE(method, 10);
    central.writeUInt16LE(time, 12);
    central.writeUInt16LE(date, 14);
    central.writeUInt32LE(crc, 16);
    central.writeUInt32LE(body.length, 20);
    central.writeUInt32LE(data.length, 24);
    central.writeUInt16LE(name.length, 28);
    central.writeUInt16LE(0, 30); // extra
    central.writeUInt16LE(0, 32); // comment
    central.writeUInt16LE(0, 34); // disk
    central.writeUInt16LE(0, 36); // internal attributes
    central.writeUInt32LE((((item.dir ? 0o40755 : 0o100644) << 16) | (item.dir ? 0x10 : 0)) >>> 0, 38);
    central.writeUInt32LE(offset, 42);
    centrals.push(central, name);

    offset += local.length + name.length + body.length;
  }
  const centralSize = centrals.reduce((sum, buf) => sum + buf.length, 0);
  const end = Buffer.alloc(22);
  end.writeUInt32LE(0x06054b50, 0);
  end.writeUInt16LE(centrals.length / 2, 8);
  end.writeUInt16LE(centrals.length / 2, 10);
  end.writeUInt32LE(centralSize, 12);
  end.writeUInt32LE(offset, 16);
  fs.writeFileSync(outFile, Buffer.concat([...locals, ...centrals, end]));
}

export function zipFolder(cwd, folder, outFile) {
  fs.rmSync(outFile, { force: true });
  if (process.env.PAYNET_ZIP !== 'node' && hasZipCommand()) {
    execFileSync('zip', ['-qr', outFile, folder], { cwd });
  } else {
    writeZip(cwd, folder, outFile);
  }
}
