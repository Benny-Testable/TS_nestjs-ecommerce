import pytest

from pricing_engine import (
    PricingError,
    checkout_line,
    convert_amount,
    tax_rate_for_country,
)

RATES = {"USD": 1.0, "EUR": 0.92, "INR": 83.0, "GBP": 0.78}


def test_identity_fx():
    assert convert_amount(10.0, "USD", "USD", RATES) == 10.0


def test_usd_to_inr():
    assert convert_amount(1.0, "USD", "INR", RATES) == 83.0


def test_rejects_negative_amount():
    with pytest.raises(PricingError, match="non-negative"):
        convert_amount(-1, "USD", "EUR", RATES)


def test_rejects_unknown_currency():
    with pytest.raises(PricingError, match="unsupported"):
        convert_amount(1, "USD", "JPY", RATES)


def test_german_vat():
    assert tax_rate_for_country("DE") == 19.0


def test_us_has_no_federal_vat_in_this_table():
    assert tax_rate_for_country("US") == 0.0


def test_country_code_length_matches_schema():
    with pytest.raises(PricingError, match="varchar 7"):
        tax_rate_for_country("UNITEDSTATES")


def test_checkout_line_includes_tax():
    line = checkout_line(100.0, "USD", "EUR", "DE", RATES, include_tax=True)
    assert line["currency"] == "EUR"
    assert line["net"] == 92.0
    assert line["tax"] == 17.48
    assert line["gross"] == 109.48


def test_checkout_line_can_skip_tax():
    line = checkout_line(100.0, "USD", "USD", "GB", RATES, include_tax=False)
    assert line["tax"] == 0.0
    assert line["gross"] == 100.0
