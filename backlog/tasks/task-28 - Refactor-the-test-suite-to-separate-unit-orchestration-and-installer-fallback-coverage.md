---
id: TASK-28
title: Refactor the test suite to separate unit orchestration and installer fallback coverage
status: Done
assignee: []
created_date: '2026-04-09 13:08'
updated_date: '2026-04-09 13:08'
labels:
  - tests
  - maintenance
  - architecture
documentation:
  - /Users/macs/Coding/Personal/github-actions/actions-hugo/__tests__/main.test.ts
  - /Users/macs/Coding/Personal/github-actions/actions-hugo/__tests__/installer.test.ts
  - /Users/macs/Coding/Personal/github-actions/actions-hugo/src/hugo-assets.ts
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Replace the current mixed testing approach with a clearer split: unit tests for `run()` orchestration, focused installer fallback tests for download behavior, and a shared Hugo asset helper so runtime logic and tests stop duplicating platform asset mappings.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 `main.test.ts` no longer mixes module mocks with live installer behavior.
- [x] #2 Installer fallback behavior is covered in a dedicated test suite with isolated mocks.
- [x] #3 Hugo asset candidate mapping is shared instead of duplicated across runtime paths.
- [x] #4 The resulting deterministic unit suites pass without live network dependency.
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
2026-04-09: Follow-up from a review of the current Vitest mocks. The prior `main.test.ts` mixed partial module mocks of `get-latest-version` with real installer/download behavior, which made small runtime changes break tests in unrelated ways.
2026-04-09: Completed by splitting orchestration tests into a pure unit `main.test.ts`, adding `installer.test.ts` for direct-candidate and release-API fallback coverage, and introducing `src/hugo-assets.ts` as the shared source of Hugo asset candidate mapping.
<!-- SECTION:NOTES:END -->
