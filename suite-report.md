# E2E suite

Date: 2026-11-18T12:08:23.952Z

| Check | What | Result | Time | Notes |
|---|---|---|---|---|
| contract | API reference matches real responses | ✓ | 5 s |  |
| lang-switch | Language switch in the UI | ✓ | 5 s |  |
| portal | Try-it console: order created in one tab is pre-filled in the notification simulator | ✓ | 11 s |  |
| shop | Example shop (Node.js): purchase → payment → notification → fulfilment → refund | ✓ | 51 s |  |
| cards | Saved cards: shown to the same customer only | ✓ | 57 s |  |
| postman | Postman collection (newman): full run with payment and refund | ✓ | 38 s |  |
| sdk | SDKs (PHP, Node.js): 20 checks each on the test API | ✓ | 63 s |  |
| probe-errors | Real HTTP error codes (415, 405, 404, 400, rate) | ✓ | 21 s |  |
| search-probe | Search period time zone and empty result | ✓ | 1 s |  |
| quantity | Products Quantity units | ✓ | 1 s |  |