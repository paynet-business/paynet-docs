# SDK check on the Paynet test environment

Date: 2026-11-18T12:08:00.753Z

## Node.js — 20 / 20 passed

Order `1795003617740`, paymentId `330572`. Environment: ok.

| Phase | Check | Result | Detail |
|---|---|---|---|
| before payment | getToken | ✓ | 958 chars |
| before payment | createOrder | ✓ | paymentId 330572 |
| before payment | createOrder: the same body again returns the same payment (safe retry) | ✓ | same paymentId 330572 |
| before payment | getPaymentByOrder before payment → status 1 | ✓ | status 1 |
| before payment | refund of an unpaid payment is refused by the SDK | ✓ | Payment 330572 is not paid (status 1). Only paid payments (status 4) can be refunded. |
| after payment | getPaymentByOrder after payment → status 4 | ✓ | status 4, paidAmount 300 |
| after payment | getPayment(paymentId) | ✓ | order 1795003617740 |
| after payment | isPaid | ✓ | true |
| after payment | searchPayments (last hour) finds the payment | ✓ | found |
| after payment | refund more than paid is refused by the SDK | ✓ | Refund amount 301 is more than the paid amount 300. |
| after payment | partial refund 1.00 MDL | ✓ | refundType partial, amount 100 |
| after payment | status after partial refund → 6 | ✓ | status 6 |
| after payment | second refund is refused by the SDK (production rule: one refund per payment) | ✓ | Payment 330572 was already refunded (status 6). Only one refund per payment is allowed. |
| after payment | saved card: unlinkCard | ✓ | unlinked |
| after payment | getStatement (last 7 days) | ✓ | statementDaily,totals |
| after payment | downloadStatement (.xlsx) | ✓ | 33525 bytes |
| after payment | error: unknown payment → NOT_FOUND | ✓ | NOT_FOUND_RECORD, traceId yes |
| after payment | error: wrong password → AUTHENTICATION | ✓ | AUTHENTICATION_FAILED |
| after payment | error: invalid order → VALIDATION | ✓ | Paynet API error 400 TECHNICAL_ERROR: TECHNICAL_ERROR |
| after payment | hosted checkout form (test vector signature) | ✓ | cxr/+yLYZp34aR0KXLkb2A== |

## PHP — 20 / 20 passed

Order `1795003647410`, paymentId `330573`. Environment: ok.

| Phase | Check | Result | Detail |
|---|---|---|---|
| before payment | getToken | ✓ | 958 chars |
| before payment | createOrder | ✓ | paymentId 330573 |
| before payment | createOrder: the same body again returns the same payment (safe retry) | ✓ | same paymentId 330573 |
| before payment | getPaymentByOrder before payment → status 1 | ✓ | status 1 |
| before payment | refund of an unpaid payment is refused by the SDK | ✓ | Payment 330573 is not paid (status 1). Only paid payments (status 4) can be refunded. |
| after payment | getPaymentByOrder after payment → status 4 | ✓ | status 4, paidAmount 400 |
| after payment | getPayment(paymentId) | ✓ | order 1795003647410 |
| after payment | isPaid | ✓ | true |
| after payment | searchPayments (last hour) finds the payment | ✓ | found |
| after payment | refund more than paid is refused by the SDK | ✓ | Refund amount 401 is more than the paid amount 400. |
| after payment | partial refund 1.00 MDL | ✓ | refundType partial, amount 100 |
| after payment | status after partial refund → 6 | ✓ | status 6 |
| after payment | second refund is refused by the SDK (production rule: one refund per payment) | ✓ | Payment 330573 was already refunded (status 6). Only one refund per payment is allowed. |
| after payment | saved card: unlinkCard | ✓ | unlinked |
| after payment | getStatement (last 7 days) | ✓ | statementDaily,totals |
| after payment | downloadStatement (.xlsx) | ✓ | 33526 bytes |
| after payment | error: unknown payment → NOT_FOUND | ✓ | Paynet API error 404 NOT_FOUND_RECORD: Record not found |
| after payment | error: wrong password → AUTHENTICATION | ✓ | Paynet API error 401 AUTHENTICATION_FAILED: Wrong credentials |
| after payment | error: invalid order → VALIDATION | ✓ | Paynet API error 400 TECHNICAL_ERROR: ["JSON deserialization for type 'PayPoint.Merchant.Ecom.API.Models.Order.PaymentRe |
| after payment | hosted checkout form (test vector signature) | ✓ | cxr/+yLYZp34aR0KXLkb2A== |
