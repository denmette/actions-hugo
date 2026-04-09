---
id: TASK-25
title: Remove stale hardcoded Hugo test versions and refresh test fixtures
status: Done
assignee: []
created_date: '2026-04-09 10:29'
updated_date: '2026-04-09 13:10'
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
- [x] #1 Hardcoded Hugo test versions are moved out of production-oriented constants or replaced with a clearer test-only configuration path.
- [x] #2 The remaining pinned test versions are chosen intentionally and documented, rather than left as stale historical values.
- [x] #3 Fixture payloads under `__tests__/data/` are reviewed and refreshed or narrowed so they still represent current supported behavior.
- [x] #4 The resulting tests remain deterministic without depending on silently outdated release assumptions.
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
2026-04-09: Code review found `Tool.TestVersionLatest = '0.83.1'` and `Tool.TestVersionSpec = '0.82.1'` in `src/constants.ts`, plus stale `brew.json` and `github.json` fixture data under `__tests__/data/`. These values may be acceptable as pinned tests, but they should no longer live as implicit current-version assumptions.
2026-04-09: Implementation plan: move pinned Hugo test versions into an explicit test-only fixture module, remove those fields from `src/constants.ts`, and delete the unused 2021-era JSON snapshots instead of keeping stale test data that no longer drives the suite.
2026-04-09: Completed by introducing `__tests__/fixtures/hugo.ts` as the explicit test-only source of pinned Hugo versions, removing the test-only fields from `src/constants.ts`, and deleting the unused stale `__tests__/data/brew.json` and `__tests__/data/github.json` snapshots. Validation succeeded for lint and type-checking under Node 24. Targeted Vitest coverage passed for the unit suite; the integration installer tests still depend on external GitHub downloads and were blocked here by sandbox DNS resolution to `github.com`.
2026-04-09: Follow-up cleanup removed the remaining inline `0.160.1` literals from `__tests__/get-latest-version.test.ts` so the maintained test pin now lives in one place. Final fixture split: `pinnedVersion = 0.146.1` for deterministic supported-version coverage, `latestVersion = 0.160.1` for current release-path coverage.
<!-- SECTION:NOTES:END -->
