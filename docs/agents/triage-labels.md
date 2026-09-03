# Triage Labels

This repo uses the canonical five-role triage labels.

| Role | Label | Description |
|------|-------|-------------|
| Needs triage | `needs-triage` | New issue, not yet reviewed |
| Needs more info | `needs-info` | Missing context, waiting on reporter |
| Ready for agent | `ready-for-agent` | Scoped, actionable, can be picked up by AI agent |
| Ready for human | `ready-for-human` | Requires human decision or action |
| Won't fix | `wontfix` | Acknowledged, but will not be addressed |

## Creating labels

If these labels don't exist in the repo, create them:

```bash
gh label create "needs-triage" --description "New issue, not yet reviewed" --color "BFD4F2"
gh label create "needs-info" --description "Missing context, waiting on reporter" --color "FBCA04"
gh label create "ready-for-agent" --description "Scoped, actionable, can be picked up by AI agent" --color "0E8A16"
gh label create "ready-for-human" --description "Requires human decision or action" --color "D93F0B"
gh label create "wontfix" --description "Acknowledged, but will not be addressed" --color "C5DEF5"
```

## Usage

- All new issues start with `needs-triage`
- Triage moves issues through roles via label changes
- `ready-for-agent` issues are picked up by `/implement`
