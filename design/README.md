# Portfolio design and usability pass

## Skills installed in this project

- `.agents/skills/frontend-design`: Anthropic's frontend design guidance. Source: https://github.com/anthropics/skills/tree/main/skills/frontend-design
- `.agents/skills/web-design-guidelines`: Vercel's accessibility, interaction, and performance review. Source: https://github.com/vercel-labs/agent-skills/tree/main/skills/web-design-guidelines

These are development instructions, not technologies claimed as Tousif's personal skills. They are excluded from the public website bundle.

## Direction and review

Audience: recruiters assessing experience and visitors exploring engineering work.
Keep the cinematic opening and the user's required intro → profile choice → portfolio sequence. Keep the six independent explainer videos as the memorable interactive element. The first pass considered more theatrical chapter labels; the review replaced them with plain navigation and explicit actions to make the site easier to follow.

Palette: background #0b0b0d, panel #17141b, text #f4f3ef, secondary #c0b7c1, accent #e5093d, focus #ffd6df.
Type: locally available Bahnschrift/Franklin Gothic for headings, Segoe UI for reading. No runtime font downloads. Use 14–16px reading text and larger touch targets rather than decorative microcopy.

Layout: intro → two clearly explained profile choices → hero and scrollable project videos → three navigation paths → outcomes → project case studies → career → skills → biography → videos → writing → contact. Project cards use three columns on wide screens, two on medium screens, and one on phones.

```text
Intro → Recruiter / Visitor
Identity + project video collection
Experience | Case studies | Contact
Outcomes and portfolio collections
```

## Findings addressed

- `index.html:35` — profile names and consequences were vague; now Recruiter and Visitor explain where each view starts.
- `styles.css:20` — mobile navigation and utility controls were small; increased targets and header/anchor spacing.
- `styles.css:22` — dense project columns and small descriptions; fewer columns, larger text, clearer case-study actions.
- `publishing.js:117` — generated thumbnail images lacked dimensions; explicit width/height now reserve space.
- `publishing.js:180` — external playback had little context and no written alternative; added preview, explicit external-host label, written summaries, and case-study navigation.
- `index.html:14` — versioned changed assets to prevent stale deployments mixing old UI and new scripts.

Verification: DOM regression checks plus deployed-site visual and keyboard checks. Automated DOM checks alone do not establish WCAG compliance or measure GPU performance.
