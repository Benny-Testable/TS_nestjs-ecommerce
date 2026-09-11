"""Checkout pricing for nestjs-ecommerce ProductVariationPrice rows.

Converts a catalog price (see productVariation_price.entity.ts) into the
shopper's currency and applies a country VAT rate. This is a companion
to the NestJS API, not a duplicate of TypeORM.
"""

from __future__ import annotations

SUPPORTED_CURRENCIES = ("USD", "EUR", "INR", "GBP")

# VAT / GST as used by the Country + Currency seed data in this repo.
COUNTRY_TAX_PCT = {
    "US": 0.0,
    "GB": 20.0,
    "DE": 19.0,
    "IN": 18.0,
    "FR": 20.0,
}


class PricingError(ValueError):
    pass


def convert_amount(amount: float, from_code: str, to_code: str, rates_to_usd: dict[str, float]) -> float:
    if amount < 0:
        raise PricingError(f"amount must be non-negative, got {amount}")
    if from_code not in SUPPORTED_CURRENCIES or to_code not in SUPPORTED_CURRENCIES:
        raise PricingError(f"unsupported currency pair {from_code}->{to_code}")
    if from_code not in rates_to_usd or to_code not in rates_to_usd:
        raise PricingError("missing FX rate")
    if rates_to_usd[from_code] <= 0 or rates_to_usd[to_code] <= 0:
        raise PricingError("FX rates must be positive")

    amount_usd = amount / rates_to_usd[from_code]
    return round(amount_usd * rates_to_usd[to_code], 2)


def tax_rate_for_country(country_code: str) -> float:
    if not country_code or len(country_code) > 7:
        raise PricingError("country_code must match Inventory.countryCode (varchar 7)")
    if country_code not in COUNTRY_TAX_PCT:
        raise PricingError(f"no tax table for {country_code}")
    return COUNTRY_TAX_PCT[country_code]


def checkout_line(
    catalog_price: float,
    catalog_currency: str,
    shopper_currency: str,
    country_code: str,
    rates_to_usd: dict[str, float],
    include_tax: bool = True,
) -> dict[str, float | str]:
    converted = convert_amount(catalog_price, catalog_currency, shopper_currency, rates_to_usd)
    tax_pct = tax_rate_for_country(country_code)
    tax = round(converted * tax_pct / 100.0, 2) if include_tax else 0.0
    return {
        "currency": shopper_currency,
        "country": country_code,
        "net": converted,
        "tax": tax,
        "gross": round(converted + tax, 2),
    }
