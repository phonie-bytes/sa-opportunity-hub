export interface CalculationInputs {
  monthlyBill: number;
  location: string;
}

export interface CalculationResults {
  estimatedSystemSize: number; // in kWp
  estimatedSystemCost: number; // in ZAR
  annualSavings: number; // in ZAR
  paybackPeriod: number; // in years
  twentyYearSavings: number; // in ZAR
}

// 2025/2026 Average Eskom/Municipal Tariff (estimated R/kWh)
const AVERAGE_TARIFF = 3.5;
const DAILY_SUN_HOURS = 5.5; // SA Average
const COST_PER_KW_INSTALLED = 18000; // Average R18,000 per kWp installed
const ANNUAL_TARIFF_INCREASE = 0.12; // 12% annual increase estimate

export function calculateSolarROI(inputs: CalculationInputs): CalculationResults {
  const { monthlyBill } = inputs;

  // Estimate monthly consumption (kWh)
  const monthlyConsumption = monthlyBill / AVERAGE_TARIFF;

  // System size to cover 90% of consumption
  const targetMonthlyGen = monthlyConsumption * 0.9;
  const targetDailyGen = targetMonthlyGen / 30;
  const estimatedSystemSize = targetDailyGen / DAILY_SUN_HOURS;

  const estimatedSystemCost = estimatedSystemSize * COST_PER_KW_INSTALLED;

  const annualSavings = (targetMonthlyGen * 12) * AVERAGE_TARIFF;

  // Simple payback calculation (initial cost / first year savings)
  const paybackPeriod = estimatedSystemCost / annualSavings;

  // 20 year savings with compounded tariff increases
  let totalSavings = 0;
  let currentYearSavings = annualSavings;
  for (let i = 0; i < 20; i++) {
    totalSavings += currentYearSavings;
    currentYearSavings *= (1 + ANNUAL_TARIFF_INCREASE);
  }

  return {
    estimatedSystemSize: Number(estimatedSystemSize.toFixed(2)),
    estimatedSystemCost: Math.round(estimatedSystemCost),
    annualSavings: Math.round(annualSavings),
    paybackPeriod: Number(paybackPeriod.toFixed(1)),
    twentyYearSavings: Math.round(totalSavings),
  };
}
