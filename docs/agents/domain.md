# Domain Docs

This repo uses **single-context** layout for domain documentation.

## Layout

```
/
├── CONTEXT.md          # Project glossary, key decisions, current state
├── docs/
│   └── adr/            # Architecture Decision Records
└── docs/agents/        # Agent configuration (this directory)
```

## CONTEXT.md

The single source of truth for project understanding. Contains:

- **Glossary**: domain terms and their definitions
- **Current state**: what's built, what's in progress
- **Key decisions**: references to relevant ADRs
- **Open questions**: things not yet decided

Read `CONTEXT.md` at the start of any session to orient yourself.

## ADRs (Architecture Decision Records)

Significant architectural decisions are recorded in `docs/adr/`:

- Numbered sequentially: `0001-decision-name.md`
- Format: Context → Decision → Consequences

ADRs are immutable once merged. New decisions that supersede old ones create new ADRs that reference the superseded one.

## Consumer rules

1. Read `CONTEXT.md` before making changes
2. If you encounter a term you don't recognize, check the glossary
3. If you're making a significant decision, create an ADR
4. Keep `CONTEXT.md` updated as the project evolves
