/**
 * Pattern Registry
 * ทุก pattern คือ folder ที่มี PATTERN.md + references/
 * เพิ่ม pattern ใหม่ได้ที่นี่ — CLI จะ auto-discover ให้เลย
 */

export const PATTERNS = [
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
  // ➕ เพิ่ม pattern ใหม่ตรงนี้
];

export const DEFAULT_DEST = '.agent';

export const ALT_DESTINATIONS = [
  { label: '.agent/          (Agent Patterns — default)', value: '.agent' },
  { label: '.cursor/rules/   (Cursor AI context)', value: '.cursor/rules' },
  { label: '.claude/patterns (Claude Code)', value: '.claude/patterns' },
  { label: 'docs/patterns/   (Documentation)', value: 'docs/patterns' },
];
