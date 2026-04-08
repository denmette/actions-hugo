---
id: TASK-16
title: Upgrade TypeScript to the next major and align tooling
status: To Do
assignee: []
created_date: '2026-04-08 16:25'
updated_date: '2026-04-08 16:25'
labels:
  - dependencies
  - typescript
  - tooling
documentation:
  - /Users/macs/Coding/Personal/github-actions/actions-hugo/package.json
  - /Users/macs/Coding/Personal/github-actions/actions-hugo/tsconfig.json
  - /Users/macs/Coding/Personal/github-actions/actions-hugo/src
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Upgrade TypeScript from the current 4.9 line to the next major line and align build, lint, and test tooling with the newer compiler behavior. This task should address the TypeScript major as a focused compatibility upgrade instead of a one-off Renovate merge.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 TypeScript is upgraded to the targeted newer major line.
- [ ] #2 `tsconfig.json`, lint rules, and any affected source or test code are updated for the new compiler behavior.
- [ ] #3 Build, typecheck, and test workflows remain green after the compiler migration.
- [ ] #4 The resulting toolchain stays internally coherent with the current ESM and Vitest setup.
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
2026-04-08: Relevant Renovate pressure from the current queue includes `typescript -> v6`. This should be treated as a focused compiler/tooling migration rather than merged blindly.
<!-- SECTION:NOTES:END -->
