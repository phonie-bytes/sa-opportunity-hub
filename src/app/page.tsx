"use client";

import { useState } from "react";
import {
  Sun, Zap, TrendingUp, ArrowRight, ShieldCheck,
  CheckCircle2, Building2, Home as HomeIcon, Info, ChevronRight, BarChart3
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { calculateSolarROI, CalculationResults } from "@/lib/calculator";
import { formatCurrency, cn } from "@/lib/utils";

export default function Home() {
  const [bill, setBill] = useState<string>("2500");
  const [results, setResults] = useState<CalculationResults | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const billAmount = Number(bill);
    if (isNaN(billAmount) || billAmount <= 0) return;

    setLoading(true);
    setTimeout(() => {
      const res = calculateSolarROI({ monthlyBill: billAmount, location: "Gauteng" });
      setResults(res);
      setLoading(false);
    }, 800);
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

    const webhookUrl = process.env.NEXT_PUBLIC_MAKE_WEBHOOK_URL;
    let success = false;

    if (webhookUrl) {
      try {
        const response = await fetch(webhookUrl, {
          method: 'POST',
          body: JSON.stringify(data),
          headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) success = true;
      } catch (err) {
        console.error("Lead submission failed:", err);
      }
    } else {
      // Simulation mode
      console.log("Lead captured (Simulation):", data);
      success = true;
    }

    setLoading(false);
    if (success) {
      setSubmitted(true);
    } else {
      alert("Something went wrong. Please try again or contact us directly.");
    }
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-slate-900 selection:bg-amber-100">
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[10%] -right-[10%] w-[40%] h-[40%] bg-amber-100/40 rounded-full blur-[120px]" />
        <div className="absolute top-[20%] -left-[10%] w-[30%] h-[30%] bg-blue-50/50 rounded-full blur-[100px]" />
      </div>

      {/* Header */}
      <header className="relative z-10 container mx-auto px-6 py-8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-amber-500 p-2 rounded-xl shadow-lg shadow-amber-200">
            <Sun className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-black tracking-tighter text-slate-900">POWER-SAVE <span className="text-amber-500">SA</span></span>
        </div>
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-500">
          <a href="#" className="hover:text-slate-900 transition-colors">How it Works</a>
          <a href="#" className="hover:text-slate-900 transition-colors">Tariff News</a>
          <div className="h-4 w-px bg-slate-200" />
          <div className="flex items-center gap-1.5 text-green-600 bg-green-50 px-3 py-1 rounded-full border border-green-100">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            2025 Tariff Ready
          </div>
        </div>
      </header>

      <div className="relative z-10 container mx-auto px-6 py-12 lg:py-20">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h2 className="inline-block px-4 py-1.5 bg-amber-50 text-amber-700 text-xs font-bold uppercase tracking-widest rounded-full border border-amber-100">
                Stop Overpaying for Electricity
              </h2>
              <h1 className="text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-slate-900">
                Beat Eskom&apos;s Price Hikes with <span className="text-amber-500 underline decoration-amber-200 decoration-8 underline-offset-4">Solar</span>.
              </h1>
              <p className="text-lg text-slate-500 max-w-md leading-relaxed">
                Calculate your return on investment in seconds. We use real 2025/26 municipal tariff data to find your break-even point.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 text-sm font-medium text-slate-700">
                <CheckCircle2 className="text-green-500 w-5 h-5" />
                No-Cost Analysis
              </div>
              <div className="flex items-center gap-3 text-sm font-medium text-slate-700">
                <CheckCircle2 className="text-green-500 w-5 h-5" />
                Vetted Installers
              </div>
              <div className="flex items-center gap-3 text-sm font-medium text-slate-700">
                <CheckCircle2 className="text-green-500 w-5 h-5" />
                Mobile Friendly
              </div>
              <div className="flex items-center gap-3 text-sm font-medium text-slate-700">
                <CheckCircle2 className="text-green-500 w-5 h-5" />
                Real-Time Data
              </div>
            </div>
          </motion.div>

          {/* Right: Interactive Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <AnimatePresence mode="wait">
              {!results ? (
                <motion.div
                  key="calculator"
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white rounded-[32px] shadow-2xl shadow-slate-200/50 p-8 lg:p-12 border border-slate-100 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-8 opacity-[0.03] rotate-12">
                    <BarChart3 className="w-32 h-32" />
                  </div>

                  <form onSubmit={handleCalculate} className="relative z-10 space-y-10">
                    <div className="space-y-6">
                      <label className="block text-sm font-bold text-slate-400 uppercase tracking-widest">
                        Average Monthly Bill
                      </label>
                      <div className="group relative">
                        <span className="absolute left-0 top-1/2 -translate-y-1/2 text-4xl font-black text-slate-300 transition-colors group-focus-within:text-amber-500">R</span>
                        <input
                          type="number"
                          value={bill}
                          onChange={(e) => setBill(e.target.value)}
                          className="w-full bg-transparent pl-10 py-2 text-6xl font-black text-slate-900 focus:outline-none placeholder:text-slate-100"
                          placeholder="2500"
                          required
                        />
                        <div className="h-px w-full bg-slate-100 mt-4 group-focus-within:bg-amber-500 transition-colors" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <button type="button" className="flex items-center justify-center gap-2 py-4 rounded-2xl bg-slate-50 text-slate-600 font-bold hover:bg-slate-100 transition-colors">
                        <HomeIcon className="w-4 h-4" /> Residential
                      </button>
                      <button type="button" className="flex items-center justify-center gap-2 py-4 rounded-2xl border-2 border-slate-50 text-slate-400 font-bold cursor-not-allowed">
                        <Building2 className="w-4 h-4" /> Commercial
                      </button>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-slate-900 text-white font-black py-6 rounded-[20px] shadow-xl shadow-slate-200 hover:bg-amber-500 hover:shadow-amber-200 transition-all flex items-center justify-center gap-3 text-lg group"
                    >
                      {loading ? "Crunching numbers..." : "Show My Savings"}
                      <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </button>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white p-8 rounded-[32px] shadow-lg border border-slate-50 group hover:border-amber-200 transition-colors">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Recommended</p>
                      <h3 className="text-3xl font-black text-slate-900">{results.estimatedSystemSize} <span className="text-sm font-bold text-slate-400">kWp</span></h3>
                    </div>
                    <div className="bg-white p-8 rounded-[32px] shadow-lg border border-slate-50 group hover:border-green-200 transition-colors">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Payback Period</p>
                      <h3 className="text-3xl font-black text-slate-900">{results.paybackPeriod} <span className="text-sm font-bold text-slate-400">Years</span></h3>
                    </div>
                  </div>

                  <div className="bg-slate-900 text-white p-10 rounded-[40px] shadow-2xl relative overflow-hidden">
                    <div className="relative z-10 space-y-6">
                      <div className="flex items-center gap-2">
                        <BarChart3 className="text-amber-400 w-5 h-5" />
                        <span className="text-[10px] font-black text-amber-400/80 uppercase tracking-[0.3em]">20-Year Profit Forecast</span>
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-5xl font-black tracking-tighter">
                          {formatCurrency(results.twentyYearSavings)}
                        </h3>
                        <p className="text-slate-400 text-sm font-medium">Total savings by 2045 compared to grid.</p>
                      </div>
                    </div>
                    <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-amber-500/10 rounded-full blur-[60px]" />
                  </div>

                  {!submitted ? (
                    <div className="bg-white p-8 rounded-[32px] shadow-lg border border-slate-50">
                      <div className="flex items-center gap-4 mb-8">
                        <div className="bg-green-50 p-3 rounded-2xl">
                          <ShieldCheck className="text-green-600 w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="font-black text-slate-900">Lock in these savings</h4>
                          <p className="text-xs font-medium text-slate-500 italic">Get 3 verified solar quotes for free.</p>
                        </div>
                      </div>
                      <form onSubmit={handleLeadSubmit} className="space-y-3">
                        <input name="name" type="text" placeholder="Full Name" className="w-full p-4 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-amber-500 transition-all font-medium placeholder:text-slate-300" required />
                        <input name="email" type="email" placeholder="Email Address" className="w-full p-4 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-amber-500 transition-all font-medium placeholder:text-slate-300" required />
                        <input name="phone" type="tel" placeholder="Mobile Number" className="w-full p-4 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-amber-500 transition-all font-medium placeholder:text-slate-300" required />
                        <button type="submit" className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-amber-500 transition-all mt-4 flex items-center justify-center gap-2 group">
                          Send Me Quotes
                          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </form>
                    </div>
                  ) : (
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="bg-green-500 p-10 rounded-[32px] text-white text-center shadow-xl shadow-green-100"
                    >
                      <CheckCircle2 className="w-12 h-12 mx-auto mb-4" />
                      <h3 className="text-2xl font-black mb-2">Request Sent!</h3>
                      <p className="text-green-50 font-medium">Top local installers will contact you shortly.</p>
                    </motion.div>
                  )}

                  <button onClick={() => setResults(null)} className="text-slate-400 hover:text-slate-900 text-xs font-bold uppercase tracking-widest block mx-auto py-4 transition-colors">
                    ← Recalculate for a different bill
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Features Section */}
        <div className="mt-32 grid md:grid-cols-3 gap-8">
          <div className="p-8 bg-white rounded-3xl border border-slate-50 shadow-sm space-y-4">
            <div className="bg-blue-50 p-3 w-fit rounded-2xl"><Info className="text-blue-500 w-5 h-5" /></div>
            <h4 className="font-bold text-slate-900">Current Tariff Data</h4>
            <p className="text-sm text-slate-500 leading-relaxed">Our engine is updated weekly with Eskom and Municipal tariff schedules for 2025/2026.</p>
          </div>
          <div className="p-8 bg-white rounded-3xl border border-slate-50 shadow-sm space-y-4">
            <div className="bg-amber-50 p-3 w-fit rounded-2xl"><Sun className="text-amber-500 w-5 h-5" /></div>
            <h4 className="font-bold text-slate-900">High Precision</h4>
            <p className="text-sm text-slate-500 leading-relaxed">Calculations factor in seasonal sun-hour averages specifically for South African regions.</p>
          </div>
          <div className="p-8 bg-white rounded-3xl border border-slate-50 shadow-sm space-y-4">
            <div className="bg-green-50 p-3 w-fit rounded-2xl"><ShieldCheck className="text-green-500 w-5 h-5" /></div>
            <h4 className="font-bold text-slate-900">Zero Obligation</h4>
            <p className="text-sm text-slate-500 leading-relaxed">Use the tool as many times as you like. We only connect you to installers when you&apos;re ready.</p>
          </div>
        </div>
      </div>

      <footer className="relative z-10 py-12 px-6 border-t border-slate-100 text-center">
        <p className="text-xs font-bold text-slate-300 uppercase tracking-widest mb-2">© 2026 Power-Save SA</p>
        <p className="text-xs text-slate-400 italic">All data provided are estimates based on average market rates and typical consumption patterns.</p>
      </footer>
    </main>
  );
}
