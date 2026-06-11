// ============================================
// FILE: src/pages/ResultPage.jsx
// All 4 Tier result variants — exact blueprint copy
// ============================================

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Download, ShieldCheck, Users, ArrowRight, AlertTriangle, TrendingUp, X } from 'lucide-react';
import { getGrantData } from '../utils/assessmentUtils';
import { fadeUp, staggerContainer } from '../utils/animations';
import logo from '../assets/logo.png';

const fmt = (val) =>
  new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }).format(val);

// ── Tier badge component ──────────────────────────────────────────────────────
const TierBadge = ({ tier, score }) => {
  const config = {
    TIER_1: { label: 'Strong Match', color: 'bg-green-500/20 text-green-400 border-green-500/30' },
    TIER_2: { label: 'Good Potential — Gap Identified', color: 'bg-[#00B7F5]/20 text-[#00B7F5] border-[#00B7F5]/30' },
    TIER_3: { label: 'Pre-Grant Stage', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' },
    TIER_4: { label: 'Structural Barrier Identified', color: 'bg-red-500/20 text-red-400 border-red-500/30' },
  }[tier] || { label: '', color: '' };

  return (
    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-bold uppercase tracking-widest ${config.color}`}>
      Fundability Score: {score}/100 · {config.label}
    </div>
  );
};

// ── Programme card ────────────────────────────────────────────────────────────
const ProgrammeCard = ({ programme, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 hover:border-[#00B7F5]/40 transition-all"
  >
    <div className="flex items-start justify-between gap-3 mb-3">
      <div>
        <p className="font-bold text-white text-base">{programme.name}</p>
        <p className="text-xs text-[#00B7F5] font-bold mt-0.5">{programme.awardRange}</p>
      </div>
      <span className="w-7 h-7 bg-[#00B7F5] text-white text-xs font-bold rounded-full flex items-center justify-center shrink-0">
        {index + 1}
      </span>
    </div>
    <div className="grid grid-cols-2 gap-3 text-xs text-gray-400 mb-3">
      <div>
        <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-0.5">Match Funding</p>
        <p className="font-semibold">{programme.matchFunding}</p>
      </div>
      <div>
        <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-0.5">Deadline</p>
        <p className="font-semibold">{programme.deadline}</p>
      </div>
    </div>
    <p className="text-xs text-gray-500 leading-relaxed italic">{programme.notes}</p>
  </motion.div>
);

// ── PDF generation ────────────────────────────────────────────────────────────
const generatePDF = (data) => {
  if (!data) return;
  const { result, contactInfo, answers } = data;
  const tierLabel = { TIER_1: 'Strong Match', TIER_2: 'Good Potential', TIER_3: 'Pre-Grant Stage', TIER_4: 'Structural Barrier' }[result.tier];

  const html = `
<!DOCTYPE html><html><head><meta charset="UTF-8">
<style>
  body{font-family:Arial,sans-serif;padding:40px;color:#111827}
  .header{background:#111827;color:white;padding:30px;text-align:center;margin:-40px -40px 40px -40px}
  .header h1{margin:0;font-size:28px}
  .score{color:#00B7F5;font-size:56px;font-weight:900;margin:10px 0}
  .range{color:#9ca3af;font-size:18px}
  h2{border-bottom:3px solid #00B7F5;padding-bottom:8px;color:#111827}
  .grid{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin:16px 0}
  .card{border:1px solid #e5e7eb;padding:14px;border-radius:8px}
  .card h3{margin:0 0 8px;font-size:11px;text-transform:uppercase;color:#6b7280}
  .card .val{font-size:20px;font-weight:bold;color:#00B7F5}
  table{width:100%;border-collapse:collapse;margin:12px 0}
  td{padding:10px;border-bottom:1px solid #e5e7eb}
  td:first-child{color:#6b7280}
  td:last-child{font-weight:bold;text-align:right}
  .prog{border:1px solid #e5e7eb;padding:16px;border-radius:8px;margin:8px 0}
  .prog h3{color:#00B7F5;margin:0 0 4px}
  .disclaimer{font-size:11px;color:#9ca3af;line-height:1.6;margin-top:32px;padding-top:16px;border-top:1px solid #e5e7eb}
</style></head><body>
<div class="header">
  <p style="margin:0;font-size:12px;text-transform:uppercase;letter-spacing:2px;color:#00B7F5">Inventya Grant Eligibility Assessment</p>
  <h1>Your Fundability Score</h1>
  <div class="score">${result.fundabilityScore}/100</div>
  <div class="range">${tierLabel}</div>
  <p style="margin:8px 0 0;font-size:13px">Generated ${new Date().toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric'})}</p>
</div>
<h2>Estimated Grant Range</h2>
<div class="grid">
  <div class="card"><h3>Conservative Estimate</h3><div class="val">${fmt(result.grantMin)}</div></div>
  <div class="card"><h3>Optimistic Estimate</h3><div class="val">${fmt(result.grantMax)}</div></div>
  <div class="card"><h3>Intervention Rate</h3><div class="val">${Math.round(result.interventionRate * 100)}%</div></div>
  <div class="card"><h3>Tier</h3><div class="val" style="font-size:14px">${result.tier}</div></div>
</div>
<h2>Your Profile</h2>
<table>
  <tr><td>Business Registration</td><td>${answers.registration?.label||'—'}</td></tr>
  <tr><td>Company Size</td><td>${answers.company_size?.label||'—'}</td></tr>
  <tr><td>TRL Stage</td><td>${answers.trl?.label||'—'}</td></tr>
  <tr><td>Primary Sector</td><td>${answers.sector?.label||'—'}</td></tr>
  <tr><td>Innovation Novelty</td><td>${answers.novelty?.label||'—'}</td></tr>
  <tr><td>Project Cost Estimate</td><td>${fmt(answers.project_cost||0)}</td></tr>
  <tr><td>Match Funding</td><td>${answers.match_funding?.label||'—'}</td></tr>
  <tr><td>De Minimis Status</td><td>${answers.de_minimis?.label||'—'}</td></tr>
  <tr><td>Collaboration</td><td>${answers.collaboration?.label||'—'}</td></tr>
</table>
<h2>Top Matched Programmes</h2>
${result.programmes.map((p,i)=>`<div class="prog"><h3>${i+1}. ${p.name}</h3><p><strong>Award Range:</strong> ${p.awardRange} | <strong>Match Funding:</strong> ${p.matchFunding} | <strong>Deadline:</strong> ${p.deadline}</p><p style="color:#6b7280;font-size:12px">${p.notes}</p></div>`).join('')}
${result.primaryGap?`<h2>Primary Eligibility Gap: ${result.primaryGap.label}</h2><p>${result.primaryGap.message}</p>`:''}
<div class="disclaimer">
  <p><strong>Inventya Ltd</strong> | grants@inventya.com | 01925 506 100 | Company No. 07144394</p>
  <p>Estimate only. Results are based on publicly available programme data for the 2025–2026 funding cycle. Grant award ranges, deadlines, and eligibility criteria change regularly. This is not legal or financial advice.</p>
  <p>© ${new Date().getFullYear()} Inventya Ltd. Generated by Grant Eligibility & Estimator Tool.</p>
</div>
</body></html>`;

  const blob = new Blob([html], { type: 'text/html' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `Inventya-Grant-Assessment-${contactInfo?.company?.replace(/\s+/g,'-')||'Report'}-${new Date().toISOString().split('T')[0]}.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
};

// ── Main component ────────────────────────────────────────────────────────────
export const ResultPage = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const stored = getGrantData();
    if (stored) setData(stored);
    window.scrollTo(0, 0);
  }, []);

  if (!data) return (
    <div className="min-h-screen bg-[#111827] flex items-center justify-center">
      <p className="text-gray-400 text-sm">Loading your results...</p>
    </div>
  );

  const { result, contactInfo } = data;
  const { tier, fundabilityScore, grantMin, grantMax, programmes, primaryGap, flags } = result;

  const strengthColor = fundabilityScore >= 85 ? 'text-green-400' : fundabilityScore >= 60 ? 'text-[#00B7F5]' : fundabilityScore >= 40 ? 'text-yellow-400' : 'text-red-400';

  // ── TIER 1 content ──────────────────────────────────────────────────────────
  const tier1 = {
    badge: 'Strong Match',
    headline: 'Your project is structurally positioned for UK innovation grant funding.',
    subheadline: 'Based on your assessment, here is what the data shows:',
    transitionCopy: `Your Fundability Score of ${fundabilityScore}% confirms the structural case for applying. The remaining ${100 - fundabilityScore}% gap relates to ${primaryGap?.label || 'finalising your documentation'}. This is exactly where a bid writer earns their value. Closing that gap before submission is the difference between a strong application and a winning one.`,
    ctaText: 'Book a Free Grant Strategy Call with Inventya',
    ctaHref: 'https://inventya.zohobookings.eu/#/84877000004141028',
    ctaSecondary: 'Download Grant Application Checklist',
    postCta: 'No obligation. This call is a diagnostic session — we\'ll tell you exactly which programme to target, what the application requires, and whether we\'re the right fit to write it.',
  };

  // ── TIER 2 content ──────────────────────────────────────────────────────────
  const tier2 = {
    headline: 'Your innovation has a strong case. One specific issue is reducing your score.',
    subheadline: 'Good news: this is fixable. Here is what we found:',
    transitionCopy: 'This is not a dead end. Inventya\'s team specialises in exactly this situation — restructuring a strong concept to meet the specific programme criteria that will get it funded.',
    ctaText: 'Book a Diagnostic Call — We\'ll Map the Path to Fundable',
    ctaHref: 'https://inventya.zohobookings.eu/#/84877000004141028',
    ctaSecondary: 'Download the Consortium Building Guide',
  };

  // ── TIER 3 content ──────────────────────────────────────────────────────────
  const tier3 = {
    headline: 'Your project is not yet positioned for major Innovate UK or Horizon grants — but that doesn\'t mean there\'s nothing available.',
    subheadline: 'Here is the honest picture:',
    paths: [
      {
        title: 'Alternative Capital',
        body: 'R&D Tax Credits allow UK businesses spending on qualifying research and development to reclaim a percentage of that expenditure from HMRC — no match funding required, no application competition.',
      },
      {
        title: 'Feasibility Funding',
        body: 'Programmes like SMART: SCOTLAND (for Scotland-based companies) and specific Innovate UK Feasibility Studies are designed for early-stage TRL validation, with lower match funding requirements and simplified applications.',
      },
      {
        title: '360 Financial Plan',
        body: "Inventya's 360 Financial Plan maps your full funding landscape across grants, R&D Tax Credits, equity, and loan instruments simultaneously — so you're not dependent on a single route.",
      },
    ],
    ctaText: 'Download Our 360 Financial Plan Overview',
    ctaHref: 'https://inventya.zohobookings.eu/#/84877000004141028',
    ctaSecondary: 'Talk to Our Team About R&D Tax Credits',
  };

  // ── TIER 4 content ──────────────────────────────────────────────────────────
  const tier4_uid = result.disqualifyReason === 'uid';
  const tier4 = {
    headline: 'Based on current UKRI and subsidy control regulations, your project does not currently qualify for direct innovation grant funding.',
    subheadline: 'This is not a reflection of your innovation — it is a regulatory position.',
    explanation: tier4_uid
      ? 'Under UK and EU GBER rules, companies classified as an "Undertaking in Difficulty" — where accumulated losses exceed 50% of subscribed share capital — are legally ineligible for public grant funding. This is a statutory requirement, not a programme-specific decision.'
      : 'Innovate UK funding requires that your business is UK-registered and that project outcomes are exploited within the UK economy. Without this, the core mandate of UKRI funding is not met.',
    alternatives: [
      'R&D Tax Credits (no grant funding required to qualify)',
      'SEIS / EIS investment structures',
      'Private equity and angel investment pathways',
    ],
    ctaText: 'Download Our Free "Alternative Funding Routes" Guide',
    ctaSecondary: 'Subscribe for Funding Alerts When Your Status Changes',
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-[#111827]">

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <div className="bg-[#111827] text-white pt-16 pb-24 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center my-6">
            <img src={logo} alt="Inventya" className="h-10 w-auto object-contain" />
          </div>

          <p className="text-sm font-bold uppercase tracking-widest text-[#00B7F5] mb-4">Assessment Complete</p>

          <TierBadge tier={tier} score={fundabilityScore} />

          <h1 className="text-4xl md:text-6xl font-bold mb-3 leading-tight mt-6">
            {tier === 'TIER_4' ? (
              <>Eligibility Status: <span className="text-red-400">Barrier Identified</span></>
            ) : (
              <>Your Fundability Score: <span className={strengthColor}>{fundabilityScore}%</span></>
            )}
          </h1>

          {tier !== 'TIER_4' && (
            <>
              <p className="text-gray-400 text-base mb-2 font-medium">
                Estimated grant range:{' '}
                <span className="text-white font-bold">{fmt(grantMin)} – {fmt(grantMax)}</span>
              </p>
              <p className="text-gray-400 text-sm mb-4">
                Based on {Math.round(result.interventionRate * 100)}% intervention rate · {data.answers.company_size?.sizeLabel || 'company'} size
              </p>
            </>
          )}

          {/* Summary cards */}
          {tier !== 'TIER_4' && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left mt-8">
              <div className="bg-gray-800 border border-gray-700 p-5 rounded-xl">
                <p className="text-xs text-gray-400 uppercase font-bold mb-1">Fundability Score</p>
                <p className={`text-2xl font-bold ${strengthColor}`}>{fundabilityScore}/100</p>
              </div>
              <div className="bg-gray-800 border border-gray-700 p-5 rounded-xl">
                <p className="text-xs text-gray-400 uppercase font-bold mb-1">Conservative Est.</p>
                <p className="text-xl font-bold text-white">{fmt(grantMin)}</p>
              </div>
              <div className="bg-gray-800 border border-gray-700 p-5 rounded-xl">
                <p className="text-xs text-gray-400 uppercase font-bold mb-1">Optimistic Est.</p>
                <p className="text-xl font-bold text-white">{fmt(grantMax)}</p>
              </div>
              <div className="bg-gray-800 border border-gray-700 p-5 rounded-xl">
                <p className="text-xs text-gray-400 uppercase font-bold mb-1">Top Match</p>
                <p className="text-sm font-bold text-[#00B7F5] mt-1">{programmes[0]?.name || '—'}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── BODY ─────────────────────────────────────────────────────────────── */}
      <div className="max-w-4xl mx-auto px-4 -mt-10 relative z-20">

        {/* ── TIER 1 ── */}
        {tier === 'TIER_1' && (
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.div variants={fadeUp} className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 md:p-12 mb-8">
              <h2 className="text-2xl font-bold text-[#111827] mb-2">{tier1.headline}</h2>
              <p className="text-gray-500 font-medium mb-6">{tier1.subheadline}</p>
              <p className="text-gray-600 leading-relaxed mb-8">{tier1.transitionCopy}</p>

              <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                Inventya's team has helped UK innovators secure over £50M in grant funding. Our bid writers handle everything from programme identification through to final submission.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a href={tier1.ctaHref} target="_blank" rel="noopener noreferrer"
                  className="flex-1 bg-[#00B7F5] hover:bg-[#009DDF] text-white font-bold py-4 px-6 rounded-xl shadow-lg text-base transition-transform hover:-translate-y-1 flex justify-center items-center">
                  {tier1.ctaText} <ArrowRight className="ml-2 w-4 h-4" />
                </a>
                <button onClick={() => generatePDF(data)}
                  className="flex-1 bg-white hover:bg-gray-50 border-2 border-gray-200 text-gray-700 font-bold py-4 px-6 rounded-xl transition-colors flex justify-center items-center">
                  <Download className="w-4 h-4 mr-2" /> {tier1.ctaSecondary}
                </button>
              </div>
              <p className="text-xs text-gray-400 mt-4 text-center italic">{tier1.postCta}</p>
            </motion.div>

            {/* Matched Programmes */}
            {programmes.length > 0 && (
              <motion.div variants={fadeUp} className="bg-[#111827] rounded-2xl p-8 md:p-10 mb-8">
                <h2 className="text-xl font-bold text-white mb-2">Your Top 3 Matched Programmes</h2>
                <p className="text-gray-400 text-sm mb-6">Matched against your sector, TRL, company size, and compliance profile.</p>
                <div className="space-y-4">
                  {programmes.map((p, i) => <ProgrammeCard key={i} programme={p} index={i} />)}
                </div>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* ── TIER 2 ── */}
        {tier === 'TIER_2' && (
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.div variants={fadeUp} className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 md:p-12 mb-8">
              <h2 className="text-2xl font-bold text-[#111827] mb-2">{tier2.headline}</h2>
              <p className="text-gray-500 font-medium mb-6">{tier2.subheadline}</p>

              {primaryGap && (
                <div className="bg-[#E4661D]/10 border-l-4 border-[#E4661D] p-6 rounded-r-xl mb-6">
                  <p className="text-sm font-bold text-[#E4661D] uppercase tracking-wider mb-2">
                    Primary Gap: {primaryGap.label}
                  </p>
                  <p className="text-gray-700 text-sm leading-relaxed">{primaryGap.message}</p>
                </div>
              )}

              <p className="text-gray-600 leading-relaxed mb-8">{tier2.transitionCopy}</p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a href={tier2.ctaHref} target="_blank" rel="noopener noreferrer"
                  className="flex-1 bg-[#00B7F5] hover:bg-[#009DDF] text-white font-bold py-4 px-6 rounded-xl shadow-lg text-base transition-transform hover:-translate-y-1 flex justify-center items-center">
                  {tier2.ctaText} <ArrowRight className="ml-2 w-4 h-4" />
                </a>
                <button onClick={() => generatePDF(data)}
                  className="flex-1 bg-white hover:bg-gray-50 border-2 border-gray-200 text-gray-700 font-bold py-4 px-6 rounded-xl transition-colors flex justify-center items-center">
                  <Download className="w-4 h-4 mr-2" /> Download Full Report
                </button>
              </div>
            </motion.div>

            {programmes.length > 0 && (
              <motion.div variants={fadeUp} className="bg-[#111827] rounded-2xl p-8 md:p-10 mb-8">
                <h2 className="text-xl font-bold text-white mb-6">Your Top 3 Matched Programmes</h2>
                <div className="space-y-4">
                  {programmes.map((p, i) => <ProgrammeCard key={i} programme={p} index={i} />)}
                </div>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* ── TIER 3 ── */}
        {tier === 'TIER_3' && (
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.div variants={fadeUp} className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 md:p-12 mb-8">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="w-6 h-6 text-yellow-500 shrink-0" />
                <span className="text-xs font-bold uppercase tracking-widest text-yellow-600">Pre-Grant Stage</span>
              </div>
              <h2 className="text-2xl font-bold text-[#111827] mb-2">{tier3.headline}</h2>
              <p className="text-gray-500 font-medium mb-6">{tier3.subheadline}</p>

              {primaryGap && (
                <div className="bg-yellow-50 border border-yellow-200 p-5 rounded-xl mb-6">
                  <p className="text-sm font-bold text-yellow-700 mb-1">Primary barrier: {primaryGap.label}</p>
                  <p className="text-sm text-yellow-600 leading-relaxed">{primaryGap.message}</p>
                </div>
              )}

              <p className="text-gray-700 font-semibold mb-4">However, there are three paths worth exploring right now:</p>
              <div className="space-y-4 mb-8">
                {tier3.paths.map((path, i) => (
                  <div key={i} className="flex items-start gap-4 p-5 bg-gray-50 rounded-xl border border-gray-100">
                    <div className="w-8 h-8 bg-[#00B7F5] text-white text-xs font-bold rounded-full flex items-center justify-center shrink-0">{i + 1}</div>
                    <div>
                      <p className="font-bold text-[#111827] text-sm mb-1">{path.title}</p>
                      <p className="text-gray-600 text-sm leading-relaxed">{path.body}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <a href="https://inventya.zohobookings.eu/#/84877000004141028" target="_blank" rel="noopener noreferrer"
                  className="flex-1 bg-[#00B7F5] hover:bg-[#009DDF] text-white font-bold py-4 px-6 rounded-xl shadow-lg text-sm transition-transform hover:-translate-y-1 flex justify-center items-center">
                  {tier3.ctaText} <ArrowRight className="ml-2 w-4 h-4" />
                </a>
                <a href="mailto:grants@inventya.com"
                  className="flex-1 bg-white hover:bg-gray-50 border-2 border-gray-200 text-gray-700 font-bold py-4 px-6 rounded-xl transition-colors flex justify-center items-center text-sm">
                  {tier3.ctaSecondary}
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* ── TIER 4 ── */}
        {tier === 'TIER_4' && (
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.div variants={fadeUp} className="bg-white rounded-2xl shadow-xl border-t-4 border-red-400 p-8 md:p-12 mb-8">
              <div className="flex items-center gap-3 mb-4">
                <X className="w-6 h-6 text-red-500 shrink-0" />
                <span className="text-xs font-bold uppercase tracking-widest text-red-500">Eligibility Status: Structural Barrier Identified</span>
              </div>
              <h2 className="text-2xl font-bold text-[#111827] mb-2">{tier4.headline}</h2>
              <p className="text-gray-500 font-medium mb-6">{tier4.subheadline}</p>
              <p className="text-gray-600 leading-relaxed mb-6">{tier4.explanation}</p>

              <div className="bg-gray-50 border border-gray-200 p-6 rounded-xl mb-6">
                <p className="text-sm font-bold text-[#111827] mb-3">
                  Many highly innovative companies in a similar position use alternative capital structures to fund R&D while rebuilding eligibility. The most effective options include:
                </p>
                <ul className="space-y-2">
                  {tier4.alternatives.map((alt, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00B7F5] shrink-0" />
                      {alt}
                    </li>
                  ))}
                </ul>
                <p className="text-sm text-gray-600 mt-3 italic">Inventya's 360 Financial Plan was designed specifically to map these alternatives in parallel.</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button onClick={() => generatePDF(data)}
                  className="flex-1 bg-[#00B7F5] hover:bg-[#009DDF] text-white font-bold py-4 px-6 rounded-xl shadow-lg text-sm transition-transform hover:-translate-y-1 flex justify-center items-center">
                  <Download className="w-4 h-4 mr-2" /> {tier4.ctaText}
                </button>
                <a href="mailto:grants@inventya.com"
                  className="flex-1 bg-white hover:bg-gray-50 border-2 border-gray-200 text-gray-700 font-bold py-4 px-6 rounded-xl transition-colors flex justify-center items-center text-sm">
                  {tier4.ctaSecondary}
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* ── Flags / warnings ─────────────────────────────────────────────── */}
        {flags?.amberWarning && (
          <motion.div
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-8"
          >
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-amber-700 text-sm mb-1">Innovation Novelty — Amber Warning</p>
                <p className="text-amber-600 text-sm leading-relaxed">
                  Your solution may be classified as commercial innovation rather than scientific/technical advancement under UKRI criteria. A consultation with our team can help reframe your narrative around the genuine technical challenges your project faced.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {flags?.gberOnly && (
          <motion.div
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8"
          >
            <p className="font-bold text-blue-700 text-sm mb-1">De Minimis Threshold Exceeded</p>
            <p className="text-blue-600 text-sm leading-relaxed">
              Your previous public funding exceeds the £255,000 threshold. The programmes shown above are filtered to GBER-exempt and Horizon Europe routes only. Our team can advise on your full available landscape.
            </p>
          </motion.div>
        )}

        {flags?.complianceReview && (
          <motion.div
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-8"
          >
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-amber-700 text-sm mb-1">De Minimis — Compliance Review Recommended</p>
                <p className="text-amber-600 text-sm leading-relaxed">
                  Your public funding position is unclear. We recommend a compliance review before applying to confirm you are within the £255,000 de minimis threshold and accessing the correct GBER-exempt routes. Contact our team to verify your subsidy control position.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {flags?.consortiumRequired && (
          <motion.div
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8"
          >
            <p className="font-bold text-blue-700 text-sm mb-1">Consortium Partnership May Be Required</p>
            <p className="text-blue-600 text-sm leading-relaxed">
              As a large enterprise (250+ employees), many Innovate UK programmes require collaboration with an SME or academic partner. Our team can identify appropriate consortium structures and partners for your project to ensure programme eligibility.
            </p>
          </motion.div>
        )}

        {flags?.horizonNote && (
          <motion.div
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8"
          >
            <p className="font-bold text-blue-700 text-sm mb-1">Horizon Europe / Eurostars Pathway</p>
            <p className="text-blue-600 text-sm leading-relaxed">
              As an EU-registered business, your primary routes are Horizon Europe and Eurostars — both shown in your matched programmes above. UK Innovate UK direct grants require UK registration, but collaborative Horizon Europe projects remain fully open to EU partners. Contact our Enterprise Europe Network team for international partnership brokerage.
            </p>
          </motion.div>
        )}

        {/* ── Detailed breakdown ───────────────────────────────────────────── */}
        {tier !== 'TIER_4' && (
          <div className="bg-white rounded-2xl shadow border border-gray-100 p-8 md:p-12 mb-8">
            <h2 className="text-xl font-bold mb-6 border-b border-gray-100 pb-4">Your Assessment Profile</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-bold text-gray-900 mb-4 uppercase tracking-widest text-xs">Company & Project</h3>
                <ul className="space-y-3 text-sm text-gray-600">
                  {[
                    ['Registration', data.answers.registration?.label],
                    ['Company Size', data.answers.company_size?.label],
                    ['TRL Stage', data.answers.trl?.label],
                    ['Primary Sector', data.answers.sector?.label],
                    ['Innovation Type', data.answers.novelty?.label],
                    ['Project Cost', fmt(data.answers.project_cost || 0)],
                  ].map(([label, val]) => (
                    <li key={label} className="flex justify-between border-b border-gray-50 pb-2">
                      <span>{label}:</span>
                      <span className="font-bold text-gray-900 max-w-[55%] text-right text-xs">{val || '—'}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-4 uppercase tracking-widest text-xs">Eligibility Checks</h3>
                <ul className="space-y-3 text-sm text-gray-600">
                  {[
                    ['Match Funding', data.answers.match_funding?.label],
                    ['Financial Solvency (UiD)', data.answers.solvency?.label],
                    ['De Minimis', data.answers.de_minimis?.label],
                    ['Collaboration', data.answers.collaboration?.label],
                    ['Intervention Rate', `${Math.round(result.interventionRate * 100)}%`],
                    ['Raw Score', `${result.rawScore}/140 pts`],
                  ].map(([label, val]) => (
                    <li key={label} className="flex justify-between border-b border-gray-50 pb-2">
                      <span>{label}:</span>
                      <span className="font-bold text-gray-900 max-w-[55%] text-right text-xs">{val || '—'}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-10 bg-gray-50 p-6 rounded-xl border border-gray-200 flex flex-col md:flex-row items-center justify-between">
              <div className="mb-4 md:mb-0">
                <p className="font-bold text-gray-900">Download Your Full Assessment Report</p>
                <p className="text-sm text-gray-500">Programme details, profile breakdown, and action plan.</p>
              </div>
              <button onClick={() => generatePDF(data)}
                className="w-full md:w-auto flex items-center justify-center py-3 px-6 bg-white border border-gray-300 hover:border-gray-400 text-gray-800 font-bold rounded-lg transition-colors shadow-sm">
                <Download className="w-4 h-4 mr-2" /> Download Report
              </button>
            </div>
          </div>
        )}

        {/* ── Trust bar ─────────────────────────────────────────────────────── */}
        <div className="text-center pb-20">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Why Choose Inventya:</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 font-medium">
            {[
              [CheckCircle, '£50M+ raised for UK innovators'],
              [CheckCircle, 'Innovate UK official delivery partner'],
              [ShieldCheck, 'EEN member — 65+ country reach'],
              [Users, 'Full bid writing service included'],
            ].map(([Icon, text], i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <Icon className="w-6 h-6 text-[#00B7F5] mb-2" />
                <span className="text-xs leading-snug">{text}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
