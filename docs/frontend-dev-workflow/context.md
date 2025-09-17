# Frontend Development Workflow - Agentic Loop Context

**Task**: Frontend Development Workflow
**Repo path**: /Users/kyseah/Documents/GitHub/benson-page-2
**Desired parallelism**: 2 (typical for frontend tasks)

## Core Principles

1. **Single-brain overview** – One Orchestrator owns the big picture.
2. **Few, powerful agents** – Reuse the same Specialist prompt for parallelism instead of inventing many micro-roles.
3. **Tight feedback** – A dedicated Evaluator grades outputs (0-100) and suggests concrete fixes until quality ≥ TARGET_SCORE.
4. **Shared context** – Every agent receives the same `context.md` so no information is siloed.
5. **Repo-aware** – The Orchestrator decides whether to align to the current repo or create a generic loop.
6. **Explicit imperatives** – Use the labels **"You Must"** or **"Important"** for non-negotiable steps; permit extra compute with **"Think hard"** / **"ultrathink"**.

## Project Context

### Tech Stack
- **Frontend**: React 18 with Vite build tool
- **UI Framework**: shadcn/ui (Radix UI + Tailwind CSS)
- **Styling**: Tailwind CSS with custom design system
- **Icons**: Lucide React
- **Target**: Bilingual career coaching website (English/Chinese)

### Key Requirements
- Responsive design (mobile-first)
- Accessibility (WCAG 2.1 AA)
- Performance optimized (<500KB bundle, <2.5s LCP)
- Social media integration (WhatsApp, LINE, Facebook)
- NO contact forms (social media CTAs only)
- Wix platform compatible

### Project Structure
```
benson-page-2/
├── src/
│   ├── components/        # React components
│   │   ├── ui/           # shadcn/ui components
│   │   ├── sections/     # Page sections (Hero, About, etc.)
│   │   └── common/       # Shared components
│   ├── data/             # Content and testimonials
│   ├── lib/              # Utilities and i18n
│   └── styles/           # Global CSS
├── docs/                 # Modular documentation
└── public/               # Static assets
```

### Target Score
90 (high quality frontend code with proper accessibility, performance, and maintainability)

## Workflow Capabilities

This agent loop can handle:
- Component development and refactoring
- Responsive design implementation
- Performance optimization
- Accessibility improvements
- Internationalization (i18n) setup
- UI/UX enhancements
- Code quality and testing
- Build optimization