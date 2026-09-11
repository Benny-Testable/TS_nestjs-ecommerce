"use strict";

const { expect } = require("chai");
const {
  calculateOrderTotal,
  classifyOrderSize,
} = require("../src/totals");

describe("calculateOrderTotal", () => {
  it("charges full price with no discount", () => {
    expect(calculateOrderTotal(2, 500, false, false, false)).to.equal(1000);
  });

  it("applies member discount", () => {
    expect(calculateOrderTotal(2, 500, true, false, false)).to.equal(900);
  });

  it("stacks member and coupon discounts", () => {
    expect(calculateOrderTotal(2, 500, true, true, false)).to.equal(750);
  });

  it("applies bulk discount alongside membership", () => {
    expect(calculateOrderTotal(10, 500, true, false, true)).to.equal(4250);
  });

  it("rejects non-positive quantity", () => {
    expect(() => calculateOrderTotal(0, 500, false, false, false)).to.throw();
  });

  it("rejects negative unit price", () => {
    expect(() => calculateOrderTotal(1, -1, false, false, false)).to.throw();
  });
});

describe("classifyOrderSize", () => {
  it("classifies small orders", () => {
    expect(classifyOrderSize(2)).to.equal("small");
  });

  it("classifies medium orders", () => {
    expect(classifyOrderSize(7)).to.equal("medium");
  });

  it("classifies bulk orders", () => {
    expect(classifyOrderSize(50)).to.equal("bulk");
  });
});
