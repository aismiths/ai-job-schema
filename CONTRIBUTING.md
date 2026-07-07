# Contributing to AI Rescue Job Schema

## Adding a new platform

1. Add the platform slug to the `platform` enum in `schema/job.v1.json` and `schema/job.v1.yaml`
2. Add a realistic example to `examples/`
3. PR with a brief description of the platform and why it needs its own slug

## Adding a new symptom

1. Add the slug to the `symptoms` items enum in both schema files (use kebab-case)
2. Symptom slugs should describe the **observable symptom**, not the root cause:
   - ✅ `oauth-loop` (what the user sees)
   - ❌ `missing-exchange-code-for-session` (root cause — too implementation-specific)
3. Add an example file that demonstrates the symptom

## Adding a new problem_type

Problem types map to rescue workflows. New types should correspond to a distinct category of work, not just a symptom variant. Open an issue first to discuss before opening a PR.

## Schema versioning

- **Bug fixes and new optional fields** → patch bump in `package.json` only, no `$id` change
- **New required fields or removed fields** → new major version (`job.v2.json` with new `$id`), old version kept permanently so existing integrations don't break

## Review SLA

PRs are reviewed within 5 business days.
