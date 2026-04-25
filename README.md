# fasto-vpn

Monorepo containing:
- `admin` (Next.js admin panel)
- `backend` (Express API)
- `app` (Flutter client)

## Deploy On Vercel

Create two separate Vercel projects from this same repository:

1. `fasto-vpn-admin`
2. `fasto-vpn-backend`

Set each project's **Root Directory** in Vercel:
- Admin project root: `admin`
- Backend project root: `backend`

### Admin project

- Uses [`admin/vercel.json`](admin/vercel.json)
- Required env vars:
  - `BACKEND_URL=https://<your-backend-domain>`
  - `COOKIE_SECURE=true`

### Backend project

- Uses [`backend/vercel.json`](backend/vercel.json)
- Serverless handler entry: [`backend/api/index.ts`](backend/api/index.ts)
- Configure env vars from [`backend/.env.example`](backend/.env.example)

After deploy:
- Backend health check: `https://<backend-domain>/health`
- Admin app: `https://<admin-domain>`
