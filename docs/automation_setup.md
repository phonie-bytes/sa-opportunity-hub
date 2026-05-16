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

## 3. Frontend Integration
In `src/app/page.tsx`, update the `handleLeadSubmit` function to send the data to your Make.com Webhook URL:

```javascript
const handleLeadSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const webhookUrl = "YOUR_MAKE_WEBHOOK_URL_HERE";
  const formData = {
    name: e.target.name.value,
    email: e.target.email.value,
    phone: e.target.phone.value,
    bill: bill,
    timestamp: new Date().toISOString()
  };

  try {
    await fetch(webhookUrl, {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: { 'Content-Type': 'application/json' }
    });
    setSubmitted(true);
  } catch (err) {
    console.error("Failed to send lead", err);
  }
};
```

## 4. Monitoring
Install the **Google Sheets** app on your phone. You can now check your "Leads" tab in real-time. Each new row added by Make.com will trigger a notification if you enable it.

## 5. Scaling
If you exceed 1000 operations per month on Make.com, you can switch to **Zapier's** free tier for another 100 tasks, or upgrade to a paid plan as the lead revenue will easily cover the cost (1 lead = R100+, 1 month of Make = ~R200).
