import React from 'react';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '../../utils/animations';

const Credibility = () => {
  const badges = [
    { label: 'FT 1000', sub: "Europe's Fastest-Growing\nCompanies for 4 years" },
    { label: '£50M+', sub: 'Innovation funding\nraised for clients' },
    { label: 'Innovate UK', sub: 'Official Business Growth\nDelivery Partner' },
    { label: 'EEN Member', sub: 'Enterprise Europe Network\n65+ countries' },
  ];

  return (
    <section className="py-16 bg-[#111827] border-y border-gray-800">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="flex flex-col items-center"
        >
          <motion.p variants={fadeUp} className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-8 text-center">
            Trusted by innovators. Recognised by industry.
          </motion.p>
          <motion.div variants={fadeUp} className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full">
            {badges.map((b, i) => (
              <div key={i} className="flex flex-col items-center text-center p-5 border border-gray-700 rounded-xl hover:border-[#00B7F5]/50 transition-colors group">
                <span className="text-lg font-bold text-white group-hover:text-[#00B7F5] transition-colors mb-2">{b.label}</span>
                <span className="text-xs text-gray-400 leading-relaxed whitespace-pre-line">{b.sub}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Credibility;
