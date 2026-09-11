# Polyglot companions

The NestJS API in `src/` is the system of record. These services exist so
checkout, tax, and stock can be tested in the language that owns that math.

| Path | Language | Domain | Tests |
| --- | --- | --- | --- |
| `src/` | TypeScript | HTTP, JWT, products | Jest |
| `workers/order-totals/` | JavaScript | Cart discounts | mocha |
| `services/pricing-engine/` | Python | FX + VAT on `ProductVariationPrice` | pytest |
| `services/inventory/` | Go | Stock reservation on `Inventory` | go test |
| `infra/terraform/` | HCL | ECS + RDS | plan (CI does not apply) |
