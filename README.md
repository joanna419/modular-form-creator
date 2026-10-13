# Modular Form Creator

Resources Management application: create, track and complete resources through a
two-module workflow (Basic Info + Project Details) with a backend-driven status
lifecycle (`draft` → `completed`).

- Frontend: React 19, TypeScript, Vite, React Router, TanStack Query,
  React Hook Form, styled-components with the provided design system.
- Backend API contract: [backend/README.md](backend/README.md) (provided, not modified).

## Quick start: full stack in Docker

Requires [Docker Desktop](https://www.docker.com/products/docker-desktop/). From the
repository root:

```bash
docker compose up -d --build
```

| Service | URL |
| --- | --- |
| Frontend | `http://localhost:5173` |
| Backend API | `http://localhost:5001` |
| Swagger UI | `http://localhost:5001/docs` |

Stop everything with `docker compose down`.

The frontend image is a multi-stage build: Node builds the app (type-check + Vite
build) and nginx serves the static bundle (gzip, long-lived caching of hashed
assets, SPA fallback so deep links such as `/resources/3` work on refresh). The API
URL is baked in at build time (`VITE_API_URL` build arg) and points at the
backend's published port, because requests are sent by the browser on the host,
not by the frontend container. The frontend is published on `5173`, the origin the
backend allows for CORS, so the backend configuration is unchanged.

## Local development

Requires Node.js 22+ and npm. Start only the backend and MongoDB in Docker, then
the Vite dev server:

```bash
docker compose up -d backend
npm install
npm run dev
```

- Run either the frontend container or `npm run dev`, not both: both use port
  `5173`, and `localhost` may then silently serve the dev server. Stop the container
  with `docker compose stop frontend`.
- The dev server is for development (unbundled modules, development React build);
  judge load performance on the Docker build.
- `VITE_API_URL` defaults to `http://localhost:5001`; override it via
  `cp .env.example .env`.

### Scripts

```bash
npm run dev        # Vite dev server
npm run lint       # ESLint
npm run typecheck  # TypeScript (tsc -b)
npm run build      # type-check + production build
npm run preview    # preview the production build
npm run storybook  # design system stories
```

A [Husky](https://typicode.github.io/husky/) pre-commit hook runs `lint`,
`typecheck` and `build` and blocks the commit if any of them fails. It is installed
by `npm install`.

## Routes

| Path | Page |
| --- | --- |
| `/resources` | List: create, delete, search, filter by status, pagination |
| `/resources/:resourceId` | Overview: module progress, status, provisioning, buffered changes |
| `/resources/:resourceId/details` | Read-only summary of both modules and status |
| `/resources/:resourceId/basic-info` | Basic Info module form |
| `/resources/:resourceId/project-details` | Project Details module form |

Unknown URLs render a "Page not found" view inside the app layout.

## Business rules: how they are implemented

| Rule | Implementation |
| --- | --- |
| A resource is created from a name | Create form on the list (`POST /api/resources`); name validated with the backend's rule, server errors such as "must be unique" shown at the field |
| The name cannot be changed | Shown read-only in Basic Info and always sent unchanged |
| Modules are updated separately (draft) | Each form saves only its module: `PATCH …/basic-info` or `PATCH …/project-details` |
| Project Details only after Basic Info (draft) | Module card locked on the overview with a reason; the route redirects to the overview if opened directly |
| Draft → completed only through provisioning | "Complete resource" calls `PATCH …/provisioning` after a confirmation; no other code path changes the status |
| Provisioning only when both modules are complete | Button enabled only when both modules are complete (`canProvision`, mirroring the backend's checks) |
| A completed resource cannot be provisioned again | The action is not offered for completed resources |
| Completed resources: edits are buffered | Module forms on a completed resource write to an in-memory buffer instead of calling the API |
| Persist only on explicit submit, via full update | "Submit changes" on the overview sends one `PUT /api/resources/{id}` with both modules (buffered module edits override persisted data) |
| The buffer is lost on refresh / close | Plain React state (no storage); a `beforeunload` warning is shown while there are unsubmitted edits |

The backend remains the source of truth: client-side guards mirror its rules for UX,
and any rejection it returns is surfaced to the user.

## Key technical decisions

- **Server state: TanStack Query.** A query-key factory (`resources/list/{params}`,
  `resources/detail/{id}`) and one invalidation helper refresh lists and details
  after every mutation. List filtering, search and pagination are backend-driven
  (`keepPreviousData` avoids flicker, search is debounced). 4xx responses are not
  retried, so "not found" or "invalid id" is shown immediately.
- **Forms: React Hook Form with `Controller`.** The design system's inputs do not
  forward refs, so they are used as controlled components. Validators in
  `features/resources/lib/validation.ts` mirror the backend's rules.
- **Completed-resource edit buffer: React Context.** Client state, kept separate
  from the server cache (a refetch must not overwrite unsubmitted edits). It stores
  only real differences from persisted data: reverting a field to its saved value
  clears the "Edited" state; team members are compared as a set.
- **Feedback.** Field validation stays inline; outcomes of actions (success or
  server errors) are toasts (Sonner, styled with design-system tokens).
- **UI: the provided design system.** Every control (buttons, inputs, selects,
  checkbox group, cards, badges, icon button, drawer) comes from the design system;
  app-level styled-components only handle layout and use its theme tokens. The
  delete / provisioning confirmation uses the design system's `Drawer`, rendered
  through a portal so page-level styles cannot affect its overlay.
- **UX details.** Module progress on the list and overview, skeleton loading,
  context-aware empty states, responsive layout (≤640px), and on desktop only the
  resource list scrolls while the header, create form and filters stay in place.
- **Performance.** gzip and immutable caching in nginx, fonts requested from
  `index.html` instead of only after the bundle runs, and a plain-HTML boot screen
  until React renders.

## Project structure

The starter's layout is kept: the frontend lives at the repository root and the
application code is in `src/`.

```
modular-form-creator/
├── backend/                 # Provided API (not modified)
├── src/
│   ├── design-system/       # Provided design system (not modified)
│   ├── api/                 # HTTP client, endpoint functions, domain types
│   ├── app/                 # Query client, global app styles, breakpoints, animations
│   ├── features/resources/
│   │   ├── pages/           # One component per route
│   │   ├── components/      # Forms, cards, dialogs, states
│   │   ├── hooks/           # Queries, mutations, edit buffer access
│   │   ├── context/         # Completed-resource edit buffer
│   │   └── lib/             # Business rules, validation, payload building
│   └── routes/              # Router, layout, paths
├── Dockerfile, nginx.conf   # Frontend image
└── docker-compose.yml       # Frontend + backend + MongoDB
```

## Changes compared to the starter

The git history starts from the provided starter commit, so `git diff` from it
shows exactly the work done for the assignment.

- `backend/` and `src/design-system/`: unchanged.
- Application code: `src/` (`App.tsx`/`App.css` replaced by the router).
- Outside `src/`: frontend dependencies (`package.json`, `package-lock.json`), Vite /
  TypeScript configuration (`@/` path alias, dev server port), `index.html`, the
  Docker setup for the bonus (`docker-compose.yml`, `Dockerfile`, `nginx.conf`,
  `.dockerignore`), the pre-commit hook and this README.

## Troubleshooting

- **`Failed to resolve import "@/…"` in the dev server** after moving files,
  switching branches or editing `vite.config.ts`: restart `npm run dev`.
- **API calls blocked by CORS:** the frontend must run on `http://localhost:5173`
  (the dev server refuses to start on another port).
