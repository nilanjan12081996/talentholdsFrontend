export default function Support() {
  return (
    <div className="pt-32 pb-20 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 bg-white p-10 rounded-2xl shadow-sm border border-gray-100">
        <h1 className="text-4xl font-bold text-[#1E1E4B] mb-6">Support</h1>
        <p className="text-gray-600 leading-relaxed mb-4 text-lg">
          Need help? Our support team is here for you. We aim to respond to all inquiries within 24 hours.
        </p>
        
        <h2 className="text-2xl font-semibold text-[#1E1E4B] mt-10 mb-4">Contact Us</h2>
        <p className="text-gray-600 leading-relaxed mb-4">
          If you have any questions, issues, or feedback, please reach out to us at:
        </p>
        <ul className="list-disc list-inside text-gray-600 mb-8 space-y-2">
          <li>Email: support@talentholds.com</li>
          <li>Phone: +1 (800) 123-4567</li>
        </ul>

        <h2 className="text-2xl font-semibold text-[#1E1E4B] mt-10 mb-4">Frequently Asked Questions</h2>
        <p className="text-gray-600 leading-relaxed">
          Before reaching out, you might want to check our FAQs section on the home page for quick answers to common questions about billing, account setup, and more.
        </p>
      </div>
    </div>
  );
}
