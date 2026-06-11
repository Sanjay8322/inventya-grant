import React from 'react';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '../../utils/animations';

const Proof = () => {
  const caseStudies = [
    {
      company: 'TrakRap',
      sector: 'Manufacturing',
      amount: null,
      quote: '"The Scaleup Programme through Inventya helped grow our business in ways we hadn\'t anticipated."',
      name: 'Martin Leeming',
      title: 'CEO, TrakRap',
      body: 'TrakRap needed funding to develop their unique wrapping system. Inventya identified the right Innovate UK programme, framed the application correctly, and secured the funding that enabled them to build out the technology.',
    },
    {
      company: "Tomorrow's Medicines",
      sector: 'Healthcare',
      amount: '£135,000',
      quote: null,
      name: null,
      title: null,
      body: 'A patient choice platform in the health sector was able to secure a £135,000 grant with Inventya\'s support - correctly positioned against NIHR criteria.',
    },
    {
      company: 'Proveca',
      sector: 'Life Sciences',
      amount: '£2.6M VC',
      quote: null,
      name: null,
      title: null,
      body: 'Inventya provided proof-of-market research into paediatric medicines that directly led to £2.6M in venture capital investment - demonstrating that expert positioning is as valuable for equity raises as it is for grants.',
    },
    {
      company: 'Inclusive Designs',
      sector: 'Cross-sector',
      amount: null,
      quote: '"Inventya combines experience across industries to provide industry-leading bid writing and grant funding support. They act as a critical friend to make sure your proposition is truly ground-breaking."',
      name: null,
      title: 'inventya.com',
      body: 'A full-stack innovation funding engagement: Innovate UK grant funding, business plan preparation, and R&D Tax Credits - all managed by one team.',
    },
  ];

  return (
    <section className="py-24 bg-[#111827]">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeUp} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
              We Win Funding. A Lot.
            </h2>
            <p className="text-gray-400 font-medium">£50M+ raised for UK innovators across 10+ years</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {caseStudies.map((c, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="relative bg-gray-800/50 border border-gray-700 rounded-2xl p-8 hover:border-[#00B7F5]/40 transition-all duration-300"
              >
                <div className="absolute top-6 right-6 text-5xl font-bold text-[#E4661D]/20 leading-none select-none">"</div>

                <div className="flex items-center gap-3 mb-4">
                  {c.amount && (
                    <div className="inline-block bg-[#00B7F5]/20 text-[#00B7F5] text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                      {c.amount}
                    </div>
                  )}
                  <div className="inline-block bg-gray-700 text-gray-400 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                    {c.sector}
                  </div>
                </div>

                <p className="text-lg font-bold text-white mb-3">{c.company}</p>
                <p className="text-gray-300 leading-relaxed mb-4 text-sm">{c.body}</p>

                {c.quote && (
                  <div className="border-t border-gray-700 pt-4 mt-4">
                    <p className="text-gray-400 text-sm italic mb-3">{c.quote}</p>
                    {c.name && <p className="font-bold text-white text-sm">{c.name}</p>}
                    {c.title && <p className="text-gray-500 text-xs">{c.title}</p>}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Proof;
