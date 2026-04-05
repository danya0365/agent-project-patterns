#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import inquirer from 'inquirer';

import { PATTERNS, DEFAULT_DEST, ALT_DESTINATIONS } from '../src/registry.js';
import { copyPattern, checkPatternVersion, detectInstalledDirs } from '../src/copy.js';

const program = new Command();

const log = {
  success: (msg) => console.log(chalk.green('✅ ' + msg)),
  warn:    (msg) => console.log(chalk.yellow('⚠️  ' + msg)),
  error:   (msg) => console.log(chalk.red('❌ ' + msg)),
  info:    (msg) => console.log(chalk.cyan('ℹ️  ' + msg)),
  dim:     (msg) => console.log(chalk.dim(msg)),
  title:   (msg) => console.log('\n' + chalk.bold.white(msg)),
};

function printBanner() {
  console.log(chalk.bold.cyan('\n╔══════════════════════════════════════════╗'));
  console.log(chalk.bold.cyan('║') + chalk.bold.white('   🤖  @dan/agent-patterns  CLI           ') + chalk.bold.cyan('║'));
  console.log(chalk.bold.cyan('╚══════════════════════════════════════════╝\n'));
}

// ─── init ────────────────────────────────────────────────────────────────────

program
  .command('init')
  .description('Copy all patterns into the current project')
  .option('-d, --dest <dir>', 'Destination directory', DEFAULT_DEST)
  .option('-f, --force', 'Overwrite existing pattern folders', false)
  .option('-y, --yes', 'Skip prompts, use defaults', false)
  .action(async (options) => {
    printBanner();
    log.title('Initializing agent patterns...');
    log.dim(`Project: ${process.cwd()}\n`);

    let dest = options.dest;

    if (!options.yes && dest === DEFAULT_DEST) {
      const answer = await inquirer.prompt([{
        type: 'list',
        name: 'dest',
        message: 'Where should patterns be installed?',
        choices: ALT_DESTINATIONS,
        default: DEFAULT_DEST,
      }]);
      dest = answer.dest;
    }

    let copied = 0, skipped = 0, failed = 0;

    for (const pattern of PATTERNS) {
      const result = copyPattern(pattern, dest, { overwrite: options.force });
      const label = `${dest}/${pattern.folder}/`;

      if (result.success) {
        log.success(`${pattern.id.padEnd(16)} →  ${label}`);
        copied++;
      } else if (result.skipped) {
        log.warn(`${pattern.id.padEnd(16)} already exists (--force to overwrite)`);
        skipped++;
      } else {
        log.error(`${pattern.id.padEnd(16)} failed: ${result.reason}`);
        failed++;
      }
    }

    console.log('');
    log.info(`Copied: ${copied}  |  Skipped: ${skipped}  |  Failed: ${failed}`);

    if (copied > 0) {
      console.log('');
      console.log(chalk.bold('📌 Structure ที่สร้าง:'));
      for (const pattern of PATTERNS) {
        log.dim(`  ${dest}/${pattern.folder}/`);
        log.dim(`    ├── PATTERN.md          ← AI อ่านตอน activate`);
        log.dim(`    └── references/         ← detail เต็มๆ`);
      }
    }
    console.log('');
  });

// ─── add ─────────────────────────────────────────────────────────────────────

program
  .command('add [patternId]')
  .description('Copy a specific pattern into the current project')
  .option('-d, --dest <dir>', 'Destination directory', DEFAULT_DEST)
  .option('-f, --force', 'Overwrite existing pattern folder', false)
  .action(async (patternId, options) => {
    printBanner();

    if (!patternId) {
      const answer = await inquirer.prompt([{
        type: 'list',
        name: 'pattern',
        message: 'Which pattern do you want to add?',
        choices: PATTERNS.map((p) => ({
          name: `${p.id.padEnd(20)} ${chalk.dim(p.description)}`,
          value: p.id,
        })),
      }]);
      patternId = answer.pattern;
    }

    const pattern = PATTERNS.find((p) => p.id === patternId);
    if (!pattern) {
      log.error(`Pattern "${patternId}" not found.`);
      log.info(`Available: ${PATTERNS.map((p) => p.id).join(', ')}`);
      process.exit(1);
    }

    const result = copyPattern(pattern, options.dest, { overwrite: options.force });

    if (result.success) {
      log.success(`${pattern.id}  →  ${options.dest}/${pattern.folder}/`);
      log.dim(`  ├── PATTERN.md`);
      log.dim(`  └── references/`);
    } else if (result.skipped) {
      log.warn(`${options.dest}/${pattern.folder}/ already exists. Use --force to overwrite.`);
    } else {
      log.error(`Failed: ${result.reason}`);
      process.exit(1);
    }
    console.log('');
  });

