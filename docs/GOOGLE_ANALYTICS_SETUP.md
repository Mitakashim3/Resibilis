# Google Analytics 4 (GA4) Setup Guide for Resibilis

## 🎯 Why GA4 + Google Search Console Together?

**Google Analytics** tracks:
- User behavior (page views, clicks, time on site)
- Traffic sources (where visitors come from)
- Conversions and goals
- User demographics

**Google Search Console** tracks:
- Search queries that lead to your site
- Keyword rankings
- Click-through rates (CTR)
- Indexing status and errors

**Together they give you complete SEO insights!**

---

## 📊 Step 1: Create Google Analytics 4 Property

### 1. Go to Google Analytics
Visit: https://analytics.google.com/

### 2. Create Account (if you don't have one)
- Click **"Start measuring"**
- Account name: `Resibilis` (or your name)
- Check data sharing settings (recommended: all)
- Click **"Next"**

### 3. Create Property
- Property name: `Resibilis - Receipt Generator`
- Reporting time zone: `Philippines (GMT+8)`
- Currency: `Philippine Peso (PHP)`
- Click **"Next"**

### 4. Business Information
- Industry: `Technology` or `Business & Industrial Markets`
- Business size: Select appropriate size
- How you plan to use Analytics: Check `Examine user behavior` and `Measure advertising ROI`
- Click **"Create"**

### 5. Accept Terms of Service
- Select `Philippines` as country
- Accept both checkboxes
- Click **"Accept"**

### 6. Choose Platform
- Select **"Web"**

### 7. Set Up Data Stream
- Website URL: `https://resibilis.vercel.app`
- Stream name: `Resibilis Production`
- Click **"Create stream"**

### 8. Copy Your Measurement ID
You'll see something like: `G-XXXXXXXXXX`

**COPY THIS!** You'll need it next.

---

### Im here na ooooooooooooooooooooooooooooooooooooooooooooooooh

## 🔧 Step 2: Add GA4 to Your Website

### Add to Your Local .env File

Open `.env.local` and add:

```env
# Google Analytics 4
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```
(Replace `G-XXXXXXXXXX` with your actual Measurement ID)

### Add to Vercel Environment Variables

1. Go to: https://vercel.com/mitakashim3/resibilis/settings/environment-variables
2. Click **"Add New"**
3. Fill in:
   - **Key:** `NEXT_PUBLIC_GA_ID`
   - **Value:** `G-XXXXXXXXXX` (your Measurement ID)
   - **Environment:** Select all (Production, Preview, Development)
4. Click **"Save"**

---

## 🔗 Step 3: Link GA4 to Google Search Console

### 1. In Google Analytics (GA4)

1. Go to **Admin** (bottom left gear icon)
2. In the **Property** column, click **"Product Links"**
3. Click **"Search Console Links"**
4. Click **"Link"**

### 2. Choose Search Console Property

1. Click **"Choose accounts"**
2. Select: `https://resibilis.vercel.app` (your verified property)
3. Click **"Confirm"**

### 3. Select Web Stream

1. Click **"Next"**
2. Select your web stream: `Resibilis Production`
3. Click **"Next"**

### 4. Review and Submit

1. Review the settings
2. Click **"Submit"**
3. You'll see: "Link created successfully" ✅

---

## ✅ Step 4: Verify Tracking Works

### Test in Real-Time

1. **Deploy your changes:**
   ```bash
   git add .
   git commit -m "feat: add Google Analytics 4 tracking"
   git push
   ```

2. **Wait 2-3 minutes for Vercel deployment**

3. **Open GA4 Real-Time Report:**
   - Go to GA4 → **Reports** → **Realtime**

4. **Visit your website:**
   - Open: https://resibilis.vercel.app
   - Navigate to a few pages (/pricing, /about, etc.)

5. **Check GA4:**
   - You should see yourself in the "Users by Page title and screen name" section
   - Active users should show "1" or more

### Debug if Not Working

If you don't see data after 5 minutes:

1. **Check browser console** (F12):
   - Look for GA4 requests to `google-analytics.com/g/collect`
   - Should NOT see CORS or blocking errors

2. **Check environment variable:**
   ```bash
   # In your terminal
   echo $env:NEXT_PUBLIC_GA_ID
   ```
   Should show: `G-XXXXXXXXXX`

3. **Rebuild and redeploy:**
   ```bash
   npm run build
   git push
   ```

4. **Check ad blockers:**
   - Temporarily disable ad blockers
   - Use incognito/private mode
   - Try different browser

---

## 📈 Step 5: Set Up Important Events & Conversions

### Track Receipt Downloads (Recommended)

Create a custom event tracker component:

1. **Create event utility:**

