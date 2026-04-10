---
id: TASK-34
title: Expand dev image validation to match the repository quality gates
status: To Do
assignee: []
created_date: '2026-04-10 09:05'
updated_date: '2026-04-10 09:05'
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
