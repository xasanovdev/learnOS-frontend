# Domain Docs

This is a single-context repo. Engineering skills should use root-level domain documentation when it exists.

## Before Exploring

Read these files when present:

- `CONTEXT.md` at the repo root for the project glossary and domain language.
- `docs/adr/` for architectural decisions relevant to the area being changed.

If these files do not exist, proceed silently. Do not create domain docs just because they are missing; create or update them only when a skill workflow resolves durable domain language or architectural decisions.

## Vocabulary

Use the terms from `CONTEXT.md` in test names, issue titles, PRDs, refactor proposals, and implementation notes. Avoid inventing synonyms for established project concepts.

If a needed concept is missing from the glossary, either reconsider whether the term belongs in the project language or note it for a future documentation/grilling pass.

## ADR Conflicts

If a proposed change contradicts an existing ADR, call that out explicitly and explain why reopening the decision may be warranted.
