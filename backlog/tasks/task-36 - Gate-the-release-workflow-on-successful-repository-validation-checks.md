---
id: TASK-36
title: Gate the release workflow on successful repository validation checks
status: To Do
assignee: []
created_date: '2026-04-10 09:40'
updated_date: '2026-04-10 09:40'
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
- [ ] #1 The release workflow is gated on the repository validation workflow rather than triggering independently in parallel on every push to `main`.
- [ ] #2 Release execution still supports an intentional manual path when needed.
- [ ] #3 The gating model is compatible with the repository ruleset and does not create release loops.
- [ ] #4 The release prerequisites are documented clearly enough that the workflow contract is understandable to maintainers.
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
2026-04-10: Added after release-rule and token fixes surfaced that semantic-release can still start independently of the main repository validation flow. This task should decide whether to use `workflow_run`, explicit job dependencies, or another GitHub Actions pattern so releases only proceed from a known-green validation state.
<!-- SECTION:NOTES:END -->
