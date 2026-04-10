---
id: TASK-32
title: Add a GitHub release fallback when resolving the latest Hugo version
status: To Do
assignee: []
created_date: '2026-04-10 09:05'
updated_date: '2026-04-10 09:05'
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
