import React from 'react';

export default function TermsPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-20">
      <main className="container mx-auto px-4 max-w-3xl">
        <div className="bg-white rounded-[3rem] p-10 md:p-16 shadow-sm border border-gray-100 space-y-12">
          <header className="space-y-4 text-center border-b border-gray-50 pb-12">
            <h1 className="text-4xl font-black text-gray-900 tracking-tight">Terms of Use</h1>
            <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Last Updated: April 23, 2026</p>
          </header>

          <section className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900">1. Acceptance of Terms</h2>
              <p className="text-gray-500 leading-relaxed">
                By accessing and using RewardSphere, you agree to be bound by these Terms of Use and our Privacy Policy. If you do not agree, please do not use the platform.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900">2. Membership Eligibility</h2>
              <p className="text-gray-500 leading-relaxed">
                Membership is free and limited to individuals over 18 years of age. One user is allowed only one account. Multiple accounts will lead to permanent suspension.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900">3. Cashback Tracking</h2>
              <p className="text-gray-500 leading-relaxed">
                Cashback is not guaranteed until it is confirmed by the retailer. RewardSphere is not responsible if a retailer fails to track an order due to ad-blockers, clearing cookies, or using other coupon sites during the session.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900">4. Withdrawal Rules</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-500 leading-relaxed ml-4">
                <li>Minimum withdrawal threshold is ₹100.</li>
                <li>Only "Confirmed Balance" can be withdrawn.</li>
                <li>Payments are processed within 2-5 business days.</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900">5. Termination</h2>
              <p className="text-gray-500 leading-relaxed">
                We reserve the right to suspend any account suspected of fraud, manipulation of cookies, or any activity that violates our business principles.
              </p>
            </div>

            <div className="pt-12 border-t border-gray-50 text-center">
               <p className="text-sm text-gray-400">
                 Read carefully as these terms govern your relationship with <span className="text-gray-900 font-bold">RewardSphere India</span>.
               </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
