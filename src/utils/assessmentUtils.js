// ============================================
// FILE: src/utils/assessmentUtils.js
// Grant Eligibility Scoring Engine - exact formulas from blueprint
// ============================================

const ZOHO_FLOW_WEBHOOK_URL = import.meta.env.VITE_ZOHO_WEBHOOK_URL;

// ─── Programme database keyed by flag ────────────────────────────────────────
const PROGRAMME_DB = {
  // Defence
  dasa: {
    name: "DASA Innovation Loan",
    awardRange: "£50k – £1.5M",
    matchFunding: "30–50%",
    deadline: "Rolling competitions",
    notes: "Ideal for TRL 4–7 defence technology",
  },
  nato_diana: {
    name: "NATO DIANA Programme",
    awardRange: "€100k – €2M",
    matchFunding: "30%",
    deadline: "Annual cycle",
    notes: "Dual-use deep tech, requires NATO country registration",
  },
  // Healthcare
  biomedical: {
    name: "Biomedical Catalyst",
    awardRange: "£150k – £10M",
    matchFunding: "30–50%",
    deadline: "UKRI rolling competition",
    notes: "For life sciences TRL 3–7; strong industry-academia requirement",
  },
  nihr: {
    name: "NIHR i4i Programme",
    awardRange: "£100k – £2M",
    matchFunding: "20%",
    deadline: "Quarterly submission windows",
    notes: "Health technology with clear patient benefit pathway",
  },
  health_launchpad: {
    name: "Innovate UK Health Launchpad",
    awardRange: "£50k – £500k",
    matchFunding: "30%",
    deadline: "Annual competition",
    notes: "SME-focused; strong match for TRL 4–6",
  },
  // Net Zero
  heat_pump: {
    name: "Heat Pump Ready Programme",
    awardRange: "£100k – £3M",
    matchFunding: "50%",
    deadline: "Check Innovate UK portal",
    notes: "Residential and commercial heating transition technology",
  },
  nzip: {
    name: "Net Zero Innovation Portfolio (NZIP)",
    awardRange: "£500k – £5M",
    matchFunding: "50%",
    deadline: "BEIS rolling programme",
    notes: "Deep decarbonisation technology",
  },
  horizon_cleantech: {
    name: "Horizon Europe CleanTech (LIFE/Climate)",
    awardRange: "€300k – €5M",
    matchFunding: "25%",
    deadline: "Annual work programme",
    notes: "Available to UK-associated country participants post-2024",
  },
  // Agri-tech
  defra_adopt: {
    name: "DEFRA ADOPT Programme",
    awardRange: "£50k – £2M",
    matchFunding: "40%",
    deadline: "Annual call",
    notes: "Agricultural productivity and food chain innovation",
  },
  farming_innovation: {
    name: "Innovate UK Farming Innovation",
    awardRange: "£100k – £1M",
    matchFunding: "30%",
    deadline: "Quarterly competitions",
    notes: "Supports on-farm technology development",
  },
  // Manufacturing / AI / General
  smart_grants: {
    name: "Innovate UK Smart Grants",
    awardRange: "£25k – £2M",
    matchFunding: "30–50%",
    deadline: "Quarterly competitions",
    notes: "Open to all sectors TRL 4–7; highly competitive (5% success rate)",
  },
  eic_accelerator: {
    name: "EIC Accelerator",
    awardRange: "€0.5M – €17.5M",
    matchFunding: "None (grant) or equity-linked",
    deadline: "3 cut-offs per year",
    notes: "For breakthrough innovation TRL 5+; equity component available",
  },
  ktp: {
    name: "Knowledge Transfer Partnership (KTP)",
    awardRange: "£50k – £500k",
    matchFunding: "25–50%",
    deadline: "Rolling applications",
    notes: "Requires university partner; 2-year graduate placement model",
  },
  launchpad: {
    name: "Innovate UK Launchpad",
    awardRange: "£50k – £500k",
    matchFunding: "30%",
    deadline: "Regional competitions",
    notes: "Place-based innovation; check your regional availability",
  },
  // Feasibility / early-stage
  feasibility: {
    name: "Innovate UK Feasibility Studies",
    awardRange: "£25k – £100k",
    matchFunding: "30%",
    deadline: "Rolling",
    notes: "TRL 1–4; lower match funding requirements; faster decisions",
  },
  smart_scotland: {
    name: "SMART: SCOTLAND",
    awardRange: "£100k – £500k",
    matchFunding: "25%",
    deadline: "4 rounds per year",
    notes: "Scotland-registered companies only; TRL 1–5",
  },
  pathfinder: {
    name: "Innovate UK Pathfinder",
    awardRange: "£50k – £200k",
    matchFunding: "30%",
    deadline: "Annual competition",
    notes: "Exploratory R&D; early-stage validation",
  },
  // Large company / TRL 8–9
  npif: {
    name: "Northern Powerhouse Investment Fund II",
    awardRange: "£25k – £2M (equity/debt)",
    matchFunding: "Equity or loan (not grant)",
    deadline: "Rolling",
    notes: "North of England companies; combines loan and equity structures",
  },
  // Horizon Europe
  horizon_general: {
    name: "Horizon Europe (EIC/ERC Programmes)",
    awardRange: "€150k – €3.5M",
    matchFunding: "None or minimal",
    deadline: "Annual work programme",
    notes: "UK-associated; collaborative or solo-funded routes available",
  },
  horizon_eurostars: {
    name: "Eurostars 3 Programme",
    awardRange: "€0.5M – €2M",
    matchFunding: "40%",
    deadline: "3 rounds per year",
    notes: "For R&D-intensive SMEs; international consortium required",
  },
  // Enterprise Europe
  een: {
    name: "Enterprise Europe Network",
    awardRange: "Advisory / Partnership",
    matchFunding: "N/A",
    deadline: "Rolling",
    notes: "Free international partnership brokerage across 65+ countries",
  },
  // Manufacturing
  made_smarter: {
    name: "ISCF Made Smarter",
    awardRange: "£50k – £5M",
    matchFunding: "50%",
    deadline: "Check UKRI portal",
    notes: "Industrial digitalisation and manufacturing technology",
  },
  horizon_digital: {
    name: "Horizon Europe Digital (Cluster 4)",
    awardRange: "€500k – €5M",
    matchFunding: "25%",
    deadline: "Annual work programme",
    notes: "AI, cybersecurity, data, and digital manufacturing focus",
  },
};

