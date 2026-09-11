package nestjs_ecommerce_inventory

import "testing"

func sample() Item {
	return Item{ProductVariationID: 9, CountryCode: "US", Quantity: 12}
}

func TestReserveHappyPath(t *testing.T) {
	got, err := Reserve(sample(), 3)
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if got.Quantity != 9 {
		t.Fatalf("quantity = %d, want 9", got.Quantity)
	}
}

func TestReserveInsufficient(t *testing.T) {
	_, err := Reserve(sample(), 40)
	if err == nil {
		t.Fatal("expected insufficient stock")
	}
}

func TestReserveRejectsNonPositive(t *testing.T) {
	_, err := Reserve(sample(), 0)
	if err == nil {
		t.Fatal("expected error")
	}
}

func TestReserveRejectsLongCountryCode(t *testing.T) {
	item := sample()
	item.CountryCode = "UNITEDSTATES"
	_, err := Reserve(item, 1)
	if err == nil {
		t.Fatal("expected countryCode validation error")
	}
}

func TestReleaseRestoresStock(t *testing.T) {
	got, err := Release(sample(), 5)
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if got.Quantity != 17 {
		t.Fatalf("quantity = %d, want 17", got.Quantity)
	}
}

func TestCanFulfill(t *testing.T) {
	if !CanFulfill(sample(), 12) {
		t.Fatal("should fulfill exact stock")
	}
	if CanFulfill(sample(), 13) {
		t.Fatal("should not oversell")
	}
	if CanFulfill(sample(), 0) {
		t.Fatal("zero request is not fulfillable")
	}
}
