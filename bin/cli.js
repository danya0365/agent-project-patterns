#!/usr/bin/env node

import chalk from "chalk";
import { Command } from "commander";
import inquirer from "inquirer";

import {
  checkSkillVersion,
  copySkill,
  detectInstalledDirs,
} from "../src/copy.js";
import { ALT_DESTINATIONS, DEFAULT_DEST, SKILLS } from "../src/registry.js";

// Helper: Get unique stacks from skills
function getStacks() {
  const stacks = new Set();
  for (const skill of SKILLS) {
    const stack = skill.tags.find(
      (t) =>
        ![
          "page",
          "presenter",
          "repository",
          "view",
          "init",
          "setup",
          "architecture",
          "css",
          "theme",
          "tailwind",
          "variables",
          "dark-mode",
          "multi-theme",
          "zustand",
          "css-variables",
          "runtime-switching",
          "mock",
          "api",
          "supabase",
        ].includes(t),
    );
    if (stack) stacks.add(stack);
  }
  return Array.from(stacks).sort();
}

// Helper: Filter skills by stack(s)
function filterSkillsByStack(stack) {
  if (!stack || stack === "all") return SKILLS;
  if (Array.isArray(stack)) {
    if (stack.includes("all") || stack.length === 0) return SKILLS;
    return SKILLS.filter((s) => stack.some((st) => s.tags.includes(st)));
  }
  return SKILLS.filter((s) => s.tags.includes(stack));
}

const program = new Command();

const log = {
  success: (msg) => console.log(chalk.green("✅ " + msg)),
  warn: (msg) => console.log(chalk.yellow("⚠️  " + msg)),
  error: (msg) => console.log(chalk.red("❌ " + msg)),
  info: (msg) => console.log(chalk.cyan("ℹ️  " + msg)),
  dim: (msg) => console.log(chalk.dim(msg)),
  title: (msg) => console.log("\n" + chalk.bold.white(msg)),
};

function printBanner() {
  console.log(
    chalk.bold.cyan("\n╔══════════════════════════════════════════╗"),
  );
  console.log(
    chalk.bold.cyan("║") +
      chalk.bold.white("   🤖  @dan/agent-patterns  CLI           ") +
      chalk.bold.cyan("║"),
  );
  console.log(
    chalk.bold.cyan("╚══════════════════════════════════════════╝\n"),
  );
}

// ─── init ────────────────────────────────────────────────────────────────────