// ─── Match programmes to profile ─────────────────────────────────────────────
const matchProgrammes = (answers) => {
  const sector = answers.sector?.value;
  const trl = answers.trl?.value;
  const size = answers.company_size?.value;
  const collab = answers.collaboration?.value;
  const deminimis = answers.de_minimis?.value;
  const reg = answers.registration?.value;

  let candidates = [];

  // Sector-based
  const sectorMap = {
    defence: ["dasa", "nato_diana", "smart_grants"],
    healthcare: ["biomedical", "nihr", "health_launchpad"],
    netzero: ["heat_pump", "nzip", "horizon_cleantech"],
    agritech: ["defra_adopt", "farming_innovation", "smart_grants"],
    manufacturing: ["smart_grants", "made_smarter", "eic_accelerator"],
    ai_tech: ["smart_grants", "eic_accelerator", "horizon_digital"],
    other: ["smart_grants", "launchpad", "een"],
  };
  candidates = [...(sectorMap[sector] || sectorMap.other)];

  // TRL adjustments
  if (trl === "trl_1_3") {
    candidates = candidates.filter((p) => !["eic_accelerator", "smart_grants"].includes(p));
    candidates.unshift("feasibility", "smart_scotland", "pathfinder");
  }
  if (trl === "trl_6_7") {
    if (!candidates.includes("eic_accelerator")) candidates.unshift("eic_accelerator");
    if (!candidates.includes("dasa") && sector === "defence") candidates.unshift("dasa");
  }
  if (trl === "trl_8_9") {
    candidates = ["npif", "een", "launchpad"];
  }

  // Collaboration unlocks KTP
  if (collab === "confirmed" && !candidates.includes("ktp")) {
    candidates.unshift("ktp");
  }

  // De minimis exceeded - only GBER / Horizon
  if (deminimis === "exceeded") {
    candidates = candidates.filter((p) =>
      ["horizon_general", "horizon_eurostars", "horizon_cleantech", "eic_accelerator", "horizon_digital"].includes(p)
    );
    if (!candidates.includes("horizon_general")) candidates.push("horizon_general");
  }

  // EU registration - steer to Horizon
  if (reg === "eu") {
    candidates = ["horizon_general", "horizon_eurostars", "horizon_cleantech", "eic_accelerator"];
  }

  // Deduplicate and take top 3
  const unique = [...new Set(candidates)];
  return unique.slice(0, 3).map((key) => PROGRAMME_DB[key]).filter(Boolean);
};

