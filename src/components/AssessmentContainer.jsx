// ============================================
// FILE: src/components/AssessmentContainer.jsx
// Grant Eligibility quiz engine - identical design to Inventya HMRC tool
// ============================================

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check, ChevronLeft, Search, TrendingUp, Award, Lock } from 'lucide-react';
import { assessmentConfig } from '../config/assessmentConfig';
import { calculateGrantResult, storeGrantData } from '../utils/assessmentUtils';

const fmt = (val) =>
  new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }).format(val);

// Live blurred estimate shown during quiz
const LiveEstimate = ({ answers }) => {
  const size = answers.company_size;
  const cost = answers.project_cost;
  if (!size || !cost) return null;
  const rate = size.interventionRate || 0.70;
  const low = Math.round(cost * rate * 0.8);
  const high = Math.round(cost * rate);
  return (
    <div className="mt-4 px-4 py-2 bg-[#00B7F5]/10 border border-[#00B7F5]/20 rounded-lg text-center select-none">
      <p className="text-[10px] font-bold uppercase tracking-widest text-[#00B7F5] mb-0.5">Live Estimate</p>
      <p className="text-sm font-bold text-gray-700 blur-sm hover:blur-none transition-all duration-300">
        {fmt(low)} – {fmt(high)}
      </p>
    </div>
  );
};

