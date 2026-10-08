export type Stat={raw:string;prefix:string;num:number|null;suffix:string;label:string};
export type Build={id:string;n:number;fn:string;title:string;source:string;problem:string;build:string;before:string;after:string;flow:string[];stats:Stat[];helped:string;tools:string[]};
export const BUILDS:Build[]=[
 {
  "id": "openclaw-firmwide-workforce",
  "n": 1,
  "fn": "Admin",
  "title": "OpenClaw: a firm-wide AI employee workforce on Kimi",
  "source": "Client work",
  "problem": "A firm wanted AI employees available across the whole firm.",
  "build": "I deployed OpenClaw across the whole firm on Kimi models, as a workforce of AI employees. It connects to SharePoint for files, Outlook for client email, Entra for permissions and Teams for internal chat. It worked for the firm.",
  "before": "AI help used to depend on each person's own tools and skills.",
  "after": "Every team has the same agents in the chat they already use.",
  "flow": [
   "Staff message an agent in Teams",
   "Entra checks permissions",
   "Agent reads SharePoint or Outlook",
   "Task done, reply in chat"
  ],
  "stats": [],
  "helped": "Staff hand off routine drafting, searching and summarising without leaving Teams, and the firm decides what each agent can see.",
  "tools": [
   "OpenClaw",
   "Kimi",
   "Microsoft 365"
  ]
 },
 {
  "id": "sharepoint-integration",
  "n": 2,
  "fn": "Admin",
  "title": "SharePoint integration for the AI workforce",
  "source": "Client work",
  "problem": "The firm's files live in SharePoint.",
  "build": "I connected OpenClaw to SharePoint so the AI workforce can work with the firm's files.",
  "before": "Finding the right document meant digging through folders.",
  "after": "Staff ask for it in plain language.",
  "flow": [
   "Agent gets a request",
   "Entra confirms access",
   "Searches the SharePoint library",
   "Answers or drafts from the file"
  ],
  "stats": [],
  "helped": "Less time hunting for files, and answers come from the firm's own documents.",
  "tools": [
   "SharePoint",
   "OpenClaw"
  ]
 },
 {
  "id": "outlook-integration",
  "n": 3,
  "fn": "Admin",
  "title": "Outlook integration for client email",
  "source": "Client work",
  "problem": "The firm handles client emails in Outlook.",
  "build": "I connected OpenClaw to Outlook so the AI workforce can handle client emails.",
  "before": "Every reply started from a blank page.",
  "after": "A first draft is waiting.",
  "flow": [
   "Client email lands in Outlook",
   "Agent reads the thread",
   "Reply drafted",
   "A person reviews and sends"
  ],
  "stats": [],
  "helped": "Faster responses to clients, with a person still approving what goes out.",
  "tools": [
   "Outlook",
   "OpenClaw"
  ]
 },
 {
  "id": "entra-permissions",
  "n": 4,
  "fn": "Admin",
  "title": "Microsoft Entra permissions for the AI workforce",
  "source": "Client work",
  "problem": "AI that reads files and email needs access limits.",
  "build": "I connected OpenClaw to Entra so each agent only sees what its permissions allow.",
  "before": "Giving AI access to files and email was a risk.",
  "after": "Access follows the same rules as staff.",
  "flow": [
   "User or agent makes a request",
   "Entra checks the role",
   "Access granted or refused",
   "Agent works inside that scope"
  ],
  "stats": [],
  "helped": "The firm could roll AI out firm-wide without opening up sensitive data.",
  "tools": [
   "Microsoft Entra",
   "OpenClaw"
  ]
 },
 {
  "id": "teams-internal-chat",
  "n": 5,
  "fn": "Admin",
  "title": "Microsoft Teams as the front door to the AI workforce",
  "source": "Client work",
  "problem": "Staff already work in Teams.",
  "build": "I connected OpenClaw to Teams, so staff talk to the AI workforce in the chat they already use.",
  "before": "AI lived in a separate tool people forgot to open.",
  "after": "It sits in Teams.",
  "flow": [
   "Staff message in Teams",
   "OpenClaw picks it up",
   "Agent does the work",
   "Reply posts in the thread"
  ],
  "stats": [],
  "helped": "Adoption, because nobody had to learn a new app.",
  "tools": [
   "Microsoft Teams",
   "OpenClaw"
  ]
 },
 {
  "id": "openclaw-staff-training",
  "n": 6,
  "fn": "Admin",
  "title": "OpenClaw rollout training for staff",
  "source": "Client work",
  "problem": "A firm-wide rollout needs staff who know what the agents can do.",
  "build": "I trained the firm's staff on OpenClaw so they knew what to ask for and where it fits their work.",
  "before": "People didn't know what to ask an AI agent for.",
  "after": "Each team has examples that fit their work.",
  "flow": [
   "Introduce the agents",
   "Hands-on sessions per team",
   "Share example requests",
   "Staff use it day to day"
  ],
  "stats": [],
  "helped": "The rollout got used rather than ignored.",
  "tools": [
   "OpenClaw",
   "Microsoft Teams"
  ]
 },
 {
  "id": "hubspot-notion-two-way-sync",
  "n": 7,
  "fn": "Sales",
  "title": "HubSpot and Notion two-way sync",
  "source": "Client work",
  "problem": "A recruiting agency kept records in both HubSpot and Notion and paid for a separate tool to keep them in step.",
  "build": "I built a custom two-way sync between HubSpot and Notion. It removed the paid tool and the recurring software cost. It is still in active use.",
  "before": "Records lived in two tools, kept in step by a paid app.",
  "after": "A custom sync keeps them aligned both ways.",
  "flow": [
   "Change in HubSpot",
   "Sync runs",
   "Record updates in Notion",
   "And the other way round"
  ],
  "stats": [
   {
    "raw": "1",
    "prefix": "",
    "num": 1,
    "suffix": "",
    "label": "paid tool removed"
   },
   {
    "raw": "Live",
    "prefix": "",
    "num": null,
    "suffix": "",
    "label": "still in active use"
   }
  ],
  "helped": "The agency dropped a paid tool and still runs on the sync.",
  "tools": [
   "HubSpot",
   "Notion",
   "Custom sync"
  ]
 },
 {
  "id": "linkedin-email-pipelines",
  "n": 8,
  "fn": "Sales",
  "title": "Custom email pipelines built on LinkedIn data",
  "source": "Personal build",
  "problem": "Cold emails that ignore who the prospect is get ignored.",
  "build": "I built email pipelines that use each prospect's LinkedIn profile to shape the message that goes out.",
  "before": "Outreach used one template for everyone.",
  "after": "Each email reflects who the person is.",
  "flow": [
   "Pick the prospect",
   "Read their LinkedIn profile",
   "Write to their role and work",
   "Send and follow up"
  ],
  "stats": [],
  "helped": "More relevant outreach and more replies worth having.",
  "tools": [
   "LinkedIn data",
   "Email pipelines"
  ]
 },
 {
  "id": "apollo-outbound-engine",
  "n": 9,
  "fn": "Sales",
  "title": "Apollo outbound engine for legal prospects",
  "source": "Personal build",
  "problem": "Outbound to law firms needs the right list and steady follow-up.",
  "build": "I built the outbound system in Apollo around an ideal client profile of law firms and legal tech. Follow-up drafts sit in Gmail under day labels, and five scheduled tasks send them Monday to Friday.",
  "before": "Follow-ups depended on remembering to send them.",
  "after": "They go out on schedule.",
  "flow": [
   "Define the ideal client",
   "Build the list in Apollo",
   "Draft follow-ups by day",
   "Send Monday to Friday"
  ],
  "stats": [],
  "helped": "Steady outbound without daily manual work.",
  "tools": [
   "Apollo.io",
   "Gmail",
   "Scheduled follow-ups"
  ]
 },
 {
  "id": "hubspot-meta-ads-lead-flow",
  "n": 10,
  "fn": "Sales",
  "title": "HubSpot and Meta Ads lead flow pipeline",
  "source": "Client work",
  "problem": "Leads from Meta ads need to reach the CRM without manual copying.",
  "build": "I connected HubSpot to Meta Ads and built the pipelines that move each lead through the sales process.",
  "before": "Leads were exported and copied over by hand.",
  "after": "They arrive on their own.",
  "flow": [
   "Meta lead form filled",
   "Lead lands in HubSpot",
   "Stage and owner set",
   "Follow-up starts"
  ],
  "stats": [],
  "helped": "No lost leads, and sales reaches people while they still remember the ad.",
  "tools": [
   "HubSpot",
   "Meta Ads",
   "Lead-flow pipelines"
  ]
 },
 {
  "id": "hubspot-crm-integration",
  "n": 11,
  "fn": "Sales",
  "title": "HubSpot CRM builds and migrations",
  "source": "Client work",
  "problem": "Clients needed a CRM set up around how they sell.",
  "build": "I built CRMs from scratch and migrated several client systems to HubSpot. I customized properties, funnels and workflows per client and acted as the technical contact for support and onboarding.",
  "before": "Client data sat in spreadsheets or old tools.",
  "after": "Each client has HubSpot set up around how they sell.",
  "flow": [
   "Map the sales process",
   "Build properties, pipelines, workflows",
   "Migrate the old data",
   "Onboard the team"
  ],
  "stats": [],
  "helped": "One place for every deal, and follow-ups that trigger themselves.",
  "tools": [
   "HubSpot",
   "Workflows",
   "API integrations"
  ]
 },
 {
  "id": "salesforce-integration",
  "n": 12,
  "fn": "Sales",
  "title": "Salesforce integration",
  "source": "Client work",
  "problem": "A client's Salesforce data needed to connect with their other tools.",
  "build": "I built the integration between Salesforce and the client's other systems.",
  "before": "The team kept two systems up to date by hand.",
  "after": "One update flows to the other.",
  "flow": [
   "Record changes in Salesforce",
   "Integration picks it up",
   "Connected tool updates",
   "Both stay in step"
  ],
  "stats": [],
  "helped": "Less double entry and fewer mismatched records.",
  "tools": [
   "Salesforce",
   "API integration"
  ]
 },
 {
  "id": "gohighlevel-integration",
  "n": 13,
  "fn": "Sales",
  "title": "GoHighLevel integration",
  "source": "Client work",
  "problem": "A client's GoHighLevel account needed to connect with their other tools.",
  "build": "I built the integration between GoHighLevel and the client's other systems.",
  "before": "Contacts lived in GoHighLevel and the other tools separately.",
  "after": "They sync.",
  "flow": [
   "Contact changes in GoHighLevel",
   "Integration fires",
   "Connected system updates",
   "Follow-ups run from one place"
  ],
  "stats": [],
  "helped": "The team works from one up-to-date contact list.",
  "tools": [
   "GoHighLevel",
   "API integration"
  ]
 },
 {
  "id": "kommo-crm-integration",
  "n": 14,
  "fn": "Sales",
  "title": "Kommo CRM integration",
  "source": "Client work",
  "problem": "A client's Kommo CRM needed to connect with their other tools.",
  "build": "I built the integration between Kommo and the client's other systems, using Kommo workflows.",
  "before": "Moving a lead meant updating other tools by hand.",
  "after": "The workflow does it.",
  "flow": [
   "Lead moves in Kommo",
   "Kommo workflow fires",
   "Connected tool updates",
   "Next step triggered"
  ],
  "stats": [],
  "helped": "Leads keep moving without someone babysitting the CRM.",
  "tools": [
   "Kommo CRM",
   "Kommo workflows"
  ]
 },
 {
  "id": "zoho-recruit-integration",
  "n": 15,
  "fn": "Recruitment",
  "title": "Zoho Recruit screening and outreach agents",
  "source": "Client work",
  "problem": "A recruiting agency needed help with candidate screening and outreach.",
  "build": "I integrated Zoho Recruit and built automations and AI agents for candidate screening and outreach.",
  "before": "Recruiters screened and wrote every message by hand.",
  "after": "Agents do the first pass.",
  "flow": [
   "Candidate enters Zoho Recruit",
   "Agent screens against the role",
   "Outreach drafted",
   "Recruiter reviews"
  ],
  "stats": [],
  "helped": "Recruiters spend their time on the strongest candidates.",
  "tools": [
   "Zoho Recruit",
   "AI agents"
  ]
 },
 {
  "id": "candidate-pipeline-notion",
  "n": 16,
  "fn": "Recruitment",
  "title": "Candidate pipeline rebuilt into one Notion list",
  "source": "Client work",
  "problem": "Candidate data was spread across Gmail, Notion and Excel sheets, so nobody had one list to work from.",
  "build": "I revamped the recruitment pipelines and pulled data from all three sources into a single list in Notion. I designed several pipeline layouts.",
  "before": "Candidates were spread across inboxes and sheets.",
  "after": "There is one list.",
  "flow": [
   "Pull from Gmail",
   "Pull from Excel sheets",
   "Pull from Notion",
   "One Notion list by stage"
  ],
  "stats": [
   {
    "raw": "3",
    "prefix": "",
    "num": 3,
    "suffix": "",
    "label": "sources merged into one list"
   }
  ],
  "helped": "Everyone sees the same pipeline, and nobody falls through the gaps.",
  "tools": [
   "Gmail",
   "Notion",
   "Excel sheets"
  ]
 },
 {
  "id": "recruitment-faq-chatbot",
  "n": 17,
  "fn": "Recruitment",
  "title": "AI chatbot for firm recruitment FAQs",
  "source": "Client work",
  "problem": "A firm wanted candidates to get answers to common recruitment questions quickly.",
  "build": "I built an AI chatbot for the firm's recruitment. It answers frequently asked questions and helps with more besides.",
  "before": "Recruiters answered the same questions all day.",
  "after": "The bot handles the common ones.",
  "flow": [
   "Candidate asks a question",
   "Bot checks the firm's answers",
   "Replies",
   "Hands off when it can't answer"
  ],
  "stats": [],
  "helped": "Candidates get answers at any hour, and recruiters get time back.",
  "tools": [
   "AI chatbot",
   "Knowledge base"
  ]
 },
 {
  "id": "sherlock-reel-pipeline",
  "n": 18,
  "fn": "Marketing",
  "title": "Sherlock: AI reel pipeline, research to render",
  "source": "Personal build",
  "problem": "A short educational reel needs research, a script, design, voice, editing and a caption.",
  "build": "I built a pipeline that runs a reel end to end for the sherlock_teaches_ai account. It researches the topic and writes the script in Sherlock Holmes' voice. It then runs a design pass, scouts components, records the voiceover and click sounds, builds the video in HyperFrames, runs checks, renders, and writes the caption.",
  "before": "A reel took a full manual production cycle.",
  "after": "One request runs the whole pipeline.",
  "flow": [
   "Research the topic",
   "Script in Sherlock's voice",
   "Design and voice",
   "Render and caption"
  ],
  "stats": [],
  "helped": "Regular reels for sherlock_teaches_ai without a production team.",
  "tools": [
   "Claude",
   "HyperFrames",
   "Voiceover and SFX",
   "Instagram"
  ]
 },
 {
  "id": "sherlock-image-generation",
  "n": 19,
  "fn": "Marketing",
  "title": "Image generation added to the Sherlock pipeline",
  "source": "Personal build",
  "problem": "Reels need visuals that match each script.",
  "build": "I added image generation with ChatGPT's image model to the Sherlock pipeline, so scene visuals are produced as part of the build.",
  "before": "Visuals were sourced by hand.",
  "after": "They are generated to match each script.",
  "flow": [
   "Scene needs a visual",
   "Prompt written from the script",
   "ChatGPT image model generates",
   "Placed in the reel"
  ],
  "stats": [],
  "helped": "Every reel gets visuals that fit what is being said.",
  "tools": [
   "ChatGPT image model",
   "Sherlock pipeline"
  ]
 },
 {
  "id": "hubspot-newsletter-system",
  "n": 20,
  "fn": "Marketing",
  "title": "Newsletter email system on HubSpot",
  "source": "Client work",
  "problem": "A firm wanted to send newsletters to its client list.",
  "build": "I built the newsletter email system in HubSpot for the firm.",
  "before": "Newsletters were one-off efforts.",
  "after": "There is a repeatable system.",
  "flow": [
   "Segment the list in HubSpot",
   "Build from a template",
   "Schedule the send",
   "Track opens and clicks"
  ],
  "stats": [],
  "helped": "The firm stays in front of its clients on a steady rhythm.",
  "tools": [
   "HubSpot",
   "Email marketing"
  ]
 },
 {
  "id": "powerbi-teams-reporting",
  "n": 21,
  "fn": "Marketing",
  "title": "Power BI dashboards and reports inside Microsoft Teams",
  "source": "Client work",
  "problem": "A firm wanted its numbers in front of staff where they already work.",
  "build": "I built dashboards and reports in Power BI, and as generated report images where a chart was not enough. They reach staff inside the firm's Microsoft Teams tool, which runs on Kimi models.",
  "before": "Reports had to be requested.",
  "after": "They show up where staff work.",
  "flow": [
   "Pull the firm's data",
   "Build the report",
   "Post it into Teams",
   "Ask follow-ups through Kimi"
  ],
  "stats": [],
  "helped": "Decisions are made from current numbers, not last month's spreadsheet.",
  "tools": [
   "Power BI",
   "Microsoft Teams",
   "Kimi",
   "Image generation"
  ]
 },
 {
  "id": "client-intake-smokeball",
  "n": 22,
  "fn": "Legal",
  "title": "Custom client intake forms synced to Smokeball",
  "source": "Client work",
  "problem": "An estate planning firm kept losing track of who had submitted what. Smokeball's own intake forms were slow to build, ugly and hard for clients to fill in.",
  "build": "I built a custom intake form covering wills, trusts, beneficiary details, documents and an asset inventory. Clients complete it at their own pace and progress saves as they go. Each submission creates a pre-filled matter in Smokeball through its API. A live dashboard shows every submission and how complete it is.",
  "before": "Intake meant chasing clients through clunky forms.",
  "after": "Clients finish a form that saves as they go and creates the matter.",
  "flow": [
   "Client fills form",
   "Progress auto-saved",
   "Smokeball API call",
   "Matter created, pre-filled",
   "Dashboard updates"
  ],
  "stats": [
   {
    "raw": "10",
    "prefix": "",
    "num": 10,
    "suffix": "",
    "label": "hours a week saved on intake follow-up"
   },
   {
    "raw": "33%",
    "prefix": "",
    "num": 33,
    "suffix": "%",
    "label": "of intakes complete with no staff reminder"
   },
   {
    "raw": "5",
    "prefix": "",
    "num": 5,
    "suffix": "",
    "label": "days faster to matter opened"
   }
  ],
  "helped": "Staff stopped chasing documents, and new matters open days sooner.",
  "tools": [
   "Smokeball API",
   "Custom web form",
   "Live dashboard"
  ]
 },
 {
  "id": "deadline-tracker",
  "n": 23,
  "fn": "Legal",
  "title": "Daily deadline tracker for court and filing dates",
  "source": "Client work",
  "problem": "A criminal defense firm tracked court dates and filing deadlines from memory and scattered calendar entries.",
  "build": "An agent reads Smokeball once a day across every active matter. It pulls each deadline, filing date and court date and syncs them to the firm's calendar. It flags anything added or changed since the last sync.",
  "before": "Court and filing dates were tracked from memory.",
  "after": "They sync to the calendar every day.",
  "flow": [
   "Daily Smokeball read",
   "Deadlines extracted",
   "Calendar synced",
   "Changes flagged"
  ],
  "stats": [
   {
    "raw": "2+",
    "prefix": "",
    "num": 2,
    "suffix": "+",
    "label": "hours a week saved on manual calendar entry"
   },
   {
    "raw": "99%",
    "prefix": "",
    "num": 99,
    "suffix": "%",
    "label": "of deadlines synced the same day"
   }
  ],
  "helped": "Dates stop slipping, and nobody spends hours on manual calendar entry.",
  "tools": [
   "Smokeball API",
   "Calendar sync",
   "Scheduled agent"
  ]
 },
 {
  "id": "pre-meeting-brief-agent",
  "n": 24,
  "fn": "Legal",
  "title": "Pre-meeting brief agent",
  "source": "Client work",
  "problem": "The owner of an estate planning firm spent 30 minutes or more before each preliminary meeting reading the client's intake and file.",
  "build": "An agent reads the full matter from Smokeball, including every submitted intake document. It checks the matter against the firm's estate planning SOPs and writes a brief that lists what the client still owes and what to cover on the call. The brief is ready before the meeting and takes five minutes to read. I built it in three days.",
  "before": "The owner read the whole file before each meeting.",
  "after": "A brief is ready before the call.",
  "flow": [
   "Read the matter",
   "Review intake documents",
   "Check against SOPs",
   "Write the brief"
  ],
  "stats": [
   {
    "raw": "30+",
    "prefix": "",
    "num": 30,
    "suffix": "+",
    "label": "minutes of prep saved per meeting"
   },
   {
    "raw": "5",
    "prefix": "",
    "num": 5,
    "suffix": "",
    "label": "minute read before each call"
   },
   {
    "raw": "3",
    "prefix": "",
    "num": 3,
    "suffix": "",
    "label": "days to build"
   }
  ],
  "helped": "Meetings start with full context from a five-minute read.",
  "tools": [
   "Claude",
   "Smokeball API",
   "Firm SOPs"
  ]
 },
 {
  "id": "smokeball-mcp-connector",
  "n": 25,
  "fn": "Legal",
  "title": "Smokeball MCP connector for Claude",
  "source": "Client work",
  "problem": "Getting a straight answer out of Smokeball meant clicking through matter after matter. Attorneys wanted to ask a question.",
  "build": "I built an MCP connector that links Smokeball to Claude. Attorneys at two firms ask about their matters in plain English inside their own Claude account. The connector queries Smokeball live and returns the answer.",
  "before": "Answers meant clicking through matter after matter.",
  "after": "Attorneys ask Claude in plain English.",
  "flow": [
   "Attorney asks in Claude",
   "Connector reads the question",
   "Searches Smokeball live",
   "Answer returned"
  ],
  "stats": [
   {
    "raw": "2+",
    "prefix": "",
    "num": 2,
    "suffix": "+",
    "label": "hours a week saved"
   },
   {
    "raw": "10 sec",
    "prefix": "",
    "num": 10,
    "suffix": " sec",
    "label": "per query, versus 5 minutes in the PMS"
   },
   {
    "raw": "2",
    "prefix": "",
    "num": 2,
    "suffix": "",
    "label": "firms using it"
   }
  ],
  "helped": "Questions get answered in seconds at two firms.",
  "tools": [
   "MCP",
   "Claude",
   "Smokeball API",
   "Python"
  ]
 },
 {
  "id": "clio-mcp-connector",
  "n": 26,
  "fn": "Legal",
  "title": "Clio MCP connector for Claude",
  "source": "Client work",
  "problem": "Answers sit inside Clio and take clicking through matters to reach.",
  "build": "I built a second MCP connector for Clio on the same pattern as the Smokeball one. It lets attorneys query matters, documents, deadlines and client details from Claude in plain English.",
  "before": "Answers meant clicking through Clio.",
  "after": "Attorneys ask in plain English.",
  "flow": [
   "Attorney asks in Claude",
   "Connector reads the question",
   "Queries Clio live",
   "Answer comes back"
  ],
  "stats": [],
  "helped": "Attorneys get matter details in seconds and stay on the work.",
  "tools": [
   "MCP",
   "Claude",
   "Clio API",
   "Python (FastMCP)"
  ]
 },
 {
  "id": "client-reengagement-agent",
  "n": 27,
  "fn": "Legal",
  "title": "Client re-engagement agent for closed matters",
  "source": "Client work",
  "problem": "Closed matters at a real estate law firm sat untouched. Expired documents, lapsed policies and clients due for a review went unnoticed.",
  "build": "An agent scans closed matters in Smokeball for expired documents and lapsed reviews and flags the clients who now warrant outreach. When prompted, it drafts a personalized email for each one using context from the matter. An attorney reviews and sends it.",
  "before": "Closed matters sat untouched.",
  "after": "Expired documents and lapsed reviews get flagged with an email draft ready.",
  "flow": [
   "Closed matters",
   "Expiry and lapse scan",
   "Client flagged",
   "Email drafted",
   "Attorney reviews"
  ],
  "stats": [
   {
    "raw": "20",
    "prefix": "",
    "num": 20,
    "suffix": "",
    "label": "closed matters flagged in the first scan"
   },
   {
    "raw": "$10k+",
    "prefix": "$",
    "num": 10,
    "suffix": "k+",
    "label": "recovered or new revenue"
   },
   {
    "raw": "5+",
    "prefix": "",
    "num": 5,
    "suffix": "+",
    "label": "hours a week saved on manual review"
   }
  ],
  "helped": "Revenue the firm didn't know it had, with an attorney approving every email.",
  "tools": [
   "Claude",
   "Smokeball API",
   "Email drafting"
  ]
 },
 {
  "id": "enquiry-qualification-booking",
  "n": 28,
  "fn": "Legal",
  "title": "Enquiry qualification and consult booking",
  "source": "Client work",
  "problem": "Contact form submissions and new client emails sat in an inbox until someone had time to answer them.",
  "build": "I built an automation for two firms that runs the moment a contact form arrives. It qualifies the enquiry on practice area fit, matter type and urgency. It sends a personalized welcome email with a follow-up and offers a consult slot with the right attorney, so nobody trades scheduling emails.",
  "before": "New enquiries waited in an inbox for hours.",
  "after": "Each one is qualified and answered within minutes.",
  "flow": [
   "Form submitted",
   "Qualification",
   "Welcome email",
   "Consult slot offered"
  ],
  "stats": [
   {
    "raw": "5 min",
    "prefix": "",
    "num": 5,
    "suffix": " min",
    "label": "to first response, down from 5 hours"
   },
   {
    "raw": "20%",
    "prefix": "",
    "num": 20,
    "suffix": "%",
    "label": "increase in enquiry to consult conversion"
   }
  ],
  "helped": "More enquiries turn into consults, and nobody trades scheduling emails.",
  "tools": [
   "Make.com",
   "Email",
   "Calendar booking"
  ]
 },
 {
  "id": "custom-workflow-automations",
  "n": 29,
  "fn": "Legal",
  "title": "Custom workflow automations for four law firms",
  "source": "Client work",
  "problem": "Every firm ran the same 12-step process to start a new matter, a billing routine that took a Friday afternoon, and a document checklist that lived in one person's head.",
  "build": "I mapped each undocumented process step by step and automated it in Make.com. All four firms connect to Smokeball. The automations cover new matter setup, monthly billing prep and document checklists. Each one went live within a week per firm.",
  "before": "Repeat processes lived in people's heads.",
  "after": "They run as automations connected to Smokeball.",
  "flow": [
   "Map the process",
   "Define each step",
   "Build in Make.com",
   "Live within a week"
  ],
  "stats": [
   {
    "raw": "20+",
    "prefix": "",
    "num": 20,
    "suffix": "+",
    "label": "hours a week reclaimed per firm"
   },
   {
    "raw": "4",
    "prefix": "",
    "num": 4,
    "suffix": "",
    "label": "firms, all on Smokeball"
   },
   {
    "raw": "<1",
    "prefix": "<",
    "num": 1,
    "suffix": "",
    "label": "week to go live"
   }
  ],
  "helped": "Each firm got its Friday afternoons back.",
  "tools": [
   "Make.com",
   "Smokeball API",
   "Document checklists"
  ]
 },
 {
  "id": "fireflies-docusign-contracts",
  "n": 30,
  "fn": "Legal",
  "title": "Fireflies to DocuSign contract automation",
  "source": "Client work",
  "problem": "Contracts follow client meetings, and drafting and sending them by hand takes time.",
  "build": "I connected Fireflies to DocuSign so contracts generate from the meeting without manual drafting. The same flow includes calendar booking logic for the next step with the client.",
  "before": "Contracts were drafted by hand after each call.",
  "after": "They start from the meeting itself.",
  "flow": [
   "Fireflies captures the meeting",
   "Terms fill the template",
   "DocuSign sends for signature",
   "Booking logic sets the next step"
  ],
  "stats": [],
  "helped": "Clients sign sooner, and nothing agreed on the call gets lost.",
  "tools": [
   "Fireflies",
   "DocuSign",
   "Calendar booking logic"
  ]
 },
 {
  "id": "legal-staff-ai-training",
  "n": 31,
  "fn": "Legal",
  "title": "AI training for law firm staff",
  "source": "Client work",
  "problem": "Tools only help if the people at the firm use them.",
  "build": "After each build I trained the staff who would use it, on the automations and on working with Claude day to day for their own matters.",
  "before": "Staff had tools they didn't know how to use.",
  "after": "They use them on their own matters.",
  "flow": [
   "Walk through each build",
   "Practise on real matters",
   "Share prompt examples",
   "Staff use it day to day"
  ],
  "stats": [],
  "helped": "The builds actually get used.",
  "tools": [
   "Claude",
   "Firm workflows",
   "Hands-on sessions"
  ]
 }
];
