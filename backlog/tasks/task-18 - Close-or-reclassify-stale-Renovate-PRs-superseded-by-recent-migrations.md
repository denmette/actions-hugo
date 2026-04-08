---
id: TASK-18
title: Close or reclassify stale Renovate PRs superseded by recent migrations
status: To Do
assignee: []
created_date: '2026-04-08 16:25'
updated_date: '2026-04-08 16:25'
labels:
  - dependencies
  - renovate
  - maintenance
documentation:
  - /Users/macs/Coding/Personal/github-actions/actions-hugo/renovate.json
  - /Users/macs/Coding/Personal/github-actions/actions-hugo/package.json
  - /Users/macs/Coding/Personal/github-actions/actions-hugo/.github/workflows
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Review the currently open Renovate PRs and close or reclassify the ones that are already satisfied, obsolete, or no longer relevant after the repository's recent toolkit, Vitest, and grouped-maintenance migrations. This task turns the Renovate queue back into meaningful pending work instead of historical noise.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Renovate PRs that are already satisfied by current repository state are identified and closed.
- [ ] #2 Renovate PRs made obsolete by the Vitest migration or other completed work are identified and closed or superseded.
- [ ] #3 Remaining open Renovate PRs map cleanly to real backlog tasks or grouped maintenance domains.
- [ ] #4 The resulting Renovate queue is materially smaller and easier to reason about.
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
2026-04-08: Several Renovate suggestions are already satisfied or partially obsolete: `@actions/core/io/exec/tool-cache` are already on the requested major line; `lint-staged -> v16` is already satisfied; `typescript-eslint -> v8` is already satisfied; and `jest -> v30`, `nock -> v14`, and `eslint-plugin-jest -> v29` should be re-evaluated in light of the new Vitest-based test stack.
2026-04-08: This task is the operational follow-up to the earlier Renovate grouping policy work, which defined how stale and superseded PR families should be handled in principle.
<!-- SECTION:NOTES:END -->