program
  .command("init")
  .description(
    "Copy skills into the current project (optionally filter by stack)",
  )
  .option("-d, --dest <dir>", "Destination directory", DEFAULT_DEST)
  .option("-f, --force", "Overwrite existing skill folders", false)
  .option("-y, --yes", "Skip prompts, use defaults", false)
  .option(
    "-s, --stack <stack>",
    "Filter by stack (comma-separated for multiple)",
  )
  .action(async (options) => {
    printBanner();
    log.title("Initializing agent skills...");
    log.dim(`Project: ${process.cwd()}\n`);

    let dest = options.dest;
    let selectedStacks = options.stack
      ? options.stack.split(",").map((s) => s.trim())
      : null;

    // Stack selection prompt if not provided
    if (!selectedStacks && !options.yes) {
      const stacks = getStacks();
      const answer = await inquirer.prompt([
        {
          type: "checkbox",
          name: "stacks",
          message:
            "Select stack(s) to install (Space to select, Enter to confirm, or select 'all')",
          choices: [
            {
              name: `📦 All stacks (${SKILLS.length} skills)`,
              value: "all",
              checked: true,
            },
            new inquirer.Separator(),
            ...stacks.map((s) => ({
              name: `${s} (${filterSkillsByStack(s).length} skills)`,
              value: s,
            })),
          ],
          validate: (input) =>
            input.length > 0 || "Please select at least one option",
        },
      ]);
      selectedStacks = answer.stacks;
    }

    // Destination prompt
    if (!options.yes && dest === DEFAULT_DEST) {
      const answer = await inquirer.prompt([
        {
          type: "list",
          name: "dest",
          message: "Where should skills be installed?",
          choices: ALT_DESTINATIONS,
          default: DEFAULT_DEST,
        },
      ]);
      dest = answer.dest;
    }

    let skillsToInstall = filterSkillsByStack(selectedStacks);

    if (skillsToInstall.length === 0) {
      log.warn(`No skills found for selected stack(s)`);
      return;
    }

    // Individual skill selection (if not using --yes)
    if (!options.yes && skillsToInstall.length > 1) {
      const answer = await inquirer.prompt([
        {
          type: "checkbox",
          name: "skills",
          message: `Select skills to install (${skillsToInstall.length} available)`,
          choices: [
            {
              name: `📦 All skills (${skillsToInstall.length})`,
              value: "all",
              checked: true,
            },
            new inquirer.Separator(),
            ...skillsToInstall.map((s) => ({
              name: `  ${s.id.padEnd(20)} ${chalk.dim(s.description.substring(0, 50))}`,
              value: s.id,
            })),
          ],
          validate: (input) =>
            input.length > 0 || "Please select at least one skill",
        },
      ]);

      if (!answer.skills.includes("all")) {
        skillsToInstall = skillsToInstall.filter((s) =>
          answer.skills.includes(s.id),
        );
      }
    }

    const stackDisplay =
      selectedStacks && !selectedStacks.includes("all")
        ? `[${selectedStacks.join(", ")}]`
        : "all stacks";
    log.info(
      `Installing ${skillsToInstall.length} skill(s) for ${stackDisplay}...\n`,
    );

    let copied = 0,
      skipped = 0,
      failed = 0;

    for (const skill of skillsToInstall) {
      const result = copySkill(skill, dest, { overwrite: options.force });
      const label = `${dest}/${skill.folder}/`;

      if (result.success) {
        log.success(`${skill.id.padEnd(20)} →  ${label}`);
        copied++;
      } else if (result.skipped) {
        log.warn(
          `${skill.id.padEnd(20)} already exists (--force to overwrite)`,
        );
        skipped++;
      } else {
        log.error(`${skill.id.padEnd(20)} failed: ${result.reason}`);
        failed++;
      }
    }

    console.log("");
    log.info(`Copied: ${copied}  |  Skipped: ${skipped}  |  Failed: ${failed}`);

    if (copied > 0) {
      console.log("");
      console.log(chalk.bold("📌 Structure ที่สร้าง:"));
      for (const skill of skillsToInstall) {
        log.dim(`  ${dest}/${skill.folder}/`);
        log.dim(`    ├── SKILL.md            ← AI อ่านตอน activate`);
        log.dim(`    └── references/         ← detail เต็มๆ`);
      }
    }
    console.log("");
  });

// ─── add ─────────────────────────────────────────────────────────────────────

program
  .command("add [skillId]")
  .description("Copy a specific skill into the current project")
  .option("-d, --dest <dir>", "Destination directory", DEFAULT_DEST)
  .option("-f, --force", "Overwrite existing skill folder", false)
  .option("-s, --stack <stack>", "Filter skills by stack")
  .action(async (skillId, options) => {
    printBanner();

    let availableSkills = options.stack
      ? filterSkillsByStack(options.stack)
      : SKILLS;

    if (availableSkills.length === 0) {
      log.warn(`No skills found for stack: ${options.stack}`);
      return;
    }

    if (!skillId) {
      // Group skills by stack for the prompt
      const stacks = getStacks();
      const choices = [];

      for (const stack of stacks) {
        const stackSkills = availableSkills.filter((s) =>
          s.tags.includes(stack),
        );
        if (stackSkills.length === 0) continue;

        choices.push(new inquirer.Separator(`─── ${stack.toUpperCase()} ───`));
        for (const s of stackSkills) {
          choices.push({
            name: `  ${s.id.padEnd(20)} ${chalk.dim(s.description.substring(0, 40))}`,
            value: s.id,
          });
        }
      }

      const answer = await inquirer.prompt([
        {
          type: "list",
          name: "skill",
          message: options.stack
            ? `Which skill do you want to add? [${options.stack}]`
            : "Which skill do you want to add?",
          choices,
          pageSize: 15,
        },
      ]);
      skillId = answer.skill;
    }

    const skill = SKILLS.find((s) => s.id === skillId);
    if (!skill) {
      log.error(`Skill "${skillId}" not found.`);
      log.info(`Available: ${SKILLS.map((s) => s.id).join(", ")}`);
      process.exit(1);
    }

    const result = copySkill(skill, options.dest, { overwrite: options.force });

    if (result.success) {
      log.success(`${skill.id}  →  ${options.dest}/${skill.folder}/`);
      log.dim(`  ├── SKILL.md`);
      log.dim(`  └── references/`);
    } else if (result.skipped) {
      log.warn(
        `${options.dest}/${skill.folder}/ already exists. Use --force to overwrite.`,
      );
    } else {
      log.error(`Failed: ${result.reason}`);
      process.exit(1);
    }
    console.log("");
  });

