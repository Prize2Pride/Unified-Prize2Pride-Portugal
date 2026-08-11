# Manus Managed Hosting Deployment

## Hosting Model

Unified Prize2Pride is configured as a TypeScript, Express, tRPC, Drizzle, and React application suitable for Manus managed hosting. The production environment should use the existing Manus OAuth, database, and storage configuration injected by the managed project.

## Database Migration

The managed project previously contained a separate prototype schema. Migration `docs/migrations/MANUS_LEGACY_BRIDGE_0002.sql` is intentionally additive: it creates the Unified Prize2Pride tables required by the current code while retaining existing legacy tables and learner data. The migration must be applied to the managed database before publishing.

## Required Managed Secrets and Environment Verification

Do not paste values into source control or chat. Before the first publish, open the Management UI **Settings → Secrets** panel and confirm that the following managed values are present; they are injected by Manus and normally must not be manually changed.

| Variable or group | Purpose | First-publish verification |
|---|---|---|
| `DATABASE_URL` | MySQL/TiDB connection used by Drizzle | Confirm the managed database is connected and the Unified tables are visible. |
| `JWT_SECRET` | Secure session signing | Confirm a non-empty managed value exists; never rotate it casually because active sessions may be invalidated. |
| `VITE_APP_ID`, `OAUTH_SERVER_URL`, `VITE_OAUTH_PORTAL_URL` | Manus OAuth client and callback flow | Confirm they are injected by the managed project; test sign-in after publishing. |
| `BUILT_IN_FORGE_API_URL`, `BUILT_IN_FORGE_API_KEY` | Server-side built-in AI and platform integrations | Confirm the server can use managed integrations without exposing this key to the client. |
| `VITE_FRONTEND_FORGE_API_URL`, `VITE_FRONTEND_FORGE_API_KEY` | Browser-safe Forge integration endpoints | Confirm they are injected only through the managed environment and never copied into repository files. |
| `OWNER_OPEN_ID`, `OWNER_NAME` | Owner identification and administrative defaults | Confirm they match the expected Manus project owner. |

The initial production smoke test should cover the homepage, the 10K Path, tutor page, Manus OAuth sign-in, and one database-backed preference or progress action. If any managed value is absent, add it through the Management UI rather than committing an `.env` file.

**Verification record (2026-08-12):** the managed runtime reported all required variables in the table above as present. No secret values were read, logged, or committed.

## Publishing Workflow

Create a tested checkpoint, select **Publish** in the Management UI, then use **Settings → Domains** to select the Manus subdomain or attach a custom domain. Manus managed hosting provides TLS and maintains the published deployment.

## Operational Boundaries

The 10,000-record CSV/JSONL package is intentionally not bundled into the application deployment. Import it into a staging workflow and retain its editorial status before exposing entries as learner-certified lessons. Generated lessons, Arabic/Tunisian explanations, and assessment content require editorial review.
