# NextHood

[![CI](https://github.com/Kiranpjk/nexthood/actions/workflows/ci.yml/badge.svg)](https://github.com/Kiranpjk/nexthood/actions/workflows/ci.yml)
[![Docker](https://github.com/Kiranpjk/nexthood/actions/workflows/docker.yml/badge.svg)](https://github.com/Kiranpjk/nexthood/actions/workflows/docker.yml)

Find a neighborhood that fits how you live. You describe your lifestyle and budget, and NextHood scores a set of neighborhoods against it and explains each match.

## What it does

- **Sign-in** with email and password or Google (Firebase Auth)
- **Onboarding** form for who you are moving with, budget and the amenities you care about
- **AI matching:** Gemini scores each neighborhood against your preferences and explains why
- **Dashboard** with match cards, manual filters and a rent chart
- **Chat assistant** for questions about neighborhoods

The neighborhood list is sample data for 10 areas in Indian cities (`src/lib/neighborhood-data.ts`), not a live data feed.

## Stack

Next.js 15 (App Router, standalone output), TypeScript, Tailwind CSS, shadcn/ui, Firebase Auth, Genkit with Gemini. Tested with Vitest and Testing Library, linted with ESLint.

## Run it locally

Needs Node.js 22.

```bash
npm ci
cp .env.example .env.local
npm run dev
```

Then open http://localhost:9002.

## Environment variables

Fill in `.env.local` (all are listed in `.env.example`). None of them are needed to build.

| Variable | When it is read | What it is |
|---|---|---|
| `NEXT_PUBLIC_FIREBASE_*` (six keys) | Build time, inlined into the browser bundle | Firebase web app config. Without these the pages still load, but sign-in shows an error |
| `GEMINI_API_KEY` | Runtime, server only | Google AI Studio key. Without it, matching and chat return a fallback message |

## Checks

```bash
npm run lint        # ESLint (next/core-web-vitals + next/typescript)
npm run typecheck   # tsc --noEmit
npm test            # Vitest unit and component tests
npm run build       # production build, fails on type errors
```

## Run with Docker

The image uses Next.js standalone output and runs as a non-root user on port 3000.

```bash
docker build -t nexthood \
  --build-arg NEXT_PUBLIC_FIREBASE_API_KEY=... \
  --build-arg NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=... \
  --build-arg NEXT_PUBLIC_FIREBASE_PROJECT_ID=... \
  --build-arg NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=... \
  --build-arg NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=... \
  --build-arg NEXT_PUBLIC_FIREBASE_APP_ID=... \
  .
docker run --rm -p 3000:3000 -e GEMINI_API_KEY=... nexthood
```

The build args are optional; without them the image builds, but sign-in is disabled.

A prebuilt image from `main` (built without Firebase config) is published to GitHub Container Registry:

```bash
docker run --rm -p 3000:3000 -e GEMINI_API_KEY=... ghcr.io/kiranpjk/nexthood:latest
```

## CI/CD

GitHub Actions, in `.github/workflows/`:

- **`ci.yml`** runs on every push to `main` and every pull request: `npm ci`, lint, typecheck, tests and a production build, with npm and Next.js build caches.
- **`docker.yml`** builds the Docker image on pull requests, and on pushes to `main` or `v*` tags publishes it to `ghcr.io/kiranpjk/nexthood` (tags: `latest`, `main`, commit SHA, and the version for tags) using the built-in `GITHUB_TOKEN`.
- **Dependabot** (`.github/dependabot.yml`) opens weekly update PRs for npm packages, GitHub Actions and the Docker base image.

## Security

Dependency audit (Nov 2026): `npm audit` went from 72 advisories (8 critical, 28 high, 32 moderate, 4 low) to 72 (0 critical, 12 high, 60 moderate, 0 low).

- Upgraded Next.js 15.3.8 → 15.5.29 (patch line of the same major) and Vitest 3 → 4 (dev only).
- `overrides` in `package.json` move `@grpc/grpc-js` (pinned old by Firebase), `sharp` and Next.js's bundled `postcss` to patched versions.
- The 12 remaining high advisories all come from Genkit, which still depends on Zod 3 and OpenTelemetry 1.x; there is no patched Genkit release yet. Most moderates are in the same Genkit/OpenTelemetry tree. Dependabot will pick up fixes when they ship.
