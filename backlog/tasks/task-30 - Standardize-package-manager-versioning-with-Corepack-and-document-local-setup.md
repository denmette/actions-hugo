---
id: TASK-30
title: Standardize package manager versioning with Corepack and document local setup
status: To Do
assignee: []
created_date: '2026-04-10 07:20'
updated_date: '2026-04-10 07:20'
labels:
  - tooling
  - documentation
  - developer-experience
documentation:
  - /Users/macs/Coding/Personal/github-actions/actions-hugo/package.json
  - /Users/macs/Coding/Personal/github-actions/actions-hugo/.nvmrc
  - /Users/macs/Coding/Personal/github-actions/actions-hugo/README.md
  - /Users/macs/Coding/Personal/github-actions/actions-hugo/AGENTS.md
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Define a structured package-manager strategy for the repository so contributors and CI use the same toolchain versions consistently. This task should evaluate whether the repo should stay on npm or move to a Corepack-managed package manager such as pnpm or Yarn, and then document the chosen setup clearly enough that local development, CI, and automation all follow the same versioned workflow.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 The repository has a documented package-manager strategy, including whether npm remains the standard or whether Yarn/pnpm with Corepack is adopted.
- [ ] #2 If Corepack is used, the repository pins the package-manager version in the appropriate repo metadata and CI follows that same version.
- [ ] #3 Local setup documentation explains how to bootstrap the repository correctly, including Node version selection and package-manager activation.
- [ ] #4 Contributor-facing documentation explains the expected install, test, and update workflow for this repository.
- [ ] #5 The chosen approach reduces ambiguity around package-manager and npm version drift in local development and CI.
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
2026-04-10: Requested to create a dedicated follow-up task after repeated drift around Node and npm versions, including the lock-file-maintenance branch behavior. The task should explicitly cover both the technical choice of package-manager/version pinning and the documentation needed so contributors know how to work with the repository correctly.
2026-04-10: The expected output of this task includes a setup-and-usage document or equivalent contributor guidance that explains how to use the repository with the chosen package-manager strategy.
<!-- SECTION:NOTES:END -->
