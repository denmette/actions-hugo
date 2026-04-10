# Architecture

This repository is a TypeScript-based JavaScript GitHub Action that installs Hugo on a GitHub Actions runner. The codebase is small, but it has three distinct concerns that are easy to blur together if they are not written down:

- action runtime logic
- repository validation and release automation
- local contributor tooling

## Runtime flow

The published action is declared in [`action.yml`](../action.yml) and executes the bundled file in [`lib/index.js`](../lib/index.js). That bundle is generated from the TypeScript source in [`src/`](../src).

The runtime path is:

1. [`src/index.ts`](../src/index.ts) is the action entrypoint and converts uncaught runtime failures into `core.setFailed(...)`.
2. [`src/main.ts`](../src/main.ts) reads inputs, resolves the Hugo version, runs the installer, and then calls `hugo version` for confirmation.
3. [`src/get-latest-version.ts`](../src/get-latest-version.ts) resolves `latest`.
   It now prefers the Brew formula API and falls back to the GitHub Releases API when Brew lookup fails.
4. [`src/installer.ts`](../src/installer.ts) detects OS and architecture, tries direct candidate asset URLs first, then falls back to release-asset metadata lookup when direct URLs return 404s.
5. [`src/hugo-assets.ts`](../src/hugo-assets.ts) is the shared mapping layer for asset names and candidate download URLs.

Supporting helpers:

- [`src/get-os.ts`](../src/get-os.ts): runner platform mapping
- [`src/get-arch.ts`](../src/get-arch.ts): runner architecture mapping
- [`src/constants.ts`](../src/constants.ts): repository and command constants
- [`src/get-url.ts`](../src/get-url.ts): legacy-compatible first candidate URL accessor plus shared candidate export

## Build and artifact model

This repository commits its generated action bundle:

- source of truth: [`src/`](../src)
- generated runtime artifact: [`lib/index.js`](../lib/index.js)

The build step is:

```sh
corepack npm run build
```

That runs `ncc` and rewrites `lib/`. The repository treats `lib/` as a committed release artifact, so CI verifies it stays in sync with source and dependency changes.

## Test strategy

The current test strategy intentionally separates orchestration tests from lower-level installer behavior:

- [`__tests__/main.test.ts`](../__tests__/main.test.ts): unit tests for `run()` orchestration
- [`__tests__/installer.test.ts`](../__tests__/installer.test.ts): installer fallback behavior and direct asset URL resolution
- [`__tests__/get-latest-version.test.ts`](../__tests__/get-latest-version.test.ts): version and release metadata lookup
- [`__tests__/get-url.test.ts`](../__tests__/get-url.test.ts): candidate URL generation
- [`__tests__/get-os.test.ts`](../__tests__/get-os.test.ts) and [`__tests__/get-arch.test.ts`](../__tests__/get-arch.test.ts): platform mapping helpers

The test runner is Vitest. Tests use deterministic fixtures where possible and only keep a narrow set of maintained Hugo version pins:

- `latest` fixture for current release-path coverage
- one pinned recent version for deterministic compatibility coverage

## Workflow structure

The repository automation is intentionally split by responsibility:

- [`test.yml`](../.github/workflows/test.yml)
  Main validation workflow. Runs formatting, linting, type-checking, build, tests, and bundle verification.
- [`test-action.yml`](../.github/workflows/test-action.yml)
  Verifies the action entrypoint as a GitHub Action. Scheduled runs are a narrower smoke path; manual runs keep broader compatibility coverage.
- [`dev-image.yml`](../.github/workflows/dev-image.yml)
  Validates the Docker-based local development image. It now checks install, formatting, linting, type-checking, and tests inside the container.
- [`release.yml`](../.github/workflows/release.yml)
  Runs semantic-release, but only after the `Test` workflow succeeds on `main` via `workflow_run`. Manual release execution remains available through `workflow_dispatch`.
- [`update-major-tag.yml`](../.github/workflows/update-major-tag.yml)
  Maintains moving major tags after a published release.
- security and policy workflows:
  [`codeql-analysis.yml`](../.github/workflows/codeql-analysis.yml),
  [`dependency-review.yml`](../.github/workflows/dependency-review.yml),
  [`actions-security.yml`](../.github/workflows/actions-security.yml),
  [`conventional-pr.yml`](../.github/workflows/conventional-pr.yml)

## Tooling and local setup

The repository standardizes on:

- Node from [`.nvmrc`](../.nvmrc)
- npm from the `packageManager` field in [`package.json`](../package.json)
- Corepack as the activation layer for that pinned npm version

Contributor setup is documented in [`docs/local-setup.md`](./local-setup.md).

Important local helpers:

- [`Makefile`](../Makefile): Docker-based local commands
- [`Dockerfile`](../Dockerfile): dev image definition
- [`.husky/`](../.husky): local git hooks

## Current cleanup pressure points

The codebase is in a workable state, but these are still the main places where future cleanup has leverage:

- documentation drift versus actual workflow/runtime behavior
- release automation versus GitHub ruleset constraints
- long-term clarity on what remains action runtime logic versus repository maintenance logic

The PlantUML source for the current architecture lives in [`docs/architecture.puml`](./architecture.puml).
