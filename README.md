# Romance Novel Writer

A browser app version of the "romance-novel-writer" workflow: pick a subgenre, era, tropes,
characters, plot, spice level and length, review a generated chapter outline, then generate
publishable prose for each scene beat.

It's a React (Vite) frontend plus a tiny Express backend. The backend exists only to hold your
Anthropic API key server-side and proxy the prose-generation request — the key is never sent to
the browser.

## Setup

```bash
npm install
cp .env.example .env
# edit .env and paste your Anthropic API key
```

Get an API key at https://console.anthropic.com/settings/keys.

## Run it locally

```bash
npm run dev
```

This starts the Vite dev server (frontend) and the Express API server together. Open the URL
Vite prints (usually http://localhost:5173).

## Production build

```bash
npm run build
npm start
```

`npm start` runs the Express server, which serves the built frontend from `dist/` and the
`/api/generate-prose` endpoint, all on one port (http://localhost:3001 by default).

## How it works

- Everything through building the chapter outline (subgenre, era, tropes, characters, plot,
  spice level, length) runs entirely in the browser — no API calls.
- Clicking "Generate Prose" on a scene beat sends a prompt to `/api/generate-prose`, which the
  Express server forwards to the Anthropic Messages API using `ANTHROPIC_API_KEY` from `.env`,
  then returns the generated text.
