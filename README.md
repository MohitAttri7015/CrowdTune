# CrowdTune

Let everyone vote on what plays next. A host starts a session and shares a
code; guests add and vote on songs from their own phones (no app, no signup);
the top-voted song plays next.

**Status:** early development. Hosts can sign in with Google and create
sessions. The guest side (joining by code, adding songs, voting, the queue,
QR code) is not built yet.

## Stack

- [Next.js](https://nextjs.org) 16 (App Router), React 19, Tailwind CSS 4
- [Supabase](https://supabase.com) for auth (Google OAuth) and Postgres
- WebGL shader backgrounds via [`ogl`](https://github.com/oframe/ogl)

## Getting started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create your env file and fill in the Supabase values:

   ```bash
   cp .env.example .env.local
   ```

3. In the Supabase dashboard, enable the Google provider
   (Authentication -> Providers) and add
   `http://localhost:3000/auth/callback` to the allowed redirect URLs.

4. Create the `profiles` and `sessions` tables, then run
   [`supabase/security-and-constraints.sql`](supabase/security-and-constraints.sql)
   in the SQL editor. It sets up row-level security, server-side plan limits,
   and the one-active-session-per-host constraint. Read its header first: it
   lists the schema it assumes.

5. Start the dev server:

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000). To test from your phone
   on the same network, set `NEXT_ALLOWED_DEV_ORIGINS` in `.env.local`
   (see `.env.example`).

## Plans

Limits live in [`lib/sessions.js`](lib/sessions.js) and are mirrored in the SQL
trigger, so keep the two in sync.

| Plan       | Guests    | Session length | Custom logo |
| ---------- | --------- | -------------- | ----------- |
| Free       | 15        | 2 hours        | No          |
| Party Pass | Unlimited | 24 hours       | No          |
| Venue      | Unlimited | 30 days        | Yes         |

## Project layout

```
app/
  (marketing)/          landing page (hero, how it works, pricing)
  auth/                 Google login page + OAuth callback route
  dashboard/            host profile; create-session/action.js is the server action
  createSession/        "create a session" page
  session/[joinCode]/   host view of a session
components/             UI, plus the WebGL effects (Ferrofluid, SideRays, LiquidGlassCluster)
lib/sessions.js         plan limits, join codes, expiry helpers
lib/supabase/           browser and server Supabase clients
middleware.js           refreshes the session and protects /dashboard and /createSession
supabase/               SQL for RLS, limits trigger and constraints
```

## Scripts

- `npm run dev` start the dev server
- `npm run build` production build
- `npm run start` run the production build
- `npm run lint` run ESLint
