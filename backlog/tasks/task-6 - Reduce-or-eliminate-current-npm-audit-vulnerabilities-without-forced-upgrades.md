---
id: TASK-6
title: Reduce or eliminate current npm audit vulnerabilities without forced upgrades
status: To Do
assignee: []
created_date: '2026-04-08 12:58'
updated_date: '2026-04-08 13:00'
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
- [ ] #1 The current `npm audit` findings are reviewed and mapped to the relevant direct or transitive dependencies in this repository.
- [ ] #2 Vulnerabilities that can be addressed safely are fixed through deliberate package updates or replacements rather than forced bulk upgrades.
- [ ] #3 Any residual advisories that are intentionally tolerated are documented with a brief rationale.
- [ ] #4 The resulting dependency graph still passes the repository's local validation workflow.
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
2026-04-08: Local `npm install` still reports `6 vulnerabilities (3 moderate, 3 high)` after the ESLint 9 migration. This needs a separate follow-up task because the remaining findings may involve packages outside the already-completed runtime/toolkit and lint-stack migrations.
<!-- SECTION:NOTES:END -->
