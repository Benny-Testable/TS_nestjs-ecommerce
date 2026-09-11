# JavaScript order-total worker

Promotional math for checkout. The NestJS API stores products; this worker
is the discount engine (member / coupon / bulk) covered by mocha + nyc + Stryker.

```bash
npx mocha workers/order-totals/test/**/*.test.js
npx nyc mocha workers/order-totals/test/**/*.test.js
npx stryker run
npx eslint workers/order-totals/src/
```