```typescript
// src/lib/utils/analytics.ts
export const trackEvent = (eventName: string, eventParams?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, eventParams);
  }
};

// Receipt download event
export const trackReceiptDownload = (format: 'pdf' | 'png') => {
  trackEvent('receipt_download', {
    download_format: format,
    value: 1,
  });
};
```

2. **Use in your download buttons:**

```typescript
// In your InvoiceGenerator component
import { trackReceiptDownload } from '@/lib/utils/analytics';

const handleDownloadPDF = () => {
  // Your PDF generation code
  generatePDF();
  
  // Track the event
  trackReceiptDownload('pdf');
};
```

### Mark as Conversion in GA4

1. Go to **Admin** → **Events**
2. Find `receipt_download` (wait 24 hours for it to appear)
3. Toggle **"Mark as conversion"**

---

## 🎯 Key Metrics to Monitor

### In Google Analytics

**Engagement:**
- Users (daily, weekly, monthly)
- New vs Returning users
- Average engagement time
- Pages per session

**Conversions:**
- Receipt downloads
- Button clicks
- Form submissions

**Traffic Sources:**
- Organic Search (from Google)
- Direct
- Social
- Referral

### In Google Search Console

**Performance:**
- Total clicks
- Total impressions
- Average CTR
- Average position

**Top Queries:**
- Which keywords bring traffic
- Click-through rates
- Position in search results

**Coverage:**
- Indexed pages
- Crawl errors
- Mobile usability

---

## 🔍 Advanced: Custom Dimensions (Optional)

Track additional data:

1. **User Type** (Freelancer, Student, Business)
2. **Receipt Template Used**
3. **Currency Selected** (PHP vs USD)

Set up in GA4:
1. Go to **Admin** → **Custom definitions**
2. Click **"Create custom dimension"**
3. Add your dimensions

---

## 📊 Reports You Should Check Weekly

### 1. Acquisition Reports (Where users come from)
- **Reports** → **Acquisition** → **Traffic acquisition**
- Focus on: Organic Search, Direct, Social

### 2. Engagement Reports (What users do)
- **Reports** → **Engagement** → **Pages and screens**
- See most popular pages

### 3. Search Console Integration
- **Reports** → **Acquisition** → **Google Organic Search**
- See queries, clicks, impressions, CTR

### 4. Real-time (Check occasionally)
- **Reports** → **Realtime**
- See live traffic

---

## 🎓 Best Practices

### Data Privacy (Important!)

1. **Add to Privacy Policy:**
   Update your privacy page to mention GA4:
   ```
   We use Google Analytics to understand how visitors use our site.
   This includes collecting anonymous data about page views, sessions,
   and user interactions. No personal information is collected without consent.
   ```

2. **GDPR Compliance (if targeting EU users):**
   - Enable IP anonymization (already enabled in GA4 by default)
   - Add cookie consent banner (optional for Philippines-only sites)

### Regular Monitoring

- **Daily:** Quick check of Real-time (first 2 weeks)
- **Weekly:** Review traffic sources and top pages
- **Monthly:** Deep dive into conversion rates and user behavior
- **Quarterly:** Review goals and adjust SEO strategy

---

## 🚨 Common Issues & Solutions

### Issue: "gtag is not defined"

**Solution:**
- Ensure `NEXT_PUBLIC_GA_ID` is set in Vercel
- Redeploy after adding environment variable
- Check browser console for script loading errors

### Issue: No data after 24 hours

**Solution:**
- Verify Measurement ID is correct
- Check if GA4 property is active (not deleted)
- Ensure tracking code is on all pages
- Disable ad blockers when testing

### Issue: Search Console data not showing in GA4

**Solution:**
- Wait 24-48 hours after linking
- Ensure Search Console has data (check separately)
- Verify link is active in GA4 Admin → Product Links

---

## 📚 Resources

**Official Docs:**
- [GA4 Setup Guide](https://support.google.com/analytics/answer/9304153)
- [Next.js Analytics Integration](https://nextjs.org/docs/app/building-your-application/optimizing/analytics)
- [Search Console Integration](https://support.google.com/analytics/answer/10737381)

**Tools:**
- [GA4 Debug Mode Chrome Extension](https://chrome.google.com/webstore/detail/google-analytics-debugger)
- [Tag Assistant](https://tagassistant.google.com/)

---

## ✅ Quick Checklist

- [ ] Created GA4 property
- [ ] Got Measurement ID (G-XXXXXXXXXX)
- [ ] Added to `.env.local`
- [ ] Added to Vercel environment variables
- [ ] Deployed changes to Vercel
- [ ] Verified tracking in Real-time report
- [ ] Linked GA4 to Search Console
- [ ] Set up receipt_download event tracking
- [ ] Marked receipt_download as conversion
- [ ] Updated privacy policy

---

**Next Step:** After you get your Measurement ID, I'll help you set up custom event tracking for receipt downloads and other important user actions! 🚀
