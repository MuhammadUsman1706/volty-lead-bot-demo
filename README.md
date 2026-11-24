# Volty lead bot: a demo for voltade.com

An unofficial demo built for Voltade's first-round task: a Volty web chat that qualifies leads arriving on voltade.com.

- **Live demo page:** https://muhammadusman1706.github.io/volty-lead-bot-demo/
- **Chat on its own page:** https://volty.voltade.com/chat/oebktae3yn559xcsmjf28

## What it does

1. **One-tap qualification (Flow: Level 1).** Five button questions in CHAMP order: business type, main challenge, monthly customers, team size, timeline. After each answer it gives back a matching Volty customer result, so the visitor gets value at every step.
2. **A tailored recommendation (Volty agent).** The agent reads the whole path and recommends the smallest plan that fits, as a Fact list card with features for the stated challenge. If only contacts overflow, it also shows the cheaper add-on option.
3. **Scored and recorded.** It scores the lead out of 100, applies a Hot lead / Warm lead / Nurture / Not a fit / Existing customer label, and writes 11 custom contact fields plus a one-line summary for sales.
4. **The right next step.** Hot leads get a form and a hand-off to the team. Warm leads get the free trial. Explorers get a relevant case study without being pressed for an email. Off-script questions (pricing, security, competitors, other languages) are answered from voltade.com facts at any point.

## Files

| File | What it is |
|---|---|
| `quick-paths.ts` | The button flow (`inboxes/voltade-website-sales/quick-paths.ts` in the Volty project) |
| `instructions.md` | The inbox instructions: recommendation, scoring, CRM writes, hand-off (capped at 4,000 characters by Volty) |
| `org.md` | Workspace instructions: pricing, features, security, results and comparisons from voltade.com |
| `inbox.ts` | Inbox and web chat settings: hand-off topics, live reply mode, smart Contact Labels, look |
| `index.html` | This demo page, with the widget embedded |

## How it was built

From Claude Code with the `volty` CLI:

- `volty widgets create --website voltade.com` for the web chat, its inbox and the widget
- `volty contacts manage-attribute-definition` and `contacts describe-label` for the lead fields and the auto-add labels
- `volty init` to pull the workspace into a folder, then editing the files above and `volty push`
- Testing with `volty chat-flow try` (button paths), `volty debug wake-sync --web-chat` (free-text visitors) and real chats on the hosted chat page

Figures come from voltade.com as of November 2026. Volty and Voltade belong to Voltade Pte. Ltd.; this repo is not an official Voltade project.
