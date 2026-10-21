import React from "react";
import "./Privacy.css";

const Privacy = () => {
  return (
    <div className="privacy-container my-5 animate__animated animate__fadeIn">
      {/* Header Banner */}
      <div className="privacy-banner text-center d-flex flex-column justify-content-center align-items-center">
        <h1 className="privacy-banner-title">Privacy Policy</h1>
        <p className="privacy-banner-subtitle">
          Last Updated: May 19, 2026. Your privacy and trust are our absolute priorities.
        </p>
      </div>

      {/* Reader Card */}
      <div className="privacy-card p-4 p-md-5 rounded-4 shadow-sm">
        <p className="lead-text text-muted mb-4">
          At <strong>Tomato</strong>, we respect your privacy and are committed to protecting the personal information you share with us. This Privacy Policy describes how we collect, use, and safeguard your details when you use our website, mobile application, and food delivery services.
        </p>

        <hr className="my-4 border-slate-200" />

        <div className="privacy-sections d-flex flex-column gap-4">
          {/* Section 1 */}
          <div className="policy-section">
            <h3 className="policy-title">1. Information We Collect</h3>
            <p className="policy-desc">
              We collect information that is necessary to fulfill your orders, create your account, and provide a premium user experience. This includes:
            </p>
            <ul className="policy-list">
              <li><strong>Personal Identifiers:</strong> Your name, email address, telephone number, and delivery physical address.</li>
              <li><strong>Payment Information:</strong> Stripe transaction details, currency preferences, and order history billing codes. We do not store full credit card credentials locally.</li>
              <li><strong>Usage Information:</strong> Device IP details, browser configurations, page interaction speeds, and cookie identifiers.</li>
            </ul>
          </div>

          {/* Section 2 */}
          <div className="policy-section">
            <h3 className="policy-title">2. How We Use Your Information</h3>
            <p className="policy-desc">
              Your details are used solely to offer safe, swift, and highly optimized service connections:
            </p>
            <ul className="policy-list">
              <li>Processing, verifying, and delivering your food orders quickly.</li>
              <li>Facilitating secure online payments via our integrated Stripe gateways.</li>
              <li>Sending live delivery updates, context notifications, and dynamic invoices.</li>
              <li>Enhancing website layout flow and resolving customer inquiries.</li>
            </ul>
          </div>

          {/* Section 3 */}
          <div className="policy-section">
            <h3 className="policy-title">3. Security of Your Information</h3>
            <p className="policy-desc">
              We execute premium structural safeguards to keep your personal data strictly secure:
            </p>
            <p className="policy-desc">
              All transactions are processed through encrypted Secure Socket Layer (SSL) channels. Database structures are strictly protected by role-based authentication keys, restricting administrative access to approved personnel only.
            </p>
          </div>

          {/* Section 4 */}
          <div className="policy-section">
            <h3 className="policy-title">4. Cookies and Web Tracking</h3>
            <p className="policy-desc">
              Tomato uses micro-cookies to memorize items in your active shopping cart drawer and keep you logged in safely across page refreshments. You can freely choose to block cookie transmissions via your active browser settings, though doing so may disable certain shopping features.
            </p>
          </div>

          {/* Section 5 */}
          <div className="policy-section">
            <h3 className="policy-title">5. Changes to This Policy</h3>
            <p className="policy-desc">
              We may periodically update this policy to reflect statutory modifications or feature launches. We encourage customers to inspect this page regularly to review updates.
            </p>
          </div>

          {/* Section 6 */}
          <div className="policy-section">
            <h3 className="policy-title">6. Contact Us</h3>
            <p className="policy-desc">
              If you have any questions or concerns regarding our privacy policies, please reach out to us at <a href="mailto:privacy@tomato.com" className="brand-link">privacy@tomato.com</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
