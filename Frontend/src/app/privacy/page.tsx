import React from 'react';

export default function PrivacyPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-20">
      <main className="container mx-auto px-4 max-w-3xl">
        <div className="bg-white rounded-[3rem] p-10 md:p-16 shadow-sm border border-gray-100 space-y-12">
          <header className="space-y-4 text-center border-b border-gray-50 pb-12">
            <h1 className="text-4xl font-black text-gray-900 tracking-tight">Privacy Policy</h1>
            <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Last Updated: April 23, 2026</p>
          </header>

          <section className="space-y-6">
            <p className="text-lg text-gray-600 leading-relaxed italic">
              At RewardSphere, we take your privacy seriously. This policy explains how we collect, use, and protect your personal information when you use our cashback platform.
            </p>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900">1. Information We Collect</h2>
              <p className="text-gray-500 leading-relaxed">
                We collect information you provide directly to us (name, email, phone) and information automatically collected through your use of the platform (IP address, device info, and shopping activities at partner stores).
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900">2. How We Use Data</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-500 leading-relaxed ml-4">
                <li>To track your purchases at partner stores and credit cashback.</li>
                <li>To process your withdrawal requests.</li>
                <li>To send transactional alerts and promotional offers.</li>
                <li>To prevent fraud and ensure platform security.</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900">3. Cookies & Tracking</h2>
              <p className="text-gray-500 leading-relaxed">
                We use cookies and tracking technologies to link your shopping sessions to your RewardSphere account. This is essential for the tracking of commissions and the distribution of rewards.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900">4. Third-Party Sharing</h2>
              <p className="text-gray-500 leading-relaxed">
                We do not sell your personal data. However, we share transaction-related data with affiliate networks (like Cuelinks) to verify your purchases and obtain the necessary commission data.
              </p>
            </div>

            <div className="pt-12 border-t border-gray-50">
               <p className="text-sm text-gray-400 text-center">
                 If you have any questions about this policy, contact us at <span className="text-indigo-600 font-bold">privacy@rewardsphere.com</span>
               </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
