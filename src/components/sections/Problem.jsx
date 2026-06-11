import React from 'react';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '../../utils/animations';
import { AlertCircle } from 'lucide-react';

const Problem = () => {
  const painPoints = [
    {
      title: 'Wrong Programme',
      body: 'You applied to Smart Grants with a TRL 2 concept. The fund requires TRL 3 minimum. Rejected on day one.',
    },
    {
      title: 'Match Funding Blindspot',
      body: 'Grants pay in arrears. They cover 30% to 70% of costs at most. If you don\'t have cash reserves or committed investment, the grant itself won\'t save you.',
    },
    {
      title: 'Hidden Disqualifiers',
      body: 'The "Undertaking in Difficulty" clause is buried in regulatory guidance. If your accumulated losses have exceeded half your subscribed share capital, you are legally ineligible for most Innovate UK and EU programmes - no matter how strong your innovation is.',
    },
    {
      title: 'De Minimis Exhaustion',
      body: 'You\'ve received public funding in the past. You may have crossed the €300,000 threshold over the last 3 rolling years without realising it. That silently blocks access to a significant portion of available programmes.',
    },
  ];

  return (
    <section className="py-24 bg-gray-50 border-y border-gray-100">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeUp} className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-[#111827] mb-6 tracking-tight">
              The UK Grant System Is Not Built to Be Easy to Navigate
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
              Most founders discover these problems after months of wasted effort:
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100 mb-10">
            <div className="grid md:grid-cols-2 gap-6 mb-10">
              {painPoints.map((p, i) => (
                <div key={i} className="bg-red-50/60 border border-red-100 p-6 rounded-xl">
                  <div className="flex items-center gap-2 mb-3">
                    <AlertCircle className="w-5 h-5 text-[#E4661D] shrink-0" />
                    <p className="text-sm font-bold text-[#E4661D] uppercase tracking-widest">Pain Point {i + 1}: {p.title}</p>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{p.body}</p>
                </div>
              ))}
            </div>

            <div className="border-l-4 border-[#00B7F5] pl-6 py-2 mb-8">
              <p className="text-base font-semibold text-[#111827] leading-relaxed">
                "In over a decade of grant writing, the biggest reasons good projects fail have nothing to do with the quality of the idea. They fail because of structural positioning errors made before a single word is written."
              </p>
            </div>

            <p className="text-gray-600 mb-0 leading-relaxed text-sm">
              Inventya's specialists have written and won grant applications across Innovate UK, NIHR, DASA, Horizon Europe, and regional launchpads. Our eligibility tool was built to catch those errors first.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Problem;
