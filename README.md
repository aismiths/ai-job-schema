# AI Rescue Job Schema

**An open standard for describing AI rescue jobs.**

When an AI coding platform generates broken auth, payments, or security code, there's a specific vocabulary for what went wrong. This schema standardizes it — so developers, tools, and marketplaces can speak the same language.

```json
{
  "$schema": "https://schema.aismiths.cloud/job/v1.json",
  "version": "1",
  "platform": "bolt",
  "problem_type": "auth-rescue",
  "symptoms": ["oauth-loop", "session-not-persisting"],
  "stack": { "framework": "next.js", "auth": "supabase" },
  "urgency": "days",
  "budget_range": { "min": 200, "max": 500, "currency": "USD" }
}
```

## Why a schema?

AI coding tools are proliferating. So is AI-generated code that breaks before launch. The rescue toolchain — diagnostics, marketplaces, expert matching — needs a common format.

This schema is the foundation for:
- **Automatic job intake** — `npx smith-check` links directly to a pre-filled job form when it detects critical issues
- **Tool integrations** — editors and AI platforms can emit a rescue job description when a user gets stuck
- **Marketplace matching** — platforms can route jobs to experts by `problem_type` and `stack`

## Using the schema

### Validate a job file

```bash
npx ai-job-schema validate my-job.json
```

### Reference in your job file

```json
{
  "$schema": "https://schema.aismiths.cloud/job/v1.json",
  "version": "1"
}
```

### Import in your tool

```javascript
const schema = require('ai-job-schema/schema/job.v1.json')
// or fetch from: https://schema.aismiths.cloud/job/v1.json
```

```typescript
// TypeScript — import as a type reference
import schema from 'ai-job-schema/schema/job.v1.json'
```

## Full schema reference

See [`schema/job.v1.json`](schema/job.v1.json) for the complete JSON Schema with all fields and enums. A YAML version is at [`schema/job.v1.yaml`](schema/job.v1.yaml).

| Field | Required | Description |
|-------|----------|-------------|
| `version` | ✅ | Always `"1"` for v1 |
| `problem_type` | ✅ | `auth-rescue`, `payment-fix`, `security-audit`, `deploy-fix`, `performance-fix`, `database-fix`, `full-rescue`, `bug-sweep`, `other` |
| `stack.framework` | ✅ | `next.js`, `remix`, `sveltekit`, `nuxt`, `astro`, `express`, `fastapi`, `other` |
| `platform` | | `bolt`, `loveable`, `replit`, `v0`, `cursor`, `windsurf`, `emergent`, `base44`, `forge`, `hercules`, `other` |
| `symptoms` | | Array of specific observed symptoms (see schema for full list) |
| `stack.auth` | | `supabase`, `clerk`, `auth0`, `next-auth`, `firebase`, `custom`, `none`, `other` |
| `stack.database` | | `supabase-postgres`, `neon`, `planetscale`, `turso`, `mongodb`, etc. |
| `stack.payments` | | `stripe`, `lemonsqueezy`, `paddle`, `none`, `other` |
| `stack.hosting` | | `vercel`, `fly.io`, `railway`, `render`, `netlify`, `aws`, `other` |
| `codebase.url` | | GitHub/GitLab repo URL |
| `codebase.access` | | `public`, `private-invite`, `zip-upload` |
| `urgency` | | `hours`, `days`, `weeks` |
| `budget_range` | | `{ min, max, currency }` — USD/EUR/GBP |
| `description` | | Free-text problem description (max 2000 chars) |
| `context` | | Tool metadata — `generated_by`, `smith_check_score`, `smith_check_report_url` |

## Examples

See the [`examples/`](examples/) directory:
- [`auth-rescue.json`](examples/auth-rescue.json) — Bolt.new Google OAuth loop
- [`payment-fix.json`](examples/payment-fix.json) — Stripe webhook not recording payments
- [`security-audit.json`](examples/security-audit.json) — Pre-launch security review
- [`deploy-fix.json`](examples/deploy-fix.json) — Fly.io port binding error

## Reference implementation

[Smith](https://aismiths.cloud) uses this schema natively. The job intake wizard at [`aismiths.cloud/import`](https://aismiths.cloud/import) exports v1-compatible JSON. The [`smith-check` CLI](https://github.com/aismiths/smith-check) populates the `context` fields automatically.

## Contributing

PRs welcome. See [CONTRIBUTING.md](CONTRIBUTING.md).

To propose a new `problem_type`, `symptom`, or `platform`:
1. Open an issue describing the use case with a real-world example
2. PR the schema + an example file

We follow semantic versioning. Breaking changes bump the major version and get a new `$id` (`/job/v2.json`). Old versions are kept permanently.

## License

Apache 2.0 — use it in your tools, marketplaces, and editors. Attribution appreciated but not required.

---

*Maintained by [Smith](https://aismiths.cloud) — the AI project rescue marketplace.*
