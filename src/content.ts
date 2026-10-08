export const PROFILE = {
  name: "Jai Dhingra",
  title: "Independent AI & Automation Contractor",
  headline: "AI agents and automations that run inside your team's tools.",
  location: "Delhi, India",
  email: "jai@jdotai.com",
  linkedin: "https://www.linkedin.com/in/jai-dhingra/",
  linkedinLabel: "linkedin.com/in/jai-dhingra",
  bio: [
    "I build AI agents and automations that run inside the tools a team already uses. My biggest builds: a firm-wide AI workforce on OpenClaw and Kimi models, connected to SharePoint, Outlook, Entra and Teams. MCP connectors that let people query Smokeball and Clio from Claude in plain English. A custom two-way HubSpot and Notion sync that replaced a paid tool. Zoho Recruit agents for candidate screening and outreach. And an AI reel pipeline that goes from research to a rendered video.",
    "I also build CRM integrations for HubSpot, Salesforce, GoHighLevel and Kommo, lead pipelines from Meta Ads, recruitment pipelines in Notion, Power BI reporting inside Teams, and Fireflies to DocuSign contract automation. Law firms are one of the sectors I work with. There my builds saved 10 hours a week on intake and reclaimed 20+ hours a week per firm.",
    "I scope each build from how the team actually works, and I train the people who use it.",
  ],
  experience: [
    { role: "Independent AI & Automation Contractor", org: "Self-employed", when: "Jul 2026 - Present" },
    { role: "AI Automation Specialist", org: "Teams Squared (recruiting agency)", when: "Feb 2025 - Jun 2025" },
    { role: "CRM, Marketing & Automation Head", org: "Epirco Group", when: "Sep 2024 - Feb 2025" },
  ],
  education: { degree: "Business Administration (BBA), specialization in Computer Science", school: "Maharaja Agrasen Institute of Management Studies (MAIMS)", when: "2021 - 2024" },
  howIWork: [
    { step: "Scope", line: "From how the team actually works." },
    { step: "Build", line: "Inside the tools a team already uses." },
    { step: "Train", line: "The people who use it." },
  ],
};

export const FUNCTIONS = [
  { id: "admin", name: "Admin", line: "AI agents for files, email and chat" },
  { id: "sales", name: "Sales", line: "CRMs, lead flow, outreach" },
  { id: "recruitment", name: "Recruitment", line: "Candidate pipelines, screening, FAQs" },
  { id: "marketing", name: "Marketing", line: "Content pipelines, newsletters, reports" },
  { id: "legal", name: "Legal", line: "" },
] as const;
