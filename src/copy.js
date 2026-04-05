import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PATTERNS_DIR = path.join(__dirname, '..', 'patterns');

/**
 * Copy a single pattern folder (PATTERN.md + references/) to destination
 * Result: destDir/pattern-folder/ ← folder ทั้งหมด
 */
export function copyPattern(pattern, destDir, { overwrite = false } = {}) {
  const srcFolder = path.join(PATTERNS_DIR, pattern.folder);
  const destFolder = path.join(process.cwd(), destDir, pattern.folder);

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
 * Check if a pattern folder is up-to-date by comparing PATTERN.md content
 */
export function checkPatternVersion(pattern, destDir) {
  const srcPatternMd = path.join(PATTERNS_DIR, pattern.folder, 'PATTERN.md');
  const destPatternMd = path.join(process.cwd(), destDir, pattern.folder, 'PATTERN.md');

  if (!fs.existsSync(destPatternMd)) {
    return { exists: false, upToDate: false };
  }

  const srcContent = fs.readFileSync(srcPatternMd, 'utf8');
  const destContent = fs.readFileSync(destPatternMd, 'utf8');
  return { exists: true, upToDate: srcContent === destContent };
}

/**
 * Auto-detect directories in the current project that have pattern folders
 */
export function detectInstalledDirs(patterns) {
  const candidates = ['.agent', '.cursor/rules', '.claude/patterns', 'docs/patterns'];
  const found = [];

  for (const dir of candidates) {
    const absDir = path.join(process.cwd(), dir);
    if (!fs.existsSync(absDir)) continue;
    const hasAny = patterns.some((p) =>
      fs.existsSync(path.join(absDir, p.folder, 'PATTERN.md'))
    );
    if (hasAny) found.push(dir);
  }

  return found;
}
