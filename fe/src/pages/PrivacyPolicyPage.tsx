import React from 'react';
import { Link } from 'react-router-dom';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      {/* Hero section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-neutral-900 dark:text-white mb-4">
          Privacy Policy
        </h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
          Last updated: June 1, 2023
        </p>
      </div>

      <div className="max-w-4xl mx-auto bg-white dark:bg-neutral-800 rounded-xl shadow-sm p-8 mb-12">
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p>
            At ShopMini, we take your privacy seriously. This Privacy Policy
            explains how we collect, use, disclose, and safeguard your
            information when you visit our website or make a purchase. Please
            read this privacy policy carefully. If you do not agree with the
            terms of this privacy policy, please do not access the site.
          </p>

          <h2>Information We Collect</h2>
          <p>
            We collect information about you in various ways when you use our
            website. This information may include:
          </p>
          <ul>
            <li>
              <strong>Personal Information:</strong> Name, email address, postal
              address, phone number, and other information you provide when
              creating an account, making a purchase, or contacting customer
              service.
            </li>
            <li>
              <strong>Transaction Information:</strong> Details about purchases
              you make, including payment information, product details, and
              shipping information.
            </li>
            <li>
              <strong>Log Data:</strong> Information that your browser
              automatically sends whenever you visit our website, including your
              IP address, browser type, operating system, and referring URLs.
            </li>
            <li>
              <strong>Cookies and Similar Technologies:</strong> We use cookies
              and similar tracking technologies to track activity on our website
              and hold certain information to enhance your experience.
            </li>
          </ul>

          <h2>How We Use Your Information</h2>
          <p>
            We may use the information we collect for various purposes,
            including to:
          </p>
          <ul>
            <li>Process and fulfill your orders</li>
            <li>Provide customer service and respond to inquiries</li>
            <li>Send transactional emails and order confirmations</li>
            <li>Send marketing communications (with your consent)</li>
            <li>Improve our website and product offerings</li>
            <li>Personalize your shopping experience</li>
            <li>Prevent fraud and enhance security</li>
            <li>Comply with legal obligations</li>
          </ul>

          <h2>Sharing Your Information</h2>
          <p>
            We may share your information with third parties in the following
            situations:
          </p>
          <ul>
            <li>
              <strong>Service Providers:</strong> We may share your information
              with third-party service providers who perform services on our
              behalf, such as payment processing, shipping, data analysis, email
              delivery, and customer service.
            </li>
            <li>
              <strong>Business Transfers:</strong> If we are involved in a
              merger, acquisition, or sale of all or a portion of our assets,
              your information may be transferred as part of that transaction.
            </li>
            <li>
              <strong>Legal Requirements:</strong> We may disclose your
              information if required to do so by law or in response to valid
              requests by public authorities.
            </li>
            <li>
              <strong>With Your Consent:</strong> We may share your information
              with third parties when you have given us your consent to do so.
            </li>
          </ul>

          <h2>Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to
            maintain the safety of your personal information. However, no
            Internet transmission is ever completely secure or error-free. In
            particular, emails sent to or from our website may not be secure,
            and you should take special care in deciding what information you
            send to us via email.
          </p>

          <h2>Your Rights</h2>
          <p>
            Depending on your location, you may have certain rights regarding
            your personal information, including:
          </p>
          <ul>
            <li>The right to access personal information we hold about you</li>
            <li>The right to request correction of inaccurate information</li>
            <li>The right to request deletion of your information</li>
            <li>The right to object to processing of your information</li>
            <li>The right to data portability</li>
            <li>The right to withdraw consent</li>
          </ul>
          <p>
            To exercise these rights, please contact us using the information
            provided in the &quot;Contact Us&quot; section below.
          </p>

          <h2>Cookies</h2>
          <p>
            We use cookies and similar tracking technologies to track activity
            on our website and hold certain information. Cookies are files with
            a small amount of data which may include an anonymous unique
            identifier. You can instruct your browser to refuse all cookies or
            to indicate when a cookie is being sent. However, if you do not
            accept cookies, you may not be able to use some portions of our
            website.
          </p>

          <h2>Children&apos;s Privacy</h2>
          <p>
            Our website is not intended for children under the age of 13. We do
            not knowingly collect personal information from children under 13.
            If you are a parent or guardian and you are aware that your child
            has provided us with personal information, please contact us so that
            we can take necessary actions.
          </p>

          <h2>Changes to This Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify
            you of any changes by posting the new Privacy Policy on this page
            and updating the &quot;Last Updated&quot; date. You are advised to
            review this Privacy Policy periodically for any changes.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact
            us at:
            <br />
            Email: privacy@shopmini.com
            <br />
            Phone: +1 (555) 123-4567
            <br />
            Address: 123 Commerce Street, Suite 500, New York, NY 10001
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto text-center">
        <p className="text-neutral-600 dark:text-neutral-400 mb-6">
          If you have any questions or concerns about our privacy practices,
          please don&apos;t hesitate to contact us.
        </p>
        <Link
          to="/contact"
          className="inline-block bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
        >
          Contact Us
        </Link>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
