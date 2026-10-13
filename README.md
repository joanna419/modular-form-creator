# Modular Form Creator

Resources Management application: create, track and complete resources through a
two-module workflow (Basic Info + Project Details) with a backend-driven status
lifecycle (`draft` → `completed`).

## Project structure

```
modular-form-creator/
├── backend/            # Provided Express + MongoDB API (not modified)
├── frontend/           # React + TypeScript + Vite app (the assignment work)
├── docker-compose.yml  # Full stack: frontend + backend + MongoDB
└── README.md
```

- Backend API contract: [backend/README.md](backend/README.md)
- Frontend stack: React 19, TypeScript, Vite, React Router, styled-components,
  TanStack Query, React Hook Form.

## Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- Node.js 22+ and npm (only for running the frontend outside Docker)

## Quick start: full stack in Docker

From the repository root:

```bash
docker compose up -d --build
```

| Service | URL |
| --- | --- |
| Frontend | `http://localhost:5173` |
| Backend API | `http://localhost:5001` |
| Swagger UI | `http://localhost:5001/docs` |

The frontend image is a multi-stage build: Node builds the app (type-check +
Vite build), nginx serves the static bundle with an SPA fallback so deep links
such as `/resources/3` work on refresh. The API URL is baked in at build time
(`VITE_API_URL` build arg) and points at the backend's published port, because
requests are sent by the browser on the host — not by the frontend container.

Stop everything with:

```bash
docker compose down
```

## Local development (frontend outside Docker)

Start only the backend and MongoDB, then the Vite dev server:

```bash
docker compose up -d backend
cd frontend
npm install
npm run dev
```

The dev server also uses port `5173` (the backend's allowed CORS origin). Run either
the frontend container or `npm run dev`, not both: they can bind the same port on
IPv4 and IPv6 at once, and `localhost` then silently serves the (slower,
unbundled) dev server. Stop the container first with `docker compose stop frontend`.

The dev server is meant for development (unbundled modules, development React
build). Judge load performance on the Docker/production build.

The app talks to the backend at `VITE_API_URL` (defaults to
`http://localhost:5001`). To override it, copy the example env file and edit it:

```bash
cp .env.example .env
```

## Routes

| Path | Page |
| --- | --- |
| `/resources` | Resources list (create / delete) |
| `/resources/:resourceId` | Resource overview (module progress, actions) |
| `/resources/:resourceId/details` | Resource details / summary |
| `/resources/:resourceId/basic-info` | Basic Info module form |
| `/resources/:resourceId/project-details` | Project Details module form |

## Frontend scripts

Run these from `frontend/`:

```bash
npm run dev        # start the dev server
npm run lint       # ESLint
npm run typecheck  # TypeScript (tsc -b)
npm run build      # type-check + production build
npm run preview    # preview the production build
npm run storybook  # design system stories
```

## Pre-commit checks

A [Husky](https://typicode.github.io/husky/) pre-commit hook runs `lint`,
`typecheck` and `build` before every commit and blocks the commit if any of
them fails. It is installed automatically by `npm install` in `frontend/`.