// ─── check ───────────────────────────────────────────────────────────────────

program
  .command("check")
  .description("Check if installed skills are up-to-date (compares SKILL.md)")
  .option("-d, --dest <dir>", "Directory to check")
  .action(async (options) => {
    printBanner();
    log.title("Checking skill versions...\n");

    const dirs = options.dest ? [options.dest] : detectInstalledDirs(SKILLS);

    if (dirs.length === 0) {
      log.warn("No skills found in this project.");
      log.info('Run "agent-patterns init" to install skills.');
      return;
    }

    let allUpToDate = true;

    for (const dir of dirs) {
      console.log(chalk.bold(`📁 ${dir}/`));
      for (const skill of SKILLS) {
        const { exists, upToDate } = checkSkillVersion(skill, dir);
        if (!exists) {
          console.log(
            `   ${chalk.dim("○")} ${skill.id.padEnd(20)} ${chalk.dim("not installed")}`,
          );
        } else if (upToDate) {
          console.log(
            `   ${chalk.green("✓")} ${skill.id.padEnd(20)} ${chalk.green("up to date")}`,
          );
        } else {
          console.log(
            `   ${chalk.yellow("!")} ${skill.id.padEnd(20)} ${chalk.yellow("outdated")}`,
          );
          allUpToDate = false;
        }
      }
      console.log("");
    }

    if (!allUpToDate)
      log.info('Run "agent-patterns update" to update outdated skills.');
    else log.success("All skills are up to date!");
  });

// ─── update ──────────────────────────────────────────────────────────────────

program
  .command("update")
  .description("Update outdated skills in the project")
  .option("-d, --dest <dir>", "Directory to update")
  .action(async (options) => {
    printBanner();
    log.title("Updating skills...\n");

    const dirs = options.dest ? [options.dest] : detectInstalledDirs(SKILLS);

    if (dirs.length === 0) {
      log.warn("No skills found in this project.");
      return;
    }

    for (const dir of dirs) {
      console.log(chalk.bold(`📁 ${dir}/`));
      for (const skill of SKILLS) {
        const { exists, upToDate } = checkSkillVersion(skill, dir);
        if (!exists) {
          log.dim(`   Skipping ${skill.id} (not installed)`);
          continue;
        }
        if (upToDate) {
          console.log(`   ${chalk.green("✓")} ${skill.id}  already up to date`);
          continue;
        }

        const result = copySkill(skill, dir, { overwrite: true });
        if (result.success) log.success(`Updated: ${skill.id}`);
        else log.error(`Failed to update ${skill.id}: ${result.reason}`);
      }
      console.log("");
    }
  });

// ─── list ────────────────────────────────────────────────────────────────────

program
  .command("list")
  .description("List all available skills (grouped by stack)")
  .option("-s, --stack <stack>", "Filter by stack")
  .action((options) => {
    printBanner();

    const stacks = getStacks();
    const skillsToShow = options.stack
      ? filterSkillsByStack(options.stack)
      : SKILLS;

    if (skillsToShow.length === 0) {
      log.warn(`No skills found for stack: ${options.stack}`);
      return;
    }

    if (options.stack) {
      log.title(`Available Skills for [${options.stack}]:\n`);
      for (const s of skillsToShow) {
        console.log(`  ${chalk.bold.cyan(s.id.padEnd(25))} ${s.description}`);
        console.log(`  ${chalk.dim("".padEnd(25))} Tags: ${s.tags.join(", ")}`);
        console.log("");
      }
    } else {
      log.title("Available Skills by Stack:\n");
      for (const stack of stacks) {
        const stackSkills = skillsToShow.filter((s) => s.tags.includes(stack));
        if (stackSkills.length === 0) continue;

        console.log(chalk.bold.yellow(`📦 ${stack.toUpperCase()}`));
        console.log("");
        for (const s of stackSkills) {
          console.log(`  ${chalk.bold.cyan(s.id.padEnd(25))} ${s.description}`);
        }
        console.log("");
      }
    }
  });

// ─── run ─────────────────────────────────────────────────────────────────────

program
  .name("agent-patterns")
  .description("Scaffold Agent Patterns into your Next.js project")
  .version("1.0.0");

program.parse(process.argv);
