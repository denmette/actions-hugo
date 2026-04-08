---
id: TASK-13
title: Migrate workflows and action runtime for the GitHub Actions Node 24 transition
status: To Do
assignee: []
created_date: '2026-04-08 16:12'
updated_date: '2026-04-08 16:12'
labels:
  - github-actions
  - ci
  - runtime
documentation:
  - /Users/macs/Coding/Personal/github-actions/actions-hugo/.github/workflows
  - /Users/macs/Coding/Personal/github-actions/actions-hugo/action.yml
  - https://github.blog/changelog/2025-09-19-deprecation-of-node-20-on-github-actions-runners/
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Update the repository's workflows and published action runtime for GitHub's Node 24 transition. GitHub announced that runners begin defaulting JavaScript actions to Node 24 on June 2, 2026, and Node 20 will be removed from runners later in 2026. This task should review all workflow action versions for Node 24-compatible releases and determine the correct migration path for this repository's own `action.yml` runtime declaration.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Workflow actions under `.github/workflows` are reviewed and upgraded where needed to versions that support the GitHub-hosted Node 24 transition.
- [ ] #2 The repository's own `action.yml` runtime is reviewed and updated from `node20` when the code and toolkit baseline are ready for that move.
- [ ] #3 Any temporary compatibility decisions, such as whether to opt into `FORCE_JAVASCRIPT_ACTIONS_TO_NODE24=true` for early validation, are documented clearly.
- [ ] #4 Local or CI validation demonstrates that the migrated workflow set and action runtime still behave correctly after the Node 24-oriented changes.
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
2026-04-08: Review of `.github/workflows` still shows multiple workflow dependencies on `actions/checkout@v4`, `actions/setup-node@v4`, and other JavaScript actions that may surface GitHub's Node 20 deprecation warning. The repository's own `action.yml` also still declares `runs.using: 'node20'`.
2026-04-08: GitHub's official changelog says runners start defaulting JavaScript actions to Node 24 on June 2, 2026, and maintainers should update actions to run on Node 24 instead of Node 20. Source: https://github.blog/changelog/2025-09-19-deprecation-of-node-20-on-github-actions-runners/
<!-- SECTION:NOTES:END -->
