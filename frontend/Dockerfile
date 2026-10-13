# Build stage: install Linux dependencies and produce the static bundle.
FROM node:22-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
# Reuse the npm download cache across builds: when dependencies change, only
# new/updated packages are fetched instead of the whole tree again.
RUN --mount=type=cache,target=/root/.npm npm ci

COPY . .

# Vite inlines env vars at build time. The API URL is called by the user's
# browser (not by this container), so it must be reachable from the host.
ARG VITE_API_URL=http://localhost:5001
ENV VITE_API_URL=$VITE_API_URL

RUN npm run build

# Serve stage: static files only, with SPA fallback (see nginx.conf).
FROM nginx:1.27-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
