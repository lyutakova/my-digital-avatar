// ── Project data ──────────────────────────────────────────────────────────────
// Edit this file to add your real case study content.
// Each project has: id, tag, title, desc, meta, overview, challenge, solution, stats, outcome

const PROJECTS = {
  'design-system': {
    tag: 'Design Systems',
    title: 'Design System',
    desc: 'A comprehensive component library for a fintech startup',
    meta: { role: 'Lead Designer', year: '2023', client: 'Fintech Startup', tools: 'Figma, Storybook' },
    overview: 'Built a full-scale design system from zero — covering foundations (color, type, spacing), 60+ components, and documentation — that unified the product across web and mobile.',
    challenge: 'The team had three designers and four frontend engineers all working from different Figma files and component copies. Design-to-dev handoff was painful, inconsistencies crept into production, and onboarding new designers took weeks.',
    solution: 'I audited the existing UI, identified the 80% of patterns that covered 95% of use cases, and built a token-first system in Figma with auto-layout components. I worked closely with engineering to mirror the tokens in code, then ran workshops to onboard the team.',
    stats: [
      { num: '40%', label: 'Faster design-to-dev handoff' },
      { num: '60+', label: 'Components documented' },
      { num: '3 wks', label: 'Team onboarding time → 3 days' }
    ],
    outcome: 'The system is now the single source of truth for the product. New features ship faster, the UI is consistent across platforms, and the engineering team spends less time on UI clarifications.'
  },

  'token-structure': {
    tag: 'Design Tokens',
    title: 'Token Structure',
    desc: 'Multi-brand token architecture using Figma Variables & Style Dictionary',
    meta: { role: 'Systems Designer', year: '2023', client: 'Enterprise SaaS', tools: 'Figma, Style Dictionary, JSON' },
    overview: 'Architected a three-tier design token system that lets one codebase power three distinct brand identities — all from a single Figma library.',
    challenge: 'The company acquired two smaller products and needed to maintain separate brand identities without maintaining separate codebases. Every UI update meant triple the work.',
    solution: 'I designed a semantic token hierarchy: primitive tokens (raw values) → semantic tokens (purpose-bound aliases) → component tokens (specific overrides). Figma Variables handled the design side; Style Dictionary transformed JSON tokens into CSS, iOS, and Android output.',
    stats: [
      { num: '3', label: 'Brand themes from one codebase' },
      { num: '70%', label: 'Reduction in brand-switch effort' },
      { num: '~200', label: 'Tokens across all tiers' }
    ],
    outcome: 'Product teams can now switch themes in one variable file. Engineering ships brand-specific releases without touching component code. The token system became the model for the rest of the org.'
  },

  'hmi-prototype': {
    tag: 'Automotive UX',
    title: 'HMI Prototype',
    desc: 'Human-machine interface for an electric vehicle dashboard',
    meta: { role: 'UX/Interaction Designer', year: '2022', client: 'EV Manufacturer', tools: 'Figma, ProtoPie, Unity' },
    overview: 'Designed the in-vehicle HMI for a new electric vehicle — covering the central display, driver cluster, and heads-up display — with a focus on glanceability and low cognitive load at speed.',
    challenge: 'Drivers need critical information fast without distraction. The existing concept crammed too many data points onto the screen and used interaction patterns borrowed from smartphones — totally wrong for a 100km/h context.',
    solution: 'I ran contextual research sessions (including ride-alongs) to understand real driver cognitive load. I reduced the primary screen to five information zones, introduced ambient lighting cues for range anxiety, and prototyped micro-interactions in ProtoPie for user testing.',
    stats: [
      { num: '0.8s', label: 'Avg glance time (down from 2.1s)' },
      { num: '91%', label: 'Task success in usability tests' },
      { num: '5', label: 'Primary information zones' }
    ],
    outcome: 'The prototype passed internal safety review and moved to engineering handoff. The ambient lighting system was cited by the product team as the most innovative element of the design.'
  },

  'dashboard-design': {
    tag: 'B2B / Data',
    title: 'Dashboard Design',
    desc: 'Analytics dashboard redesign improving task completion by 28%',
    meta: { role: 'Senior UX Designer', year: '2024', client: 'B2B SaaS', tools: 'Figma, Maze, Hotjar' },
    overview: 'Redesigned a complex analytics dashboard for a B2B SaaS platform used by operations teams to track logistics KPIs — reducing cognitive overload through progressive disclosure.',
    challenge: 'Power users loved the data density; new users were overwhelmed and churned within the first week. Support tickets about "can\'t find X" were the top category. The dashboard tried to show everything at once.',
    solution: 'I ran tree testing and card sorting to understand mental models, then redesigned around progressive disclosure: a summary layer with drill-down into detail. I introduced a "focus mode" that surfaces only the three metrics the user visits most, learned over time.',
    stats: [
      { num: '+28%', label: 'Task completion rate' },
      { num: '−43%', label: 'Support tickets about navigation' },
      { num: '4.6/5', label: 'Post-launch user satisfaction' }
    ],
    outcome: 'New user activation improved significantly in the month after launch. The progressive disclosure pattern became a template for other dashboard pages across the product.'
  }
};

// Open a case study modal
function openProject(id) {
  const p = PROJECTS[id];
  if (!p) return;

  const statsHTML = p.stats.map(s => `
    <div class="cs-stat">
      <div class="cs-stat-num">${s.num}</div>
      <div class="cs-stat-label">${s.label}</div>
    </div>`).join('');

  document.getElementById('modal-content').innerHTML = `
    <p class="cs-tag">${p.tag}</p>
    <h2 class="cs-title" id="modal-title">${p.title}</h2>
    <p class="cs-subtitle">${p.desc}</p>
    <div class="cs-meta">
      <div class="cs-meta-item"><span class="cs-meta-label">Role</span><span class="cs-meta-value">${p.meta.role}</span></div>
      <div class="cs-meta-item"><span class="cs-meta-label">Year</span><span class="cs-meta-value">${p.meta.year}</span></div>
      <div class="cs-meta-item"><span class="cs-meta-label">Client</span><span class="cs-meta-value">${p.meta.client}</span></div>
      <div class="cs-meta-item"><span class="cs-meta-label">Tools</span><span class="cs-meta-value">${p.meta.tools}</span></div>
    </div>
    <div class="cs-img-placeholder">[ Add your project image or mockup here ]</div>
    <p class="cs-section-title">Overview</p>
    <p class="cs-body">${p.overview}</p>
    <p class="cs-section-title">Challenge</p>
    <p class="cs-body">${p.challenge}</p>
    <p class="cs-section-title">Approach</p>
    <p class="cs-body">${p.solution}</p>
    <p class="cs-section-title">Results</p>
    <div class="cs-stat-row">${statsHTML}</div>
    <p class="cs-section-title">Outcome</p>
    <p class="cs-body">${p.outcome}</p>
  `;

  const overlay = document.getElementById('case-modal');
  overlay.setAttribute('aria-hidden', 'false');
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const overlay = document.getElementById('case-modal');
  overlay.classList.remove('open');
  overlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

// Close on backdrop click
document.getElementById('case-modal').addEventListener('click', function(e) {
  if (e.target === this) closeModal();
});

// Close on Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});
