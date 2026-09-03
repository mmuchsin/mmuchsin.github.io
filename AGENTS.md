# AGENTS.md — Portfolio Project

## Package Management

**Always use `bun` instead of `npm` or `yarn` for all package management and script execution** (install, run, build, test) in this project. Never fall back to npm even if `package-lock.json` exists.

Examples:
- `bun install` instead of `npm install`
- `bun add <package>` instead of `npm install <package>`
- `bun remove <package>` instead of `npm uninstall <package>`
- `bunx instead` of `npx`
- `bun run dev`, `bun run build`, `bun run check`, `bun run test`

This applies to all shell commands, scripts, and agent actions.
