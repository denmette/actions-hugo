---
id: TASK-32
title: Add a GitHub release fallback when resolving the latest Hugo version
status: Done
assignee: []
created_date: '2026-04-10 09:05'
updated_date: '2026-04-10 10:00'
labels:
  - runtime
  - reliability
  - hugo
documentation:
  - /Users/macs/Coding/Personal/github-actions/actions-hugo/src/main.ts
  - /Users/macs/Coding/Personal/github-actions/actions-hugo/src/get-latest-version.ts
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Reduce runtime fragility when `hugo-version: latest` is requested. The action currently resolves `latest` exclusively through the Homebrew formula API, which means a Brew outage or mismatch can break the action even when the GitHub release metadata is healthy. Add a reliable fallback or unified resolution strategy so the action can still resolve the current Hugo release when one upstream metadata source fails.
<!-- SECTION:DESCRIPTION:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
2026-04-10: Task started on `main`. Current runtime behavior in `src/main.ts` resolves `latest` only through the Brew API path, even though `src/get-latest-version.ts` already supports both Brew and GitHub release metadata individually.
2026-04-10: Completed by introducing `getLatestVersionWithFallback()` in `src/get-latest-version.ts` and updating `src/main.ts` to use it when `hugo-version` is empty or `latest`. The action now prefers Brew but falls back to the GitHub release API when Brew fails. Validation: `corepack npm run lint`, `corepack npm run tsc`, and `corepack npm exec vitest run __tests__/get-latest-version.test.ts __tests__/main.test.ts`.
<!-- SECTION:NOTES:END -->
