# Power-Save SA: Automation & Backend Setup Guide

To achieve 100% automation at zero cost, follow these steps to connect the frontend to your data dashboard and lead delivery system.

## 1. Google Sheets Setup (The Database & Dashboard)
1. Create a new Google Sheet named `Power-Save-SA-Leads`.
2. Create the following columns in the first tab:
   - `Timestamp`
   - `Name`
   - `Email`
   - `Phone`
   - `Monthly Bill (ZAR)`
   - `Status` (e.g., New, Contacted, Sold)
   - `Estimated Revenue` (Lead count * R100)
3. Create a second tab named `Dashboard` with a pivot table or simple charts tracking leads per day and total estimated revenue.

## 2. Make.com Setup (The Glue)
1. Create a free account on [Make.com](https://www.make.com).
2. Create a new Scenario: **"Frontend Lead -> Sheet & Email"**.
3. **Step 1: Custom Webhook**
   - Add a "Webhooks" module -> "Custom Webhook".
   - Copy the Webhook URL provided.
4. **Step 2: Google Sheets**
   - Add a "Google Sheets" module -> "Add a Row".
   - Connect your Google account and select the sheet created in Part 1.
   - Map the fields from the Webhook to the columns in the sheet.
5. **Step 3: Gmail/Email**
   - Add a "Gmail" or "Email" module -> "Send an Email".
   - Set the recipient to your "Solar Installer Partner" or yourself.
   - Use a subject like: `New High-Intent Solar Lead: {{name}}`.
   - Body: `A new user just calculated their ROI and wants a quote. Details: {{phone}}, {{email}}, Bill: R{{bill}}.`

## 3. Frontend Integration (Environment Variables)
The application is already configured to use the `NEXT_PUBLIC_MAKE_WEBHOOK_URL` environment variable.

### For Local Development:
Create a `.env.local` file in the root of the project and add your Make.com Webhook URL:
```env
NEXT_PUBLIC_MAKE_WEBHOOK_URL=https://hook.eu1.make.com/your-unique-id
```

### For GitHub Pages Deployment:
1. Go to your repository on GitHub.
2. Navigate to **Settings > Secrets and variables > Actions**.
3. Create a **New repository secret** (or Variable if you prefer, but Secret is safer):
   - **Name:** `NEXT_PUBLIC_MAKE_WEBHOOK_URL`
   - **Value:** Your Make.com Webhook URL.
4. The CI/CD pipeline will automatically inject this during the build process.

## 4. Monitoring
Install the **Google Sheets** app on your phone. You can now check your "Leads" tab in real-time. Each new row added by Make.com will trigger a notification if you enable it.

## 5. Scaling
If you exceed 1000 operations per month on Make.com, you can switch to **Zapier's** free tier for another 100 tasks, or upgrade to a paid plan as the lead revenue will easily cover the cost (1 lead = R100+, 1 month of Make = ~R200).
