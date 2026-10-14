# Abhijeet Adhikary — Portfolio

Personal portfolio and content-management site for Abhijeet Adhikary. It is built
with Next.js and deployed as a Cloudflare Worker using OpenNext.

## Features

- Responsive portfolio with animated sections
- Password-protected content administration
- Persistent content storage in Cloudflare Workers KV
- SEO metadata, sitemap, and robots configuration
- Automated production build checks with GitHub Actions

## Technology

- Next.js 15 and React 18
- TypeScript
- Framer Motion
- OpenNext for Cloudflare
- Cloudflare Workers and Workers KV

## Local development

Install dependencies and start the development server:

```bash
npm ci
npm run dev
```

Open <http://localhost:3000>. The admin console is available at
<http://localhost:3000/admin>.

Local content changes are stored under `data/`, which is excluded from Git. In
production, content is stored in the `SITE_CONTENT` Workers KV binding.

## Environment variables

Create `.env.local` for local administration:

```dotenv
ADMIN_PASSWORD=replace-with-a-strong-password
ADMIN_SESSION_SECRET=replace-with-a-long-random-secret
```

Do not commit environment files or secrets.

## Validation and deployment

```bash
npm run seo:check
npm run build
npx wrangler deploy
```

The Cloudflare configuration and KV binding are defined in `wrangler.jsonc`.
