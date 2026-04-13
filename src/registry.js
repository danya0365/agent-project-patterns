/**
 * Skills Registry
 * ทุก skill คือ folder ที่มี SKILL.md + references/
 * เพิ่ม skill ใหม่ได้ที่นี่ — CLI จะ auto-discover ให้เลย
 */

export const SKILLS = [
  {
    id: "create-page",
    folder: "create-page",
    description:
      "สร้าง page ใหม่ตาม Clean Architecture (Repository → Presenter → View)",
    tags: ["page", "presenter", "repository", "view"],
  },
  {
    id: "create-repo",
    folder: "create-repo",
    description: "สร้าง Repository ใหม่ (Interface → Mock → Supabase → API)",
    tags: ["repository", "supabase", "mock", "api"],
  },
  {
    id: "init-project",
    folder: "init-project",
    description:
      "เริ่มต้นโปรเจคใหม่ตาม Clean Architecture (Next.js, Supabase, Tailwind, Zustand)",
    tags: ["init", "setup", "architecture", "nextjs"],
  },
  {
    id: "css-theme-variables",
    folder: "css-theme-variables",
    description:
      "กฎการเขียน CSS Theme Variables (Next.js + Tailwind v4) - :root → .dark → @theme",
    tags: ["css", "theme", "tailwind", "variables", "dark-mode"],
  },
  {
    id: "multi-theme-nextjs",
    folder: "multi-theme-nextjs",
    description:
      "Next.js Multi-Theme System ด้วย CSS Variables + Zustand + Runtime Switching (core, minimal, retro-megazine)",
    tags: [
      "nextjs",
      "multi-theme",
      "zustand",
      "css-variables",
      "runtime-switching",
    ],
  },
  // ➕ เพิ่ม skill ใหม่ตรงนี้
];

export const DEFAULT_DEST = ".agents/skills";

export const ALT_DESTINATIONS = [
  {
    label: ".agents/skills/  (Industry Standard — recommended)",
    value: ".agents/skills",
  },
  { label: ".antigravity/    (Antigravity Agent)", value: ".antigravity" },
  { label: ".windsurf/rules/ (Windsurf rules)", value: ".windsurf/rules" },
  { label: ".cursor/rules/   (Cursor AI context)", value: ".cursor/rules" },
  { label: ".claude/patterns (Claude Code)", value: ".claude/patterns" },
  { label: "docs/skills/     (Documentation)", value: "docs/skills" },
];
