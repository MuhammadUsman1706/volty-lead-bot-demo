// Flow: Level 1 for the Voltade website sales chat.
// A short, button-first qualification (CHAMP-style: challenge before budget),
// with a small piece of value after every answer, then Volty takes over with
// the whole path to recommend a plan, score the lead and pick the next step.
import { aiRoute, ask, button, defineChatFlow, message, option } from '~/chat-flow'

export default defineChatFlow({
  start: 'welcome',
  steps: {
    // ── Opening ────────────────────────────────────────────────────────────
    welcome: message({
      say: "Hi there 👋 I'm Volty, Voltade's AI assistant.\n\nI can show you how an AI helpdesk would work for your business, and find the plan that fits, in about a minute. What brings you here today?",
      buttons: [
        button('Is Volty a fit?', 'industry'),
        button('See pricing', 'pricing'),
        button('Talk to sales', 'salesStart'),
        button('I need support', 'support'),
        button('Just looking', 'browse'),
      ],
      otherwise: 'volty',
    }),

    // ── Pricing first, then offer to qualify ──────────────────────────────
    pricing: message({
      say: "Here's the short version (USD per month, billed monthly):\n\n• Plus, $159: 6 seats, 1,000 active contacts\n• Pro, $399: 20 seats, 2,000 active contacts (most popular)\n• Max, $799: 40 seats, 5,000 active contacts\n• Enterprise: custom\n\nEvery plan includes all 5 channels (WhatsApp, web chat, email, Instagram, Messenger), AI agents, automations and every integration, with a 7-day free trial and no credit card.\n\nWant me to work out which plan fits you? It's 5 quick taps.",
      buttons: [
        button('Yes, find my plan', 'industry'),
        button('Start free trial', 'trial'),
        button('Ask a question', 'volty'),
      ],
      otherwise: 'volty',
    }),

    trial: message({
      say: "You can start right now: volty.voltade.com/signup\n\nIt's 7 days free, no credit card. Volty reads your website and sets itself up in minutes, and it stays in draft mode (your team approves each reply) until you switch it to live.\n\nWant help choosing a plan first?",
      buttons: [
        button('Find my plan', 'industry'),
        button('Ask a question', 'volty'),
      ],
      otherwise: 'volty',
    }),

    // ── Q1: industry, with a matching customer story ──────────────────────
    industry: message({
      say: 'Great, first question. What kind of business are you?',
      buttons: [
        button('Education / tuition', 'valEdu'),
        button('Clinic / spa', 'valClinic'),
        button('B2B / manufacturing', 'valB2b'),
        button('E-commerce / retail', 'valEcom'),
        button('F&B / restaurant', 'valFnb'),
        button('Something else', 'industryOther'),
      ],
      otherwise: 'industryTyped',
    }),
    industryTyped: aiRoute({
      decide: 'What kind of business does the visitor run?',
      options: [
        option('Education', 'A school, tuition centre, enrichment, swim school, training or courses', 'valEdu'),
        option('Clinic or spa', 'A medical, dental, aesthetic, TCM or wellness clinic, a spa, salon or fitness studio', 'valClinic'),
        option('B2B', 'A manufacturer, supplier, distributor, wholesaler or other business selling to businesses', 'valB2b'),
        option('E-commerce or retail', 'An online store, shop, retail chain or consumer brand', 'valEcom'),
        option('F&B', 'A restaurant, cafe, bakery, caterer or food brand', 'valFnb'),
      ],
      sure: 0.7,
      unsure: 'valOther',
    }),
    industryOther: ask({
      say: 'Nice! In a few words, what does your business do?',
      save: 'industry_other',
      next: 'valOther',
    }),

    valEdu: message({
      say: '📚 Schools use Volty to answer parents at night, book trial classes into open slots and follow up with families who go quiet. Happy Fish swim school automates 1,800+ messages a day and enrols about 50 extra students every week.',
      next: 'challenge',
    }),
    valClinic: message({
      say: '🩺 Clinics use Volty to book and reschedule appointments after hours and send reminders, while medical questions go straight to your staff. Yong Kang TCM got 20% more bookings, and Cutis averages a 24-second first reply.',
      next: 'challenge',
    }),
    valB2b: message({
      say: '🏭 B2B teams use Volty to collect the full spec (sizes, quantities, delivery dates) before an enquiry reaches sales, in English, Mandarin or Malay. Yat Guan cut quote turnaround from 3 days to 1.',
      next: 'challenge',
    }),
    valEcom: message({
      say: '🛍️ Stores use Volty to answer product, stock, delivery and returns questions from their catalogue around the clock, and to take orders. Cake Inspiration lost 75% fewer leads and resolved 91% of chats without a human.',
      next: 'challenge',
    }),
    valFnb: message({
      say: '🍰 F&B brands use Volty for orders, menus, catering enquiries and back-office automations. Cake Inspiration resolves 91% of chats without a human, and The Lo & Behold Group cut some back-office roles by half.',
      next: 'challenge',
    }),
    valOther: message({
      say: '🙌 Volty works across 10+ markets, from car marketplaces like Sgcarmart to pet stores like The Bon Pet, which runs 27 automations and 11 mini apps on it.',
      next: 'challenge',
    }),

    // ── Q2: the challenge (the "C" in CHAMP) ──────────────────────────────
    challenge: message({
      say: "What's the biggest headache with customer messages right now?",
      buttons: [
        button('Slow / after-hours', 'chSpeed'),
        button('Same questions', 'chRepeat'),
        button('Leads slip away', 'chLeads'),
        button('Bookings/follow-ups', 'chBook'),
        button('Too many channels', 'chChannels'),
        button('Something else', 'chOther'),
      ],
      otherwise: 'chTyped',
    }),
    chSpeed: message({
      say: '⚡ Volty replies in seconds, day and night. Cutis answers 90% of after-hours messages within 15 minutes, and its replies go out as Volty wrote them almost every time.',
      next: 'volume',
    }),
    chRepeat: message({
      say: '🔁 Volty learns your website, price lists and FAQs and answers those questions for you. Customers report 90%+ of enquiries handled without a human, and when your team corrects a reply, Volty saves it as a rule it follows from then on.',
      next: 'volume',
    }),
    chLeads: message({
      say: '🎯 Volty replies instantly, asks the right follow-up questions and follows up automatically, so nobody goes cold. Cake Inspiration lost 75% fewer leads, and illum.e lifted website lead conversion by 20%.',
      next: 'volume',
    }),
    chBook: message({
      say: '📅 Volty offers open slots, books, reschedules and sends day-before reminders with Confirm and Reschedule buttons, synced with Google Calendar or your clinic system.',
      next: 'volume',
    }),
    chChannels: message({
      say: '📥 Volty puts WhatsApp, Instagram, Messenger, web chat and email in one shared inbox, with one AI agent answering on all of them. You can even keep the WhatsApp Business app on the same number.',
      next: 'volume',
    }),
    chOther: ask({
      say: 'Tell me in a few words: what would you most like to fix?',
      save: 'challenge_other',
      next: 'chNoted',
    }),
    chTyped: message({
      say: 'Got it, thanks. I will factor that in.',
      next: 'volume',
    }),
    chNoted: message({
      say: 'Thanks, noted. I will factor that into my recommendation.',
      next: 'volume',
    }),

    // ── Q3 + Q4: size (maps to plan limits) ───────────────────────────────
    volume: message({
      say: 'Roughly how many different customers message you in a month?',
      buttons: [
        button('Under 1,000', 'teamSize'),
        button('1,000 – 2,000', 'teamSize'),
        button('2,000 – 5,000', 'teamSize'),
        button('5,000+', 'teamSize'),
        button('Not sure', 'teamSize'),
      ],
      otherwise: 'teamSize',
    }),
    teamSize: message({
      say: 'And how many people on your team reply to customers?',
      buttons: [
        button('Just me', 'timeline'),
        button('2 – 6', 'timeline'),
        button('7 – 20', 'timeline'),
        button('21 – 40', 'timeline'),
        button('40+', 'timeline'),
      ],
      otherwise: 'timeline',
    }),

    // ── Q5: timeline (urgency) ────────────────────────────────────────────
    timeline: message({
      say: 'Last one 🙌 When would you like this up and running?',
      buttons: [
        button('As soon as possible', 'volty'),
        button('In 1–3 months', 'volty'),
        button('Just exploring', 'volty'),
      ],
      otherwise: 'volty',
    }),

    // ── Talk to sales: two details, then Volty hands over ─────────────────
    salesStart: ask({
      say: "Happy to connect you with the Voltade team. So they come prepared: what's your business, and what would you like Volty to handle?",
      save: 'sales_need',
      next: 'salesEmail',
    }),
    salesEmail: ask({
      say: "Thanks! What's the best email for the team to reach you on?",
      save: 'sales_email',
      expect: 'email',
      retry: "That doesn't look like an email address. Could you check it?",
      next: 'volty',
    }),

    // ── Existing customers and browsers go straight to Volty ──────────────
    support: message({
      say: "Sure. Tell me what's going on and I'll help or bring in the team.",
      next: 'volty',
    }),
    browse: message({
      say: 'No problem, have a look around! Ask me anything, or pick a popular question:',
      buttons: [
        button('How the AI works', 'volty'),
        button('Integrations', 'volty'),
        button('Security & data', 'volty'),
        button('Volty vs others', 'volty'),
        button('Find my plan', 'industry'),
      ],
      otherwise: 'volty',
    }),
  },
})
