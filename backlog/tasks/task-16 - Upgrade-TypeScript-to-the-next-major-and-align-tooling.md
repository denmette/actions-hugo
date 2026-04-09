---
id: TASK-16
title: Upgrade TypeScript to the next major and align tooling
status: Done
assignee: []
created_date: '2026-04-08 16:25'
updated_date: '2026-04-09 10:11'
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
- [x] #1 TypeScript is upgraded to the targeted newer major line.
- [x] #2 `tsconfig.json`, lint rules, and any affected source or test code are updated for the new compiler behavior.
- [x] #3 Build, typecheck, and test workflows remain green after the compiler migration.
- [x] #4 The resulting toolchain stays internally coherent with the current ESM and Vitest setup.
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
2026-04-08: Relevant Renovate pressure from the current queue includes `typescript -> v6`. This should be treated as a focused compiler/tooling migration rather than merged blindly.
2026-04-09: Implementation started against the current latest TypeScript `6.0.2`. The plan is to upgrade the compiler first, then adjust any compiler-option changes, lint fallout, or test/build issues that show up under the new line.
2026-04-09: Scope expanded to include the Husky major bump as part of the same repository-tooling alignment pass. The TypeScript 6 upgrade itself currently only fails on the deprecated `moduleResolution: "node"` alias, so the remaining work is to move `tsconfig.json` to a current module-resolution mode and modernize the Husky install path from the old 5.x setup to the current 9.x line.
2026-04-09: Completed by upgrading `typescript` to `6.0.2`, switching `tsconfig.json` from the deprecated `moduleResolution: "node"` alias to `NodeNext`, upgrading `husky` to `9.1.7`, changing the hook install command to `husky`, and simplifying the `.husky/` hook files to the modern format without the old `husky.sh` bootstrap line.
2026-04-09: Validation under Node 24: `sh -n .husky/pre-commit && sh -n .husky/post-merge`, `npm run tsc`, `npm run lint`, and a targeted static Vitest pass all succeeded. The pre-commit hook still rebuilds the committed bundle when relevant files change.
<!-- SECTION:NOTES:END -->
