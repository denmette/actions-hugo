---
id: TASK-12
title: Define container image ownership and clean up remaining upstream image references
status: To Do
assignee: []
created_date: '2026-04-08 16:05'
updated_date: '2026-04-08 16:05'
labels:
  - documentation
  - docker
  - maintenance
documentation:
  - /Users/macs/Coding/Personal/github-actions/actions-hugo/README.md
  - /Users/macs/Coding/Personal/github-actions/actions-hugo/Dockerfile
  - /Users/macs/Coding/Personal/github-actions/actions-hugo/.github/workflows
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Decide whether this maintained fork should also own and publish a Hugo-related container image, or whether container-image references should remain clearly external and attribution-only. Once that decision is made, clean up the remaining `peaceiris` image references in the README and related maintainer guidance so users are not left with mixed ownership signals.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 A clear repository-level decision is documented on whether this fork will maintain/publish a container image or only reference external images.
- [ ] #2 Remaining README references to `peaceiris/hugo` and `peaceiris/hugo-extended-docker` are reviewed against that decision and updated where needed.
- [ ] #3 If this fork will own a container image, follow-up implementation work for build, publish, tagging, and maintenance is either completed or split into explicit backlog tasks.
- [ ] #4 If this fork will not own a container image, the README and maintainer notes make that boundary explicit so upstream references are understood as external dependencies rather than current-fork deliverables.
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
2026-04-08: README.md still contains a `docker-compose.yml` example that points at `peaceiris/hugo` and links to `peaceiris/hugo-extended-docker`, while the action itself is already documented as a non-Docker action. This creates an ownership and maintenance ambiguity that should be resolved deliberately rather than by ad hoc README edits.
<!-- SECTION:NOTES:END -->
