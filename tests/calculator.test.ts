import { calculateSolarROI } from "../src/lib/calculator";

describe("Solar ROI Calculator", () => {
  test("calculates reasonable values for a R2500 bill", () => {
    const inputs = { monthlyBill: 2500, location: "Gauteng" };
    const results = calculateSolarROI(inputs);

    // R2500 / 3.5 = 714 kWh
    // 714 * 0.9 = 642 kWh target
    // 642 / 30 = 21.4 kWh/day
    // 21.4 / 5.5 = 3.89 kWp
    expect(results.estimatedSystemSize).toBeCloseTo(3.89, 1);
    expect(results.estimatedSystemCost).toBeGreaterThan(50000);
    expect(results.paybackPeriod).toBeGreaterThan(0);
    expect(results.twentyYearSavings).toBeGreaterThan(results.annualSavings * 20);
  });

  test("higher bill results in larger system", () => {
    const lowRes = calculateSolarROI({ monthlyBill: 1000, location: "Gauteng" });
    const highRes = calculateSolarROI({ monthlyBill: 5000, location: "Gauteng" });

    expect(highRes.estimatedSystemSize).toBeGreaterThan(lowRes.estimatedSystemSize);
    expect(highRes.estimatedSystemCost).toBeGreaterThan(lowRes.estimatedSystemCost);
  });
});
