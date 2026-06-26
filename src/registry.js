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
  {
    id: "nextjs-clean-arch-drizzle",
    folder: "nextjs-clean-arch-drizzle",
    description:
      "โครงสร้าง Clean Architecture แบบ Next.js + Turso/Drizzle (DI container → Repository → Use Case → Server Action, custom session auth)",
    tags: [
      "nextjs",
      "clean-architecture",
      "drizzle",
      "turso",
      "di-container",
      "server-actions",
    ],
  },
  {
    id: "nextjs-semantic-theme",
    folder: "nextjs-semantic-theme",
    description:
      "Next.js gen-3 theming: shared semantic tokens สลับด้วย [data-theme] + per-theme dark (ramp inversion) + status/accent/on-brand + per-theme fonts + Zustand persist/FOUC script",
    tags: [
      "nextjs",
      "theme",
      "tailwind",
      "semantic-tokens",
      "dark-mode",
      "zustand",
      "multi-theme",
    ],
  },
  {
    id: "nextjs-versioning",
    folder: "nextjs-versioning",
    description:
      "ตั้งระบบ versioning แบบ feature-based SemVer + version แหล่งเดียวใน package.json + npm version hook (CHANGELOG) + ฝัง version ลง footer พร้อม commit sha",
    tags: ["nextjs", "versioning", "semver", "release", "changelog"],
  },
  {
    id: "nextjs-saas-starter",
    folder: "nextjs-saas-starter",
    description:
      "ใช้ repo saas-starter (Next.js 16 + Turso/Drizzle + Clean Architecture) เป็นจุดเริ่ม SaaS ใหม่ — auth/2FA, security/audit, multi-tenant, billing, notification, theme พร้อมใช้ + ฟีเจอร์ตัวอย่าง items ให้ลอกสร้างโดเมนใหม่",
    tags: [
      "nextjs",
      "saas",
      "starter",
      "boilerplate",
      "multi-tenant",
      "clean-architecture",
      "drizzle",
    ],
  },
  {
    id: "nextjs-hexagonal-repo",
    folder: "nextjs-hexagonal-repo",
    description:
      "Data-access แบบ hexagonal (ports & adapters) + Result<T> ไม่ throw + role-split (User RLS / Admin service-role) + contract test (describe.each) — วิวัฒนาการ testability-first ของ supabase-repo-pattern",
    tags: [
      "nextjs",
      "supabase",
      "hexagonal",
      "ports-adapters",
      "result-type",
      "role-split",
      "contract-test",
    ],
  },
  {
    id: "nextjs-monorepo-versioning",
    folder: "nextjs-monorepo-versioning",
    description:
      "Feature-based SemVer สำหรับ monorepo (pnpm + Turborepo) — version แหล่งเดียวที่แอป deploy + ฝัง version/sha ลง footer + release ผ่าน pnpm version (ฉบับ monorepo ของ nextjs-versioning)",
    tags: [
      "nextjs",
      "versioning",
      "semver",
      "monorepo",
      "pnpm",
      "turborepo",
      "release",
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
