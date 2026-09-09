---
name: project-explainer
description: Explain a software repository or substantial subsystem through evidence-backed architecture notes, onboarding documentation, repository tours, or GitHub-ready guides. Use for codebase overviews, stack and structure analysis, setup and runtime documentation, or tracing how a feature works across files. Do not use for a narrow question about one isolated function unless broader repository context is needed.
---

# Project Explainer

Help a developer form an accurate mental model of an unfamiliar repository: what it does, how it is organized, how execution flows through it, how to run it, and where to make common changes.

Treat the repository as the source of truth. Separate verified facts, reasoned inferences, and unknowns. Never infer behavior merely from a filename or dependency name.

## Choose the Scope

Infer the smallest scope that satisfies the request:

- **Overview:** orientation, stack, major boundaries, entrypoints, and common workflows.
- **Deep dive:** one subsystem, feature, request path, or runtime flow across files.
- **Full guide:** onboarding or GitHub documentation for the whole repository.
- **Inventory:** folder-by-folder or file-by-file coverage only when the user asks for it or completeness is central to the deliverable.

Answer inline by default. Create or edit a Markdown artifact only when requested or when the user clearly wants repository documentation. Do not replace an existing README unless explicitly authorized; prefer a separate `PROJECT_GUIDE.md` or `REPOSITORY_TOUR.md` when the destination is unspecified.

## Investigate

1. **Respect repository instructions and current work.**
   - Read applicable `AGENTS.md`, `CONTRIBUTING.md`, or equivalent guidance before editing.
   - Inspect `git status --short` and preserve unrelated user changes.

2. **Map the repository efficiently.**
   - Start with `rg --files`, `git ls-files`, or an equivalent tracked-file inventory.
   - Identify workspace boundaries, manifests, lockfiles, entrypoints, routes, schemas, tests, CI, deployment configuration, docs, and environment examples.
   - Exclude dependency, cache, generated, coverage, and build-output directories unless they affect the explanation. Group repetitive assets, fixtures, migrations, or generated files instead of cataloging them mechanically.
   - For a large monorepo, map packages and their relationships before reading individual files. Sample repeated packages only when the grouping rule is defensible and disclose the sampling.

3. **Establish the stack from evidence.**
   - Confirm languages, runtimes, package managers, frameworks, build tools, test tools, storage, authentication, external services, and deployment targets from manifests, imports, configuration, and code.
   - Distinguish declared dependencies from technology actually used by the relevant execution path.

4. **Trace execution, not just structure.**
   - Begin at real entrypoints and follow control and data flow through routers, handlers, services, state, persistence, and external boundaries.
   - For frontends, connect routes, layouts, components, state, network calls, and visible user states.
   - For APIs, connect startup, middleware, auth, handlers, domain logic, storage, and response/error paths.
   - For CLIs, connect command registration, argument parsing, execution, outputs, and side effects.
   - For libraries, connect public exports to core abstractions, extension points, and representative consumers or tests.
   - Use tests to confirm contracts and edge cases; do not present test expectations as proof that runtime behavior succeeds.

5. **Maintain an evidence map while working.**
   - Tie important claims to concrete files, symbols, commands, or observed output.
   - When code, docs, and configuration disagree, describe the discrepancy and prioritize executable code and current configuration unless there is evidence otherwise.
   - Never print secrets. Mention environment-variable names and purpose only; redact any discovered values.

6. **Verify proportionally.**
   - Prefer read-only inspection first. Run existing low-risk checks when they materially improve confidence.
   - Do not install dependencies, start long-running services, mutate data, or call external systems merely to make the guide appear complete. Do so only when the request requires it and authorization permits it.
   - Record the exact command and outcome for checks that affect the conclusions. A failed check is evidence, not a reason to invent a successful workflow.

## Write the Explanation

Lead with the mental model, then add detail. A strong explanation usually covers:

- the project's purpose and intended users;
- the main runtime pieces and how they relate;
- the path through one representative request, interaction, or command;
- verified setup, development, test, build, and deployment commands;
- configuration and external-service requirements;
- where a developer would make common changes;
- uncertainties, stale documentation, or unverified assumptions.

Use a compact tree for hierarchy, a table for repeated mappings, and a flow diagram only when it makes a multi-step relationship easier to understand. Explain why a file or module matters rather than paraphrasing its name. Avoid exhaustive section sets, repeated facts, dependency dumps, and generic framework tutorials.

For GitHub-ready documents:

- use repository-relative links to important files when useful;
- make commands copyable and state their working directory;
- adapt headings to the project instead of forcing a universal outline;
- include generated timestamps or volatile version claims only when the user needs them;
- match the repository's existing terminology, tone, and Markdown conventions.

Read [references/report-template.md](references/report-template.md) when producing a substantial standalone guide. It is a menu of sections, not a mandatory form.

## Quality Check

Before delivering, confirm that:

- every major claim has repository evidence;
- architecture and runtime flow are explained, not merely listed;
- commands come from current scripts or configuration and were not invented;
- declared, observed, inferred, and unknown facts are distinguishable;
- coverage matches the requested scope;
- generated and repetitive content is grouped transparently;
- secrets and unrelated user changes remain untouched;
- the result tells a newcomer both **how the system works** and **where to change it**.
