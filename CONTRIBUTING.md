# Contributing Guide

Thanks for your interest in contributing to Real-Time Code Editor! This guide explains how to propose changes, our branching and commit conventions, and what to expect during review.

If you’re here for Hacktoberfest: welcome! We label good first issues and will mark eligible PRs as hacktoberfest-accepted when appropriate. See the Hacktoberfest notes below.

## How you can help

- Report bugs and propose enhancements
- Implement features or fix bugs from issues
- Improve documentation and examples
- Refactor code and improve performance

Before starting, please skim the README to set up the project locally.

## Development quickstart

The repo has two workspaces: `backend/` (Node/Express + Socket.IO + Redis) and `frontend/` (React + Vite).

1) Install deps
- backend: `cd backend && npm install`
- frontend: `cd frontend && npm install`

2) Run locally
- Start Redis (see README for options)
- `cd backend && npm run dev`
- `cd frontend && npm run dev`

Open http://localhost:5173 and verify you can create/join a room.

## Contribution workflow

We follow a lightweight GitHub flow.

1) Find or open an issue
- Search [existing issues](https://github.com/siddxharth1/real-time-code-editor/issues) to avoid duplicates
- If none exists, open a new one describing the problem/feature and proposed approach
- Wait to be assigned before you start (helps avoid duplicate work)

2) Fork and clone
- Fork this repository to your account
- Clone your fork locally
- Add the upstream remote to sync later

3) Create a branch
- Use the branch naming policy below
- One task per branch keeps reviews focused

4) Make your changes
- Follow the code style and guidelines below
- For UI changes, add screenshots when opening the PR
- Keep changes minimal and focused

5) Commit using Conventional Commits
- See commit message policy below

6) Keep up to date with upstream
- Rebase or merge `upstream/main` into your branch if your PR stays open for long

7) Open a Pull Request (PR)
- Fill a clear title and description, link the issue (e.g., “Fixes #123”)
- Include steps to test, and screenshots for UI
- Check the PR checklist below before submitting

8) Review & iterate
- A maintainer will review, suggest changes, or approve
- Squash merge is preferred to keep history clean

## Branch naming policy

Use a short, descriptive branch name with a type prefix and optional issue number.

Format
- type/issue-optional-short-slug
- type/short-slug-issue-optional

Allowed type prefixes
- feat: new feature
- fix: bug fix
- docs: documentation only
- refactor: refactoring without behavior change
- perf: performance improvement
- test: adding/improving tests
- chore: tooling, build, config, housekeeping
- ci: CI/CD related changes

Examples
- feat/123-live-cursor-avatars
- fix/editor-socket-reconnect
- docs/update-readme-contributing
- chore/redis-config-cleanup

Guidelines
- Use lowercase kebab-case for the slug
- Keep it under ~50 characters when possible
- One issue/change per branch

Regex (informal)
- ^(feat|fix|docs|refactor|perf|test|chore|ci)/[a-z0-9._-]+(\-\d+)?$

## Commit message policy (Conventional Commits)

Follow Conventional Commits to make history readable and auto-generate changelogs in the future.

Format
- type(scope): short summary
- Blank line
- Optional body and/or footer (e.g., “Fixes #123”)

Types
- feat: a new feature
- fix: a bug fix
- docs: documentation only changes
- style: formatting, no code change (not CSS; use sparingly)
- refactor: code change that neither fixes a bug nor adds a feature
- perf: performance improvement
- test: adding or correcting tests
- build: changes that affect the build system or dependencies
- ci: CI configuration or scripts
- chore: maintenance tasks
- revert: revert a previous commit

Examples
- feat(editor): add language selector with Monaco
- fix(socket): handle reconnect on room leave
- docs(contributing): add branch naming policy
- refactor(backend): extract redis adapter init
- perf(frontend): throttle cursor position emits
- chore: upgrade vite and react to latest

Tip
- Reference issues in the footer: “Fixes #123” or “Refs #123”

## Code style and quality

General
- Keep functions small and focused
- Prefer descriptive names and clear comments for non-obvious logic
- Avoid dead code; remove commented-out blocks unless needed for docs

Frontend (React + Vite)
- Run `npm run lint` in `frontend/` and fix warnings
- Prefer functional components and hooks
- Keep components focused; lift state up only when necessary
- For shared UI logic, consider small hooks in `src/`

Backend (Node/Express)
- Follow existing patterns in `backend/`
- Validate inputs at the API/socket boundaries
- Handle errors gracefully; avoid crashing the process
- Keep socket event names and payloads consistent with the frontend

Performance & UX
- Be mindful of network and re-renders in collaborative flows
- Debounce/throttle frequent events (e.g., cursor/typing) where appropriate

## PR checklist

Before you submit your PR, please ensure:
- [ ] The PR title follows Conventional Commits
- [ ] The branch name follows the policy above
- [ ] Linked an issue (e.g., “Fixes #123”)
- [ ] Builds/dev servers run locally for both backend and frontend
- [ ] No new ESLint errors in `frontend/`
- [ ] Docs updated (README, comments, or this guide) if behavior changed
- [ ] Screenshots/GIFs added for UI changes

## Issue labels

- good first issue: friendly starter tasks
- help wanted: needs community help
- bug, feature, enhancement: type of work
- hacktoberfest: eligible contributions

## Hacktoberfest notes

- We’re happy to support first-time contributors
- We’ll label suitable issues with `hacktoberfest` or `good first issue`
- Quality matters: small, meaningful PRs are welcome
- We’ll add `hacktoberfest-accepted` on valid PRs that meet our guidelines

## Security

Please do not open public issues for security vulnerabilities. Instead, use GitHub’s “Report a vulnerability” (Security advisories) feature or contact the maintainers privately. Provide enough details to reproduce the issue and a suggested fix if possible.

## Questions?

Open a discussion or comment on the relevant issue. Thanks again for contributing and making this project better!

