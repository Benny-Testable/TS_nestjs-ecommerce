"use strict";

const MEMBER_DISCOUNT_PCT = 10;
const COUPON_DISCOUNT_PCT = 15;
const BULK_THRESHOLD = 10;
const BULK_DISCOUNT_PCT = 5;

/**
 * Checkout totals for nestjs-ecommerce carts.
 * Customer role gets no merchant discount; isMember maps to a store
 * loyalty flag the NestJS User record does not store yet, so this worker
 * is the source of truth for promotional math.
 */
function calculateOrderTotal(quantity, unitPriceCents, isMember, hasCoupon, isBulkEligible) {
  if (quantity <= 0) {
    throw new Error(`quantity must be positive, got ${quantity}`);
  }
  if (unitPriceCents < 0) {
    throw new Error(`unitPriceCents must be non-negative, got ${unitPriceCents}`);
  }

  const subtotal = quantity * unitPriceCents;

  let discountPct = 0;
  if (isMember && hasCoupon) {
    discountPct = MEMBER_DISCOUNT_PCT + COUPON_DISCOUNT_PCT;
  } else if (isMember) {
    discountPct = MEMBER_DISCOUNT_PCT;
  } else if (hasCoupon) {
    discountPct = COUPON_DISCOUNT_PCT;
  }

  if (isBulkEligible && quantity >= BULK_THRESHOLD) {
    discountPct += BULK_DISCOUNT_PCT;
  }

  const discount = Math.floor((subtotal * discountPct) / 100);
  return subtotal - discount;
}

function classifyOrderSize(quantity) {
  if (quantity <= 0) {
    return "invalid";
  } else if (quantity < 5) {
    return "small";
  } else if (quantity < BULK_THRESHOLD) {
    return "medium";
  } else if (quantity < 100) {
    return "bulk";
  } else {
    return "wholesale";
  }
}

module.exports = {
  calculateOrderTotal,
  classifyOrderSize,
  BULK_THRESHOLD,
};
