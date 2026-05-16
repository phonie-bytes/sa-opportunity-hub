"use client";

import { useState } from "react";
import { Sun, Zap, TrendingUp, Wallet, ArrowRight, ShieldCheck } from "lucide-react";
import { calculateSolarROI, CalculationResults } from "@/lib/calculator";
import { formatCurrency, cn } from "@/lib/utils";

export default function Home() {
  const [bill, setBill] = useState<string>("2500");
  const [results, setResults] = useState<CalculationResults | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const res = calculateSolarROI({ monthlyBill: Number(bill), location: "Gauteng" });
      setResults(res);
      setLoading(false);
    }, 600);
  };

  const handleLeadSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      bill: bill,
      timestamp: new Date().toISOString()
    };

    // Replace with your actual Make.com webhook URL
    const webhookUrl = process.env.NEXT_PUBLIC_MAKE_WEBHOOK_URL;

    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: 'POST',
          body: JSON.stringify(data),
          headers: { 'Content-Type': 'application/json' }
        });
      } catch (err) {
        console.error("Failed to send lead:", err);
      }
    } else {
      console.log("Simulation: Lead captured:", data);
    }

    setLoading(false);
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b px-4 py-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Sun className="text-amber-500 w-8 h-8" />
          <h1 className="text-2xl font-bold text-slate-900">Power-Save SA</h1>
        </div>
        <p className="text-slate-500">Stop paying for Eskom's mistakes. Calculate your Solar ROI in 30 seconds.</p>
      </header>

      <div className="max-w-4xl mx-auto p-4 md:p-8">
        {!results ? (
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10 border border-slate-100">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Zap className="text-amber-500 w-5 h-5" />
              What is your average monthly electricity bill?
            </h2>
            <form onSubmit={handleCalculate} className="space-y-6">
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">R</span>
                <input
                  type="number"
                  value={bill}
                  onChange={(e) => setBill(e.target.value)}
                  className="w-full pl-10 pr-4 py-4 text-2xl font-bold rounded-xl border-2 border-slate-200 focus:border-amber-500 focus:outline-none transition-colors"
                  placeholder="2500"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-amber-200 transition-all flex items-center justify-center gap-2 text-lg"
              >
                {loading ? "Calculating..." : "Analyze My Savings"}
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>
            <div className="mt-8 flex items-center gap-4 text-sm text-slate-400 justify-center">
              <div className="flex items-center gap-1">
                <ShieldCheck className="w-4 h-4" />
                No-spam guarantee
              </div>
              <div className="flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                2025/2026 Tariff Data
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Results Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-2xl shadow-md border-b-4 border-amber-500">
                <p className="text-slate-500 text-sm font-medium uppercase tracking-wider mb-1">Recommended System</p>
                <h3 className="text-3xl font-bold text-slate-900">{results.estimatedSystemSize} kWp</h3>
                <p className="text-slate-400 text-sm mt-2">Estimated Cost: {formatCurrency(results.estimatedSystemCost)}</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-md border-b-4 border-green-500">
                <p className="text-slate-500 text-sm font-medium uppercase tracking-wider mb-1">Payback Period</p>
                <h3 className="text-3xl font-bold text-slate-900">{results.paybackPeriod} Years</h3>
                <p className="text-slate-400 text-sm mt-2">Break-even by {new Date().getFullYear() + Math.ceil(results.paybackPeriod)}</p>
              </div>
            </div>

            <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-xl relative overflow-hidden">
              <div className="relative z-10">
                <p className="text-amber-400 font-bold text-sm uppercase mb-2">20-Year Financial Forecast</p>
                <h3 className="text-4xl font-black mb-4">Save {formatCurrency(results.twentyYearSavings)}</h3>
                <p className="text-slate-300">By 2045, you will have saved over half a million Rand compared to staying on the grid.</p>
              </div>
              <TrendingUp className="absolute right-[-20px] bottom-[-20px] w-48 h-48 text-white/5" />
            </div>

            {/* Lead Gen Form */}
            {!submitted ? (
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-amber-100">
                <h3 className="text-xl font-bold mb-4">Get 3 Professional Quotes</h3>
                <p className="text-slate-600 mb-6">We'll connect you with vetted installers in your area. Free & no obligation.</p>
                <form onSubmit={handleLeadSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    name="name"
                    type="text"
                    placeholder="Your Name"
                    className="p-3 rounded-lg border border-slate-200"
                    required
                  />
                  <input
                    name="email"
                    type="email"
                    placeholder="Email Address"
                    className="p-3 rounded-lg border border-slate-200"
                    required
                  />
                  <input
                    name="phone"
                    type="tel"
                    placeholder="Phone Number"
                    className="p-3 rounded-lg border border-slate-200"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-slate-900 text-white font-bold py-3 rounded-lg hover:bg-slate-800 transition-colors"
                  >
                    Send Me Quotes
                  </button>
                </form>
              </div>
            ) : (
              <div className="bg-green-50 border-2 border-green-200 text-green-800 p-8 rounded-2xl text-center">
                <ShieldCheck className="w-12 h-12 mx-auto mb-4 text-green-500" />
                <h3 className="text-2xl font-bold mb-2">Request Sent!</h3>
                <p>We've received your details. A solar consultant will contact you within 24 hours.</p>
              </div>
            )}

            <button
              onClick={() => setResults(null)}
              className="text-slate-400 hover:text-slate-600 text-sm underline block mx-auto"
            >
              Start over with a different bill
            </button>
          </div>
        )}
      </div>

      <footer className="mt-12 p-8 text-center text-slate-400 text-sm">
        <p>&copy; 2026 Power-Save SA. All calculations are estimates based on 2025/26 average tariffs.</p>
      </footer>
    </main>
  );
}
