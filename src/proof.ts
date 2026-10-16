// Extra proof shown on each build page, on top of the fields in data.ts.
// Every value restates what Jai has confirmed (data.ts copy, resume, published write-ups, chat answers).
// Leave a field out rather than guess: missing fields simply don't render.

export type ToolUse = { tool: string; setup: string; effect: string };
export type Snapshot = { business?: string; stack?: string; period?: string };
export type Proof = { snapshot?: Snapshot; feature?: string; toolUses?: ToolUse[]; tags?: string[] };

const TS = "Feb 2025 to Jun 2026";
const AGENCY = "Recruiting agency";
const M365 = "Microsoft 365 tenant";
const LAW = "Jul 2026 onward";

// OpenClaw rows, shared by the workforce page and its five detail pages
const OC = {
  openclaw: { tool: "OpenClaw", setup: "Deployed across the whole agency as a workforce of AI employees.", effect: "Every team has the same agents instead of each person relying on their own AI tools." },
  kimi: { tool: "Kimi", setup: "Set as the model the AI workforce runs on.", effect: "One model for every agent across the agency." },
  sharepoint: { tool: "SharePoint", setup: "Connected so agents can search and read the agency's file libraries.", effect: "Staff ask for a document in plain language instead of digging through folders, and answers come from the agency's own files." },
  outlook: { tool: "Outlook", setup: "Connected so agents read client email threads and draft replies.", effect: "A first draft is waiting for each client email, and a person still approves what goes out." },
  entra: { tool: "Microsoft Entra", setup: "Registered the app and set Microsoft Graph permissions, so each agent only reaches the files and mail its permissions allow.", effect: "AI access follows the same rules as staff, so the agency could roll it out without opening up sensitive data." },
  teams: { tool: "Microsoft Teams", setup: "Connected as the chat interface: staff message an agent and the reply posts in the same thread.", effect: "Nobody had to learn a new app, which drove adoption." },
  training: { tool: "Staff training", setup: "Ran hands-on sessions per team with example requests that fit their work.", effect: "The rollout got used rather than ignored." },
};
const OC_SNAP: Snapshot = { business: AGENCY, stack: M365, period: TS };
const OC_TAGS = ["Firm-wide AI rollout", "Microsoft Graph permissions", "Entra app registration", "Teams chat agents", "SharePoint document search", "Outlook draft replies", "Role-based AI access"];

