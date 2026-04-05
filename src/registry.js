/**
 * Skill Registry
 * ทุก skill คือ folder ที่มี SKILL.md + references/ ตาม Agent Skills format
 * เพิ่ม skill ใหม่ได้ที่นี่ — CLI จะ auto-discover ให้เลย
 */

export const SKILLS = [
  {
    id: 'create-page',
    folder: 'create-page',
    description: 'สร้าง page ใหม่ตาม Clean Architecture (Repository → Presenter → View)',
    tags: ['page', 'presenter', 'repository', 'view'],
  },
  {
    id: 'create-repo',
    folder: 'create-repo',
    description: 'สร้าง Repository ใหม่ (Interface → Mock → Supabase → API)',
    tags: ['repository', 'supabase', 'mock', 'api'],
  },
  // ➕ เพิ่ม skill ใหม่ตรงนี้
];

export const DEFAULT_DEST = '.agent';

export const ALT_DESTINATIONS = [
  { label: '.agent/          (Agent Skills — default)', value: '.agent' },
  { label: '.cursor/rules/   (Cursor AI context)', value: '.cursor/rules' },
  { label: '.claude/skills/  (Claude Code)', value: '.claude/skills' },
  { label: 'docs/skills/     (Documentation)', value: 'docs/skills' },
];