// ─── Identify primary eligibility gap ────────────────────────────────────────
const identifyPrimaryGap = (answers, scores) => {
  const gapDetails = {
    match_funding: {
      label: "Match Funding",
      message:
        "Your assessment indicates you don't yet have full match funding secured. Most grants pay in arrears and cover a maximum of 70% of eligible costs. Unfunded projects are consistently ranked lower by assessors.",
    },
    trl: {
      label: "TRL Readiness",
      message:
        "Your project sits at an early TRL stage. The programmes best matched to your sector typically require further validation. A structured feasibility study could bridge this gap in 3 to 6 months.",
    },
    novelty: {
      label: "Innovation Novelty",
      message:
        "Your solution may be classified as commercial innovation rather than scientific/technical advancement under UKRI criteria. Repositioning the narrative around technological uncertainty could significantly improve your score.",
    },
    collaboration: {
      label: "Consortium Requirement",
      message:
        "Several high-value programmes require academic or industry collaboration. Identifying a university partner or research body could unlock Biomedical Catalyst, KTP, and collaborative Innovate UK competitions.",
    },
    de_minimis: {
      label: "Subsidy Control",
      message:
        "Your de minimis position may restrict access to some programmes. Our team can identify which GBER-exempt and Horizon Europe routes remain fully open to you.",
    },
  };

  // Check match funding
  if (answers.match_funding?.value === "none") return gapDetails.match_funding;
  if (answers.match_funding?.value === "partial") return gapDetails.match_funding;

  // Check novelty
  if (answers.novelty?.value === "commercial") return gapDetails.novelty;

  // Check TRL
  const trl = answers.trl?.value;
  if (trl === "trl_1_3" || trl === "trl_8_9") return gapDetails.trl;

  // Check collaboration
  if (answers.collaboration?.value === "solo") return gapDetails.collaboration;

  // Check de minimis
  if (answers.de_minimis?.value === "exceeded" || answers.de_minimis?.value === "unsure")
    return gapDetails.de_minimis;

  return { label: "Documentation", message: "Your profile is strong. The main area to strengthen is your technical narrative and supporting documentation before submission." };
};

// ─── Main scoring function ────────────────────────────────────────────────────
export const calculateGrantResult = (answers) => {
  let rawScore = 0;
  let hardDisqualify = false;
  let disqualifyReason = null;

  // Q1 Registration
  const reg = answers.registration;
  if (reg) {
    if (reg.hardDisqualify) { hardDisqualify = true; disqualifyReason = "non_uk"; }
    else rawScore += reg.points;
  }

  // Q6 UiD - check early (hard filter)
  const solvency = answers.solvency;
  if (solvency) {
    if (solvency.hardDisqualify) { hardDisqualify = true; disqualifyReason = "uid"; }
    else rawScore += solvency.points;
  }

  if (hardDisqualify) {
    return {
      rawScore: 0,
      fundabilityScore: 0,
      tier: "TIER_4",
      hardDisqualify: true,
      disqualifyReason,
      grantMin: 0,
      grantMax: 0,
      programmes: [],
      primaryGap: null,
      interventionRate: 0.70,
    };
  }

  // Q2 Company Size
  const size = answers.company_size;
  if (size) rawScore += size.points;

  // Q3 TRL
  const trl = answers.trl;
  if (trl) rawScore += trl.points;

  // Q4 Sector
  const sector = answers.sector;
  if (sector) rawScore += sector.points;

  // Q5 Innovation Novelty
  const novelty = answers.novelty;
  if (novelty) rawScore += novelty.points;

  // Q7 Project Cost - no direct score, stored for calculation
  const projectCost = answers.project_cost || 250000;

  // Q8 Match Funding
  const matchFunding = answers.match_funding;
  if (matchFunding) rawScore += matchFunding.points;

  // Q9 De Minimis
  const deminimis = answers.de_minimis;
  if (deminimis) rawScore += deminimis.points;

  // Q10 Collaboration
  const collab = answers.collaboration;
  if (collab) rawScore += collab.points;

  // Total possible: 140 pts (Q1=10 Q2=15 Q3=20 Q4=15 Q5=25 Q6=10 Q8=20 Q9=10 Q10=15)
  const MAX_SCORE = 140;
  const fundabilityScore = Math.round((rawScore / MAX_SCORE) * 100);

  // Determine intervention rate from company size
  const interventionRate = size?.interventionRate || 0.70;

  // Grant range calculation (exact blueprint formulas)
  const conservativeEstimate = Math.round(projectCost * interventionRate * 0.80);
  const optimisticEstimate = Math.round(projectCost * interventionRate);

  // Tier routing
  let tier;
  if (fundabilityScore >= 85) tier = "TIER_1";
  else if (fundabilityScore >= 60) tier = "TIER_2";
  else if (fundabilityScore >= 40) tier = "TIER_3";
  else tier = "TIER_4";

  // Programme matching
  const programmes = matchProgrammes(answers);

  // Primary gap
  const primaryGap = identifyPrimaryGap(answers, rawScore);

  return {
    rawScore,
    fundabilityScore,
    tier,
    hardDisqualify: false,
    disqualifyReason: null,
    grantMin: conservativeEstimate,
    grantMax: optimisticEstimate,
    programmes,
    primaryGap,
    interventionRate,
    flags: {
      amberWarning: novelty?.flag === "amber_warning",
      gberOnly: deminimis?.flag === "gber_only",
      complianceReview: deminimis?.flag === "compliance_review",
      consortiumRequired: size?.flag === "consortium_required",
      horizonNote: reg?.flag === "horizon_europe",
    },
  };
};

