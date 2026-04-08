---
id: TASK-11
title: Align issue templates and maintainer routing with the current fork
status: To Do
assignee: []
created_date: '2026-04-08 15:45'
updated_date: '2026-04-08 15:45'
labels:
  - documentation
  - github
  - maintenance
documentation:
  - /Users/macs/Coding/Personal/github-actions/actions-hugo/.github/ISSUE_TEMPLATE/1_user_support.yml
  - /Users/macs/Coding/Personal/github-actions/actions-hugo/.github/ISSUE_TEMPLATE/2_bug_report.txt
  - /Users/macs/Coding/Personal/github-actions/actions-hugo/.github/ISSUE_TEMPLATE/3_proposal.yml
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Update GitHub issue templates and related maintainer-routing metadata so new issues are assigned or directed consistently for the maintained fork rather than the original upstream maintainer. This should ensure issue triage paths match the current repository ownership and avoid silently routing issue notifications to `peaceiris`.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Issue template assignees and maintainer-facing metadata no longer point to `peaceiris` unless explicitly intended and documented.
- [ ] #2 New issues opened from repository templates route to the current fork maintainer workflow.
- [ ] #3 Template wording remains accurate about support expectations and ownership after the maintainer-routing update.
- [ ] #4 Any other nearby maintainer-routing metadata in `.github/` is reviewed for similar fork drift during the same change.
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
2026-04-08: Review found multiple issue templates in `.github/ISSUE_TEMPLATE/` still assign new issues to `peaceiris`, which no longer matches the maintained fork's ownership.
<!-- SECTION:NOTES:END -->
