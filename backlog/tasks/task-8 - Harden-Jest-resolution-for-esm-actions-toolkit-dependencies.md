---
id: TASK-8
title: Harden Jest resolution for ESM @actions toolkit dependencies
status: To Do
assignee: []
created_date: '2026-04-08 13:50'
updated_date: '2026-04-08 13:50'
labels:
  - test
  - jest
  - esm
documentation:
  - /Users/macs/Coding/Personal/github-actions/actions-hugo/jest.config.cjs
  - /Users/macs/Coding/Personal/github-actions/actions-hugo/package.json
  - /Users/macs/Coding/Personal/github-actions/actions-hugo/__tests__/node-compat/globals.ts
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Reduce the brittleness of the current Jest setup for the ESM GitHub Actions toolkit packages. The present test configuration maps `@actions/*` package names directly to internal `node_modules/.../lib/*.js` entrypoints, which works today but depends on internal package layout rather than the public package interface. This task should replace that with a more durable test strategy if possible.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 The test setup no longer relies on hard-coded internal `node_modules/@actions/*/lib/*.js` paths unless that dependency is explicitly documented as unavoidable.
- [ ] #2 The alternative Jest/ESM strategy continues to pass the repository test suite on the supported Node versions.
- [ ] #3 If direct internal-path mapping remains necessary, the rationale and breakage risk are documented clearly in the test configuration or task notes.
- [ ] #4 The resulting Jest configuration is easier to maintain across future `@actions/*` package updates.
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
2026-04-08: `jest.config.cjs` currently maps `@actions/core`, `@actions/exec`, `@actions/http-client`, `@actions/io`, and `@actions/tool-cache` directly to internal `lib/*.js` files under `node_modules`. This is a workable compatibility shim, but it is brittle because it depends on package internals that are not guaranteed by the public import path.
<!-- SECTION:NOTES:END -->
