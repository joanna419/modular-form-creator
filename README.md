# Modular Form Creator

Resources Management application: create, track and complete resources through a
two-module workflow (Basic Info + Project Details) with a backend-driven status
lifecycle (`draft` → `completed`).

## Project structure

```
modular-form-creator/
├── backend/            # Provided Express + MongoDB API (not modified)
├── frontend/           # React + TypeScript + Vite app (the assignment work)
├── docker-compose.yml  # Backend + MongoDB stack
└── README.md
```

- Backend API contract: [backend/README.md](backend/README.md)
- Frontend stack: React 19, TypeScript, Vite, React Router, styled-components,
  TanStack Query.

## Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (for the backend + MongoDB)
- Node.js 20+ and npm (for the frontend)

## 1. Start the backend

From the repository root:

```bash
docker compose up -d
```

This starts the backend and MongoDB.

- API base URL: `http://localhost:5001`
- Swagger UI: `http://localhost:5001/docs`

Stop the stack with:

```bash
docker compose down
```

## 2. Start the frontend

```bash
cd frontend
npm install
npm run dev
```

The app runs at `http://localhost:5173` and talks to the backend at the URL in
`VITE_API_URL` (defaults to `http://localhost:5001`). To override it, copy the
example env file and edit the value:

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
