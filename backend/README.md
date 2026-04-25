# Fasto VPN Backend

## Local setup
```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

## Deploy on Vercel
- Set project root to `backend`
- Keep framework preset as `Other`
- Vercel config: `vercel.json`
- Serverless entrypoint: `api/index.ts`
- Add all required env vars from `.env.example`

## Health check
`GET /health`
