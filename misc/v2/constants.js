// ── Design Tokens ──
export const COLORS = {
  bg: '#F8F7F4',
  surface: '#FFFFFF',
  surfaceRaised: '#F2F0EB',
  border: '#E4E2DD',
  borderLight: '#EDECEA',
  text: '#0A0A0B',
  textSecondary: '#2D2D30',
  textMuted: '#5A5A5F',
  textFaint: '#8A8A8F',
  accent: '#1A5CFF',
  accentLight: '#EEF3FF',
  green: '#0D9F4F',
  greenBg: '#EDFCF2',
  red: '#DC2626',
  redBg: '#FEF2F2',
  orange: '#C27803',
  orangeBg: '#FFFBEB',
  purple: '#7C3AED',
  purpleBg: '#F5F3FF',
};

// ── Free tier key (Gemini Flash) ──
export const GEMINI_FREE_KEY = 'AIzaSyAhmUREFqKjnZDmlXxkGY0c-79Xf8OuFMM';

// ── Premium API (backend proxy) ──
export const PREMIUM_API_URL = 'https://api.pdfsummary.app/analyze';

// ── Tiers ──
export const TIERS = {
  free: {
    name: 'Free',
    model: 'Gemini Flash',
    tokensPerDay: 50000,
    price: '$0',
    features: ['5 documents per session', 'General analysis', '.docx & .pptx export'],
  },
  pro: {
    name: 'Pro',
    model: 'Gemini Pro',
    tokensPerDay: 200000,
    price: '$9/mo',
    features: ['Unlimited documents', 'All analysis templates', 'Priority processing'],
  },
  enterprise: {
    name: 'Enterprise',
    model: 'Claude Opus',
    tokensPerDay: 500000,
    price: '$25/mo',
    features: ['Claude Opus intelligence', 'Batch processing', 'API access', 'Custom templates'],
  },
};

// ── Rate limits ──
export const LIMITS = {
  gemini: { tpm: 220000, wait: 12000, name: 'Gemini' },
  claude: { tpm: 25000, wait: 65000, name: 'Claude' },
};

// ═══════════════════════════════════════════════════════════════════
// ANALYSIS TEMPLATES — The real competitive edge
// Each template produces domain-specific structured output.
// This is what makes PDF Summary different from generic summarizers.
// ═══════════════════════════════════════════════════════════════════

export const TEMPLATES = {
  general: {
    name: 'General Analysis',
    icon: '📄',
    description: 'Structured briefing for any document type',
    tier: 'free',
  },
  financial: {
    name: 'Financial Report',
    icon: '📊',
    description: 'Earnings, metrics, risk factors, outlook',
    tier: 'pro',
  },
  legal: {
    name: 'Legal Review',
    icon: '⚖️',
    description: 'Clauses, obligations, risks, deadlines',
    tier: 'pro',
  },
  academic: {
    name: 'Research Paper',
    icon: '🎓',
    description: 'Methodology, findings, limitations, implications',
    tier: 'free',
  },
  medical: {
    name: 'Medical/Clinical',
    icon: '🏥',
    description: 'Findings, protocols, outcomes, recommendations',
    tier: 'pro',
  },
  executive: {
    name: 'Executive Briefing',
    icon: '🏢',
    description: 'Decision-ready summary for leadership',
    tier: 'pro',
  },
};

// ── System prompts by template ──

