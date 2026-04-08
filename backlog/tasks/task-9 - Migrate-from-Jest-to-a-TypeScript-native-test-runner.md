---
id: TASK-9
title: Migrate from Jest to a TypeScript-native test runner
status: Done
assignee: []
created_date: '2026-04-08 15:10'
updated_date: '2026-04-08 15:36'
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
- [x] #1 Jest-specific dependencies and startup config are replaced with a TypeScript-friendly test runner and corresponding config.
- [x] #2 The existing test suites under `__tests__/` continue to pass with equivalent coverage and behavior on the supported Node versions.
- [x] #3 Repository test setup no longer depends on handwritten `.cjs` bootstrapping files solely for test-runner startup.
- [x] #4 CI and contributor documentation are updated to reflect the new test runner and any required invocation changes.
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
2026-04-08: The current repository uses Jest 29 in an ESM project, but still needs `jest.config.cjs` and `jest.resolver.cjs` because Jest loads config and resolver code before TypeScript transforms are active. A future migration should replace that startup boundary rather than layering more compatibility shims onto Jest.
2026-04-08: Implementation plan: migrate to Vitest with a TypeScript `vitest.config.ts`, convert the two Jest-specific test files to `vitest` imports, remove Jest startup shims, and keep the existing `RUNNER_TEMP` local integration-test flow intact.
2026-04-08: Completed by migrating the repository to Vitest, removing Jest-specific dependencies and startup files, converting the tests to `vitest` APIs/imports, and replacing `nock`-dependent HTTP tests with direct `@actions/http-client` mocks so the assertions remain stable under the new runner.
2026-04-08: Validation: `npm run lint`, `npm run tsc`, `env RUNNER_TEMP=/tmp npm test`, and `npm audit --json` (remaining advisory unchanged: transitive `lodash` from `standard-version`).
<!-- SECTION:NOTES:END -->
