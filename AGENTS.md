# Repository Guidelines

## Project Structure & Module Organization
This repository is a TypeScript-based GitHub Action for installing Hugo. Source files live in `src/`; `src/index.ts` is the action entrypoint and `src/main.ts` coordinates the install flow. Tests live in `__tests__/` with fixture payloads under `__tests__/data/`. Repository metadata and packaging files are at the root, including `action.yml`, `Dockerfile`, `Makefile`, `.releaserc.json`, and the workflow definitions under `.github/workflows`. Build output is generated into `lib/`, which is the path referenced by `action.yml`.

## Build, Test, and Development Commands
Use Node `24.10+` and npm `10.2+` as declared in `package.json`.

- `npm test`: run Vitest with coverage.
- `npm run lint`: lint all TypeScript in `src/` and `__tests__/`.
- `npm run format:check`: verify Prettier formatting.
- `npm run build`: bundle the action with `@vercel/ncc` into `lib/`.
- `npm run release:dry-run`: load the semantic-release configuration and validate the release flow up to the remote GitHub boundary.
- `npm run all`: run format check, lint, and tests in one pass.
- `npm install`: installs dependencies and refreshes the local Husky hooks automatically.
- `git pull --rebase`: the post-merge hook only refreshes dependencies when `package.json`, `package-lock.json`, or `.nvmrc` changed, and it warns instead of failing the pull if `npm ci` cannot complete.
- `make test` or `make all`: run the same checks inside the project’s Docker image.

## Coding Style & Naming Conventions
Follow `.editorconfig` and Prettier defaults: 2-space indentation, LF endings, UTF-8, trailing newline, semicolons, single quotes, and a 100-character line width. Keep TypeScript modules focused and prefer small helpers such as `get-os.ts` and `get-arch.ts`. Use kebab-case for file names and `*.test.ts` for test files. Let ESLint and Prettier drive formatting instead of hand-formatting.

## Testing Guidelines
Tests use Vitest and match `**/*.test.ts`. Add unit tests beside existing suites in `__tests__/`, and store reusable API fixtures in `__tests__/data/` when mocking external responses. Run `npm test` before opening a PR; `npm run all` is the expected pre-push check. Coverage is collected automatically, even though no explicit threshold is enforced.

## Commit & Pull Request Guidelines
Recent history follows Conventional Commit style, for example `feat: bump to use node20 runtime`, `docs: update cache usage`, and `ci: bump actions/upload-artifact from 3 to 4`. Keep subjects imperative and scoped when useful, such as `fix(doc): ...` or `chore(release): ...`. PRs should include a short description, link the relevant issue when applicable, and note user-visible changes to the action, README, or generated `lib/` bundle.

Maintain a linear Git history. Only use `git pull --rebase` for pulls; do not create merge commits from `git pull`.

<!-- BACKLOG.MD MCP GUIDELINES START -->

<CRITICAL_INSTRUCTION>

## BACKLOG WORKFLOW INSTRUCTIONS

This project uses Backlog.md MCP for all task and project management activities.

**CRITICAL GUIDANCE**

- If your client supports MCP resources, read `backlog://workflow/overview` to understand when and how to use Backlog for this project.
- If your client only supports tools or the above request fails, call `backlog.get_backlog_instructions()` to load the tool-oriented overview. Use the `instruction` selector when you need `task-creation`, `task-execution`, or `task-finalization`.

- **First time working here?** Read the overview resource IMMEDIATELY to learn the workflow
- **Already familiar?** You should have the overview cached ("## Backlog.md Overview (MCP)")
- **When to read it**: BEFORE creating tasks, or when you're unsure whether to track work

These guides cover:
- Decision framework for when to create tasks
- Search-first workflow to avoid duplicates
- Links to detailed guides for task creation, execution, and finalization
- MCP tools reference

You MUST read the overview resource to understand the complete workflow. The information is NOT summarized here.

</CRITICAL_INSTRUCTION>

<!-- BACKLOG.MD MCP GUIDELINES END -->