export const PROOF: Record<string, Proof> = {
  // ---------- Admin ----------
  "openclaw-firmwide-workforce": {
    snapshot: OC_SNAP,
    feature: "AI employees every team can use inside Teams, reading SharePoint files and Outlook email only within the access Entra grants them.",
    toolUses: [OC.openclaw, OC.kimi, OC.sharepoint, OC.outlook, OC.entra, OC.teams, OC.training],
    tags: OC_TAGS,
  },
  "sharepoint-integration": {
    snapshot: OC_SNAP,
    feature: "Agents that find and work from the agency's SharePoint files on request.",
    toolUses: [OC.sharepoint, OC.entra, OC.openclaw],
    tags: ["SharePoint document search", "Microsoft Graph permissions", "Grounded answers from company files"],
  },
  "outlook-integration": {
    snapshot: OC_SNAP,
    feature: "Draft replies to client email in Outlook, with a person approving every send.",
    toolUses: [OC.outlook, OC.entra, OC.openclaw],
    tags: ["Outlook draft replies", "Human approval before send", "Microsoft Graph permissions"],
  },
  "entra-permissions": {
    snapshot: OC_SNAP,
    feature: "Access limits for AI agents, so each one only sees what its permissions allow.",
    toolUses: [OC.entra, { tool: "OpenClaw", setup: "Agents run inside the scope Entra grants for each request.", effect: "A refused request stays refused, whichever agent asks." }],
    tags: ["Entra app registration", "Microsoft Graph permissions", "Role-based AI access", "AI governance"],
  },
  "teams-internal-chat": {
    snapshot: OC_SNAP,
    feature: "The AI workforce available in Microsoft Teams chat, where staff already work.",
    toolUses: [OC.teams, OC.openclaw],
    tags: ["Teams chat agents", "Adoption by design"],
  },
  "openclaw-staff-training": {
    snapshot: OC_SNAP,
    feature: "Staff who know what to ask the AI agents for, team by team.",
    toolUses: [OC.training, { tool: "Microsoft Teams", setup: "Training used the same Teams chat staff use every day.", effect: "People practised in the tool they would actually use." }],
    tags: ["AI adoption training", "Change management"],
  },

  // ---------- Sales ----------
  "hubspot-notion-two-way-sync": {
    snapshot: { business: AGENCY, stack: "HubSpot and Notion", period: TS },
    feature: "Records kept in step both ways between HubSpot and Notion, without a paid sync tool.",
    toolUses: [
      { tool: "HubSpot", setup: "Changes in HubSpot records are picked up and pushed to Notion.", effect: "Sales data in HubSpot stays current in Notion." },
      { tool: "Notion", setup: "Changes in Notion are written back to HubSpot.", effect: "Teams working in Notion don't fall out of step with the CRM." },
      { tool: "Custom sync", setup: "Built the two-way sync myself in place of a paid connector.", effect: "Removed the paid tool and its recurring cost. Still in active use." },
    ],
    tags: ["Two-way CRM sync", "HubSpot API", "Notion API", "Replaced a paid SaaS tool"],
  },
  "linkedin-email-pipelines": {
    snapshot: { business: "Own outbound" },
    feature: "Cold email shaped by each prospect's LinkedIn profile.",
    toolUses: [
      { tool: "LinkedIn data", setup: "Each prospect's profile is read before writing.", effect: "Messages reference who the prospect actually is." },
      { tool: "Email pipelines", setup: "The personalised message is sent through the pipeline.", effect: "More relevant outreach and more replies worth having." },
    ],
    tags: ["Personalised cold email", "Prospect enrichment"],
  },
  "apollo-outbound-engine": {
    snapshot: { business: "Own outbound", stack: "Apollo.io and Gmail" },
    feature: "Outbound to law firms and legal tech that runs Monday to Friday without daily manual work.",
    toolUses: [
      { tool: "Apollo.io", setup: "Built the prospect list around an ideal client profile of law firms and legal tech.", effect: "Outreach goes to the right firms." },
      { tool: "Gmail", setup: "Follow-up drafts sit under day labels.", effect: "Each day's follow-ups are ready and easy to check." },
      { tool: "Scheduled follow-ups", setup: "Five scheduled tasks send the drafts, one per weekday.", effect: "Steady follow-up with no daily effort." },
    ],
    tags: ["ICP definition", "Apollo sequences", "Scheduled sends"],
  },
  "hubspot-meta-ads-lead-flow": {
    feature: "Meta ad leads land in HubSpot and move through the sales pipeline on their own.",
    toolUses: [
      { tool: "Meta Ads", setup: "Connected the lead source to HubSpot.", effect: "No copying leads by hand." },
      { tool: "HubSpot", setup: "Built the pipelines that move each lead through the sales process.", effect: "No lost leads, and sales reaches people while they still remember the ad." },
    ],
    tags: ["Lead capture", "HubSpot pipelines", "Meta Lead Ads"],
  },
  "hubspot-crm-integration": {
    snapshot: { business: "Epirco Group clients", stack: "HubSpot", period: "Sep 2024 to Feb 2025" },
    feature: "CRMs set up around how each client sells, including migrations into HubSpot.",
    toolUses: [
      { tool: "HubSpot", setup: "Built CRMs from scratch and migrated several client systems in. Customised properties and funnels per client.", effect: "One place for every deal." },
      { tool: "Workflows", setup: "Built HubSpot workflows per client.", effect: "Follow-ups trigger themselves." },
      { tool: "API integrations", setup: "Connected HubSpot to other platforms and fixed data flow issues.", effect: "Records stay accurate across systems." },
    ],
    tags: ["CRM migration", "HubSpot workflows", "CRM onboarding and support"],
  },
  "salesforce-integration": {
    feature: "Salesforce connected to the client's other systems.",
    toolUses: [{ tool: "Salesforce", setup: "Built the integration between Salesforce and the client's other systems.", effect: "Less double entry and fewer mismatched records." }],
    tags: ["Salesforce integration", "REST APIs"],
  },
  "gohighlevel-integration": {
    feature: "GoHighLevel connected to the client's other systems.",
    toolUses: [{ tool: "GoHighLevel", setup: "Built the integration between GoHighLevel and the client's other systems.", effect: "The team works from one up-to-date contact list." }],
    tags: ["GoHighLevel integration", "REST APIs"],
  },
  "kommo-crm-integration": {
    feature: "Kommo connected to the client's other systems.",
    toolUses: [
      { tool: "Kommo CRM", setup: "Built the integration between Kommo and the client's other systems.", effect: "Lead data matches across tools." },
      { tool: "Kommo workflows", setup: "Used Kommo workflows to move leads along.", effect: "Leads keep moving without someone babysitting the CRM." },
    ],
    tags: ["Kommo integration", "CRM workflows"],
  },

  // ---------- Recruitment ----------
  "zoho-recruit-integration": {
    snapshot: { business: AGENCY, stack: "Zoho Recruit", period: TS },
    feature: "Candidate screening and outreach handled by agents inside Zoho Recruit.",
    toolUses: [
      { tool: "Zoho Recruit", setup: "Integrated and built automations on candidate records.", effect: "Candidates move through screening without manual sorting." },
      { tool: "AI agents", setup: "Built agents that screen candidates and draft outreach for a recruiter to review.", effect: "Recruiters spend their time on the strongest candidates." },
    ],
    tags: ["ATS automation", "Candidate screening agent", "Recruitment outreach"],
  },
  "candidate-pipeline-notion": {
    feature: "One candidate list in Notion, built from Gmail, Notion and Excel sheets.",
    toolUses: [
      { tool: "Gmail", setup: "Pulled candidate data from email.", effect: "Candidates who only existed in an inbox are on the list." },
      { tool: "Excel sheets", setup: "Pulled candidate data from spreadsheets.", effect: "No side lists." },
      { tool: "Notion", setup: "Merged all three into a single list and designed several pipeline layouts.", effect: "Everyone sees the same pipeline, and nobody falls through the gaps." },
    ],
    tags: ["Data consolidation", "Notion pipelines", "Recruitment ops"],
  },
  "recruitment-faq-chatbot": {
    feature: "Instant answers to common recruitment questions, with a hand-off when needed.",
    toolUses: [
      { tool: "AI chatbot", setup: "Built the chatbot that answers candidates.", effect: "Candidates get answers at any hour." },
      { tool: "Knowledge base", setup: "The chatbot answers from the firm's own answers.", effect: "Recruiters get time back from repeat questions." },
    ],
    tags: ["Recruitment chatbot", "FAQ automation"],
  },

  // ---------- Marketing ----------
  "sherlock-reel-pipeline": {
    snapshot: { business: "Own Instagram account, sherlock_teaches_ai" },
    feature: "A reel that goes from topic to rendered video and caption in one pipeline.",
    toolUses: [
      { tool: "Claude", setup: "Runs the research and writes the script in Sherlock Holmes' voice, then the caption.", effect: "No separate writer needed." },
      { tool: "HyperFrames", setup: "Builds and renders the video.", effect: "Video editing is part of the pipeline." },
      { tool: "Voiceover and SFX", setup: "Records the voiceover and adds click sounds.", effect: "Finished audio without a studio." },
      { tool: "Instagram", setup: "Each reel is published with its caption.", effect: "Regular reels without a production team." },
    ],
    tags: ["Content pipeline", "AI video", "Agent orchestration"],
  },
  "sherlock-image-generation": {
    snapshot: { business: "Own Instagram account, sherlock_teaches_ai" },
    feature: "Scene visuals generated to match each script.",
    toolUses: [
      { tool: "ChatGPT image model", setup: "Writes a prompt per scene and generates the image.", effect: "Every reel gets visuals that fit what is being said." },
      { tool: "Sherlock pipeline", setup: "Images are placed in the reel as part of the build.", effect: "No separate design step." },
    ],
    tags: ["Image generation", "OpenAI API"],
  },
  "hubspot-newsletter-system": {
    feature: "Newsletters to the firm's client list, sent from HubSpot.",
    toolUses: [{ tool: "HubSpot", setup: "Built the newsletter email system on the firm's HubSpot audience.", effect: "The firm stays in front of its clients on a steady rhythm." }],
    tags: ["Email marketing", "HubSpot Marketing Hub"],
  },
  "powerbi-teams-reporting": {
    snapshot: { stack: "Power BI, Microsoft Teams, Kimi" },
    feature: "The firm's numbers delivered to staff inside Microsoft Teams.",
    toolUses: [
      { tool: "Power BI", setup: "Built the dashboards and reports.", effect: "Decisions come from current numbers, not last month's spreadsheet." },
      { tool: "Image generation", setup: "Generated report images where a chart was not enough.", effect: "Reports read well in chat." },
      { tool: "Microsoft Teams", setup: "Reports post into the firm's Teams tool.", effect: "Staff see them where they already work." },
      { tool: "Kimi", setup: "The Teams tool runs on Kimi models.", effect: "Staff can ask about the numbers in chat." },
    ],
    tags: ["Power BI", "Reporting in Teams", "Microsoft 365"],
  },

  // ---------- Legal ----------
  "client-intake-smokeball": {
    snapshot: { business: "Estate planning law firm", stack: "Smokeball", period: LAW },
    feature: "Client intake that creates a pre-filled Smokeball matter, with a live completion dashboard.",
    toolUses: [
      { tool: "Custom web form", setup: "Built an intake form for wills, trusts, beneficiaries, documents and assets, with progress saved as clients go.", effect: "33% of intakes complete with no staff reminder." },
      { tool: "Smokeball API", setup: "Each submission creates a pre-filled matter.", effect: "Matters open 5 days faster." },
      { tool: "Live dashboard", setup: "Shows every submission and how complete it is.", effect: "10 hours a week saved on intake follow-up." },
    ],
    tags: ["Smokeball API", "Client intake", "Live dashboard"],
  },
  "deadline-tracker": {
    snapshot: { business: "Criminal defense law firm", stack: "Smokeball", period: LAW },
    feature: "Every court and filing date synced to the firm's calendar daily, with changes flagged.",
    toolUses: [
      { tool: "Scheduled agent", setup: "Reads every active matter in Smokeball once a day.", effect: "Nobody tracks dates from memory." },
      { tool: "Smokeball API", setup: "Pulls each deadline, filing date and court date.", effect: "99% of deadlines synced the same day." },
      { tool: "Calendar sync", setup: "Writes dates to the firm's calendar and flags anything added or changed.", effect: "2+ hours a week saved on manual entry." },
    ],
    tags: ["Smokeball API", "Calendar sync", "Scheduled agent"],
  },
  "pre-meeting-brief-agent": {
    snapshot: { business: "Estate planning law firm", stack: "Smokeball and Claude", period: LAW },
    feature: "A five-minute brief before each client meeting, checked against the firm's SOPs.",
    toolUses: [
      { tool: "Smokeball API", setup: "Reads the full matter and every submitted intake document.", effect: "The agent works from the real file." },
      { tool: "Firm SOPs", setup: "Checks the matter against the firm's estate planning SOPs.", effect: "The brief lists what the client still owes." },
      { tool: "Claude", setup: "Writes the brief and what to cover on the call. Built in 3 days.", effect: "30+ minutes of prep saved per meeting." },
    ],
    tags: ["Document review agent", "Smokeball API", "Anthropic API"],
  },
  "smokeball-mcp-connector": {
    snapshot: { business: "Two law firms", stack: "Smokeball and Claude", period: LAW },
    feature: "Plain-English questions about Smokeball matters, answered inside Claude.",
    toolUses: [
      { tool: "MCP", setup: "Built the MCP server that links Smokeball to Claude.", effect: "Attorneys use the Claude account they already have." },
      { tool: "Smokeball API", setup: "The connector queries Smokeball live for each question.", effect: "10 seconds per query, versus 5 minutes in the PMS." },
      { tool: "Python", setup: "Wrote the connector.", effect: "2+ hours a week saved, at 2 firms." },
    ],
    tags: ["MCP server", "Smokeball API", "Claude integration", "Python"],
  },
  "clio-mcp-connector": {
    snapshot: { stack: "Clio and Claude", period: LAW },
    feature: "Plain-English questions about Clio matters, documents, deadlines and clients, answered inside Claude.",
    toolUses: [
      { tool: "MCP", setup: "Built a second MCP server on the same pattern as the Smokeball one.", effect: "Same workflow for firms on Clio." },
      { tool: "Clio API", setup: "Queries matters, documents, deadlines and client details live.", effect: "Attorneys get matter details in seconds and stay on the work." },
      { tool: "Python (FastMCP)", setup: "Wrote the connector with FastMCP.", effect: "Same Python pattern as the Smokeball connector." },
    ],
    tags: ["MCP server", "Clio API", "Claude integration", "Python"],
  },
  "client-reengagement-agent": {
    snapshot: { business: "Real estate law firm", stack: "Smokeball and Claude", period: LAW },
    feature: "Closed matters scanned for clients worth contacting again, with drafted emails an attorney approves.",
    toolUses: [
      { tool: "Smokeball API", setup: "Scans closed matters for expired documents and lapsed reviews.", effect: "20 closed matters flagged in the first scan." },
      { tool: "Claude", setup: "Drafts a personalised email per client from matter context.", effect: "$10k+ recovered or new revenue." },
      { tool: "Email drafting", setup: "An attorney reviews and sends each one.", effect: "5+ hours a week saved on manual review." },
    ],
    tags: ["Revenue recovery agent", "Smokeball API", "Human approval before send"],
  },
  "enquiry-qualification-booking": {
    snapshot: { business: "Two law firms", stack: "Make.com", period: LAW },
    feature: "Every contact form qualified and answered within minutes, with a consult slot offered.",
    toolUses: [
      { tool: "Make.com", setup: "Runs the moment a form arrives and qualifies on practice area, matter type and urgency.", effect: "First response in 5 minutes, down from 5 hours." },
      { tool: "Email", setup: "Sends a personalised welcome email and follow-up.", effect: "No enquiry sits in an inbox." },
      { tool: "Calendar booking", setup: "Offers a consult slot with the right attorney.", effect: "20% more enquiries turn into consults." },
    ],
    tags: ["Lead qualification", "Consult booking", "Make.com"],
  },
  "custom-workflow-automations": {
    snapshot: { business: "Four law firms", stack: "Smokeball and Make.com", period: LAW },
    feature: "New matter setup, billing prep and document checklists automated per firm.",
    toolUses: [
      { tool: "Make.com", setup: "Mapped each undocumented process step by step and built it.", effect: "Each one live within a week per firm." },
      { tool: "Smokeball API", setup: "All four firms' automations connect to Smokeball.", effect: "20+ hours a week reclaimed per firm." },
      { tool: "Document checklists", setup: "Turned checklists that lived in one person's head into automated steps.", effect: "The process no longer depends on one person." },
    ],
    tags: ["Process mapping", "Make.com", "Smokeball API"],
  },
  "fireflies-docusign-contracts": {
    snapshot: { period: LAW },
    feature: "Contracts generated from the client meeting and sent for signature, with the next step booked.",
    toolUses: [
      { tool: "Fireflies", setup: "Captures the meeting the contract is built from.", effect: "Nothing agreed on the call gets lost." },
      { tool: "DocuSign", setup: "Contract generated and sent for signature.", effect: "Clients sign sooner." },
      { tool: "Calendar booking logic", setup: "Books the next step with the client.", effect: "No scheduling emails." },
    ],
    tags: ["Contract automation", "DocuSign", "Meeting to document"],
  },
  "legal-staff-ai-training": {
    snapshot: { business: "Law firms", period: LAW },
    feature: "Staff who use the builds and Claude day to day.",
    toolUses: [
      { tool: "Hands-on sessions", setup: "Trained the staff who would use each build.", effect: "The builds actually get used." },
      { tool: "Claude", setup: "Showed staff how to work with Claude on their own matters.", effect: "AI use carries on past the build." },
    ],
    tags: ["AI adoption training", "Change management"],
  },
};

