# Project Structure Overview

This document explains how the Real-Time Code Editor repository is organized and how pieces fit together.

At a glance

- backend/: Node.js + Express + Socket.IO server and Redis integration
- frontend/: React + Vite client, UI components, pages, and socket client
- shared/: Common code used by both backend and frontend (e.g., shared/actions.js)
- README.md: Setup, run instructions, and general usage
- CONTRIBUTING.md: Contribution workflow, branch/commit policies, PR checklist
- CODE_STRUCTURE.md: You are here — architectural map of the repo
 - package.json (root): Monorepo manager using npm workspaces

## Top-level directories

backend/
- index.js: App entry — HTTP server + Socket.IO + Redis adapter wiring
- socketController.js: Socket.IO event handling and room/user lifecycle
- getAllConnectedClients.js: Utility to list connected clients in a room
- services/redis.js: Redis client setup (ioredis)
- package.json: Scripts and dependencies for the backend
- vercel.json: Deployment configuration (if deploying serverless/edge)

frontend/
- index.html: Vite HTML template
- src/: Application source
  - main.jsx: App bootstrap (React root, router, providers)
  - App.jsx, App.css: Top-level app component and styles
  - Action.js: (legacy) Replaced by shared/actions.js
  - api.js: API helper(s) (HTTP calls if any)
  - constants.js: Shared frontend constants
  - socket.js: Socket.IO client initialization and helpers
  - components/: Reusable UI building blocks
    - CodeEditor.jsx: Monaco editor wrapper and code sync
    - CodeOutput.jsx: Code execution output (if applicable)
    - ChatBox.jsx: In-room chat UI and socket events
    - DrawingBoard.jsx: Collaborative drawing/overlay
    - LanguageSelector.jsx: Language selection for editor
    - HomePage/: Landing UI components (Hero, Navbar, etc.)
    - joinRoomPage/: Join room UI components
  - pages/: Route-level screens
    - HomePage.jsx: Landing page wiring
    - JoinRoomPage.jsx: Join/create room flow
    - EditorPage.jsx: Main collaborative editor page (chat, drawing, editor)
- public/: Static assets served by Vite
- vite.config.js: Vite build/dev config
- tailwind.config.js, postcss.config.js: Styling pipeline config
- package.json: Scripts and dependencies for the frontend

## Monorepo & npm workspaces

This repository is an npm workspaces monorepo. The root `package.json` declares two workspaces and orchestrates dev scripts:

- workspaces: ["backend", "frontend"]
- Root scripts:
  - `npm run dev`: Starts both backend and frontend concurrently
  - `npm run dev:backend`: Starts only the backend workspace
  - `npm run dev:frontend`: Starts only the frontend workspace

Tips for workspace-aware commands:

- Run a script in a specific workspace: `npm run -w backend dev`
- Install a dependency in a workspace: `npm i -w frontend <pkg>`
- Install devDependency in a workspace: `npm i -D -w backend <pkg>`

Note: The `shared/` folder is not a separate workspace; it contains common code (like `shared/actions.js`) consumed by both backend and frontend via relative import (backend) or Vite alias (frontend).

## How the app works (data flow)

1) Client joins a room
- In JoinRoomPage.jsx the user enters a username and/or room ID
- EditorPage.jsx uses `initSocket()` (src/socket.js) to connect to the Socket.IO server
- The client emits Actions.JOIN with { roomId, username, isCreator, deviceInfo }

2) Server handles room membership
- socketController.js receives JOIN, stores user info in Redis
- Maintains a room admin (creator or reassigned on disconnect)
- Adds the socket to the Socket.IO room and broadcasts JOINED with clients + admin

3) Code sync
- When a new client joins, current code is synced via Actions.SYNC_CODE
- Subsequent changes broadcast via Actions.CODE_CHANGE to other clients

4) Chat & presence
- ChatBox.jsx emits Actions.SEND_CHAT; server relays to the room as CHAT
- Presence is derived from connected sockets in a room (getAllConnectedClients.js)
- Admin reassignment occurs if the admin disconnects

5) Language selection and drawing overlay
- LanguageSelector.jsx updates current language via Actions.LANGUAGE_CHANGE
- DrawingBoard.jsx coordinates overlay visibility; data sharing via props/refs

## Socket events (Actions)

Common events used by both client and server are defined once in `shared/actions.js`.

- JOIN: client announces it wants to join a room
- JOINED: server broadcasts updated client list and admin info
- DISCONNECTED: server notifies the room when someone leaves
- CODE_CHANGE: code changes from one client broadcast to others
- SYNC_CODE: direct code sync to a newly joined client
- SEND_CHAT: outgoing chat message
- CHAT: chat message received by clients
- CURSOR_CHANGE: broadcast user cursor position
- LANGUAGE_CHANGE: update current language selection
- KICK_USER: admin-only action to remove a user from the room
- KICKED: targeted event to the removed user

Tip: Import actions from the shared module:

- Backend (CJS): `const Actions = require('../shared/actions');`
- Frontend (ESM via Vite alias): `import { Actions } from '@shared/actions';`

## Redis data model (server)

- userToUsernameMap (hash)
  - key: socket.id → value: username
- rooms:{roomId} (set)
  - members: socket.id
- room:{roomId}:admin (hash)
  - info → JSON string: { socketId, username, deviceInfo }
- room:{roomId} (hash)
  - language → JSON-encoded language selection

These keys are used for presence, admin assignment, and per-room settings.

## Environment variables

Backend
- PORT: defaults to 3001 if not provided
- REDIS_URL: Redis connection string (local, Docker, or cloud)

Frontend
- VITE_BACKEND_URL: base URL of the backend Socket.IO server

See README for sample `.env` values and platform-specific setup.

## NPM scripts

Root (monorepo)
- npm run dev: start backend and frontend together (uses concurrently)
- npm run dev:backend: start only backend
- npm run dev:frontend: start only frontend

Backend (in `backend/package.json`)
- npm run dev: start server with nodemon
- npm start: start server (production-like)

Frontend (in `frontend/package.json`)
- npm run dev: start Vite dev server
- npm run build: build for production
- npm run preview: preview built app
- npm run lint: run ESLint on the frontend

## Where to add new code

- New socket events: add constants in `shared/actions.js` only; implement handling in `backend/socketController.js` and emit/listen in frontend components or pages.
- New UI features: create components under `frontend/src/components/`, wire into pages in `frontend/src/pages/`.
- New API endpoints (if you add HTTP routes): define Express routes in `backend/` (you can add a `routes/` folder) and call them from `frontend/src/api.js`.
- Shared constants/types: keep frontend constants in `frontend/src/constants.js`; mirror necessary server-side values on the backend.

## Testing and validation (manual)

- Start Redis, then run backend and frontend dev servers
- Join a room in two different browser tabs or devices
- Verify code changes, chat, language changes, cursor movement, and kick flow

## Notes for contributors

- Keep event names stable across client and server
- Avoid breaking the shape of emitted payloads; if necessary, update all listeners
- For high-frequency events (cursor/typing), consider debounce/throttle to reduce load
- Document non-obvious flows in component or controller comments

If anything in this document is out of date, please open a PR to update it.
