---
id: TASK-5
title: Enforce conventional commit style for pull requests
status: To Do
assignee: []
created_date: '2026-04-08 11:35'
updated_date: '2026-04-08 11:35'
labels:
  - ci
  - pull-requests
  - conventions
dependencies:
  - TASK-3
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Add repository automation that checks pull requests for compliance with the project's conventional commit expectations. This task should decide whether enforcement happens on commit messages, PR titles, or both, then add the necessary GitHub Action or validation workflow so non-conforming pull requests are flagged consistently before merge.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 A repository-level check exists that validates the selected conventional-commit rule for pull requests.
- [ ] #2 The rule is scoped clearly enough that contributors know whether commit messages, PR titles, or both are enforced.
- [ ] #3 The validation runs automatically in pull requests and fails predictably on non-conforming input.
- [ ] #4 Any required contributor guidance or repository configuration updates are included in the same task.
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
This task should align with any future semantic-release setup so the enforced convention matches the release automation's expectations. Prefer a lightweight, well-supported workflow over custom scripting unless repository-specific behavior requires it.
<!-- SECTION:NOTES:END -->
