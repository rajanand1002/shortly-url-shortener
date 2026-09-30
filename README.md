# Shortly – URL Shortener with Click Analytics

Paste a long link, get a short one, and see how many people opened it and when.

**Stack:** React (Vite) · Node.js · Express 5 · MongoDB (Mongoose)

## Project structure

```
Project-short-url/
├─ backend/     Express + MongoDB API (routes, controllers, models, middleware, utils)
└─ frontend/    React app (components, hooks, api helpers)
```

## Run locally

```bash
# Terminal 1 – backend
cd backend
npm install
cp .env.example .env     # optional, defaults work with local MongoDB
npm run dev              # http://localhost:8001

# Terminal 2 – frontend
cd frontend
npm install
npm run dev              # http://localhost:5173
```

## API

| Method | Route | Description |
|---|---|---|
| POST | `/url` | Body `{ "url": "https://..." }`, returns `{ id, shortUrl, redirectURL }` |
| GET | `/url/analytics/:shortId` | Total clicks and visit history |
| GET | `/:shortId` | Redirects to the original URL and records the visit |

## Deploy (single service)

Build the frontend, then let Express serve it:

```bash
cd backend
npm install && npm run build   # build command
npm start                      # start command
```

Environment variables: `MONGODB_URI`, `BASE_URL` (your public URL).
