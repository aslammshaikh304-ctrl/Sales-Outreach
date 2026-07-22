# RingFlow production deployment

1. Copy `.env.example` to the PM2 environment configuration and set every value. Never expose these values with a `NEXT_PUBLIC_` prefix.
2. Use long, unique Basic Auth credentials and serve RingFlow only over HTTPS. Missing credentials intentionally make protected requests return HTTP 503.
3. Confirm every n8n webhook uses HTTPS and is restricted to requests from the RingFlow server where infrastructure permits.
4. Ensure the send-outreach n8n workflow treats `idempotencyKey` as unique and does not send the same key twice.
5. Run `npm ci`, `npm run lint`, `npx tsc --noEmit --incremental false`, and `npm run build`.
6. Reload PM2 with updated environment variables, then smoke-test anonymous access (401), authenticated pages, add/edit/delete/import/scrape, and single/bulk email against staging data before production.

This release adds an immediate deployment access gate; migrate to per-user sessions and workspace roles before providing access to multiple organizations.
