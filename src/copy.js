import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SKILLS_DIR = path.join(__dirname, '..', 'skills');

/**
 * Copy a single skill folder (SKILL.md + references/) to destination
 * Result: destDir/skill-folder/ ← folder ทั้งหมด
 */
export function copySkill(skill, destDir, { overwrite = false } = {}) {
  const srcFolder = path.join(SKILLS_DIR, skill.folder);
  const destFolder = path.join(process.cwd(), destDir, skill.folder);

  if (!fs.existsSync(srcFolder)) {
    return { success: false, skipped: false, destFolder, reason: `Source folder not found: ${srcFolder}` };
  }

  if (fs.existsSync(destFolder) && !overwrite) {
    return { success: false, skipped: true, destFolder, reason: 'already exists' };
  }

  try {
    copyDirRecursive(srcFolder, destFolder);
    return { success: true, skipped: false, destFolder };
  } catch (err) {
    return { success: false, skipped: false, destFolder, reason: err.message };
  }
}

function copyDirRecursive(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDirRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

/**
 * Check if a skill folder is up-to-date by comparing SKILL.md content
 */
export function checkSkillVersion(skill, destDir) {
  const srcSkillMd = path.join(SKILLS_DIR, skill.folder, 'SKILL.md');
  const destSkillMd = path.join(process.cwd(), destDir, skill.folder, 'SKILL.md');

  if (!fs.existsSync(destSkillMd)) {
    return { exists: false, upToDate: false };
  }

  const srcContent = fs.readFileSync(srcSkillMd, 'utf8');
  const destContent = fs.readFileSync(destSkillMd, 'utf8');
  return { exists: true, upToDate: srcContent === destContent };
}

/**
 * Auto-detect directories in the current project that have skill folders
 */
export function detectInstalledDirs(skills) {
  const candidates = [
    '.agents/skills',
    '.antigravity',
    '.windsurf/rules',
    '.cursor/rules',
    '.claude/patterns',
    '.agent',
    'docs/skills'
  ];
  const found = [];

  for (const dir of candidates) {
    const absDir = path.join(process.cwd(), dir);
    if (!fs.existsSync(absDir)) continue;
    const hasAny = skills.some((s) =>
      fs.existsSync(path.join(absDir, s.folder, 'SKILL.md'))
    );
    if (hasAny) found.push(dir);
  }

  return found;
}
