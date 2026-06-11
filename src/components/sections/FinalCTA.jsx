import React from 'react';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '../../utils/animations';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Phone, Mail } from 'lucide-react';

const FinalCTA = () => {
  const navigate = useNavigate();
  return (
    <section className="py-32 bg-[#111827] border-t border-gray-800">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center"
        >
          <motion.div variants={fadeUp}>
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#00B7F5] mb-6">
              3 Minutes. Your full funding picture.
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight leading-tight">
              Check My Eligibility Now
            </h2>
            <p className="text-xl text-gray-400 mb-10 font-medium leading-relaxed">
              You'll know exactly which grants you qualify for, a realistic estimate of what you could receive, and the single biggest action to improve your position. No fluff. No generic advice.
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button
              onClick={() => navigate('/assessment')}
              className="bg-[#00B7F5] hover:bg-[#009DDF] text-white font-bold py-4 px-8 rounded-xl transition-all duration-200 text-lg flex items-center justify-center group shadow-2xl shadow-cyan-500/20 hover:-translate-y-1 transform"
            >
              Check My Eligibility Now
              <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>

          <motion.div variants={fadeUp} className="border-t border-gray-800 pt-10">
            <p className="text-gray-500 text-sm mb-5">Prefer to speak to someone first? Book a free 15-minute eligibility chat.</p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6 text-sm">
              <a href="mailto:grants@inventya.com" className="flex items-center gap-2 text-gray-400 hover:text-[#00B7F5] transition-colors font-medium">
                <Mail className="w-4 h-4" /> grants@inventya.com
              </a>
              <div className="hidden sm:block w-px h-4 bg-gray-700" />
              <a href="tel:01925506100" className="flex items-center gap-2 text-gray-400 hover:text-[#00B7F5] transition-colors font-medium">
                <Phone className="w-4 h-4" /> 01925 506 100
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
