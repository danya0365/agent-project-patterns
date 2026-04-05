#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import inquirer from 'inquirer';

import { SKILLS, DEFAULT_DEST, ALT_DESTINATIONS } from '../src/registry.js';
import { copySkill, checkSkillVersion, detectInstalledDirs } from '../src/copy.js';

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
  console.log(chalk.bold.cyan('║') + chalk.bold.white('   🤖  @dan/agent-skills  CLI             ') + chalk.bold.cyan('║'));
  console.log(chalk.bold.cyan('╚══════════════════════════════════════════╝\n'));
}

// ─── init ────────────────────────────────────────────────────────────────────

program
  .command('init')
  .description('Copy all skills into the current project')
  .option('-d, --dest <dir>', 'Destination directory', DEFAULT_DEST)
  .option('-f, --force', 'Overwrite existing skill folders', false)
  .option('-y, --yes', 'Skip prompts, use defaults', false)
  .action(async (options) => {
    printBanner();
    log.title('Initializing agent skills...');
    log.dim(`Project: ${process.cwd()}\n`);

    let dest = options.dest;

    if (!options.yes && dest === DEFAULT_DEST) {
      const answer = await inquirer.prompt([{
        type: 'list',
        name: 'dest',
        message: 'Where should skills be installed?',
        choices: ALT_DESTINATIONS,
        default: DEFAULT_DEST,
      }]);
      dest = answer.dest;
    }

    let copied = 0, skipped = 0, failed = 0;

    for (const skill of SKILLS) {
      const result = copySkill(skill, dest, { overwrite: options.force });
      const label = `${dest}/${skill.folder}/`;

      if (result.success) {
        log.success(`${skill.id.padEnd(16)} →  ${label}`);
        copied++;
      } else if (result.skipped) {
        log.warn(`${skill.id.padEnd(16)} already exists (--force to overwrite)`);
        skipped++;
      } else {
        log.error(`${skill.id.padEnd(16)} failed: ${result.reason}`);
        failed++;
      }
    }

    console.log('');
    log.info(`Copied: ${copied}  |  Skipped: ${skipped}  |  Failed: ${failed}`);

    if (copied > 0) {
      console.log('');
      console.log(chalk.bold('📌 Structure ที่สร้าง:'));
      for (const skill of SKILLS) {
        log.dim(`  ${dest}/${skill.folder}/`);
        log.dim(`    ├── SKILL.md            ← AI อ่านตอน activate`);
        log.dim(`    └── references/         ← detail เต็มๆ`);
      }
    }
    console.log('');
  });

// ─── add ─────────────────────────────────────────────────────────────────────

program
  .command('add [skillId]')
  .description('Copy a specific skill into the current project')
  .option('-d, --dest <dir>', 'Destination directory', DEFAULT_DEST)
  .option('-f, --force', 'Overwrite existing skill folder', false)
  .action(async (skillId, options) => {
    printBanner();

    if (!skillId) {
      const answer = await inquirer.prompt([{
        type: 'list',
        name: 'skill',
        message: 'Which skill do you want to add?',
        choices: SKILLS.map((s) => ({
          name: `${s.id.padEnd(20)} ${chalk.dim(s.description)}`,
          value: s.id,
        })),
      }]);
      skillId = answer.skill;
    }

    const skill = SKILLS.find((s) => s.id === skillId);
    if (!skill) {
      log.error(`Skill "${skillId}" not found.`);
      log.info(`Available: ${SKILLS.map((s) => s.id).join(', ')}`);
      process.exit(1);
    }

    const result = copySkill(skill, options.dest, { overwrite: options.force });

    if (result.success) {
      log.success(`${skill.id}  →  ${options.dest}/${skill.folder}/`);
      log.dim(`  ├── SKILL.md`);
      log.dim(`  └── references/`);
    } else if (result.skipped) {
      log.warn(`${options.dest}/${skill.folder}/ already exists. Use --force to overwrite.`);
    } else {
      log.error(`Failed: ${result.reason}`);
      process.exit(1);
    }
    console.log('');
  });

// ─── check ───────────────────────────────────────────────────────────────────

program
  .command('check')
  .description('Check if installed skills are up-to-date (compares SKILL.md)')
  .option('-d, --dest <dir>', 'Directory to check')
  .action(async (options) => {
    printBanner();
    log.title('Checking skill versions...\n');

    const dirs = options.dest ? [options.dest] : detectInstalledDirs(SKILLS);

    if (dirs.length === 0) {
      log.warn('No skills found in this project.');
      log.info('Run "agent-skills init" to install skills.');
      return;
    }

    let allUpToDate = true;

    for (const dir of dirs) {
      console.log(chalk.bold(`📁 ${dir}/`));
      for (const skill of SKILLS) {
        const { exists, upToDate } = checkSkillVersion(skill, dir);
        if (!exists) {
          console.log(`   ${chalk.dim('○')} ${skill.id.padEnd(20)} ${chalk.dim('not installed')}`);
        } else if (upToDate) {
          console.log(`   ${chalk.green('✓')} ${skill.id.padEnd(20)} ${chalk.green('up to date')}`);
        } else {
          console.log(`   ${chalk.yellow('!')} ${skill.id.padEnd(20)} ${chalk.yellow('outdated')}`);
          allUpToDate = false;
        }
      }
      console.log('');
    }

    if (!allUpToDate) log.info('Run "agent-skills update" to update outdated skills.');
    else log.success('All skills are up to date!');
  });

// ─── update ──────────────────────────────────────────────────────────────────

program
  .command('update')
  .description('Update outdated skills in the project')
  .option('-d, --dest <dir>', 'Directory to update')
  .action(async (options) => {
    printBanner();
    log.title('Updating skills...\n');

    const dirs = options.dest ? [options.dest] : detectInstalledDirs(SKILLS);

    if (dirs.length === 0) {
      log.warn('No skills found in this project.');
      return;
    }

    for (const dir of dirs) {
      console.log(chalk.bold(`📁 ${dir}/`));
      for (const skill of SKILLS) {
        const { exists, upToDate } = checkSkillVersion(skill, dir);
        if (!exists) { log.dim(`   Skipping ${skill.id} (not installed)`); continue; }
        if (upToDate) { console.log(`   ${chalk.green('✓')} ${skill.id}  already up to date`); continue; }

        const result = copySkill(skill, dir, { overwrite: true });
        if (result.success) log.success(`Updated: ${skill.id}`);
        else log.error(`Failed to update ${skill.id}: ${result.reason}`);
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
  .name('agent-skills')
  .description('Scaffold Agent Skills (agentskills.io format) into your Next.js project')
  .version('1.0.0');

program.parse(process.argv);
