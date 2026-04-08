---
id: TASK-2.4
title: Define how to handle stale and superseded Renovate PRs
status: In Progress
assignee:
  - codex
created_date: '2026-04-07 15:03'
updated_date: '2026-04-08 11:03'
labels:
  - automation
  - renovate
  - maintenance
dependencies:
  - TASK-2.1
parent_task_id: TASK-2
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Define the repository approach for stale and superseded Renovate PRs that no longer match the desired grouping strategy. This should cover when to close obsolete intermediate PRs, when to preserve majors as standalone work, and how to validate the resulting Renovate behavior after the new configuration lands.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 The repository has explicit guidance for closing stale or superseded Renovate PRs created under the older fragmented strategy.
- [x] #2 Standalone major changes that should remain isolated, such as a Node runtime baseline jump, are called out explicitly.
- [x] #3 The task defines how the new Renovate configuration will be validated or smoke-tested after landing.
- [x] #4 The stale-PR handling approach is documented clearly enough for future maintainers to follow consistently.
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
2026-04-08: Implementation started on branch chore/task-2-4-renovate-stale-pr-policy from current main. The repository currently still has older Renovate remote branches for fragmented update families such as actions/checkout, actions/setup-node, codecov, toolkit package majors, eslint/typescript-eslint/typescript/prettier, husky/lint-staged, nock, and separate Node runtime lines. This subtask will define which of those stale PR families should be closed, which should remain isolated, and how the new grouping behavior should be verified after renovate.json lands.

2026-04-08: Stale/superseded PR handling policy for the current repository state:

- Close stale fragmented workflow PRs once the grouped workflow-maintenance strategy is active, including isolated branches for actions/checkout, actions/setup-node, codecov/codecov-action, and major artifact-action updates that are now covered by the github-actions-workflows or github-actions-runner-images groups.
- Close stale fragmented npm PRs once grouped replacements exist, including isolated tooling/test/local-workflow branches such as eslint-plugin-jest, prettier, typescript, major-eslint, major-typescript-eslint, major-jest, husky, lint-staged, and nock branches that are now covered by tooling-stack, test-stack, or local-workflow-tooling.
- Close stale lockfile-only follow-up branches when the repository has already moved past that intermediate state, such as older husky or standard-version lockfile refresh branches that no longer represent the current desired upgrade unit.
- Keep standalone major Node baseline jumps separate. In the current repository, node-24.x should remain an isolated review unit and should not be folded into the normal maintenance groups.
- Keep the newer GitHub Actions toolkit runtime major line separate as its own migration unit rather than treating those PRs as stale replacements for grouped routine maintenance work.

2026-04-08: Validation/smoke-test policy after Renovate config changes land:

- Confirm renovate.json still parses locally.
- Wait for the next Renovate run or dependency dashboard refresh and verify that newly created PRs use the expected group names/slugs instead of the older fragmented naming pattern.
- Close superseded open PRs only after a grouped replacement exists or after confirming the old branch no longer matches the intended grouping strategy.
- If Renovate continues to open fragmented PRs for a configured package family, treat that as a configuration bug and adjust renovate.json before bulk-closing more branches.
<!-- SECTION:NOTES:END -->
