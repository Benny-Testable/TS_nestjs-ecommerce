# Python pricing engine

Companion to `productVariation_price.entity.ts`. Converts catalog prices
between USD/EUR/INR/GBP and applies country tax used by checkout.

```bash
cd services/pricing-engine
python3 -m pip install -e ".[dev]"
python3 -m pytest
python3 -m pytest --cov=pricing_engine --cov-report=term-missing
bandit -r pricing_engine.py
```
