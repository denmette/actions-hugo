---
id: TASK-13
title: Migrate workflows and action runtime for the GitHub Actions Node 24 transition
status: Done
assignee: []
created_date: '2026-04-08 16:12'
updated_date: '2026-04-08 16:42'
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
- [x] #1 Workflow actions under `.github/workflows` are reviewed and upgraded where needed to versions that support the GitHub-hosted Node 24 transition.
- [x] #2 The repository's own `action.yml` runtime is reviewed and updated from `node20` when the code and toolkit baseline are ready for that move.
- [x] #3 Any temporary compatibility decisions, such as whether to opt into `FORCE_JAVASCRIPT_ACTIONS_TO_NODE24=true` for early validation, are documented clearly.
- [x] #4 Local or CI validation demonstrates that the migrated workflow set and action runtime still behave correctly after the Node 24-oriented changes.
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
2026-04-08: Review of `.github/workflows` still shows multiple workflow dependencies on `actions/checkout@v4`, `actions/setup-node@v4`, and other JavaScript actions that may surface GitHub's Node 20 deprecation warning. The repository's own `action.yml` also still declares `runs.using: 'node20'`.
2026-04-08: GitHub's official changelog says runners start defaulting JavaScript actions to Node 24 on June 2, 2026, and maintainers should update actions to run on Node 24 instead of Node 20. Source: https://github.blog/changelog/2025-09-19-deprecation-of-node-20-on-github-actions-runners/
2026-04-08: Implementation plan: upgrade first-party workflow actions to their Node 24-ready majors (`actions/checkout`, `actions/setup-node`, `actions/upload-artifact`), update this repository's `action.yml` runtime to `node24`, and leave a clear note if any remaining third-party actions still require separate review.
2026-04-08: Completed by upgrading `actions/checkout` to v6, `actions/setup-node` to v6, and `actions/upload-artifact` to v6 across the workflow set, while updating `action.yml` from `runs.using: node20` to `runs.using: node24`.
2026-04-08: Temporary compatibility decision: this task did not enable `FORCE_JAVASCRIPT_ACTIONS_TO_NODE24=true` globally. Instead, it moved the repository's own action and maintained first-party actions to Node 24-ready lines first, and split remaining third-party action review into TASK-19.
2026-04-08: Validation: `ruby -e 'require "yaml"; Dir[".github/workflows/*.yml"].sort.each { |f| YAML.load_file(f) }; YAML.load_file("action.yml")'`, `npm run lint`, `npm run tsc`, and `env RUNNER_TEMP=/tmp npm test`.
<!-- SECTION:NOTES:END -->
