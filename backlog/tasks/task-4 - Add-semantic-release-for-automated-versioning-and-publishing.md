---
id: TASK-4
title: Add semantic-release for automated versioning and publishing
status: Done
assignee: []
created_date: '2026-04-08 11:35'
updated_date: '2026-04-09 10:29'
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
- [x] #1 The repository includes a semantic-release configuration appropriate for its Node 24 GitHub Action packaging model.
- [x] #2 Release automation is updated so semantic-release can determine the next version, create tags/releases, and publish release notes without the old manual release flow remaining as the primary path.
- [x] #3 Required plugins, tokens, branch rules, and changelog behavior are documented or encoded in configuration.
- [x] #4 The resulting release flow is validated to the extent practical through dry-run or local/CI inspection.
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
This task exists to replace ad hoc release handling with a conventional-commit-driven release process. It should review whether `standard-version` remains necessary once semantic-release is in place, and clean up release workflow steps that become redundant.
2026-04-09: Implementation plan: replace `standard-version` with `semantic-release` plus GitHub/changelog/git plugins, move the release workflow from tag-triggered release creation to `main`-branch semantic-release execution, keep the major-tag workflow on published releases, and retire the old `release.sh` path.
2026-04-09: Completed by replacing `standard-version` and the manual `release.sh` path with `semantic-release`, adding `.releaserc.json`, converting the release workflow to run on `main`, and keeping the existing major-tag workflow to maintain moving `vN` tags after published releases.
2026-04-09: Validation: workflow YAML parsed successfully, `npm run lint`, `npm run tsc`, and `env RUNNER_TEMP=/tmp npm test` passed, and `npm run release:dry-run` validated the semantic-release configuration and plugin loading until the expected remote GitHub lookup boundary in the restricted local environment.
2026-04-09: Residual note: the chosen semantic-release toolchain may still carry some transitive audit findings from upstream dependencies. That is accepted for this task because the repository now uses the cleaner automated release model, and remaining dependency-hygiene work should be tracked separately instead of keeping the old manual release flow.
<!-- SECTION:NOTES:END -->
