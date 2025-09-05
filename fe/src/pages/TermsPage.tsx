import React from 'react';
import { Link } from 'react-router-dom';

const TermsPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      {/* Hero section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-neutral-900 dark:text-white mb-4">
          Terms & Conditions
        </h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
          Last updated: June 1, 2023
        </p>
      </div>

      <div className="max-w-4xl mx-auto bg-white dark:bg-neutral-800 rounded-xl shadow-sm p-8 mb-12">
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p>
            Welcome to ShopMini. These terms and conditions outline the rules
            and regulations for the use of our website. By accessing this
            website, we assume you accept these terms and conditions in full. Do
            not continue to use ShopMini if you do not accept all of the terms
            and conditions stated on this page.
          </p>

          <h2>1. Definitions</h2>
          <p>
            The following terminology applies to these Terms and Conditions,
            Privacy Statement and Disclaimer Notice and any or all Agreements:
            "Client", "You" and "Your" refers to you, the person accessing this
            website and accepting the Company&apos;s terms and conditions. "The
            Company", "Ourselves", "We", "Our" and "Us", refers to ShopMini.
            "Party", "Parties", or "Us", refers to both the Client and
            ourselves, or either the Client or ourselves.
          </p>

          <h2>2. License</h2>
          <p>
            Unless otherwise stated, ShopMini and/or its licensors own the
            intellectual property rights for all material on ShopMini. All
            intellectual property rights are reserved. You may view and/or print
            pages from the website for your own personal use subject to
            restrictions set in these terms and conditions.
          </p>
          <p>You must not:</p>
          <ul>
            <li>Republish material from this website</li>
            <li>Sell, rent or sub-license material from this website</li>
            <li>Reproduce, duplicate or copy material from this website</li>
            <li>
              Redistribute content from ShopMini (unless content is specifically
              made for redistribution)
            </li>
          </ul>

          <h2>3. User Account</h2>
          <p>
            If you create an account on our website, you are responsible for
            maintaining the security of your account, and you are fully
            responsible for all activities that occur under the account and any
            other actions taken in connection with the account. You must
            immediately notify us of any unauthorized uses of your account or
            any other breaches of security.
          </p>

          <h2>4. Products and Services</h2>
          <p>
            All products and services displayed on our website are subject to
            availability. We reserve the right to discontinue any product or
            service at any time. Prices for our products are subject to change
            without notice. We reserve the right at any time to modify or
            discontinue any product or service without notice.
          </p>
          <p>
            We shall not be liable to you or to any third-party for any
            modification, price change, suspension or discontinuance of any
            product or service.
          </p>

          <h2>5. Accuracy of Information</h2>
          <p>
            We strive to provide accurate product descriptions, pricing, and
            availability information. However, we do not warrant that product
            descriptions, pricing, or other content on this site is accurate,
            complete, reliable, current, or error-free. If a product offered by
            ShopMini is not as described, your sole remedy is to return it in
            unused condition.
          </p>

          <h2>6. Ordering and Payment</h2>
          <p>
            When you place an order, you are offering to purchase a product at
            the listed price. We reserve the right to accept or decline your
            order for any reason, including product unavailability, errors in
            pricing or product information, or problems with your payment
            method.
          </p>
          <p>
            By placing an order, you warrant that you are at least 18 years old
            and that the information you provide to us during the order process
            is accurate and complete. You are responsible for all charges
            incurred under your account.
          </p>

          <h2>7. Shipping and Delivery</h2>
          <p>
            We will make every effort to ship products within the timeframes
            indicated on our website. However, shipping times are estimates only
            and are not guaranteed. We are not responsible for delays that are
            beyond our control, including delays due to shipping carriers,
            weather, or other events.
          </p>

          <h2>8. Returns and Refunds</h2>
          <p>
            Our return and refund policy is outlined in our Shipping & Returns
            page. By making a purchase, you agree to the terms of that policy.
            We reserve the right to modify our return and refund policy at any
            time.
          </p>

          <h2>9. Limitation of Liability</h2>
          <p>
            In no event shall ShopMini, nor its directors, employees, partners,
            agents, suppliers, or affiliates, be liable for any indirect,
            incidental, special, consequential or punitive damages, including
            without limitation, loss of profits, data, use, goodwill, or other
            intangible losses, resulting from (i) your access to or use of or
            inability to access or use the website; (ii) any conduct or content
            of any third party on the website; (iii) any content obtained from
            the website; and (iv) unauthorized access, use or alteration of your
            transmissions or content, whether based on warranty, contract, tort
            (including negligence) or any other legal theory, whether or not we
            have been informed of the possibility of such damage.
          </p>

          <h2>10. Indemnification</h2>
          <p>
            You agree to indemnify, defend and hold harmless ShopMini, its
            parent, subsidiaries, affiliates, partners, officers, directors,
            agents, contractors, licensors, service providers, subcontractors,
            suppliers, interns and employees, harmless from any claim or demand,
            including reasonable attorneys&apos; fees, made by any third-party
            due to or arising out of your breach of these Terms and Conditions
            or the documents they incorporate by reference, or your violation of
            any law or the rights of a third-party.
          </p>

          <h2>11. Severability</h2>
          <p>
            In the event that any provision of these Terms and Conditions is
            determined to be unlawful, void or unenforceable, such provision
            shall nonetheless be enforceable to the fullest extent permitted by
            applicable law, and the unenforceable portion shall be deemed to be
            severed from these Terms and Conditions, such determination shall
            not affect the validity and enforceability of any other remaining
            provisions.
          </p>

          <h2>12. Termination</h2>
          <p>
            The obligations and liabilities of the parties incurred prior to the
            termination date shall survive the termination of this agreement for
            all purposes. These Terms and Conditions are effective unless and
            until terminated by either you or us. You may terminate these Terms
            and Conditions at any time by notifying us that you no longer wish
            to use our Services, or when you cease using our site.
          </p>

          <h2>13. Governing Law</h2>
          <p>
            These Terms and Conditions shall be governed by and construed in
            accordance with the laws of the United States, and you submit to the
            non-exclusive jurisdiction of the state and federal courts located
            in the United States for the resolution of any disputes.
          </p>

          <h2>14. Changes to Terms</h2>
          <p>
            We reserve the right, at our sole discretion, to update, change or
            replace any part of these Terms and Conditions by posting updates
            and changes to our website. It is your responsibility to check our
            website periodically for changes. Your continued use of or access to
            our website following the posting of any changes to these Terms and
            Conditions constitutes acceptance of those changes.
          </p>

          <h2>15. Contact Information</h2>
          <p>
            Questions about the Terms and Conditions should be sent to us at
            legal@shopmini.com.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto text-center">
        <p className="text-neutral-600 dark:text-neutral-400 mb-6">
          If you have any questions or concerns about our terms and conditions,
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

export default TermsPage;
