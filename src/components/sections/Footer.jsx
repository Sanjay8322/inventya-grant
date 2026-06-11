import React from 'react';
import { Shield } from 'lucide-react';
import logo from '../../assets/logo.png';

const Footer = () => {
  return (
    <footer className="bg-[#0A0F1A] text-gray-400 py-16 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12">
          <div className="mb-4">
            <img src={logo} alt="Inventya" className="h-10 w-auto object-contain" />
          </div>
          <p className="text-xs font-bold uppercase tracking-widest text-[#00B7F5] mb-4">Grant Intelligence & Innovation Funding</p>
          <p className="text-sm leading-relaxed">
            Inventya Ltd | Company No. 07144394 | Registered in England and Wales
          </p>
          <p className="text-xs text-gray-600 mt-2">Innovate UK Business Growth Delivery Partner | EEN Member</p>
          <div className="mt-6 space-y-2 text-sm">
            <p>grants@inventya.com</p>
            <p>01925 506 100</p>
            <p>
              <a href="https://www.inventya.com/privacy-policy" className="hover:text-[#00B7F5] transition-colors">
                Privacy Policy →
              </a>
            </p>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8">
          <div className="bg-gray-900/50 rounded-xl p-6 mb-8 border border-gray-800">
            <div className="flex items-start gap-3 mb-4">
              <Shield className="w-4 h-4 text-[#E4661D] shrink-0 mt-0.5" />
              <p className="text-xs font-bold uppercase tracking-widest text-gray-500">Important Legal Notices & Disclaimers</p>
            </div>
            <div className="space-y-3 text-xs text-gray-600 leading-relaxed">
              <p><strong className="text-gray-500">This is an Estimate Only.</strong> The results provided by this tool are estimates based on the information you input and publicly available grant programme data. They do not constitute financial advice or a guaranteed funding outcome. Actual grant awards are subject to competitive application processes and funder approval.</p>
              <p><strong className="text-gray-500">Programme Data.</strong> Grant programme details, deadlines, and award ranges are based on available information for the 2025–2026 funding cycle. Programme availability, award sizes, and eligibility criteria change regularly. Verify current details directly with the relevant funder before applying.</p>
              <p><strong className="text-gray-500">Regulatory Compliance.</strong> De minimis and UiD determinations are indicative only. Your actual regulatory position requires verification by a qualified advisor before submitting any grant application.</p>
            </div>
          </div>

          <div className="bg-gray-900/30 rounded-xl p-6 mb-8 border border-gray-800">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">Privacy & Data Protection</p>
            <p className="text-xs text-gray-600 leading-relaxed">
              By using this tool and providing your contact information, you consent to Inventya collecting and processing your data in accordance with UK GDPR and our{' '}
              <a href="https://www.inventya.com/privacy-policy" className="text-[#00B7F5] hover:underline">Privacy Policy</a>.
              Your data is used solely to generate your personalised assessment and contact you with relevant funding insights.
            </p>
          </div>

          <p className="text-xs text-gray-600">© {new Date().getFullYear()} Inventya Ltd. All rights reserved. Registered in England and Wales.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
