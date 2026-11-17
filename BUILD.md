# Сборка портала документации Paynet API

## Требования

- **Node.js 22.12 или новее** (с ним идёт npm 10). Проверка: `node -v`.
- Windows, macOS или Linux. Других программ не нужно: архивы SDK упаковываются командой `zip`, если она есть, иначе — средствами Node.js.
- Git: текстовые файлы всегда извлекаются с переводом строки LF (задано в `.gitattributes`), в том числе в Windows.

## Сборка для docs.paynet.md/api/ (основная команда)

```bash
npm ci
npm run build:prod
```

Результат — папка `dist/`: её содержимое публикуется по адресу `https://docs.paynet.md/api/` (сайт работает из любой папки, ссылки относительные).

`npm run build:prod` выполняет по порядку и останавливается на первой ошибке:

1. ESLint (`npm run lint`).
2. Проверка документации: векторы подписей, примеры кода, переводы EN/RU/RO, внутренние ссылки (`scripts/check-docs.mjs`).
3. Нет старых адресов в исходниках (`scripts/check-urls.mjs`).
4. Проверка типов TypeScript.
5. Сборка сайта (`scripts/build-site.mjs --out dist --strict`): файлы для ИИ (`llms*.txt`, `docs/*.md`), коллекция Postman, архивы SDK и примера магазина, `robots.txt` и `sitemap.xml`, затем Vite и строгая проверка адресов в `dist`.

Та же команда работает в GitLab CI (`.gitlab-ci.yml`, задание `docs-build`) и проверяется на GitHub (Linux и Windows) при каждом изменении.

### Сборка для другого адреса (например, тестового сайта)

Адрес задаётся переменной `DOCS_SITE_URL` (по умолчанию `https://docs.paynet.md/api/`):

```bash
# Linux / macOS
DOCS_SITE_URL=https://test.example.md/api/ npm run build:prod
```

```powershell
# Windows PowerShell
$env:DOCS_SITE_URL = "https://test.example.md/api/"; npm run build:prod
```

```bat
:: Windows cmd
set DOCS_SITE_URL=https://test.example.md/api/&& npm run build:prod
```

### Не использовать для публикации

`npm run build` и `vite build` собирают только интерфейс: в результате нет файлов для ИИ, `docs/*.md`, Postman, архивов SDK и примера магазина, `robots.txt`/`sitemap.xml`, и адреса не проверяются. Эти команды — только для разработки.

## Проверка результата

```bash
npm run preview      # открыть собранную папку dist на http://localhost:4173/
```

## Docker

`Dockerfile` + `deploy/nginx.conf` — образ nginx с готовой папкой `dist`, сайт по пути `/api/`:

```bash
npm run build:prod
docker build -t paynet-docs .
docker run -d -p 8080:80 paynet-docs      # http://localhost:8080/api/
```

## GitLab CI и GitHub

- `.gitlab-ci.yml` — сборка в GitLab (проект `paynet-docs/paynet-psp`): `npm ci` + `npm run build:prod` → артефакт `dist` (30 дней); `docs-docker` — образ из `dist` (шаблон, запуск вручную).
- `.github/workflows/send-to-gitlab.yml` — «передать в ИТ»: текущая версия одним коммитом в ветку `dev` GitLab (без `.github` и `.bolt`), отметка `release/v<версия>` на GitHub.
- `.github/workflows/deploy.yml` — при каждом изменении: ESLint, проверки, тесты SDK, сборки для площадки проверки и для docs.paynet.md/api/, архив для ИТ (ветка `ci/release`); отдельно `npm audit`.
- `.github/workflows/docker-check.yml` — повторяет сборку GitLab в образе `node:22-bookworm`, собирает на Windows, проверяет контейнер (типы файлов, gzip, кэш, проверка всех страниц сайта).

## Другие команды

| Команда | Что делает |
|---|---|
| `npm run dev` | сервер разработки с автообновлением |
| `npm run lint` | ESLint |
| `npm run lint:fix` | ESLint с автоисправлением |
| `npm run type-check` | проверка типов TypeScript |
| `node scripts/check-docs.mjs` | только проверка документации |
| `node scripts/build-site.mjs --site-url https://paynet-business.github.io/paynet-docs/ --out dist` | копия для площадки проверки (GitHub Pages) |
| `node scripts/build-release.mjs --dir dist --out release` | архив для ИТ + `README-IT.txt` (нужны `zip` и `zipinfo`) |
| `npm audit` | известные уязвимости в зависимостях |
