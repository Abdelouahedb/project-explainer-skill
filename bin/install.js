#!/usr/bin/env node

const fs = require("fs");
const os = require("os");
const path = require("path");

const skillName = "project-explainer";
const packageRoot = path.resolve(__dirname, "..");

const help = `Project Explainer Skill installer

Usage:
  npx project-explainer-skill install all
  npx project-explainer-skill install codex
  npx project-explainer-skill install claude

Options:
  --scope user       Install for the current user (default)
  --scope project    Install into the current project
  --cwd <path>       Project directory for --scope project
  --help             Show this help

Targets:
  codex user      ~/.agents/skills/project-explainer
  codex project   <cwd>/.agents/skills/project-explainer
  claude user     ~/.claude/skills/project-explainer
  claude project  <cwd>/.claude/skills/project-explainer
`;

function parseArgs(argv) {
  const args = argv.slice(2);
  if (args.includes("--help") || args.includes("-h")) {
    return { help: true };
  }

  const command = args[0] || "install";
  const target = args[1] || "all";
  let scope = "user";
  let cwd = process.cwd();

  for (let index = 2; index < args.length; index += 1) {
    const arg = args[index];
    if (arg === "--scope") {
      scope = args[index + 1];
      index += 1;
    } else if (arg === "--cwd") {
      cwd = path.resolve(args[index + 1]);
      index += 1;
    } else {
      throw new Error(`Unknown option: ${arg}`);
    }
  }

  return { command, target, scope, cwd };
}

function targetRoots(scope, cwd) {
  if (scope === "user") {
    return {
      codex: path.join(os.homedir(), ".agents", "skills"),
      claude: path.join(os.homedir(), ".claude", "skills"),
    };
  }

  if (scope === "project") {
    return {
      codex: path.join(cwd, ".agents", "skills"),
      claude: path.join(cwd, ".claude", "skills"),
    };
  }

  throw new Error(`Unsupported scope: ${scope}. Use "user" or "project".`);
}

function copyPath(source, destination) {
  if (!fs.existsSync(source)) {
    return;
  }
  fs.cpSync(source, destination, {
    recursive: true,
    force: true,
    errorOnExist: false,
  });
}

function installSkill(destinationRoot) {
  const destination = path.join(destinationRoot, skillName);
  fs.mkdirSync(destination, { recursive: true });

  copyPath(path.join(packageRoot, "SKILL.md"), path.join(destination, "SKILL.md"));
  copyPath(path.join(packageRoot, "README.md"), path.join(destination, "README.md"));
  copyPath(path.join(packageRoot, "agents"), path.join(destination, "agents"));
  copyPath(path.join(packageRoot, "references"), path.join(destination, "references"));

  return destination;
}

function main() {
  const options = parseArgs(process.argv);
  if (options.help) {
    console.log(help);
    return;
  }

  if (options.command !== "install") {
    throw new Error(`Unsupported command: ${options.command}. Use "install".`);
  }

  const requested = options.target.toLowerCase();
  const targets =
    requested === "all" ? ["codex", "claude"] : [requested];

  for (const target of targets) {
    if (!["codex", "claude"].includes(target)) {
      throw new Error(`Unsupported target: ${target}. Use "codex", "claude", or "all".`);
    }
  }

  const roots = targetRoots(options.scope, options.cwd);
  const installed = targets.map((target) => ({
    target,
    path: installSkill(roots[target]),
  }));

  for (const item of installed) {
    console.log(`Installed ${skillName} for ${item.target}: ${item.path}`);
  }

  console.log("");
  console.log("Restart your agent if it does not detect the new skill automatically.");
}

try {
  main();
} catch (error) {
  console.error(error.message);
  console.error("");
  console.error(help);
  process.exit(1);
}
