---
id: TASK-7
title: Align repository and action metadata with the current fork and maintainer
status: Done
assignee: []
created_date: '2026-04-08 13:50'
updated_date: '2026-04-08 14:37'
labels:
  - metadata
  - documentation
  - maintenance
documentation:
  - /Users/macs/Coding/Personal/github-actions/actions-hugo/package.json
  - /Users/macs/Coding/Personal/github-actions/actions-hugo/action.yml
  - /Users/macs/Coding/Personal/github-actions/actions-hugo/README.md
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Update repository metadata so package metadata, action metadata, and maintainer-facing links consistently point to the current fork rather than the upstream origin where appropriate. This should preserve factual fork attribution while ensuring release links, issue links, and action metadata are accurate for users of this maintained fork.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 `package.json` metadata fields such as `repository`, `bugs`, `homepage`, and maintainer attribution are reviewed and updated for the current fork where appropriate.
- [x] #2 `action.yml` metadata such as `author` is reviewed and aligned with the fork's intended maintainer-facing presentation.
- [x] #3 Any README or repository guidance needed to preserve explicit upstream fork attribution remains accurate after the metadata update.
- [x] #4 The resulting metadata is internally consistent and points users to the maintained repository rather than stale upstream issue/release pages.
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
2026-04-08: Current repository metadata still points to `peaceiris/actions-hugo` in `package.json`, and `action.yml` still declares `author: 'peaceiris'`. That creates drift between the maintained fork and the metadata surfaced to users and release tooling.
2026-04-08: Implementation plan: update package and action metadata to the maintained fork, replace stale repo-facing README badges and links, and add explicit fork attribution so upstream origin remains visible.
2026-04-08: Completed by repointing package metadata, `action.yml` author metadata, and top-level README repo links to `denmette/actions-hugo` while preserving explicit fork attribution to `peaceiris/actions-hugo`.
2026-04-08: Validation: `node -e "JSON.parse(require('fs').readFileSync('package.json','utf8'))"` and `ruby -e 'require "yaml"; YAML.load_file("action.yml")'`.
<!-- SECTION:NOTES:END -->
