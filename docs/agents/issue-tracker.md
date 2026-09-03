# Issue Tracker

This repo uses **GitHub Issues** for tracking work.

## Location

Issues live at: https://github.com/mmuchsin/portfolio/issues

## CLI

Use the `gh` CLI for all issue operations:

```bash
# Create issue
gh issue create --title "..." --body "..."

# List issues
gh issue list

# View issue
gh issue view <number>

# Close issue
gh issue close <number>
```

## Blocking edges

Use GitHub's native "blocks" relationships via tasklists in issue bodies:

```markdown
- [ ] #123 <!-- blocks this issue -->
```

Or use the web UI to link blocking relationships.

## PRs as request surface

Off by default. External PRs are not triaged. To enable, add a PR webhook or manually triage incoming PRs.
