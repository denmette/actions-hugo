---
id: TASK-36
title: Gate the release workflow on successful repository validation checks
status: Done
assignee: []
created_date: '2026-04-10 09:40'
updated_date: '2026-04-10 10:45'
labels:
  - release
  - ci
  - github-actions
documentation:
  - /Users/macs/Coding/Personal/github-actions/actions-hugo/.github/workflows/release.yml
  - /Users/macs/Coding/Personal/github-actions/actions-hugo/.github/workflows/test.yml
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Make sure the release workflow only runs after the repository's required validation checks have already passed successfully. The current release workflow runs independently on pushes to `main`, which means semantic-release can start even when the intended test, formatting, type-check, or bundle-verification guarantees are not being enforced as upstream prerequisites.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 The release workflow is gated on the repository validation workflow rather than triggering independently in parallel on every push to `main`.
- [x] #2 Release execution still supports an intentional manual path when needed.
- [x] #3 The gating model is compatible with the repository ruleset and does not create release loops.
- [x] #4 The release prerequisites are documented clearly enough that the workflow contract is understandable to maintainers.
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
2026-04-10: Added after release-rule and token fixes surfaced that semantic-release can still start independently of the main repository validation flow. This task should decide whether to use `workflow_run`, explicit job dependencies, or another GitHub Actions pattern so releases only proceed from a known-green validation state.
2026-04-10: Task started on `main`. The current `release.yml` still triggers directly on pushes to `main`, so semantic-release can race ahead of the full repository validation workflow instead of inheriting a known-green state.
2026-04-10: Completed by changing `release.yml` to trigger from `workflow_run` on the `Test` workflow plus `workflow_dispatch` for intentional manual releases. The release job now only runs when the upstream `Test` workflow completed successfully on `main`, still skips semantic-release self-trigger commits, and checks out the validated `workflow_run.head_sha`. README maintainer notes were updated to reflect the new release gating model.
<!-- SECTION:NOTES:END -->
