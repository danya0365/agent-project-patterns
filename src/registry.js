/**
 * Skills Registry
 * ทุก skill คือ folder ที่มี SKILL.md + references/
 * เพิ่ม skill ใหม่ได้ที่นี่ — CLI จะ auto-discover ให้เลย
 */

export const SKILLS = [
  {
    id: "nextjs-create-page",
    folder: "nextjs-create-page",
    description:
      "สร้าง page ใหม่ตาม Clean Architecture สำหรับ Next.js (Repository → Presenter → View)",
    tags: ["nextjs", "page", "presenter", "repository", "view"],
  },
  {
    id: "nextjs-create-repo",
    folder: "nextjs-create-repo",
    description:
      "สร้าง Repository ใหม่สำหรับ Next.js (Interface → Mock → Supabase → API)",
    tags: ["nextjs", "repository", "supabase", "mock", "api"],
  },
  {
    id: "nextjs-init-project",
    folder: "nextjs-init-project",
    description:
      "เริ่มต้นโปรเจค Next.js ใหม่ตาม Clean Architecture (Supabase, Tailwind, Zustand)",
    tags: ["nextjs", "init", "setup", "architecture"],
  },
  {
    id: "nextjs-theme-css",
    folder: "nextjs-theme-css",
    description:
      "กฎการเขียน CSS Theme Variables สำหรับ Next.js + Tailwind v4 - :root → .dark → @theme",
    tags: ["nextjs", "css", "theme", "tailwind", "variables", "dark-mode"],
  },
  {
    id: "nextjs-multi-theme",
    folder: "nextjs-multi-theme",
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
  {
    id: "nextjs-supabase-repo-pattern",
    folder: "nextjs-supabase-repo-pattern",
    description:
      "Supabase Repository Pattern ด้วย Abstract Base + Role Split (UserRepo / AdminRepo)",
    tags: ["nextjs", "supabase", "repository", "abstract-base", "role-split"],
  },
  {
    id: "nextjs-demo-flow",
    folder: "nextjs-demo-flow",
    description:
      "สร้างระบบ Demo Flow สำหรับนำเสนอโปรเจคให้ลูกค้า (Groups → Scenarios → Journeys + Presentation Mode)",
    tags: [
      "nextjs",
      "demo-flow",
      "presentation",
      "scenarios",
      "journeys",
      "mock-pages",
    ],
  },
  {
    id: "nextjs-use-case-pattern",
    folder: "nextjs-use-case-pattern",
    description:
      "เพิ่ม Use Case layer ระหว่าง Repository และ Presenter เพื่อให้ business logic ร่วมใช้ได้หลาย page/context",
    tags: ["nextjs", "clean-architecture", "use-case", "presenter", "refactor"],
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
