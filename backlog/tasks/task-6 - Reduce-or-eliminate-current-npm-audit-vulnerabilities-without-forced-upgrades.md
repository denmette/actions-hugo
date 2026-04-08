---
id: TASK-6
title: Reduce or eliminate current npm audit vulnerabilities without forced upgrades
status: Done
assignee: []
created_date: '2026-04-08 12:58'
updated_date: '2026-04-08 13:30'
labels:
  - dependencies
  - security
  - maintenance
dependencies:
  - TASK-0001.06
  - TASK-0001.07
documentation:
  - /Users/macs/Coding/Personal/github-actions/actions-hugo/package.json
  - /Users/macs/Coding/Personal/github-actions/actions-hugo/package-lock.json
  - /Users/macs/Coding/Personal/github-actions/actions-hugo/renovate.json
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Review the repository's remaining `npm audit` findings and reduce or eliminate them through deliberate dependency updates, replacements, or configuration cleanup. This task should not use blanket `npm audit fix --force`; instead it should identify which advisories matter to this repository, upgrade the affected packages coherently, and avoid reintroducing instability into the action runtime, build, or test workflow.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 The current `npm audit` findings are reviewed and mapped to the relevant direct or transitive dependencies in this repository.
- [x] #2 Vulnerabilities that can be addressed safely are fixed through deliberate package updates or replacements rather than forced bulk upgrades.
- [x] #3 Any residual advisories that are intentionally tolerated are documented with a brief rationale.
- [x] #4 The resulting dependency graph still passes the repository's local validation workflow.
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
2026-04-08: Local `npm install` still reports `6 vulnerabilities (3 moderate, 3 high)` after the ESLint 9 migration. This needs a separate follow-up task because the remaining findings may involve packages outside the already-completed runtime/toolkit and lint-stack migrations.

2026-04-08: Advisory mapping at task start:
- `brace-expansion@1.1.11` comes from `eslint` via `minimatch@3`.
- `yaml@1.10.0` comes from `lint-staged@10.5.4` via `cosmiconfig@7`.
- `js-yaml@3.14.0` comes from the Jest transform subgraph selected under `ts-jest`, specifically `@jest/transform` -> `babel-plugin-istanbul` -> `@istanbuljs/load-nyc-config`.
- `lodash`, `meow`, and `trim-newlines` come from the `standard-version@9.1.1` / `conventional-changelog` chain.

Planned first remediation pass:
- update `lint-staged` to a non-vulnerable line,
- constrain the Jest transform subgraph to the Jest 29 line already used by the repository,
- patch the vulnerable `brace-expansion` 1.x transitive version via npm overrides where safe,
- reassess whether the remaining `standard-version` chain should be upgraded, tolerated temporarily, or replaced later under TASK-4.

Completed on April 8, 2026 on branch `chore/task-6-audit-remediation`.

Changes applied:
- Updated `lint-staged` from 10.5.4 to 16.4.0, which removed the `yaml@1.10.0` advisory chain.
- Added npm overrides to constrain `@jest/transform` and `babel-jest` to the Jest 29 line already used by the repository, removing the vulnerable Jest 30 transform subgraph that pulled in `js-yaml@3.14.0`.
- Added an npm override for `brace-expansion` so the vulnerable 1.1.11 transitive version is replaced with a non-vulnerable 1.x patch line where compatible.
- Updated `standard-version` from 9.1.1 to 9.5.0, which removed the vulnerable `meow` / `trim-newlines` path.

Result:
- `npm audit` was reduced from `6 vulnerabilities (3 moderate, 3 high)` to `1 high severity vulnerability`.

Residual advisory intentionally tolerated:
- The remaining advisory is `lodash@4.17.21`, still pulled transitively by `standard-version@9.5.0` through the `conventional-changelog` chain.
- There is no safer in-place patch available within the current `standard-version` line. Replacing that chain is better handled by TASK-4 (`semantic-release`) rather than by forcing a bespoke release-tool override in this task.

Validation:
- `npm install`
- `npm audit --json`
- `npm run lint`
- `npm run tsc`
- `env RUNNER_TEMP=/tmp npm test -- --runInBand`
<!-- SECTION:NOTES:END -->
