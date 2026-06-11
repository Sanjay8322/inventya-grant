import React, { useEffect } from 'react';
import { AssessmentContainer } from '../components/AssessmentContainer';
import { Navbar } from '../components/sections/Navbar';

export const CalculatorPage = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-gray-50 font-sans selection:bg-[#00B7F5] selection:text-white">
      <Navbar hideCta={true} />
      <div className="max-w-2xl mx-auto px-4 py-28">
        <div className="text-center mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-[#00B7F5]">Grant Eligibility Assessment</span>
          <h1 className="text-2xl md:text-3xl font-bold text-[#111827] mt-2">Find Your Matched 2026 Grant Programmes</h1>
          <p className="text-sm text-gray-500 mt-2">10 questions · Under 3 minutes · Free, no login</p>
        </div>

        <AssessmentContainer />

        <div className="mt-4 p-4 bg-white border border-gray-100 rounded-xl">
          <p className="text-xs text-gray-400 leading-relaxed text-center">
            <strong className="text-gray-500">Estimate only.</strong> Results are based on publicly available programme data for the 2025–2026 funding cycle. Grant award ranges, deadlines, and eligibility criteria change regularly. Verify all details directly with the relevant funder before applying. This is not legal or financial advice.
          </p>
        </div>
      </div>
    </div>
  );
};
