---
id: TASK-10
title: Rewrite the README for the maintained fork and current test runner
status: To Do
assignee: []
created_date: '2026-04-08 15:45'
updated_date: '2026-04-08 15:45'
labels:
  - documentation
  - readme
  - maintenance
documentation:
  - /Users/macs/Coding/Personal/github-actions/actions-hugo/README.md
  - /Users/macs/Coding/Personal/github-actions/actions-hugo/package.json
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Rewrite the repository README so it consistently reflects the maintained `denmette/actions-hugo` fork, the current Vitest-based local validation flow, and the current maintainer-facing links. The rewrite should preserve factual upstream attribution to `peaceiris/actions-hugo` without leaving users on stale action references, stale badges, or outdated local testing commands.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 README usage examples for this action point to the maintained fork where that is the intended consumer guidance.
- [ ] #2 Local validation and test-runner guidance reflects the current `vitest`-based `npm test` flow rather than older `--runInBand` instructions.
- [ ] #3 Repository badges, release references, and maintainer-facing links are internally consistent with the maintained fork.
- [ ] #4 Upstream attribution to `peaceiris/actions-hugo` remains explicit and accurate without dominating the current-fork guidance.
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
2026-04-08: Review found that README.md still mixes current-fork metadata with older upstream-oriented usage examples and stale local test instructions such as `npm test -- --runInBand`.
<!-- SECTION:NOTES:END -->
