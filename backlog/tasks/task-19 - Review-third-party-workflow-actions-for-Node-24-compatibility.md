---
id: TASK-19
title: Review third-party workflow actions for Node 24 compatibility
status: To Do
assignee: []
created_date: '2026-04-08 16:42'
updated_date: '2026-04-08 16:42'
labels:
  - github-actions
  - ci
  - maintenance
documentation:
  - /Users/macs/Coding/Personal/github-actions/actions-hugo/.github/workflows/label-commenter.yml
  - /Users/macs/Coding/Personal/github-actions/actions-hugo/.github/workflows/conventional-pr.yml
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Review third-party workflow actions that remain in the repository after the first-party Node 24 migration pass and determine whether they support GitHub's Node 24 runner transition. This currently includes actions such as `peaceiris/actions-label-commenter` and `ytanikin/pr-conventional-commits`, which are outside this repository's direct control and may need replacement if they do not move with the platform.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Remaining third-party workflow actions are identified and checked for Node 24 compatibility or updated maintained replacements.
- [ ] #2 Any unsupported third-party workflow action is either upgraded, replaced, or scheduled for removal with an explicit migration plan.
- [ ] #3 Repository workflow warnings related to Node 20 deprecation are re-evaluated after the third-party action review.
- [ ] #4 The resulting workflow set does not rely on unreviewed third-party JavaScript actions during the Node 24 transition.
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
2026-04-08: TASK-13 upgraded the repository's first-party GitHub actions usage and changed `action.yml` to `runs.using: node24`, but the workflow set still includes third-party actions such as `peaceiris/actions-label-commenter@v1.10.0` and `ytanikin/pr-conventional-commits@1.5.2`. Those should be reviewed separately because their Node 24 compatibility is controlled upstream.
<!-- SECTION:NOTES:END -->
