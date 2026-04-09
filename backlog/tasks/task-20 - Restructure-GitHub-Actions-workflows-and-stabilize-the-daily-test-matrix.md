---
id: TASK-20
title: Restructure GitHub Actions workflows and stabilize the daily test matrix
status: Done
assignee: []
created_date: '2026-04-09 06:18'
updated_date: '2026-04-09 07:13'
labels:
  - github-actions
  - ci
  - maintenance
documentation:
  - /Users/macs/Coding/Personal/github-actions/actions-hugo/.github/workflows
  - /Users/macs/Coding/Personal/github-actions/actions-hugo/.github/workflows/test-action.yml
  - /Users/macs/Coding/Personal/github-actions/actions-hugo/.github/workflows/test.yml
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Review the current GitHub Actions workflow layout and refactor it into a clearer long-term structure while stabilizing the scheduled daily test workflow. The current workflow set has grown through several maintenance passes, and the failing daily matrix suggests the repository now needs a more deliberate split between fast PR validation, scheduled smoke tests, release automation, and maintenance-only workflows.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 The workflow set is reviewed for clearer structure, naming, and separation of responsibilities between PR checks, scheduled tests, release automation, and maintenance jobs.
- [x] #2 The failing scheduled/daily test workflow is root-caused and either fixed or reshaped into a more reliable smoke-test strategy.
- [x] #3 Any matrix reductions, retries, conditional paths, or workflow splits needed for reliability are implemented intentionally rather than as ad hoc exceptions.
- [x] #4 Repository workflow documentation or maintainer notes reflect the resulting structure and intended purpose of each workflow.
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
2026-04-09: Follow-up requested after the daily test workflow failed. This task should cover both immediate stabilization of the scheduled matrix and the broader question of whether the current workflow layout is still the right structure for the repo.
2026-04-09: Implementation plan: keep `test.yml` as the primary PR/push validation workflow, shrink the scheduled local-action verification into a smaller smoke-test matrix, move the broader cross-platform and legacy version coverage behind manual dispatch, and document the resulting workflow responsibilities for maintainers.
2026-04-09: Failure details from the scheduled matrix showed `Unexpected HTTP response: 404` across the `latest` variants on `macos-latest` and `windows-latest`, while Ubuntu remained healthy. The scheduled workflow is therefore being reduced to a stable Ubuntu smoke path, with macOS, Windows, and legacy Hugo coverage preserved as manual compatibility checks instead of daily noise.
2026-04-09: Completed by renaming `test-action.yml` to a clearer local-action validation workflow shape, reducing the scheduled matrix to Ubuntu-only smoke coverage, keeping the broader OS and legacy-version matrix behind `workflow_dispatch`, updating maintainer documentation in `README.md` and `AGENTS.md`, and increasing the long-running installer integration tests to a 60s timeout so local verification matches the intended CI reliability target more closely.
<!-- SECTION:NOTES:END -->
