<div align="center">

<!-- Replace this with your logo if you add one later. -->
<!-- <img src="assets/logo.png" alt="Project Explainer logo" width="120" /> -->

# Project Explainer Skill

**Turn any unfamiliar codebase into a clear, GitHub-ready project guide.**

[![npm version](https://img.shields.io/npm/v/project-explainer-skill?style=for-the-badge&logo=npm&color=CB3837)](https://www.npmjs.com/package/project-explainer-skill)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](./LICENSE)
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen?style=for-the-badge)](#quality-checks)
[![Node.js](https://img.shields.io/badge/node-%3E%3D16-339933?style=for-the-badge&logo=node.js&logoColor=white)](./package.json)

</div>

## Overview

Project Explainer Skill is an npm-distributed Agent Skill for Codex, Claude Code, and other Agent Skills-compatible tools. It installs a reusable `project-explainer` skill that guides an AI coding agent through repository discovery, stack detection, setup instructions, file-by-file explanation, runtime behavior, and GitHub-ready documentation.

It is designed for developers who want a high-quality README, onboarding guide, repository tour, or handoff document without relying on vague guesses or generic boilerplate.

## Key Features

- **One-command installer**: Installs into Codex, Claude Code, or both with `npx project-explainer-skill install all`.
- **Cross-agent support**: Targets Codex skill directories (`.agents/skills`) and Claude skill directories (`.claude/skills`).
- **User or project scope**: Installs globally for the current user or locally inside a specific repository.
- **Zero runtime dependencies**: Uses only Node.js built-ins: `fs`, `os`, and `path`.
- **Safe overwrite behavior**: Copies the skill payload into the expected destination with deterministic file replacement.
- **GitHub-ready output guidance**: The skill prompts agents to explain stack, execution, folder structure, files, user experience, testing, deployment, and assumptions.
- **Reference template included**: Ships `references/report-template.md` for consistent long-form project documentation.
- **Small package footprint**: The npm package contains only the installer, skill files, metadata, and documentation.

## Installation

> [!IMPORTANT]
> Requires **Node.js 16 or newer**. The package is CommonJS and uses `fs.cpSync`, which is available in modern Node versions.

Install the skill for both Codex and Claude Code:

```bash
npx project-explainer-skill install all
```

Install only for Codex:

```bash
npx project-explainer-skill install codex
```

Install only for Claude Code:

```bash
npx project-explainer-skill install claude
```

Install into the current project instead of your user-level skills folder:

```bash
npx project-explainer-skill install all --scope project
```

Install into a specific project path:

```bash
npx project-explainer-skill install codex --scope project --cwd /path/to/repo
```

## Build From Source

This project uses **npm** and has no external dependencies.

```bash
git clone https://github.com/Abdelouahedb/project-explainer-skill.git
cd project-explainer-skill
npm install
npm test
npm pack --dry-run
```

## Quick Start

Install the skill:

```bash
npx project-explainer-skill install all
```

Then ask your agent to use it.

For Codex:

```text
Use $project-explainer to explain this repository and create a GitHub-ready PROJECT_GUIDE.md.
```

For Claude Code:

```text
/project-explainer
```

Or ask naturally:

```text
Explain this whole repository, including the tech stack, folder structure, important files, setup commands, and what users see when it runs.
```

## CLI Reference

```bash
npx project-explainer-skill install <target> [options]
```

| Argument | Values | Description |
| --- | --- | --- |
| `<target>` | `all` | Install for Codex and Claude Code. |
| `<target>` | `codex` | Install only into Codex skill directories. |
| `<target>` | `claude` | Install only into Claude Code skill directories. |

| Option | Values | Default | Description |
| --- | --- | --- | --- |
| `--scope` | `user`, `project` | `user` | Choose whether to install for the current user or into a project directory. |
| `--cwd` | path | current working directory | Project directory used when `--scope project` is selected. |
| `--help` | none | none | Print installer usage. |

## Install Targets

| Agent | User scope | Project scope |
| --- | --- | --- |
| Codex | `~/.agents/skills/project-explainer` | `<cwd>/.agents/skills/project-explainer` |
| Claude Code | `~/.claude/skills/project-explainer` | `<cwd>/.claude/skills/project-explainer` |

> [!NOTE]
> If your agent is already running and does not detect the new skill, restart the agent or reload its skills list.

## What The Skill Teaches Agents To Produce

The installed skill guides an agent to create documentation with:

- A high-level project summary
- A precise tech stack breakdown
- Local install, run, test, build, and deployment instructions
- Folder-by-folder and file-by-file explanations
- A description of what users see when the project runs
- Runtime, routing, API, state, or data-flow notes
- Testing and quality-check guidance
- Known unknowns and assumptions instead of invented details

<details>
<summary>Repository structure</summary>

```text
project-explainer-skill/
+-- bin/
|   +-- install.js
+-- agents/
|   +-- openai.yaml
+-- references/
|   +-- report-template.md
+-- SKILL.md
+-- README.md
+-- LICENSE
+-- package.json
```

</details>

<details>
<summary>How the installer works</summary>

The CLI parses `install <target>` and copies the skill payload into the correct destination directory.

```text
package root
+-- SKILL.md
+-- README.md
+-- agents/
+-- references/
```

Those files are copied into one or more target folders:

```text
~/.agents/skills/project-explainer
~/.claude/skills/project-explainer
<cwd>/.agents/skills/project-explainer
<cwd>/.claude/skills/project-explainer
```

The installer uses `fs.cpSync(..., { recursive: true, force: true })`, so reinstalling updates the existing skill files.

</details>

## Quality Checks

Run the package smoke test:

```bash
npm test
```

Preview the npm package contents:

```bash
npm pack --dry-run
```

Expected behavior:

- `npm test` prints the CLI help text.
- `npm pack --dry-run` includes `SKILL.md`, `README.md`, `agents/`, `references/`, `bin/`, `package.json`, and `LICENSE`.

## Contributing

Open-source contributions are welcome. Keep the skill focused, practical, and useful for real repository documentation.

1. **Fork** the repository.
2. **Branch** from `main` with a focused name:

   ```bash
   git checkout -b improve-installer-docs
   ```

3. **Commit** your changes:

   ```bash
   git commit -m "Improve installer documentation"
   ```

4. **Push** your branch:

   ```bash
   git push origin improve-installer-docs
   ```

5. **Open a pull request** with a short explanation of what changed and why.

## License

Released under the [MIT License](./LICENSE).

## Sources

- [OpenAI Codex Skills](https://developers.openai.com/codex/skills)
- [Claude Code Skills](https://code.claude.com/docs/en/skills)
- [Claude custom skills](https://support.claude.com/en/articles/12512198-how-to-create-custom-skills)
- [Agent Skills open standard](https://agentskills.io)
