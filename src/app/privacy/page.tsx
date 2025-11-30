import { Header, Footer } from '@/components/layout';

export const metadata = {
  title: 'Privacy Policy | Resibilis',
  description: 'Privacy Policy for Resibilis Receipt Generator - compliant with Philippine Data Privacy Act of 2012',
};

export default function PrivacyPage() {
  return (
    <>
      <Header user={null} />
      <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
        <article className="prose dark:prose-invert max-w-none">
          <h1>Privacy Policy</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Last Updated: November 30, 2025
          </p>

          <section>
            <h2>1. Introduction</h2>
            <p>
              Welcome to Resibilis (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). We are committed to protecting your 
              personal information and your right to privacy in accordance with the 
              <strong> Republic Act No. 10173</strong>, also known as the <strong>Data Privacy Act of 2012</strong> of 
              the Philippines, and its Implementing Rules and Regulations.
            </p>
            <p>
              This Privacy Policy explains how we collect, use, disclose, and safeguard your 
              information when you use our receipt generator service.
            </p>
          </section>

          <section>
            <h2>2. Information We Collect</h2>
            
            <h3>2.1 Personal Information (with consent)</h3>
            <ul>
              <li><strong>Account Information:</strong> Name, email address, and profile picture (from Google OAuth)</li>
              <li><strong>Business Information:</strong> Business name, address, phone, and email (optional, user-provided)</li>
              <li><strong>Receipt Data:</strong> Customer names, items, prices, and notes you enter</li>
            </ul>

            <h3>2.2 Automatically Collected Information</h3>
            <ul>
              <li>Browser type and version</li>
              <li>Device information</li>
              <li>Usage data (pages visited, time spent)</li>
              <li>IP address (anonymized)</li>
            </ul>

            <h3>2.3 Information We Do NOT Collect</h3>
            <ul>
              <li>Credit card or payment card numbers</li>
              <li>Government-issued ID numbers</li>
              <li>Sensitive personal information as defined under the DPA</li>
            </ul>
          </section>

          <section>
            <h2>3. Legal Basis for Processing (DPA Compliance)</h2>
            <p>Under the Data Privacy Act of 2012, we process your personal information based on:</p>
            <ul>
              <li><strong>Consent:</strong> You provide explicit consent when creating an account</li>
              <li><strong>Contract:</strong> Processing is necessary to provide the service you requested</li>
              <li><strong>Legitimate Interest:</strong> Improving our services and ensuring security</li>
            </ul>
          </section>

          <section>
            <h2>4. How We Use Your Information</h2>
            <ul>
              <li>To provide and maintain our receipt generation service</li>
              <li>To save your receipt history (only when logged in)</li>
              <li>To enable product/service catalog features</li>
              <li>To process premium subscriptions</li>
              <li>To communicate service updates</li>
              <li>To improve user experience</li>
            </ul>
          </section>

          <section>
            <h2>5. Data Storage and Security</h2>
            <p>
              Your data is stored securely on <strong>Supabase</strong> infrastructure with:
            </p>
            <ul>
              <li>Row Level Security (RLS) ensuring you can only access your own data</li>
              <li>Encryption in transit (TLS/SSL)</li>
              <li>Encryption at rest</li>
              <li>Regular security audits</li>
            </ul>
            <p>
              <strong>Guest Users:</strong> If you use Resibilis without signing in, your data is 
              processed entirely in your browser and is NOT stored on our servers.
            </p>
          </section>

          <section>
            <h2>6. Data Sharing</h2>
            <p>We do NOT sell, rent, or trade your personal information. We may share data with:</p>
            <ul>
              <li><strong>Service Providers:</strong> Supabase (database), Vercel (hosting), Google (authentication)</li>
              <li><strong>Legal Requirements:</strong> When required by Philippine law or valid legal process</li>
            </ul>
          </section>

          <section>
            <h2>7. Your Rights Under the Data Privacy Act</h2>
            <p>As a data subject, you have the following rights:</p>
            <ul>
              <li><strong>Right to be Informed:</strong> Know how your data is being processed</li>
              <li><strong>Right to Access:</strong> Obtain a copy of your personal data</li>
              <li><strong>Right to Rectification:</strong> Correct inaccurate data</li>
              <li><strong>Right to Erasure:</strong> Request deletion of your data</li>
              <li><strong>Right to Object:</strong> Object to processing of your data</li>
              <li><strong>Right to Data Portability:</strong> Receive your data in a portable format</li>
              <li><strong>Right to Damages:</strong> Claim compensation for damages from data breach</li>
            </ul>
            <p>
              To exercise these rights, contact us at <strong>privacy@resibilis.com</strong>
            </p>
          </section>

          <section>
            <h2>8. Data Retention</h2>
            <ul>
              <li><strong>Active Accounts:</strong> Data retained while account is active</li>
              <li><strong>Deleted Accounts:</strong> Data deleted within 30 days of account deletion</li>
              <li><strong>Receipt History:</strong> Retained for 5 years for record-keeping purposes</li>
            </ul>
          </section>

          <section>
            <h2>9. Cookies</h2>
            <p>We use essential cookies only for:</p>
            <ul>
              <li>Authentication session management</li>
              <li>Theme preference (dark/light mode)</li>
            </ul>
            <p>We do NOT use tracking or advertising cookies.</p>
          </section>

          <section>
            <h2>10. Children&apos;s Privacy</h2>
            <p>
              Our service is not intended for users under 18 years of age. We do not knowingly 
              collect information from minors. If you are a parent and believe your child has 
              provided us with personal information, please contact us.
            </p>
          </section>

          <section>
            <h2>11. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any 
              changes by posting the new policy on this page and updating the &quot;Last Updated&quot; date.
            </p>
          </section>

          <section>
            <h2>12. Contact Us</h2>
            <p>
              For privacy-related inquiries or to exercise your rights under the Data Privacy Act:
            </p>
            <ul>
              <li><strong>Email:</strong> privacy@resibilis.com</li>
              <li><strong>Data Protection Officer:</strong> dpo@resibilis.com</li>
            </ul>
            <p>
              You may also file a complaint with the <strong>National Privacy Commission (NPC)</strong> 
              of the Philippines at <a href="https://www.privacy.gov.ph" target="_blank" rel="noopener noreferrer">www.privacy.gov.ph</a>
            </p>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}