// One line per tool for the Overview tools tile, shown when that tool is selected
export const TOOL_NOTES: Record<string, string> = {
  OpenClaw: "Deployed agency-wide as an AI workforce on Microsoft 365.",
  Kimi: "Model behind the agency AI workforce and the Teams reporting tool.",
  "Microsoft 365": "SharePoint, Outlook, Entra and Teams wired into an AI workforce.",
  SharePoint: "Agents search and read file libraries on request.",
  Outlook: "Agents draft client email replies for a person to approve.",
  "Microsoft Entra": "App registration and Microsoft Graph permissions that limit what each agent can reach.",
  "Microsoft Teams": "Front door to the AI workforce, and where Power BI reports land.",
  "Power BI": "Dashboards and reports delivered into Teams.",
  HubSpot: "CRM builds and migrations, a two-way Notion sync, Meta Ads lead flow and newsletters.",
  Notion: "Two-way HubSpot sync and a merged candidate pipeline.",
  "Zoho Recruit": "Screening and outreach agents on candidate records.",
  Salesforce: "Integration with a client's other systems.",
  GoHighLevel: "Integration with a client's other systems.",
  "Kommo CRM": "Integration and workflows for a client.",
  "Apollo.io": "Outbound to law firms and legal tech from an ICP-built list.",
  "Smokeball API": "Intake, deadlines, briefs, re-engagement, workflows and an MCP connector.",
  "Clio API": "MCP connector for plain-English matter queries.",
  MCP: "Two MCP servers connecting Smokeball and Clio to Claude.",
  Claude: "Agents for briefs, re-engagement, MCP queries and the Sherlock pipeline.",
  "Make.com": "Enquiry qualification and law firm workflow automations.",
  Python: "Smokeball MCP connector.",
  "Python (FastMCP)": "Clio MCP connector.",
  DocuSign: "Contracts generated from meetings and sent for signature.",
  Fireflies: "Meeting capture that feeds contract generation.",
  "Meta Ads": "Lead source connected to HubSpot pipelines.",
  Gmail: "Follow-up drafts for outbound, and a candidate data source.",
  "Excel sheets": "Candidate data merged into Notion.",
  "LinkedIn data": "Prospect profiles that shape cold emails.",
  HyperFrames: "Video build and render in the Sherlock pipeline.",
  "ChatGPT image model": "Scene images for Sherlock reels.",
  Instagram: "Output for the Sherlock reel pipeline.",
};
