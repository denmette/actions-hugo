---
id: TASK-5
title: Enforce conventional commit style for pull requests
status: Done
assignee: []
created_date: '2026-04-08 11:35'
updated_date: '2026-04-08 11:52'
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
- [x] #1 A repository-level check exists that validates the selected conventional-commit rule for pull requests.
- [x] #2 The rule is scoped clearly enough that contributors know whether commit messages, PR titles, or both are enforced.
- [x] #3 The validation runs automatically in pull requests and fails predictably on non-conforming input.
- [x] #4 Any required contributor guidance or repository configuration updates are included in the same task.
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
This task should align with any future semantic-release setup so the enforced convention matches the release automation's expectations. Prefer a lightweight, well-supported workflow over custom scripting unless repository-specific behavior requires it.

Execution note on April 8, 2026: this task will enforce conventional commit style on pull request titles rather than on every commit message in the branch. That matches squash-merge workflows better and provides a stable release signal for later semantic-release adoption.

Completed on April 8, 2026 on branch `chore/task-5-conventional-pr-check`.

Changes applied:
- Added `.github/workflows/conventional-pr.yml` to validate pull request titles with `ytanikin/pr-conventional-commits@1.5.2`.
- Scoped the enforced types to the repository's current conventional commit vocabulary: `build`, `chore`, `ci`, `docs`, `feat`, `fix`, `perf`, `refactor`, `revert`, `style`, and `test`.
- Chose PR title enforcement, not commit-by-commit enforcement, so squash-merge workflows remain practical and future semantic-release adoption has a stable release signal.
- Disabled automatic PR labeling so the workflow remains focused on validation only.
- Added a maintainer note in `README.md` showing the expected PR-title format and examples, and clarifying that this check is separate from future release automation.

Follow-up adjustment on April 8, 2026: the original implementation used `amannn/action-semantic-pull-request`, but the repository switched to `ytanikin/pr-conventional-commits` so pull-request validation stays separate from eventual semantic-release adoption.

Validation:
- `ruby -e 'require "yaml"; Dir[".github/workflows/*.yml"].sort.each { |f| YAML.load_file(f) }'`
- `npx prettier --check --parser yaml .github/workflows/*.yml`
<!-- SECTION:NOTES:END -->
