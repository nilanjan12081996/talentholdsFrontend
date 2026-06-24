export default function PrivacyPolicy() {
  return (
    <div className="pt-32 pb-20 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 bg-white p-10 rounded-2xl shadow-sm border border-gray-100">
        <h1 className="text-4xl font-bold text-[#1E1E4B] mb-6">Privacy Policy</h1>
        <p className="text-gray-500 mb-8">Last updated: June 2026</p>
        
        <div className="space-y-8 text-gray-600 leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold text-[#1E1E4B] mb-4">1. Information We Collect</h2>
            <p>
              We collect information you provide directly to us, such as when you create or modify your account, 
              contact customer support, or otherwise communicate with us. This information may include: name, email, 
              phone number, postal address, profile picture, payment method, and other information you choose to provide.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#1E1E4B] mb-4">2. Use of Information</h2>
            <p className="mb-4">We may use the information we collect about you to:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>Provide, maintain, and improve our services.</li>
              <li>Provide and deliver the products and services you request, process transactions and send you related information.</li>
              <li>Respond to your comments, questions and requests and provide customer service.</li>
              <li>Communicate with you about products, services, offers, promotions, and events.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#1E1E4B] mb-4">3. Data Security</h2>
            <p>
              We take reasonable measures to help protect information about you from loss, theft, misuse and unauthorized access, 
              disclosure, alteration and destruction. However, no internet or email transmission is ever fully secure or error free.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#1E1E4B] mb-4">4. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at: <a href="mailto:privacy@talentholds.com" className="text-[#8624F0] hover:underline">privacy@talentholds.com</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
