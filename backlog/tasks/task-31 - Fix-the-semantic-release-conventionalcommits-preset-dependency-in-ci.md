---
id: TASK-31
title: Fix the semantic-release conventionalcommits preset dependency in CI
status: To Do
assignee: []
created_date: '2026-04-10 07:55'
updated_date: '2026-04-10 07:55'
labels:
  - release
  - ci
  - dependencies
dependencies:
  - TASK-4
documentation:
  - /Users/macs/Coding/Personal/github-actions/actions-hugo/.releaserc.json
  - /Users/macs/Coding/Personal/github-actions/actions-hugo/.github/workflows/release.yml
  - /Users/macs/Coding/Personal/github-actions/actions-hugo/package.json
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Fix the semantic-release failure introduced by the `conventionalcommits` preset configuration. The current release workflow fails during `@semantic-release/commit-analyzer` because `conventional-changelog-conventionalcommits` is not present in the installed dependency graph, even though the release configuration now depends on it.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 The release workflow no longer fails with `Cannot find module 'conventional-changelog-conventionalcommits'`.
- [ ] #2 The semantic-release configuration and installed dependencies are aligned, either by adding the missing preset package or by simplifying the config to use only installed defaults.
- [ ] #3 `npm run release:dry-run` or equivalent CI validation succeeds through plugin loading and commit analysis.
- [ ] #4 Any documentation or task notes that describe the semantic-release setup are updated to match the final fix.
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
2026-04-10: Follow-up after the release workflow failed in CI during `@semantic-release/commit-analyzer` with `Cannot find module 'conventional-changelog-conventionalcommits'`. This was introduced after refining `.releaserc.json` to use the `conventionalcommits` preset without explicitly ensuring the matching preset package is installed.
2026-04-10: The fix should prefer a clean release-tooling contract: either install the preset package explicitly or adjust `.releaserc.json` to avoid referencing a preset that is not part of the repo dependency graph.
<!-- SECTION:NOTES:END -->
