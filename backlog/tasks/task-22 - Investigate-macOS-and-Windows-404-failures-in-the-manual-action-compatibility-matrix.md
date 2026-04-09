---
id: TASK-22
title: Investigate macOS and Windows 404 failures in the manual action compatibility matrix
status: To Do
assignee: []
created_date: '2026-04-09 07:13'
updated_date: '2026-04-09 07:13'
labels:
  - github-actions
  - ci
  - compatibility
documentation:
  - /Users/macs/Coding/Personal/github-actions/actions-hugo/.github/workflows/test-action.yml
  - /Users/macs/Coding/Personal/github-actions/actions-hugo/src/get-url.ts
  - /Users/macs/Coding/Personal/github-actions/actions-hugo/src/installer.ts
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Investigate the `Unexpected HTTP response: 404` failures reported in the broader local-action compatibility matrix for `macos-latest` and `windows-latest`. The daily workflow was intentionally reduced to a stable Ubuntu smoke path in `TASK-20`, but the remaining compatibility failures should still be understood and either fixed or explicitly documented if upstream Hugo asset availability has changed.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 The failing compatibility combinations are reproduced or inspected closely enough to identify whether the 404 originates from Hugo asset naming, platform mapping, or another runtime assumption.
- [ ] #2 If a code fix is appropriate, the asset-resolution or install logic is updated and validated for the affected platforms.
- [ ] #3 If the failure is due to unsupported upstream assets, the manual compatibility matrix or repository documentation is updated to reflect the real support boundary.
- [ ] #4 The task records the outcome clearly so future workflow maintenance does not reintroduce the same ambiguous matrix entries.
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
2026-04-09: Follow-up created from `TASK-20`. Scheduled daily coverage was reduced to a stable Ubuntu smoke path because Ubuntu remained healthy while `macos-latest` and `windows-latest` reported `Unexpected HTTP response: 404` across the `latest` compatibility variants. This task keeps that investigation visible without blocking the workflow-structure cleanup.
2026-04-09: Maintainer support policy for the compatibility matrix: keep `latest` as a required success path across supported operating systems, and keep at most one additional pinned Hugo version from roughly the last year for backward-compatibility coverage. Versions older than that are no longer part of the maintained support baseline unless a separate task reintroduces them intentionally.
<!-- SECTION:NOTES:END -->
