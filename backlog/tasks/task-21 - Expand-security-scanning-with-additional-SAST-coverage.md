---
id: TASK-21
title: Expand security scanning with additional SAST coverage
status: Done
assignee: []
created_date: '2026-04-09 06:18'
updated_date: '2026-04-09 13:18'
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
- [x] #1 The current security scanning baseline is reviewed, including CodeQL and dependency review coverage.
- [x] #2 A clear decision is documented on which additional SAST checks are worth adding for this repository and why.
- [x] #3 Any selected additional security workflow(s) are added with sensible permissions, trigger conditions, and maintenance expectations.
- [x] #4 The resulting security-scan setup is documented well enough that future maintainers understand what is being checked and what is intentionally out of scope.
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
2026-04-09: Follow-up requested to add stronger SAST coverage beyond the current workflow baseline. This should be treated as a deliberate security-design task, not just a random collection of scanners.
2026-04-09: Reviewed current baseline: CodeQL already covers the TypeScript action code and dependency review covers manifest drift on pull requests. The biggest remaining blind spot is insecure workflow/action usage, which is not the same problem space as application-code SAST.
2026-04-09: Added a dedicated `zizmor` workflow to analyze `.github/workflows/**` and `action.yml`. This was chosen over adding a second generic code scanner because this repository is itself a GitHub Action and workflow-heavy automation repo, so workflow security analysis adds meaningfully different coverage while avoiding noisy duplication with CodeQL.
2026-04-09: Scope decision: keep CodeQL for action code, dependency-review for dependency deltas, and zizmor for GitHub Actions/workflow security. Broader secret scanning or external commercial SAST is intentionally out of scope for now.
<!-- SECTION:NOTES:END -->
