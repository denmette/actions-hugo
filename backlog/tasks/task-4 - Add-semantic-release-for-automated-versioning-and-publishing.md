---
id: TASK-4
title: Add semantic-release for automated versioning and publishing
status: In Progress
assignee: []
created_date: '2026-04-08 11:35'
updated_date: '2026-04-09 10:07'
labels:
  - release
  - automation
  - ci
dependencies:
  - TASK-3
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Introduce semantic-release so versioning, changelog generation, tagging, and GitHub release publication are driven from conventional commits instead of the current partially manual release flow. This task should define the repository's semantic-release baseline, wire it into GitHub Actions, and ensure it fits the existing bundled-action release process.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 The repository includes a semantic-release configuration appropriate for its Node 24 GitHub Action packaging model.
- [ ] #2 Release automation is updated so semantic-release can determine the next version, create tags/releases, and publish release notes without the old manual release flow remaining as the primary path.
- [ ] #3 Required plugins, tokens, branch rules, and changelog behavior are documented or encoded in configuration.
- [ ] #4 The resulting release flow is validated to the extent practical through dry-run or local/CI inspection.
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
This task exists to replace ad hoc release handling with a conventional-commit-driven release process. It should review whether `standard-version` remains necessary once semantic-release is in place, and clean up release workflow steps that become redundant.
2026-04-09: Implementation plan: replace `standard-version` with `semantic-release` plus GitHub/changelog/npm/git plugins, move the release workflow from tag-triggered release creation to `main`-branch semantic-release execution, keep the major-tag workflow on published releases, and retire the old `release.sh` path.
<!-- SECTION:NOTES:END -->