// ─── check ───────────────────────────────────────────────────────────────────

program
  .command('check')
  .description('Check if installed patterns are up-to-date (compares PATTERN.md)')
  .option('-d, --dest <dir>', 'Directory to check')
  .action(async (options) => {
    printBanner();
    log.title('Checking pattern versions...\n');

    const dirs = options.dest ? [options.dest] : detectInstalledDirs(PATTERNS);

    if (dirs.length === 0) {
      log.warn('No patterns found in this project.');
      log.info('Run "agent-patterns init" to install patterns.');
      return;
    }

    let allUpToDate = true;

    for (const dir of dirs) {
      console.log(chalk.bold(`📁 ${dir}/`));
      for (const pattern of PATTERNS) {
        const { exists, upToDate } = checkPatternVersion(pattern, dir);
        if (!exists) {
          console.log(`   ${chalk.dim('○')} ${pattern.id.padEnd(20)} ${chalk.dim('not installed')}`);
        } else if (upToDate) {
          console.log(`   ${chalk.green('✓')} ${pattern.id.padEnd(20)} ${chalk.green('up to date')}`);
        } else {
          console.log(`   ${chalk.yellow('!')} ${pattern.id.padEnd(20)} ${chalk.yellow('outdated')}`);
          allUpToDate = false;
        }
      }
      console.log('');
    }

    if (!allUpToDate) log.info('Run "agent-patterns update" to update outdated patterns.');
    else log.success('All patterns are up to date!');
  });

// ─── update ──────────────────────────────────────────────────────────────────

program
  .command('update')
  .description('Update outdated patterns in the project')
  .option('-d, --dest <dir>', 'Directory to update')
  .action(async (options) => {
    printBanner();
    log.title('Updating patterns...\n');

    const dirs = options.dest ? [options.dest] : detectInstalledDirs(PATTERNS);

    if (dirs.length === 0) {
      log.warn('No patterns found in this project.');
      return;
    }

    for (const dir of dirs) {
      console.log(chalk.bold(`📁 ${dir}/`));
      for (const pattern of PATTERNS) {
        const { exists, upToDate } = checkPatternVersion(pattern, dir);
        if (!exists) { log.dim(`   Skipping ${pattern.id} (not installed)`); continue; }
        if (upToDate) { console.log(`   ${chalk.green('✓')} ${pattern.id}  already up to date`); continue; }

        const result = copyPattern(pattern, dir, { overwrite: true });
        if (result.success) log.success(`Updated: ${pattern.id}`);
        else log.error(`Failed to update ${pattern.id}: ${result.reason}`);
      }
      console.log('');
    }
  });

// ─── list ────────────────────────────────────────────────────────────────────

program
  .command('list')
  .description('List all available skills')
  .action(() => {
    printBanner();
    log.title('Available Skills:\n');
    for (const s of SKILLS) {
      console.log(`  ${chalk.bold.cyan(s.id.padEnd(20))} ${s.description}`);
      console.log(`  ${chalk.dim(''.padEnd(20))} Tags: ${s.tags.join(', ')}`);
      console.log('');
    }
  });

// ─── run ─────────────────────────────────────────────────────────────────────

program
  .name('agent-patterns')
  .description('Scaffold Agent Patterns into your Next.js project')
  .version('1.0.0');

program.parse(process.argv);