export const TEMPLATE_PROMPTS = {
  general: `You are a senior analyst. Analyze these documents and produce a structured briefing as JSON.
RULES:
- 3-6 themes max, ordered by strength of evidence
- Each analysis: 2-3 paragraphs (8-12 sentences). Include specific data, names, dates, and context.
- Max 3 stats per theme. Keep stat values SHORT (e.g. "50%" not "50% increase"). Detail goes in label.
- Commonalities: 2-3 sentences each. Identify consensus AND contradictions.
- Watch list: 4-5 items, 1-2 sentence detail each. Focus on forward-looking risks and opportunities.
- Executive summary: 2 paragraphs. Lead with the strongest finding.
- Closing: 1-2 paragraphs. Note gaps or limitations in the source material.
- Total JSON under 14000 characters.
Respond ONLY with valid JSON. No markdown, no backticks, no text outside the JSON.
{"title":"string","subtitle":"string","date_range":"string","executive_summary":"string","themes":[{"title":"string","analysis":"string","stats":[{"value":"SHORT","label":"string"}],"sources":["string"],"watch_this":"string"}],"commonalities":["string"],"watch_list":[{"item":"string","detail":"string"}],"closing":"string"}`,

  financial: `You are a financial analyst. Analyze these financial documents and produce a structured report as JSON.
RULES:
- Extract all quantitative metrics: revenue, margins, growth rates, ratios, guidance figures.
- Identify 3-5 financial themes (e.g., "Revenue acceleration", "Margin pressure", "Capital allocation shift").
- Each theme must cite specific numbers from the documents. Compare YoY, QoQ where data allows.
- Flag risk factors with severity: high/medium/low.
- Include forward guidance and management commentary if present.
- Note any restatements, non-GAAP adjustments, or unusual items.
- Watch list should focus on material risks and upcoming catalysts.
- Total JSON under 14000 characters.
Respond ONLY with valid JSON.
{"title":"string","subtitle":"string","date_range":"string","executive_summary":"string","themes":[{"title":"string","analysis":"string","stats":[{"value":"SHORT","label":"string"}],"sources":["string"],"watch_this":"string","severity":"high|medium|low"}],"key_metrics":[{"metric":"string","value":"string","change":"string","context":"string"}],"risk_factors":[{"risk":"string","severity":"high|medium|low","detail":"string"}],"watch_list":[{"item":"string","detail":"string","timeline":"string"}],"closing":"string"}`,

  legal: `You are a legal analyst. Review these legal documents and produce a structured analysis as JSON.
RULES:
- Identify all parties, their roles, and key obligations.
- Extract critical clauses: liability limits, termination conditions, IP ownership, confidentiality, indemnification.
- Flag any unusual or potentially problematic terms.
- Note all deadlines, notice periods, and renewal dates.
- Identify governing law and dispute resolution mechanisms.
- Compare terms across documents if multiple are provided.
- Highlight areas that may need legal counsel attention.
- Total JSON under 14000 characters.
Respond ONLY with valid JSON.
{"title":"string","subtitle":"string","parties":[{"name":"string","role":"string"}],"executive_summary":"string","key_clauses":[{"title":"string","analysis":"string","section_ref":"string","risk_level":"high|medium|low","action_needed":"string"}],"obligations":[{"party":"string","obligation":"string","deadline":"string"}],"flags":[{"item":"string","detail":"string","severity":"high|medium|low"}],"deadlines":[{"date":"string","description":"string","party":"string"}],"watch_list":[{"item":"string","detail":"string"}],"closing":"string"}`,

  academic: `You are a research analyst. Analyze these academic papers and produce a structured review as JSON.
RULES:
- Identify research questions, hypotheses, and methodology.
- Summarize key findings with specific data points and statistical significance.
- Note sample sizes, study design, and any methodological limitations.
- Identify how findings relate to prior work cited in the papers.
- Flag limitations the authors acknowledge and any you observe.
- Assess practical implications of the findings.
- If multiple papers, identify areas of agreement and disagreement.
- Total JSON under 14000 characters.
Respond ONLY with valid JSON.
{"title":"string","subtitle":"string","executive_summary":"string","papers":[{"title":"string","authors":"string","methodology":"string","key_findings":"string","sample":"string","significance":"string"}],"themes":[{"title":"string","analysis":"string","stats":[{"value":"SHORT","label":"string"}],"evidence_strength":"strong|moderate|weak"}],"limitations":["string"],"implications":[{"domain":"string","implication":"string"}],"gaps":["string"],"closing":"string"}`,

  medical: `You are a medical document analyst. Analyze these clinical/medical documents and produce a structured review as JSON.
RULES:
- Extract clinical findings, diagnoses, test results, and measurements.
- Identify treatment protocols, medications, dosages, and outcomes.
- Note any contraindications, adverse events, or safety signals.
- Track patient outcomes and progress indicators where available.
- Flag items requiring follow-up or clinical attention.
- Use precise medical terminology but include plain-language explanations.
- Compare across documents if multiple are provided.
- Total JSON under 14000 characters.
NOTE: This is document analysis only. Not medical advice.
Respond ONLY with valid JSON.
{"title":"string","subtitle":"string","disclaimer":"This analysis is for informational purposes only and does not constitute medical advice.","executive_summary":"string","findings":[{"title":"string","analysis":"string","stats":[{"value":"SHORT","label":"string"}],"clinical_significance":"string"}],"protocols":[{"treatment":"string","detail":"string","status":"string"}],"follow_ups":[{"item":"string","priority":"high|medium|low","detail":"string"}],"watch_list":[{"item":"string","detail":"string"}],"closing":"string"}`,

  executive: `You are an executive briefing specialist. Distill these documents into a decision-ready briefing as JSON.
RULES:
- Lead with the single most important takeaway. What does the reader NEED to know?
- Structure around decisions: what needs to be decided, by whom, and by when.
- Every theme should end with a clear recommendation or action item.
- Quantify everything possible. Executives want numbers, not generalities.
- Keep language direct and jargon-free. Assume the reader has 3 minutes.
- Flag items by urgency: immediate / this quarter / strategic.
- Include competitive context where relevant.
- Total JSON under 14000 characters.
Respond ONLY with valid JSON.
{"title":"string","subtitle":"string","bottom_line":"string","executive_summary":"string","decisions_needed":[{"decision":"string","owner":"string","deadline":"string","recommendation":"string","urgency":"immediate|this_quarter|strategic"}],"themes":[{"title":"string","analysis":"string","stats":[{"value":"SHORT","label":"string"}],"action":"string"}],"risks":[{"risk":"string","impact":"high|medium|low","mitigation":"string"}],"next_steps":[{"step":"string","owner":"string","timeline":"string"}],"closing":"string"}`,
};

// ── Fallback to general for any template ──
export function getPromptForTemplate(templateKey) {
  return TEMPLATE_PROMPTS[templateKey] || TEMPLATE_PROMPTS.general;
}

export function isTemplateLocked(templateKey, currentTier) {
  const template = TEMPLATES[templateKey];
  if (!template) return false;
  if (template.tier === 'free') return false;
  if (template.tier === 'pro' && (currentTier === 'pro' || currentTier === 'enterprise')) return false;
  if (template.tier === 'enterprise' && currentTier === 'enterprise') return false;
  return true;
}

// ── Legacy prompt exports (backward compat) ──
export const ANALYSIS_PROMPT = TEMPLATE_PROMPTS.general;

export const SUMMARIZE_PROMPT = `Summarize the key themes, data, and insights from this document. 500-800 words. Plain text only.`;

export const THEME_COLORS = ['#1A5CFF','#7C3AED','#0D9F4F','#C27803','#DC2626','#2D2D30','#E31B54','#0BA5EC'];
