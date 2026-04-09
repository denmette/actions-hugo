---
id: TASK-25
title: Remove stale hardcoded Hugo test versions and refresh test fixtures
status: To Do
assignee: []
created_date: '2026-04-09 10:29'
updated_date: '2026-04-09 10:29'
labels:
  - tests
  - maintenance
  - dependencies
documentation:
  - /Users/macs/Coding/Personal/github-actions/actions-hugo/src/constants.ts
  - /Users/macs/Coding/Personal/github-actions/actions-hugo/__tests__/main.test.ts
  - /Users/macs/Coding/Personal/github-actions/actions-hugo/__tests__/data
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Reduce or eliminate stale hardcoded Hugo version assumptions in the test stack. The repository still hardcodes old values such as `0.83.1` and `0.82.1` in `src/constants.ts`, and the committed fixture payloads under `__tests__/data/` are anchored to 2021-era Hugo metadata. That makes the suite harder to trust as the action evolves and conflicts with the goal of keeping the codebase current.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Hardcoded Hugo test versions are moved out of production-oriented constants or replaced with a clearer test-only configuration path.
- [ ] #2 The remaining pinned test versions are chosen intentionally and documented, rather than left as stale historical values.
- [ ] #3 Fixture payloads under `__tests__/data/` are reviewed and refreshed or narrowed so they still represent current supported behavior.
- [ ] #4 The resulting tests remain deterministic without depending on silently outdated release assumptions.
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
2026-04-09: Code review found `Tool.TestVersionLatest = '0.83.1'` and `Tool.TestVersionSpec = '0.82.1'` in `src/constants.ts`, plus stale `brew.json` and `github.json` fixture data under `__tests__/data/`. These values may be acceptable as pinned tests, but they should no longer live as implicit current-version assumptions.
<!-- SECTION:NOTES:END -->
