# Portfolio Chatbot

An AI-powered portfolio built as a conversational interface. Visitors talk to your digital avatar — powered by Claude — to discover your work, skills, and personality.

---

## Project structure

```
portfolio-chatbot/
├── server.js              ← Express server + Anthropic API proxy
├── package.json
├── vercel.json            ← Vercel deployment config
├── public/
│   ├── index.html         ← Chat UI
│   ├── css/style.css      ← All styles
│   └── js/
│       ├── chat.js        ← Chat logic & message rendering
│       └── projects.js    ← Case study data & modal
```

---

## Customize it

### 1. Your identity
In `public/index.html`, replace all `[Your Name]` placeholders with your real name, and `YN` with your initials.

### 2. Your avatar / system prompt
In `server.js`, edit the `SYSTEM_PROMPT` constant:
- Fill in your real bio, project descriptions, skills, experience, and contact details.
- The projects listed there should match the IDs in `projects.js`.

### 3. Your case studies
In `public/js/projects.js`, edit the `PROJECTS` object. Each project has:
- `tag` — category label shown on the card
- `title` — project name
- `desc` — one-line description
- `meta` — role, year, client, tools
- `overview`, `challenge`, `solution`, `outcome` — case study body copy
- `stats` — array of `{ num, label }` highlight metrics

To add project images, replace the `cs-img-placeholder` div in the `openProject()` function with an `<img>` tag pointing to your image.

### 4. Add more projects
Add a new key to `PROJECTS` in `projects.js`, then add the matching ID to the `PORTFOLIO_CARDS` JSON in your system prompt in `server.js`.

---

## Run locally

```bash
# 1. Install dependencies
npm install

# 2. Set your Anthropic API key
export ANTHROPIC_API_KEY=sk-ant-...

# 3. Start the dev server
npm run dev

# Visit http://localhost:3000
```

---

## Deploy to Vercel (free)

```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Login
vercel login

# 3. Deploy
vercel

# 4. Add your API key as an environment variable
vercel env add ANTHROPIC_API_KEY
# paste your key when prompted

# 5. Redeploy to pick up the env var
vercel --prod
```

Your portfolio is now live at `https://your-project.vercel.app`.

**Important:** Never commit your API key to git. The `vercel env add` command stores it securely on Vercel's side.

---

## Deploy to Netlify

Netlify works best with serverless functions. The quickest path:

1. Move the API call in `server.js` into `netlify/functions/chat.js`
2. Update the fetch URL in `chat.js` from `/api/chat` to `/.netlify/functions/chat`
3. Add `ANTHROPIC_API_KEY` in Netlify dashboard → Site settings → Environment variables

---

## How the card feature works

When a visitor asks about your portfolio, the server tells Claude to respond with a special token:

```
PORTFOLIO_CARDS:{"message":"...","projects":["design-system","token-structure",...]}
```

`chat.js` detects this pattern and renders clickable project cards instead of plain text. Clicking a card opens the full case study modal.

To trigger it manually, ask: *"Show me your portfolio"* or *"What projects have you worked on?"*