export const AssessmentContainer = () => {
  const [view, setView] = useState('quiz');
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [contactInfo, setContactInfo] = useState({
    firstName: '', lastName: '', company: '', email: '', phone: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const config = assessmentConfig;
  const questions = config.questions;
  const currentQ = questions[currentStepIndex];
  const progress = ((currentStepIndex + 1) / questions.length) * 100;

  const handleOptionSelect = (qId, opt) => {
    setAnswers((prev) => ({ ...prev, [qId]: opt }));
    setTimeout(() => handleNext(opt), 250);
  };

  const handleSliderChange = (qId, val) => {
    setAnswers((prev) => ({ ...prev, [qId]: Number(val) }));
  };

  const handleNext = (manualAnswer) => {
    let answerToCheck = manualAnswer || answers[currentQ.id];

    // Slider: visual defaultVal is shown but not stored until user interacts.
    // Store the default so progression isn't blocked when slider is untouched.
    if (currentQ.type === 'slider' && answerToCheck === undefined) {
      answerToCheck = currentQ.defaultVal;
      setAnswers((prev) => ({ ...prev, [currentQ.id]: currentQ.defaultVal }));
    }

    if (currentQ.required && !answerToCheck) return;

    // Hard disqualifier check (Q1 / Q6)
    if (answerToCheck?.hardDisqualify) {
      setAnswers((prev) => ({ ...prev, [currentQ.id]: answerToCheck }));
      setView('contact');
      return;
    }

    if (currentStepIndex < questions.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    } else {
      setView('contact');
    }
  };

  const handleBack = () => {
    if (view === 'contact') { setView('quiz'); return; }
    if (currentStepIndex > 0) setCurrentStepIndex((prev) => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const resultData = calculateGrantResult(answers);
      await storeGrantData(answers, contactInfo, resultData);
      window.location.href = config.outcomes.result.route;
    } catch (err) {
      alert(err.message || 'An error occurred. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-50 flex items-center justify-center py-12 px-4 font-sans text-[#111827]">
      <div className="max-w-xl w-full">

        {/* ── QUIZ ─────────────────────────────────────────────────────────── */}
        <AnimatePresence mode="wait">
          {view === 'quiz' && currentQ && (
            <motion.div
              key={currentStepIndex}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white rounded-xl shadow-lg border border-gray-100 p-8"
            >
              {/* Progress */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    Question {currentStepIndex + 1} of {questions.length}
                  </span>
                  <span className="text-[10px] font-bold text-[#00B7F5]">{Math.round(progress)}%</span>
                </div>
                <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-[#00B7F5]"
                    initial={{ width: `${((currentStepIndex) / questions.length) * 100}%` }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
                {currentQ.progressLabel && (
                  <p className="text-[10px] text-gray-400 mt-1.5 font-medium italic">{currentQ.progressLabel}</p>
                )}
              </div>

              {/* Back button */}
              {currentStepIndex > 0 && (
                <button
                  onClick={handleBack}
                  className="text-gray-400 hover:text-[#00B7F5] mb-5 flex items-center text-xs font-bold transition-colors"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" /> Back
                </button>
              )}

              {/* Question */}
              <h2 className="text-lg md:text-xl font-bold mb-4 text-[#111827] leading-snug">
                {currentQ.question}
              </h2>

              {/* Radio options */}
              {currentQ.type === 'radio' && (
                <div className="space-y-2.5">
                  {currentQ.options.map((opt, idx) => {
                    const isSelected = answers[currentQ.id]?.value === opt.value;
                    return (
                      <motion.div
                        key={idx}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={() => handleOptionSelect(currentQ.id, opt)}
                        className={`p-3.5 rounded-lg border-2 cursor-pointer transition-all flex items-center justify-between group
                          ${isSelected ? 'border-[#00B7F5] bg-blue-50/50' : 'border-gray-100 hover:border-[#00B7F5]/50'}
                        `}
                      >
                        <span className={`text-sm font-semibold w-[90%] ${isSelected ? 'text-[#00B7F5]' : 'text-gray-700'}`}>
                          {opt.label}
                        </span>
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${isSelected ? 'border-[#00B7F5]' : 'border-gray-300'}`}>
                          {isSelected && <div className="w-2 h-2 bg-[#00B7F5] rounded-full" />}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}

              {/* Slider */}
              {currentQ.type === 'slider' && (
                <div className="mt-2">
                  <div className="flex items-center justify-center bg-gray-50 border-2 border-gray-200 rounded-lg p-4 mb-5 text-center">
                    <span className="text-gray-400 font-bold mr-1 text-2xl">£</span>
                    <input
                      type="number"
                      value={answers[currentQ.id] !== undefined ? answers[currentQ.id] : currentQ.defaultVal}
                      onChange={(e) => handleSliderChange(currentQ.id, e.target.value)}
                      className="bg-transparent text-3xl font-extrabold text-[#00B7F5] outline-none w-3/4 max-w-[200px]"
                    />
                  </div>
                  <input
                    type="range"
                    min={currentQ.min}
                    max={currentQ.max}
                    step={currentQ.step}
                    value={answers[currentQ.id] !== undefined ? answers[currentQ.id] : currentQ.defaultVal}
                    onChange={(e) => handleSliderChange(currentQ.id, e.target.value)}
                    className="w-full cursor-pointer mb-2"
                  />
                  <div className="flex justify-between text-[10px] text-gray-400 font-bold">
                    <span>{fmt(currentQ.min)}</span>
                    <span>{fmt(currentQ.max)}+</span>
                  </div>
                  <button
                    onClick={() => handleNext()}
                    className="w-full mt-7 bg-[#00B7F5] hover:bg-[#009DDF] text-white font-bold py-3.5 rounded-lg shadow-md transition-all text-sm hover:-translate-y-0.5 transform"
                  >
                    Confirm Amount
                  </button>
                </div>
              )}

              {/* Live estimate */}
              <LiveEstimate answers={answers} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── EMAIL GATE ───────────────────────────────────────────────────── */}
        {view === 'contact' && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-xl shadow-xl border-t-8 border-[#00B7F5] p-8 md:p-10"
          >
            <button onClick={handleBack} className="text-gray-400 hover:text-[#00B7F5] mb-6 flex items-center text-xs font-bold transition-colors">
              <ChevronLeft className="w-4 h-4 mr-1" /> Back
            </button>

            <div className="text-center mb-7">
              <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-100">
                <Lock className="w-5 h-5 text-[#00B7F5]" />
              </div>
              <h2 className="text-xl md:text-2xl font-extrabold text-gray-900 mb-2">
                Your grant eligibility analysis is complete.
              </h2>
              <p className="text-sm text-gray-600 font-medium">
                Enter your work email to unlock your personalised Fundability Score, estimated grant range, and your top 3 matched 2026 funding programmes.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <input
                  required
                  type="text"
                  placeholder="First Name *"
                  value={contactInfo.firstName}
                  onChange={(e) => setContactInfo({ ...contactInfo, firstName: e.target.value })}
                  className="w-full p-3.5 bg-gray-50 border-2 border-gray-200 rounded-lg focus:border-[#00B7F5] outline-none transition text-sm font-medium text-gray-900"
                />
                <input
                  required
                  type="text"
                  placeholder="Last Name *"
                  value={contactInfo.lastName}
                  onChange={(e) => setContactInfo({ ...contactInfo, lastName: e.target.value })}
                  className="w-full p-3.5 bg-gray-50 border-2 border-gray-200 rounded-lg focus:border-[#00B7F5] outline-none transition text-sm font-medium text-gray-900"
                />
              </div>
              <input
                type="text"
                placeholder="Company Name"
                value={contactInfo.company}
                onChange={(e) => setContactInfo({ ...contactInfo, company: e.target.value })}
                className="w-full p-3.5 bg-gray-50 border-2 border-gray-200 rounded-lg focus:border-[#00B7F5] outline-none transition text-sm font-medium text-gray-900"
              />
              <input
                required
                type="email"
                placeholder="Work Email Address *"
                value={contactInfo.email}
                onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                className="w-full p-3.5 bg-gray-50 border-2 border-gray-200 rounded-lg focus:border-[#00B7F5] outline-none transition text-sm font-medium text-gray-900"
              />
              <input
                type="tel"
                placeholder="Phone (optional)"
                value={contactInfo.phone}
                onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                className="w-full p-3.5 bg-gray-50 border-2 border-gray-200 rounded-lg focus:border-[#00B7F5] outline-none transition text-sm font-medium text-gray-900"
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#00B7F5] hover:bg-[#009DDF] text-white font-bold py-3.5 rounded-lg shadow-md flex justify-center items-center mt-6 transition-transform hover:-translate-y-0.5 text-sm md:text-base"
              >
                {isSubmitting ? 'Generating...' : <>Reveal My Results <ArrowRight className="ml-2 w-4 h-4" /></>}
              </button>
              <p className="text-center text-[10px] text-gray-400 mt-3 font-medium uppercase tracking-widest">
                No spam. Your data is used solely to deliver your assessment.
              </p>
            </form>
          </motion.div>
        )}

      </div>
    </div>
  );
};
