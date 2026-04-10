---
id: TASK-29
title: Align the test workflow matrix and isolate bundle verification
status: Done
assignee: []
created_date: '2026-04-10 10:55'
updated_date: '2026-04-10 10:55'
labels:
  - github-actions
  - ci
  - tests
documentation:
  - /Users/macs/Coding/Personal/github-actions/actions-hugo/.github/workflows/test.yml
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Make the primary test workflow consistent across all supported runner images so each matrix leg performs the same validation steps, while keeping committed-bundle verification as an explicit dedicated job instead of an Ubuntu-specific special case hidden inside the matrix.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 The `test` matrix runs the same validation sequence on `ubuntu-22.04`, `ubuntu-latest`, `macos-latest`, and `windows-latest`.
- [x] #2 Bundle verification is enforced in a separate dedicated job rather than only inside one matrix leg.
- [x] #3 Coverage upload remains limited to a single Linux leg to avoid redundant artifacts.
- [x] #4 Workflow YAML remains valid after the restructuring.
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
2026-04-10: Follow-up from CI behavior where only the `ubuntu-22.04` test leg ran `format:check`, `lint`, `tsc`, `build`, and `git diff --exit-code -- lib`, while the other operating systems only ran `npm test`. This made the matrix inconsistent and obscured whether failures were platform-specific or just missing validation parity.
2026-04-10: Completed by updating `.github/workflows/test.yml` so every matrix leg runs `npm ci`, `npm run format:check`, `npm run lint`, `npm run tsc`, `npm run build`, and `npm test`, while moving `git diff --exit-code -- lib` into a separate `verify-bundle` job on `ubuntu-latest`. Coverage upload and Codecov reporting remain limited to the `ubuntu-latest` test leg.
<!-- SECTION:NOTES:END -->
