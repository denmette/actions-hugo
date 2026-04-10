# Local Setup

This repository standardizes on:

- Node `24.14.1` from [`.nvmrc`](/Users/macs/Coding/Personal/github-actions/actions-hugo/.nvmrc)
- npm `11.12.1` from [`package.json`](/Users/macs/Coding/Personal/github-actions/actions-hugo/package.json)
- Corepack as the local tool used to activate the pinned package-manager version

The repository does not use Yarn or pnpm. The standard package manager is npm, and Corepack is used to activate the pinned npm version consistently.

## Bootstrap

Run these commands from the repository root:

```sh
nvm use
corepack enable
corepack install
npm ci
```

What this does:

- `nvm use` selects the repo baseline from `.nvmrc`
- `corepack enable` ensures the Corepack shims are available locally
- `corepack install` activates the pinned `packageManager` version for the repo
- `npm ci` installs dependencies from `package-lock.json`

## Daily Workflow

Use these commands during normal development:

```sh
npm run format:check
npm run lint
npm run tsc
npm test
```

Or run the common combined check:

```sh
npm run all
```

## Bundle Updates

This repository commits the generated action bundle in [`lib/`](/Users/macs/Coding/Personal/github-actions/actions-hugo/lib).

When you change:

- `src/**/*.ts`
- `package.json`
- `package-lock.json`
- `tsconfig.json`
- `action.yml`
- `.nvmrc`

run:

```sh
npm run build
git diff -- lib
```

The pre-commit hook already rebuilds `lib/` for common staged source and toolchain changes, but `git diff -- lib` is the direct check for whether the committed artifact is current.

## CI Notes

CI follows the same package-manager contract as local development. Workflows run `actions/setup-node`, then `corepack enable` and `corepack install`, and only then run `npm ci`. That keeps CI aligned with the `packageManager` field in `package.json` instead of manually installing an npm version ad hoc.
