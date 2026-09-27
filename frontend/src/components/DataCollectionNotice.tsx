import { Link } from "wouter";

export default function DataCollectionNotice({ showPolicyLink = false }: { showPolicyLink?: boolean }) {
  return (
    <div className="data-collection-notice">
      <h3>Data Collection &amp; Consent Notice (DPDP Act, 2023)</h3>
      <p><strong>What data we collect:</strong> If you submit a form, the Foundation stores the details you provide, such as your name, email, phone, message, volunteering interests, or pledge amount and cause. The website does not collect payment card details or PAN through its forms.</p>
      <p><strong>Why we process it:</strong> Form details are used by the Foundation team to respond to messages, follow up on volunteer interest or pledges, and manage requests for programme updates. A pledge form records an expression of interest only; it does not make a payment.</p>
      <p><strong>Access and deletion:</strong> Submissions are stored in the Foundation's website database and can be viewed by an authenticated site administrator. They remain there until an administrator deletes them. To request a copy, correction or deletion, or to withdraw consent, contact the Foundation at secretariatjagannathfoundation@gmail.com or +91 97006 43333.</p>
      <p><strong>Grievance Redressal:</strong> To exercise your rights, withdraw consent, or raise a grievance, please contact our Grievance Officer at secretariatjagannathfoundation@gmail.com or +91 97006 43333. If your grievance is not resolved, you have the right to file a complaint with the Data Protection Board of India.</p>
      {showPolicyLink && <Link href="/privacy-policy" className="newsletter-privacy-link">Read the full Privacy Policy <span aria-hidden="true">↗</span></Link>}
    </div>
  );
}
