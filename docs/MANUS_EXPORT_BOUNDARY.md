# Manus Managed Source Export Boundary

## Public Source of Truth

The public [Unified Prize2Pride Portugal](https://github.com/Prize2Pride/Unified-Prize2Pride-Portugal) repository contains the complete portable application source: client and server code, shared curriculum models, schema, clean-environment migrations, tests, lesson and situation generators, and deployment documentation.

The managed-only deployment updates have been exported as follows.

| Managed change | Public repository location |
|---|---|
| Corrected Prize2Pride public home copy | `client/src/pages/Home.tsx` |
| Manus managed-hosting and secret checklist | `docs/MANUS_DEPLOYMENT.md` |
| Additive bridge for the pre-existing Manus prototype database | `docs/migrations/MANUS_LEGACY_BRIDGE_0002.sql` |

## Intentionally Excluded Managed Artifacts

The following files are environment-specific, generated, private, or superseded. They are intentionally not exported as portable source code.

| Exclusion | Reason |
|---|---|
| `.manus/`, `.project-config.json`, `client/public/__manus__/` | Manus runtime and project metadata. |
| `.manus-logs/`, `dist/`, `node_modules/` | Runtime logs, generated builds, and installed dependencies. |
| `exports/` | Generated delivery archives; source generators are committed under `scripts/`. |
| Legacy managed migration history and Drizzle metadata | Represents the retired prototype schema. The public repo retains its clean unified migrations; the legacy bridge is documented separately. |
| `validation-notes.md`, `vite.config.ts.bak`, managed task ledger | Local historical and working artifacts superseded by public repository documentation and version history. |

No production secrets, session values, database contents, personal access tokens, or environment files belong in the public repository.

## Content-Level Secret Scan

**Verification record (2026-08-12):** all tracked public repository files were scanned for common personal-access-token prefixes, OpenAI-style key prefixes, private-key markers, AWS access-key prefixes, and non-placeholder database connection assignments. The scan initially identified a database configuration example in the preserved source brief; that brief was replaced with a credential-free requirements record. The final scan passed with no matching credential-like content.
