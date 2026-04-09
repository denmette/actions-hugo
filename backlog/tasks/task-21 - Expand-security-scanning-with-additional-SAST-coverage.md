---
id: TASK-21
title: Expand security scanning with additional SAST coverage
status: To Do
assignee: []
created_date: '2026-04-09 06:18'
updated_date: '2026-04-09 06:18'
labels:
  - security
  - ci
  - sast
documentation:
  - /Users/macs/Coding/Personal/github-actions/actions-hugo/.github/workflows/codeql-analysis.yml
  - /Users/macs/Coding/Personal/github-actions/actions-hugo/.github/workflows/dependency-review.yml
  - /Users/macs/Coding/Personal/github-actions/actions-hugo/.github/workflows
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Evaluate and add additional static application security testing where it materially improves the repository beyond the current CodeQL and dependency-review coverage. This should define what security checks are actually valuable for this action repository, avoid noisy duplicate scanning, and integrate any selected SAST tooling into the workflow set cleanly.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 The current security scanning baseline is reviewed, including CodeQL and dependency review coverage.
- [ ] #2 A clear decision is documented on which additional SAST checks are worth adding for this repository and why.
- [ ] #3 Any selected additional security workflow(s) are added with sensible permissions, trigger conditions, and maintenance expectations.
- [ ] #4 The resulting security-scan setup is documented well enough that future maintainers understand what is being checked and what is intentionally out of scope.
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
2026-04-09: Follow-up requested to add stronger SAST coverage beyond the current workflow baseline. This should be treated as a deliberate security-design task, not just a random collection of scanners.
<!-- SECTION:NOTES:END -->
