---
id: TASK-34
title: Expand dev image validation to match the repository quality gates
status: Done
assignee: []
created_date: '2026-04-10 09:05'
updated_date: '2026-04-10 10:28'
labels:
  - ci
  - docker
  - tests
documentation:
  - /Users/macs/Coding/Personal/github-actions/actions-hugo/.github/workflows/dev-image.yml
  - /Users/macs/Coding/Personal/github-actions/actions-hugo/Makefile
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Bring the dev-image workflow closer to the repository’s real validation baseline. The current dev-image CI only checks install, formatting, and linting inside the container, so TypeScript compilation and tests can regress without the container path catching them.
<!-- SECTION:DESCRIPTION:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
2026-04-10: Task started on `main`. The current `dev-image.yml` path runs `corepack npm ci`, `corepack npm run format:check`, and `corepack npm run lint` inside the image, but it still omits `tsc` and `npm test`.
2026-04-10: Completed by extending `.github/workflows/dev-image.yml` to run `corepack npm run tsc` and `corepack npm test` inside the container after install, formatting, and linting. This brings the dev-image path materially closer to the repository’s real validation baseline without changing the main `test.yml` contract.
<!-- SECTION:NOTES:END -->
