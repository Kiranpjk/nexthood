# NextHood

Find a neighborhood that fits how you live. You describe your lifestyle and budget, and NextHood scores a set of neighborhoods against it and explains each match.

## What it does

- **Sign-in** with email and password or Google (Firebase Auth)
- **Onboarding** form for who you are moving with, budget and the amenities you care about
- **AI matching:** Gemini scores each neighborhood against your preferences and explains why
- **Dashboard** with match cards, manual filters and a rent chart
- **Chat assistant** and an AI-generated profile avatar

The neighborhood list is sample data for 10 areas in Indian cities (`src/lib/neighborhood-data.ts`), not a live data feed.

## Stack

Next.js 15 (App Router), TypeScript, Tailwind CSS, shadcn/ui, Firebase Auth, Genkit with Gemini.

## Run it locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

Then open http://localhost:9002.

Fill in `.env.local`:

| Variable | What it is |
|---|---|
| `NEXT_PUBLIC_FIREBASE_*` (six keys) | Firebase web app config. Without these the pages still load, but sign-in shows an error |
| `GEMINI_API_KEY` | Google AI Studio key. Needed for matching, chat and avatars |

## Checks

```bash
npm run typecheck
npm run build
```

The build fails on type errors.
