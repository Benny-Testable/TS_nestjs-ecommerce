package nestjs_ecommerce_inventory

import "fmt"

// Item mirrors src/database/entities/inventory.entity.ts: quantity per
// productVariationId + countryCode (varchar 7).
type Item struct {
	ProductVariationID int
	CountryCode        string
	Quantity           int
}

type ReservationError struct {
	Reason string
}

func (e ReservationError) Error() string {
	return e.Reason
}

func validateCountry(code string) error {
	if code == "" || len(code) > 7 {
		return ReservationError{Reason: "countryCode must be 1-7 characters"}
	}
	return nil
}

// Reserve deducts stock when the warehouse has enough units.
func Reserve(item Item, requested int) (Item, error) {
	if err := validateCountry(item.CountryCode); err != nil {
		return item, err
	}
	if requested <= 0 {
		return item, ReservationError{Reason: fmt.Sprintf("requested must be positive, got %d", requested)}
	}
	if item.Quantity < requested {
		return item, ReservationError{Reason: "insufficient stock"}
	}
	item.Quantity -= requested
	return item, nil
}

// Release returns units after a cancelled checkout.
func Release(item Item, returned int) (Item, error) {
	if err := validateCountry(item.CountryCode); err != nil {
		return item, err
	}
	if returned <= 0 {
		return item, ReservationError{Reason: "returned must be positive"}
	}
	item.Quantity += returned
	return item, nil
}

func CanFulfill(item Item, requested int) bool {
	return requested > 0 && item.Quantity >= requested && validateCountry(item.CountryCode) == nil
}
