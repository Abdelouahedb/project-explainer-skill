# Standalone Project Guide Template

Use this reference for a substantial GitHub-ready guide. Select, rename, reorder, or omit sections according to the repository and the user's requested depth. Do not leave empty sections behind.

````markdown
# Project name

One or two sentences describing the product, intended user, and primary outcome.

## Mental model

Explain the few major runtime pieces and how they cooperate. Introduce project-specific terms here.

```text
user or caller
    -> entrypoint
    -> application/domain logic
    -> persistence or external service
    -> result
```

## What users can do

Describe the primary interface and representative flows. For a non-UI project, replace this with public API, CLI, or library usage.

## Quick start

State prerequisites and the working directory. Include only commands supported by current repository evidence.

```bash
# install

# configure

# run
```

## Technology map

| Concern | Technology | Role in this project | Evidence |
| --- | --- | --- | --- |
| Runtime |  |  |  |
| Application framework |  |  |  |
| Storage |  |  |  |
| Testing |  |  |  |
| Build/deployment |  |  |  |

Include the Evidence column when auditability matters; otherwise link evidence naturally in the prose.

## Repository map

```text
.
+-- important-folder/  # responsibility, not a filename paraphrase
`-- important-file     # why it matters
```

Explain meaningful boundaries and grouping rules. Do not reproduce a giant raw tree.

## How execution flows

Trace one representative request, interaction, job, or command from entrypoint to result. Name the files or symbols responsible at each stage and include important error or authorization paths.

## Key modules

| Area | Important files | Responsibility | Collaborates with |
| --- | --- | --- | --- |
|  |  |  |  |

For an explicitly requested file inventory, expand this into a folder and file catalog. Group generated files, static assets, repetitive fixtures, and migrations, and state the grouping rule.

## Configuration and external services

Document environment-variable names, config sources, defaults, ports, feature flags, and external dependencies. Never include secret values.

## Commands

| Command | Working directory | Purpose | Verification status |
| --- | --- | --- | --- |
|  |  |  | Declared / ran successfully / failed / not run |

## Testing and quality

Explain test locations, levels, fixtures, linters, type checks, and CI gates. Distinguish configured checks from checks actually run during this review.

## Build and deployment

Explain artifacts, containers, CI/CD, hosting, migrations, and release flow only as far as repository evidence supports them.

## Where to make common changes

| Goal | Start here | Also inspect |
| --- | --- | --- |
| Add a user-facing route or command |  |  |
| Change domain behavior |  |  |
| Change persistence or an integration |  |  |
| Add tests |  |  |

## Caveats and unknowns

- **Verified:** relevant observed facts that need emphasis.
- **Inferred:** conclusions supported indirectly by named evidence.
- **Unknown:** missing, contradictory, stale, or unverified information.
````
