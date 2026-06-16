# Issue Tracker: GitHub

Issues, PRDs, and implementation slices for this repo live as GitHub issues in `xasanovdev/learnOS-frontend`.

Use the `gh` CLI from the repo root. `gh` should infer the repository from `git remote -v`.

## Conventions

- Create an issue: `gh issue create --title "..." --body "..."`
- Read an issue: `gh issue view <number> --comments`
- List issues: `gh issue list --state open --json number,title,body,labels,comments`
- Comment on an issue: `gh issue comment <number> --body "..."`
- Apply a label: `gh issue edit <number> --add-label "..."`
- Remove a label: `gh issue edit <number> --remove-label "..."`
- Close an issue: `gh issue close <number> --comment "..."`

## Skill Semantics

- When a skill says "publish to the issue tracker", create a GitHub issue.
- When a skill says "fetch the relevant ticket", run `gh issue view <number> --comments`.
- When a skill creates AFK-ready work, apply the configured `ready-for-agent` label.
