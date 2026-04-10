---
id: TASK-33
title: Refresh the README support matrix and outdated workflow examples
status: Done
assignee: []
created_date: '2026-04-10 09:05'
updated_date: '2026-04-10 10:15'
labels:
  - documentation
  - ci
  - maintenance
documentation:
  - /Users/macs/Coding/Personal/github-actions/actions-hugo/README.md
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Update the README so it matches the current maintained fork and supported workflow baseline. The support table and example workflows still refer to older runner images and older action majors, which makes the public documentation lag behind the real repository behavior.
<!-- SECTION:DESCRIPTION:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
2026-04-10: Task started on `main`. Current README examples still mention `ubuntu-20.04`, `windows-2019`, and older first-party GitHub Action majors such as `actions/checkout@v4` and `actions/setup-node@v4`.
2026-04-10: Completed by refreshing the support matrix to `ubuntu-latest`, `macos-latest`, and `windows-latest`, updating example workflows to current first-party action majors (`actions/checkout@v6`, `actions/setup-node@v6`), aligning example branch names with `main`, and updating the `latest` version note to reflect the current Brew-first with GitHub-fallback behavior.
<!-- SECTION:NOTES:END -->
