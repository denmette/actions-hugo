---
id: TASK-9
title: Migrate from Jest to a TypeScript-native test runner
status: To Do
assignee: []
created_date: '2026-04-08 15:10'
updated_date: '2026-04-08 15:10'
labels:
  - test
  - typescript
  - tooling
documentation:
  - /Users/macs/Coding/Personal/github-actions/actions-hugo/package.json
  - /Users/macs/Coding/Personal/github-actions/actions-hugo/jest.config.cjs
  - /Users/macs/Coding/Personal/github-actions/actions-hugo/jest.resolver.cjs
  - /Users/macs/Coding/Personal/github-actions/actions-hugo/__tests__
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Replace Jest with a test runner that works natively with the repository's TypeScript and ESM setup, so handwritten CommonJS config shims are no longer needed just to bootstrap tests. The migration should preserve the current unit and integration coverage, keep local and CI execution straightforward, and minimize special-case resolver logic for GitHub Actions toolkit dependencies.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Jest-specific dependencies and startup config are replaced with a TypeScript-friendly test runner and corresponding config.
- [ ] #2 The existing test suites under `__tests__/` continue to pass with equivalent coverage and behavior on the supported Node versions.
- [ ] #3 Repository test setup no longer depends on handwritten `.cjs` bootstrapping files solely for test-runner startup.
- [ ] #4 CI and contributor documentation are updated to reflect the new test runner and any required invocation changes.
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
2026-04-08: The current repository uses Jest 29 in an ESM project, but still needs `jest.config.cjs` and `jest.resolver.cjs` because Jest loads config and resolver code before TypeScript transforms are active. A future migration should replace that startup boundary rather than layering more compatibility shims onto Jest.
<!-- SECTION:NOTES:END -->
