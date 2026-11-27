export type ChatLink = { label: string; href: string };
export type ChatReply = { text: string; links?: ChatLink[]; suggestions?: string[] };
type Intent = { id: string; keywords: string[]; reply: ChatReply };

/**
 * Curated knowledge base for the site assistant.
 * Answers are matched locally from these intents — no external service is called.
 * Keep answers accurate to the current site copy.
 */

export const GREETING: ChatReply = {
  text: "Hi there — welcome to Global Study Sync. I can help with our services, how the process works, registering a research site, or sponsor and CRO questions. How can I help you today?",
  suggestions: ["What services do you offer?", "I represent a research site", "I'm a sponsor / CRO", "Talk to the team"],
};

export const FALLBACK: ChatReply = {
  text: "I'm not sure I caught that one. I can help with our services, how the process works, registering a research site, or sponsor and CRO questions. For anything study-specific, the team can follow up through the contact form.",
  links: [{ label: "Contact form", href: "/contact" }],
  suggestions: ["What services do you offer?", "I represent a research site", "I'm a sponsor / CRO"],
};

const INTENTS: Intent[] = [
  {
    id: "sites",
    keywords: ["site interest", "register", "registered", "registration", "sign up", "join", "our site", "my site", "for sites", "research site", "clinical research site", "site capabilities", "investigator", "investigators", "add our site", "list our site", "be considered", "site database", "interested in studies"],
    reply: {
      text: "If you're part of a clinical research site or you're an investigator, you can register your site's interest and capabilities. We keep the details you voluntarily share on file and reach out when a relevant study opportunity aligns with your profile. There's no obligation at any point.",
      links: [
        { label: "Register site interest", href: "/for-sites#inquiry-form" },
        { label: "For research sites", href: "/for-sites" },
      ],
      suggestions: ["Is there a cost for sites?", "How does the process work?", "Talk to the team"],
    },
  },
  {
    id: "sponsors",
    keywords: ["sponsor", "sponsors", "cro", "cros", "study opportunity", "study opportunities", "discuss a study", "have a study", "new study", "find sites", "site selection", "longlist", "clinical trial", "clinical trials", "trial", "trials"],
    reply: {
      text: "For sponsors and CROs, we help with preliminary site identification and feasibility coordination in the United States — building a relevant longlist against your study's requirements and organizing early site input for your review. Final site selection and qualification always stay with you.",
      links: [
        { label: "For sponsors & CROs", href: "/for-sponsors" },
        { label: "Discuss a study", href: "/contact?inquiry=sponsor#inquiry-form" },
      ],
      suggestions: ["How does the process work?", "Where do you operate?"],
    },
  },
  {
    id: "services",
    keywords: ["services", "service", "offerings", "what do you do", "what you do", "what do you offer", "site sourcing", "site identification", "feasibility", "feasibility coordination", "sourcing", "what can you help with"],
    reply: {
      text: "We focus on four things: clinical trial site sourcing, feasibility coordination, site and investigator network development, and business development introductions. Think of us as the structured first pass — identifying potentially suitable sites and organizing early information so sponsors and CROs can decide next steps.",
      links: [{ label: "Explore services", href: "/services" }],
      suggestions: ["How does the process work?", "What does it cost?", "I'm a sponsor / CRO"],
    },
  },
  {
    id: "process",
    keywords: ["process", "how it works", "how does it work", "how do you work", "what happens", "next steps", "steps", "workflow", "how long", "timeline"],
    reply: {
      text: "In brief: we review the study's requirements, identify potentially suitable sites and investigators, help coordinate feasibility information, then facilitate introductions where there's a relevant fit. Every engagement starts with a written scope agreed in advance by both sides.",
      links: [
        { label: "See how it works", href: "/#how-it-works" },
        { label: "Our services", href: "/services" },
      ],
      suggestions: ["What does it cost?", "Talk to the team"],
    },
  },
  {
    id: "pricing",
    keywords: ["cost", "costs", "price", "prices", "pricing", "fee", "fees", "how much", "charge", "charges", "compensation", "pay", "payment", "budget", "rate", "rates", "free"],
    reply: {
      text: "There's no fixed rate card. Scope, deliverables, and compensation are agreed in writing before any engagement begins, tailored to the study and the work involved. For research sites, registering interest is free. The best next step is a short conversation about what you need.",
      links: [{ label: "Start a conversation", href: "/contact?inquiry=sponsor#inquiry-form" }],
      suggestions: ["How does the process work?", "What services do you offer?"],
    },
  },
  {
    id: "contact",
    keywords: ["contact", "email", "phone", "call", "speak to", "talk to", "reach", "human", "person", "get in touch", "contact form", "someone", "representative", "follow up"],
    reply: {
      text: "The fastest way to reach a person is the contact form — share a little about your study or your site and it will be routed to the right person. Choose the sponsor inquiry for study-related questions, or site interest if you represent a research site.",
      links: [
        { label: "Contact form", href: "/contact" },
        { label: "Register site interest", href: "/for-sites#inquiry-form" },
      ],
    },
  },
  {
    id: "about",
    keywords: ["about", "who are you", "who is global study sync", "what is global study sync", "company", "team", "background", "experience", "history", "founded", "global study sync"],
    reply: {
      text: "Global Study Sync is an independent clinical research business development and site-sourcing company. We connect research sites with aligned study opportunities and global trial partners, with transparent and honest communication as the baseline.",
      links: [{ label: "About us", href: "/about" }],
      suggestions: ["What services do you offer?"],
    },
  },
  {
    id: "careers",
    keywords: ["career", "careers", "job", "jobs", "hiring", "work for you", "employment", "position", "positions", "vacancy", "vacancies", "apply"],
    reply: {
      text: "We're a small, growing team. Open roles are listed on the careers page, and we're always open to a conversation with people who have clinical research site or business development backgrounds.",
      links: [{ label: "Careers", href: "/careers" }],
    },
  },
  {
    id: "coverage",
    keywords: ["where", "location", "located", "country", "countries", "united states", "usa", "geography", "geographic", "regions", "region", "international", "global", "worldwide", "europe", "canada"],
    reply: {
      text: "Our preliminary site identification and feasibility support currently focuses on the United States. If your study has needs beyond that, it's still worth asking — we'll be straightforward about fit.",
      suggestions: ["I'm a sponsor / CRO"],
    },
  },
  {
    id: "privacy",
    keywords: ["privacy", "data protection", "gdpr", "terms", "policy", "policies", "hipaa", "information handling", "confidential", "confidentiality", "secure", "security", "personal information", "store my data", "delete my data"],
    reply: {
      text: "Information handling is taken seriously: details are collected from public sources or shared voluntarily, stored responsibly, and used only to support relevant study conversations. The privacy policy and terms of use spell out the specifics.",
      links: [
        { label: "Privacy policy", href: "/privacy-policy" },
        { label: "Terms of use", href: "/terms-of-use" },
      ],
    },
  },
  {
    id: "greeting",
    keywords: ["hi", "hello", "hey", "good morning", "good afternoon", "good evening", "greetings", "howdy"],
    reply: {
      text: "Hello! Happy to help. You can ask about our services, how the process works, registering a research site, or anything about Global Study Sync.",
      suggestions: ["What services do you offer?", "How does the process work?", "Talk to the team"],
    },
  },
  {
    id: "thanks",
    keywords: ["thank", "thanks", "thank you", "appreciate", "appreciated", "great", "awesome", "perfect", "helpful", "nice"],
    reply: {
      text: "You're very welcome. If anything else comes up — services, the process, or reaching the team — just ask.",
      suggestions: ["Talk to the team", "What services do you offer?"],
    },
  },
  {
    id: "bye",
    keywords: ["bye", "goodbye", "see you", "see ya", "later", "farewell", "exit", "quit", "cheers"],
    reply: {
      text: "Thanks for stopping by. You can reopen this chat anytime from the button in the corner — take care.",
    },
  },
];

const normalize = (value: string) => value.toLowerCase().replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();

/**
 * Scores every intent by whole-phrase keyword hits (longer phrases weigh more)
 * and returns the best-matching reply, or the fallback.
 */
export function matchIntent(message: string): ChatReply {
  const text = ` ${normalize(message)} `;
  let best: { reply: ChatReply; score: number } | null = null;

  for (const intent of INTENTS) {
    let score = 0;
    for (const keyword of intent.keywords) {
      const needle = normalize(keyword);
      if (needle && text.includes(` ${needle} `)) score += needle.split(" ").length;
    }
    if (score > 0 && (best === null || score > best.score)) best = { reply: intent.reply, score };
  }

  return best?.reply ?? FALLBACK;
}
