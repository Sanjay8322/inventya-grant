import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeUp, staggerContainer } from '../../utils/animations';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: 'Is this tool really free? What\'s the catch?',
    a: 'Completely free. No credit card, no account creation. You answer 10 questions and get your personalised result. We built this because we\'ve seen too many strong innovations die in the wrong funding queue. If your result shows you\'re a strong match, you\'ll have the option to book a call with our team - but that\'s entirely your choice.',
  },
  {
    q: 'How accurate is the funding estimate?',
    a: 'The estimate is based on your company size, project cost, and Technology Readiness Level - the exact variables Innovate UK and Horizon Europe use to calculate intervention rates. We present a conservative-to-optimistic range rather than a single number, because every project has costs that funders may or may not classify as eligible. The estimate gives you a realistic picture, not a guarantee.',
  },
  {
    q: 'I already applied for a grant and got rejected. Is it worth trying again?',
    a: 'Possibly - but the answer depends entirely on why you were rejected. The most common reason strong projects fail is structural positioning: wrong TRL stage, wrong programme, or an undeclared eligibility issue. Our tool will surface any structural barriers before you commit time to another application.',
  },
  {
    q: 'We\'re very early stage. Does this tool apply to us?',
    a: 'Yes. The assessment routes early-stage projects to pre-grant pathways like feasibility funding, SMART: SCOTLAND, and alternative capital structures (SEIS/EIS, R&D Tax Credits). There are programmes for TRL 1 through 9 - the key is knowing which ones apply to your stage.',
  },
  {
    q: 'We\'ve already received some public funding. Does that disqualify us?',
    a: 'Not necessarily. It depends on the total amount received over the last 3 rolling fiscal years relative to the £255,000 (approx €300,000) de minimis threshold, and whether you\'re accessing a GBER-exempt programme. The assessment checks for this automatically.',
  },
  {
    q: 'How is Inventya different from other grant consultancies?',
    a: 'We are a delivery partner for the UK government\'s Innovate UK Business Growth programme and a member of the Enterprise Europe Network with connections in over 65 countries. Our team manages the full process: we assess, identify, write, and submit on your behalf. You focus on running your business. We focus on winning the funding.',
  },
];

const FAQItem = ({ faq, isOpen, onClick }) => (
  <div className="border border-gray-100 rounded-xl overflow-hidden">
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between p-6 text-left bg-white hover:bg-gray-50 transition-colors"
    >
      <span className="font-bold text-[#111827] text-sm pr-4">{faq.q}</span>
      <ChevronDown className={`w-5 h-5 text-[#00B7F5] shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
    </button>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className="px-6 pb-6 bg-white">
            <p className="text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-4">{faq.a}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeUp} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#111827] mb-4 tracking-tight">
              Frequently Asked Questions
            </h2>
          </motion.div>
          <motion.div variants={fadeUp} className="space-y-3">
            {faqs.map((faq, i) => (
              <FAQItem key={i} faq={faq} isOpen={openIndex === i} onClick={() => setOpenIndex(openIndex === i ? null : i)} />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
