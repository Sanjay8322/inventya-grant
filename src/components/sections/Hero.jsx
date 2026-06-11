import React from 'react';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '../../utils/animations';
import { ArrowRight, CheckCircle2, Shield, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative pt-36 pb-24 md:pt-44 md:pb-32 overflow-hidden bg-white">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#00B7F5]/5 rounded-full -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#E4661D]/5 rounded-full translate-y-1/2 -translate-x-1/4" />
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8 text-center relative z-10">
        <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="flex flex-col items-center">

          <motion.div variants={fadeUp}>
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#00B7F5] bg-[#00B7F5]/10 px-4 py-2 rounded-full mb-6">
              2026 Grant Eligibility Engine — Free, No Account Needed
            </span>
          </motion.div>

          {/* Variant A headline */}
          <motion.div variants={fadeUp} className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-[#111827] leading-[1.05] tracking-tight mb-8">
              Find Out Which UK Innovation Grants You Actually{' '}
              <span className="text-[#00B7F5]">Qualify For</span>{' '}
              In 3 Minutes
            </h1>
          </motion.div>

          <motion.div variants={fadeUp} className="max-w-2xl mx-auto mb-10">
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed font-medium">
              Innovate UK rejects 98% of Smart Grant applications. Our eligibility engine scans 500+ active grants against your project profile and shows you exactly where you stand — before you spend months writing an application.
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="w-full flex flex-col items-center mb-4">
            <button
              onClick={() => navigate('/assessment')}
              className="bg-[#00B7F5] hover:bg-[#009DDF] text-white font-bold py-4 px-8 rounded-xl transition-all duration-200 text-lg flex items-center group shadow-xl shadow-cyan-500/25 hover:-translate-y-1 transform"
            >
              Check My Eligibility Now
              <ArrowRight className="hidden md:flex ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="mt-4 text-sm text-gray-400 font-medium">3,200+ UK businesses assessed · Trusted by Innovate UK Business Growth · Results in under 3 minutes</p>
          </motion.div>

          {/* Trust bar */}
          <motion.div variants={fadeUp} className="w-full max-w-3xl mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 bg-gray-50 rounded-2xl border border-gray-100">
              {[
                { icon: CheckCircle2, text: '£50M+ Raised', sub: 'for UK innovators' },
                { icon: Globe, text: '65+ Countries', sub: 'global network reach' },
                { icon: Shield, text: '10+ Years', sub: 'helping businesses grow' },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center text-center">
                  <item.icon className="w-5 h-5 text-[#00B7F5] mb-2" />
                  <span className="text-sm font-bold text-[#111827]">{item.text}</span>
                  <span className="text-xs text-gray-500 mt-0.5">{item.sub}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Programme logos row */}
          <motion.div variants={fadeUp} className="mt-8 text-center">
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-4">Covering programmes including</p>
            <div className="flex flex-wrap justify-center gap-3 text-xs font-bold text-gray-500">
              {['Innovate UK', 'Horizon Europe', 'DASA', 'Enterprise Europe Network', 'Northern Powerhouse', 'NIHR', 'EIC Accelerator'].map((p) => (
                <span key={p} className="px-3 py-1.5 bg-gray-100 rounded-full hover:bg-[#00B7F5]/10 hover:text-[#00B7F5] transition-colors">{p}</span>
              ))}
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
