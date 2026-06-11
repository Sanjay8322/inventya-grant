// ============================================
// FILE: src/config/assessmentConfig.js
// Exact questions, options, and scoring from the Grant Eligibility Blueprint
// ============================================

export const assessmentConfig = {
  landing: {
    h1: "Find Out Which UK Innovation Grants You Actually Qualify For In 3 Minutes",
    h2: "Innovate UK rejects 98% of Smart Grant applications. Most founders never find out why until it's too late. Our 2026 eligibility engine scans 500+ active grants against your project profile and shows you exactly where you stand before you spend months writing an application.",
    bullets: [
      "Covers Innovate UK, Horizon Europe, DASA, NIHR & 500+ active programmes",
      "Personalised Fundability Score and realistic grant range",
      "Top 3 matched 2026 funding programmes identified instantly",
    ],
    cta: "Check My Eligibility Now (Free, No Account Needed)",
    socialProof: "3,200+ UK businesses assessed | Trusted by Innovate UK Business Growth | Results in under 3 minutes",
  },

  title: "Grant Eligibility & Estimator",

  questions: [
    // Q1 – Business Registration (Hard Filter)
    {
      id: "registration",
      question: "Where is your business officially registered, and where will the core R&D project take place?",
      progressLabel: "Checking geographic eligibility...",
      type: "radio",
      options: [
        {
          label: "United Kingdom (England, Scotland, Wales, or Northern Ireland)",
          value: "uk",
          points: 10,
          hardDisqualify: false,
          flag: null,
        },
        {
          label: "European Union",
          value: "eu",
          points: 5,
          hardDisqualify: false,
          flag: "horizon_europe",
        },
        {
          label: "United States or other",
          value: "other",
          points: 0,
          hardDisqualify: true,
          flag: "non_uk",
        },
      ],
      required: true,
    },

    // Q2 – Company Size
    {
      id: "company_size",
      question: "How many full-time employees does your company currently have?",
      progressLabel: "Setting your funding intervention rate...",
      type: "radio",
      options: [
        {
          label: "1 to 9 (Micro)",
          value: "micro",
          points: 15,
          interventionRate: 0.70,
          sizeLabel: "Micro / Small",
        },
        {
          label: "10 to 49 (Small)",
          value: "small",
          points: 15,
          interventionRate: 0.70,
          sizeLabel: "Micro / Small",
        },
        {
          label: "50 to 249 (Medium)",
          value: "medium",
          points: 10,
          interventionRate: 0.60,
          sizeLabel: "Medium",
        },
        {
          label: "250 or more (Large / Enterprise)",
          value: "large",
          points: 5,
          interventionRate: 0.50,
          sizeLabel: "Large",
          flag: "consortium_required",
        },
      ],
      required: true,
    },

    // Q3 – TRL Stage
    {
      id: "trl",
      question: "Which statement best describes where your technology or product is right now?",
      progressLabel: "Scanning grant stages against your TRL...",
      type: "radio",
      options: [
        {
          label: "We have an idea and basic research, but no prototype yet (TRL 1–3)",
          value: "trl_1_3",
          points: 5,
          trlRange: "TRL 1–3",
          flag: "feasibility_pathfinder",
        },
        {
          label: "We have a proof of concept or completed lab validation (TRL 4–5)",
          value: "trl_4_5",
          points: 15,
          trlRange: "TRL 4–5",
          flag: "smart_grants",
        },
        {
          label: "We have a working prototype tested in a real or simulated environment (TRL 6–7)",
          value: "trl_6_7",
          points: 20,
          trlRange: "TRL 6–7",
          flag: "eic_accelerator",
        },
        {
          label: "Our product is fully developed and commercially deployed - we need scaling capital (TRL 8–9)",
          value: "trl_8_9",
          points: 5,
          trlRange: "TRL 8–9",
          flag: "npif_rdtax",
        },
      ],
      required: true,
    },

    // Q4 – Sector Focus
    {
      id: "sector",
      question: "Which sector will your innovation primarily operate in?",
      progressLabel: "Matching thematic funding pots to your sector...",
      type: "radio",
      options: [
        {
          label: "Defence and Security",
          value: "defence",
          points: 15,
          programmes: ["DASA Innovation Loan", "NATO DIANA", "Innovate UK Smart Grants"],
        },
        {
          label: "Healthcare and Life Sciences",
          value: "healthcare",
          points: 15,
          programmes: ["Biomedical Catalyst", "NIHR i4i Programme", "Innovate UK Health Launchpad"],
        },
        {
          label: "Net Zero and CleanTech",
          value: "netzero",
          points: 15,
          programmes: ["Heat Pump Ready", "NZIP", "Horizon Europe CleanTech"],
        },
        {
          label: "Agri-tech and Food Innovation",
          value: "agritech",
          points: 15,
          programmes: ["DEFRA ADOPT", "Innovate UK Farming Innovation", "Horizon Europe Agrifood"],
        },
        {
          label: "Advanced Manufacturing",
          value: "manufacturing",
          points: 12,
          programmes: ["Innovate UK Smart Grants", "ISCF Made Smarter", "EIC Accelerator"],
        },
        {
          label: "AI, Deep Tech, or General Software",
          value: "ai_tech",
          points: 12,
          programmes: ["Innovate UK Smart Grants", "EIC Accelerator", "Horizon Europe Digital"],
        },
        {
          label: "Other / Cross-sector",
          value: "other",
          points: 8,
          programmes: ["Innovate UK Smart Grants", "Innovate UK Launchpad", "Enterprise Europe Network"],
        },
      ],
      required: true,
    },

    // Q5 – Innovation Novelty
    {
      id: "novelty",
      question: "How does your solution compare to existing alternatives on the global market?",
      progressLabel: "Assessing innovation novelty criteria...",
      type: "radio",
      options: [
        {
          label: "It is a completely new, disruptive technology with genuine patent potential - nothing like it exists at scale",
          value: "disruptive",
          points: 25,
          flag: null,
        },
        {
          label: "It is a significant, measurable scientific or technical improvement over existing approaches",
          value: "significant_improvement",
          points: 15,
          flag: null,
        },
        {
          label: "It is a commercial improvement, a software upgrade, or a standard process optimisation",
          value: "commercial",
          points: 0,
          flag: "amber_warning",
        },
      ],
      required: true,
    },

    // Q6 – Financial Solvency / UiD Check
    {
      id: "solvency",
      question: "For regulatory compliance: if your company has been trading for more than 3 years, have your accumulated losses exceeded more than half of your subscribed share capital?",
      progressLabel: "Running regulatory eligibility check...",
      type: "radio",
      options: [
        {
          label: "Yes",
          value: "uid_yes",
          points: 0,
          hardDisqualify: true,
          flag: "uid_disqualified",
        },
        {
          label: "No",
          value: "uid_no",
          points: 10,
          hardDisqualify: false,
          flag: null,
        },
        {
          label: "We have been trading for less than 3 years",
          value: "uid_na",
          points: 10,
          hardDisqualify: false,
          flag: null,
        },
      ],
      required: true,
    },

    // Q7 – Estimated Project Cost (slider)
    {
      id: "project_cost",
      question: "What is the estimated total cost of this specific R&D or innovation project over its full duration (typically 12 to 24 months)?",
      progressLabel: "Calculating your funding estimate range...",
      type: "slider",
      min: 25000,
      max: 5000000,
      step: 25000,
      defaultVal: 250000,
      required: true,
    },

    // Q8 – Match Funding Capability
    {
      id: "match_funding",
      question: "Innovation grants typically cover 30% to 70% of project costs and pay in arrears. Do you currently have access to match funding to cover the remainder?",
      progressLabel: "Checking commercial readiness...",
      type: "radio",
      options: [
        {
          label: "Yes - fully secured via cash reserves, revenue, or committed private investment",
          value: "secured",
          points: 20,
          flag: null,
        },
        {
          label: "Partially - we are in the process of raising or have some reserves",
          value: "partial",
          points: 10,
          flag: null,
        },
        {
          label: "No - we are relying entirely on the grant to proceed",
          value: "none",
          points: 0,
          flag: "match_funding_gap",
        },
      ],
      required: true,
    },

    // Q9 – De Minimis / Subsidy Control Check
    {
      id: "de_minimis",
      question: "Over the last 3 rolling fiscal years, has your company received more than £255,000 (approximately €300,000) in public funding, grants, or state aid?",
      progressLabel: "Verifying subsidy control position...",
      type: "radio",
      options: [
        {
          label: "Yes",
          value: "exceeded",
          points: 0,
          flag: "gber_only",
        },
        {
          label: "No",
          value: "within_limit",
          points: 10,
          flag: null,
        },
        {
          label: "Unsure",
          value: "unsure",
          points: 5,
          flag: "compliance_review",
        },
      ],
      required: true,
    },

    // Q10 – Collaboration and Team Capability
    {
      id: "collaboration",
      question: "Do you have an academic institution, research body, or industry partner willing to collaborate on this project?",
      progressLabel: "Finalising your grant match profile...",
      type: "radio",
      options: [
        {
          label: "Yes - we have confirmed collaborative partners already",
          value: "confirmed",
          points: 15,
          flag: "ktp_collaborative",
        },
        {
          label: "We are open to it but have not yet identified partners",
          value: "open",
          points: 8,
          flag: null,
        },
        {
          label: "No - this is a solo company project",
          value: "solo",
          points: 3,
          flag: "consortium_note",
        },
      ],
      required: true,
    },
  ],

  outcomes: {
    result: { route: "/results" },
  },
};
