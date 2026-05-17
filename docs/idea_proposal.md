# App Idea: Power-Save SA (Solar ROI & Lead Gen Funnel)

## 1. Description
Power-Save SA is a mobile-first web tool designed for South African homeowners and SMEs facing rising electricity costs. It provides a simple, high-accuracy ROI (Return on Investment) calculator that tells users exactly how much they can save by switching to solar, based on current Eskom/Municipal tariffs.

### Why it fits SA 2025-2026 Trends:
- **Energy Crisis:** Addresses the #1 pain point (electricity costs).
- **Cost of Living:** Focuses specifically on long-term savings.
- **Zero Effort:** Once launched, the tool runs itself. Leads are captured and automatically routed.

## 2. Monetization (Fully Automated)
- **Primary:** Lead Generation. Each user who completes a calculation and requests a "Verified Quote" becomes a high-intent lead. These leads are automatically sent to a partner network of solar installers.
- **Secondary:** Affiliate links for portable power stations (e.g., EcoFlow, Gizzu) for users who can't afford full solar yet.
- **Passive Income Potential:** R500 - R2000 per month from even a small number of qualified leads.

## 3. Tech Stack (Zero Cost)
- **Frontend:** Next.js + Tailwind CSS (GitHub Pages).
- **Database/Dashboard:** Google Sheets.
- **Automation:** Make.com (Free Tier - 1000 ops/month).
- **Communication:** Email (Gmail) via Make.com for lead delivery.

## 4. User Flow (100% Automated)
1. **User Landing:** User enters their average monthly electricity bill.
2. **Calculation:** App calculates estimated system size, cost, and "Break-even" point (ROI).
3. **Lead Capture:** User enters name/area/phone to receive a "Detailed Savings Report" or "Request 3 Installer Quotes."
4. **Fulfillment:**
   - Data sent to Google Sheets via Webhook.
   - Make.com triggers:
     - Email 1: To user with their PDF/Report (generated via Google Docs/Sheets template).
     - Email 2: To "Partner Installer" with lead details.
5. **Monitoring:** Owner checks the Google Sheet dashboard from their phone to see total leads and potential revenue.

## 5. Dashboard Setup
- **Source:** Google Sheets.
- **Metrics:** Total Visitors (via simple counter or GA4), Total Leads, Conversion Rate, Estimated Revenue (Lead Count * R100).
- **Visualization:** Simple bar charts within Google Sheets or Looker Studio.

## 6. Risks & Mitigation
- **Free Tier Limits:** Make.com's 1000 ops is plenty for ~200-300 leads/month.
- **Tariff Changes:** Calculator will use an "Average Annual Increase" variable that can be easily updated in one file.

## 7. Scaling
- Once revenue hits R500/month, buy a `.co.za` domain (approx R100/year).
- Expand to "Water Savings" or "Gas Conversion" calculators.
