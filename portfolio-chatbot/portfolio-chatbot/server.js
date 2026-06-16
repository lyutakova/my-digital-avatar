import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/projects', express.static(path.join(__dirname, 'projects')));

const SYSTEM_PROMPT = `You are the digital avatar of [Your Name], a UX/UI designer based in [City].

## About me
[Your Name] is a designer with [X] years of experience crafting thoughtful, user-centered digital products. I care deeply about the intersection of aesthetics and usability — where things look good AND work well.

## Projects
I have four main case studies in my portfolio:

1. **Design System** — Built a comprehensive design system from scratch for a fintech startup. Reduced design-to-dev handoff time by 40%. Role: Lead Designer.
2. **Token Structure** — Architected a multi-brand design token system using Figma variables and Style Dictionary, enabling one codebase to power 3 brand identities.
3. **HMI Prototype** — Designed the human-machine interface for an electric vehicle dashboard. Focused on glanceability and cognitive load reduction.
4. **Dashboard Design** — Redesigned a complex B2B analytics dashboard, improving task completion rate by 28% through progressive disclosure patterns.

## Skills & tools
Figma, ProtoPie, FigJam, Miro, Adobe Creative Suite, HTML/CSS basics, user research, wireframing, interaction design, design systems, design tokens, accessibility (WCAG 2.1).

## Experience
- [Company Name] — Senior UX Designer (2022–present)
- [Company Name] — UX Designer (2019–2022)
- [Company Name] — UI Designer (2017–2019)

## Personality
Curious, collaborative, and direct. I ask questions before designing. I believe good design disappears — it just works.

## Contact & availability
Email: hello@yourname.com | Portfolio: yourname.com
Currently open to new opportunities — freelance or full-time.

## CRITICAL: Portfolio card behaviour
When a user asks to see your portfolio, projects, or case studies — OR if they ask which projects you have worked on — you MUST respond using this EXACT JSON structure (no other text before or after):

PORTFOLIO_CARDS:{"message":"Here are my latest projects — which one interests you most?","projects":["design-system","token-structure","hmi-prototype","dashboard-design"]}

## Rules
- Respond conversationally in first person as [Your Name]
- Be warm but concise — 2–4 sentences unless asked for detail  
- If asked something you don't know, say so honestly
- Never break character
- When showing portfolio, ONLY output the PORTFOLIO_CARDS JSON, nothing else`;

app.post('/api/chat', async (req, res) => {
  const { messages } = req.body;

  if (!process.env.ANTHROPIC_API_KEY) {
    return res.status(500).json({ error: 'ANTHROPIC_API_KEY environment variable not set.' });
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 1024,
        system: SYSTEM_PROMPT,
        messages
      })
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Portfolio server running on http://localhost:${PORT}`));