// ─── Zoho webhook ─────────────────────────────────────────────────────────────
const toFormEncoded = (obj) =>
  Object.entries(obj)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v ?? "")}`)
    .join("&");

const sendToZoho = (payload) => {
  if (!ZOHO_FLOW_WEBHOOK_URL) {
    console.warn("[Zoho] VITE_ZOHO_WEBHOOK_URL not set - skipping.");
    return;
  }
  const encoded = toFormEncoded(payload);
  if (navigator?.sendBeacon) {
    const blob = new Blob([encoded], { type: "application/x-www-form-urlencoded" });
    const queued = navigator.sendBeacon(ZOHO_FLOW_WEBHOOK_URL, blob);
    if (queued) return;
  }
  const xhr = new XMLHttpRequest();
  xhr.open("POST", ZOHO_FLOW_WEBHOOK_URL, true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.onerror = () => console.warn("[Zoho] XHR failed");
  xhr.send(encoded);
};

// ─── Store + submit ───────────────────────────────────────────────────────────
export const storeGrantData = async (answers, contactInfo, resultData) => {
  const data = {
    answers,
    contactInfo,
    result: resultData,
    timestamp: new Date().toISOString(),
  };
  localStorage.setItem("grantEligibilityAssessment", JSON.stringify(data));

  const leadStatus = {
    TIER_1: "Hot Lead",
    TIER_2: "Warm Lead",
    TIER_3: "Nurture",
    TIER_4: "Disqualified",
  }[resultData.tier];

  const payload = {
    first_name: contactInfo.firstName || "",
    last_name: contactInfo.lastName || "",
    company_name: contactInfo.company || "",
    email: contactInfo.email || "",
    phone: contactInfo.phone || "",
    lead_source: "Grant Eligibility Tool",
    lead_status: leadStatus,
    uk_registered: answers.registration?.value || "",
    company_size: answers.company_size?.value || "",
    trl_stage: answers.trl?.value || "",
    primary_sector: answers.sector?.value || "",
    innovation_type: answers.novelty?.value || "",
    uid_status: answers.solvency?.value || "",
    project_cost_estimate: answers.project_cost || 0,
    match_funding_status: answers.match_funding?.value || "",
    de_minimis_flag: answers.de_minimis?.value || "",
    collaboration_status: answers.collaboration?.value || "",
    fundability_score: resultData.fundabilityScore,
    grant_estimate_min: resultData.grantMin,
    grant_estimate_max: resultData.grantMax,
    top_programme_1: resultData.programmes[0]?.name || "",
    top_programme_2: resultData.programmes[1]?.name || "",
    top_programme_3: resultData.programmes[2]?.name || "",
    primary_gap: resultData.primaryGap?.label || "",
    tier_routing: resultData.tier,
    assessment_date: new Date().toISOString(),
    source: "inventya-grant-eligibility-tool",
  };

  sendToZoho(payload);
  return data;
};

export const getGrantData = () => {
  try {
    return JSON.parse(localStorage.getItem("grantEligibilityAssessment"));
  } catch {
    return null;
  }
};
