import React from 'react';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '../../utils/animations';
import { MessageSquare, Calculator, FileText } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: MessageSquare,
      number: '01',
      title: 'Quick Assessment',
      sub: '10 questions - under 3 minutes',
      body: 'Answer 10 questions about your project, company, and financial position. We cover everything UKRI and Horizon Europe assessors actually look at:',
      items: [
        'Business registration and geographic eligibility',
        'Company size and intervention rate',
        'Technology Readiness Level (TRL)',
        'Innovation novelty vs commercial improvement',
        'Match funding and financial solvency',
        'De minimis / subsidy control position',
      ],
    },
    {
      icon: Calculator,
      number: '02',
      title: 'Instant Scoring',
      sub: 'Exact UKRI / Horizon criteria',
      body: 'Our algorithm cross-references your profile against every active grant programme in the current 2026 UK and Horizon funding landscape:',
      items: [
        'Normalised Fundability Score (0–100)',
        'Realistic grant range based on your intervention rate',
        'Hard disqualifier detection (UiD, non-UK)',
        'Primary eligibility gap identification',
      ],
    },
    {
      icon: FileText,
      number: '03',
      title: 'Personalised Results',
      sub: 'Your top 3 matched programmes',
      body: 'See your Fundability Score, estimated grant range, and the three programmes best matched to your profile - plus the single biggest gap to close.',
      items: [
        'Top 3 matched programmes with award ranges',
        'Match funding requirements and next deadlines',
        'Gap-specific action plan',
        'Optional: book a free strategy call',
      ],
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeUp} className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#00B7F5] block mb-3">The Inventya Grant Eligibility Engine</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#111827] mb-4 tracking-tight">
              Your Full Funding Picture in 3 Simple Steps
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <motion.div key={i} variants={fadeUp} className="relative group">
                {i < 2 && (
                  <div className="hidden md:block absolute top-10 left-full w-8 h-px bg-gradient-to-r from-[#00B7F5] to-transparent z-10" />
                )}
                <div className="bg-gray-50 hover:bg-white border border-gray-100 hover:border-[#00B7F5]/30 rounded-2xl p-8 h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-10 h-10 bg-[#00B7F5] rounded-lg flex items-center justify-center">
                      <step.icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-4xl font-bold text-gray-100 group-hover:text-[#00B7F5]/20 transition-colors">{step.number}</span>
                  </div>
                  <span className="text-xs font-bold text-[#00B7F5] uppercase tracking-widest mb-2 block">{step.sub}</span>
                  <h3 className="text-xl font-bold text-[#111827] mb-3">{step.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-5">{step.body}</p>
                  <ul className="space-y-2">
                    {step.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-2 text-xs text-gray-500">
                        <span className="text-[#00B7F5] font-bold mt-0.5">→</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
