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

export interface LeadFormData {
  name: string;
  email: string;
  phone: string;
  bill: string;
  timestamp: string;
}
