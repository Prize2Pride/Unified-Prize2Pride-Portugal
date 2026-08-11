# Unified Prize2Pride Repository Intake

## Purpose

Unified Prize2Pride Portugal is the single codebase for future product development. A new repository is not copied into this codebase merely because it shares a language-learning theme. Each source must be explicitly authorized by the owner and assessed before any code, content, asset, credential reference, or dependency is imported.

## Required Intake Record

| Step | Required evidence | Outcome |
|---|---|---|
| Authorization | Owner selects the repository through the connected integration or otherwise grants access | The source boundary is explicit. |
| Inventory | Branches, tracked files, licenses, current build state, data assets, and secrets exposure review | The team knows what is actual implementation and what is documentation only. |
| Product mapping | Feature-to-module mapping against the unified architecture | Capabilities are imported intentionally rather than duplicated. |
| Technical review | Dependency, data model, authentication, migration, test, and security impact | Integration risk is visible before changes are made. |
| Preservation plan | A source summary and migration notes committed under `docs/source-repositories/` | Provenance is retained. |
| Integration | A dedicated branch, tested changes, reviewed migration, and clear attribution | The unified codebase remains recoverable. |

## Non-Negotiable Boundaries

Do not copy secrets, personal access tokens, private keys, production data, or environment files into the repository. Do not make external service calls from client code. Do not claim learner content is professionally verified unless an editorial process has completed that verification.
