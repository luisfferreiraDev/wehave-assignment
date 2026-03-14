# WeHave Assignment

SvelteKit application for visualizing stadium section ticket allocations by sponsor and matchday.

## Live Demo

https://wehaveio-assignment.luisfferreira.dev/

## Stack

- SvelteKit + Svelte 5 runes
- TypeScript
- Tailwind CSS v4
- `sveltekit-search-params` for URL-synced filters
- `@sveltejs/adapter-node` for production builds
- pnpm

## Requirements

- Node.js 22+
- pnpm 9+

## Local Development

Install dependencies:

```sh
pnpm install
```

Run dev server:

```sh
pnpm dev
```

The app is available at `http://localhost:5173` by default.

## Available Scripts

```sh
pnpm dev          # start local dev server
pnpm build        # create production build
pnpm preview      # preview production build locally
pnpm check        # run svelte-check
pnpm lint         # run prettier check + eslint
pnpm format       # format codebase
```

## Production Build (Node Adapter)

Build locally:

```sh
pnpm build
```

Run output:

```sh
node build
```

Environment variables used at runtime:

- `NODE_ENV` (set to `production` in Docker)
- `HOST` (defaults to `0.0.0.0` in Docker)
- `PORT` (defaults to `3000` in Docker)

## Docker

This repository includes:

- `Dockerfile` for multi-stage production image
- `.dockerignore` optimized for smaller build context

Build image:

```sh
docker build -t wehave-assignment .
```

Run container:

```sh
docker run --rm -p 3000:3000 wehave-assignment
```

Then open `http://localhost:3000`.

## Project Structure

- `src/routes/+page.svelte`: main dashboard page
- `src/routes/+page.server.ts`: server-side load with filters and data shaping
- `src/lib/components`: reusable UI components (accordion, drawer, selectors, icons)
- `src/lib/data`: mock data and page constants
- `src/lib/types`: shared domain types
- `src/lib/utils`: shared utility helpers

## Notes

- Filter state is reflected in URL query params.
- The app currently relies on mock data in `src/lib/data/mockTickets.ts`.
