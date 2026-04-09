---
id: TASK-14
title: Review and reduce transitive dev dependency deprecation warnings in the test stack
status: Done
assignee: []
created_date: '2026-04-08 16:18'
updated_date: '2026-04-09 08:17'
labels:
  - dependencies
  - test
  - maintenance
documentation:
  - /Users/macs/Coding/Personal/github-actions/actions-hugo/package.json
  - /Users/macs/Coding/Personal/github-actions/actions-hugo/package-lock.json
  - /Users/macs/Coding/Personal/github-actions/actions-hugo/vitest.config.ts
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Review remaining transitive deprecation warnings in the development and test dependency tree and reduce them where practical without destabilizing the repository. This currently includes warnings such as `glob@10.5.0`, which is pulled in transitively by the Vitest coverage stack and may not be an active audit failure, but still creates install noise and should be evaluated deliberately.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Remaining transitive deprecation warnings from the dev/test dependency graph are identified with their incoming dependency paths.
- [x] #2 Warnings that can be removed safely through normal version upgrades are addressed.
- [x] #3 Any warnings that must remain temporarily are documented with rationale instead of being ignored silently.
- [x] #4 The resulting install/test flow remains stable after any dependency-tree cleanup.
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
2026-04-08: Current `npm install` warns about `glob@10.5.0`, which is pulled in via `@vitest/coverage-istanbul -> test-exclude -> glob`. `npm audit --json` still reports only the separate transitive `lodash` advisory from `standard-version`, so this warning is not currently an active audit blocker, but it should still be tracked for cleanup.
2026-04-09: Review under the current Node 24 baseline shows the dependency path is still `@vitest/coverage-istanbul -> test-exclude -> glob@10.5.0`, while the semantic-release plugin set brings its own separate `lodash` transitive path. A fresh `npm install --foreground-scripts` is currently quiet and no longer emits the earlier `glob@10.5.0` deprecation warning in this repository state, so there is no safe high-value package bump to force here right now.
2026-04-09: Because the install flow is already stable and quiet, this task is closed as reviewed/documented rather than by introducing speculative dependency churn. If the warning returns in a later lockfile refresh, it should be handled alongside the specific upstream package that reintroduces it.
<!-- SECTION:NOTES:END -->
