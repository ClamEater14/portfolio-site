# portfolio-site

This repo houses the source code of my personal website. It is still in development, but you can take a look by building it yourself!

## Building & Running From Source

1. Make sure you have [Node.js](https://www.nodejs.org) installed.
2. Clone this repo.
3. Install all dependencies using npm.

```
npm install
```

4. Start the development. Use the project's `dev` script for this.

```
npm run dev
```

5. Open the link `http://localhost:8080` to see the website.
6. To stop the development server, press `Ctrl + C` in the terminal.

## Strapi project cache webhook

The projects fetch is cached with the `projects` tag and a one-hour revalidation
fallback. `POST /api/webhooks/strapi` expires that cache immediately. The next
projects request fetches fresh data from Strapi before returning the list; the
webhook itself does not fetch data or push changes to an already open page.

1. Generate a shared secret:

   ```sh
   node -e "console.log(require('node:crypto').randomBytes(32).toString('hex'))"
   ```

2. Add `STRAPI_WEBHOOK_SECRET=<generated-value>` to `.env.local` for local use and
   to the portfolio service's Railway environment variables for production. This
   is a server-only variable; do not prefix it with `NEXT_PUBLIC_`. `.env.example`
   lists the available variables. Restart locally, or deploy the updated code and
   environment on Railway, before configuring the webhook.

3. In the Strapi admin panel, open **Settings > Webhooks** and create a webhook:

   - Name: `Portfolio projects cache`
   - URL: `https://www.caleblamcodes.dev/api/webhooks/strapi` (use the final public
     hostname serving this deployment, without a redirect)
   - Header name: `Authorization`
   - Header value: `Bearer <generated-value>`
   - Events: entry **Create**, **Update**, **Delete**, **Publish**, and **Unpublish**;
     media **Create**, **Update**, and **Delete**. Publish and Unpublish are
     available when Draft & Publish is enabled.

   The header value must contain the actual secret, not an environment-variable
   placeholder. The endpoint invalidates the projects tag on every authenticated
   POST, including changes to categories and images. No model-name filter or
   payload fields are required, so Strapi's Trigger button can also be used.

4. Save and enable the webhook. Use **Trigger** to check delivery. A successful
   request returns HTTP `200` with `{"revalidated":true}`. HTTP `401` means the
   Authorization header does not match; HTTP `503` means the portfolio service
   has no `STRAPI_WEBHOOK_SECRET` configured. A `404` usually means the new route
   has not been deployed or the URL points to a different deployment.

5. Open `/projects` to populate the cache, change a project in Strapi, and publish
   it if Draft & Publish is enabled. After the webhook succeeds, reload the page
   once. Also check category edits and media metadata changes. Existing browser
   tabs require a reload; the webhook does not update their rendered content.

For a local endpoint test in PowerShell:

```powershell
$webhookSecret = Read-Host 'Webhook secret'
Invoke-RestMethod -Method Post -Uri 'http://localhost:3000/api/webhooks/strapi' -Headers @{ Authorization = "Bearer $webhookSecret" }
```

Use your server's actual port. A remote Strapi server cannot reach your computer
through `localhost`; end-to-end local testing requires a reachable development
URL or a tunnel. To observe production caching locally, use `npm run build` and
`npm run start`; development hard reloads can bypass the fetch cache.

The hourly fallback uses background revalidation, so a missed webhook can still
produce a stale first response after that interval. It is a recovery mechanism,
not an immediate-update guarantee. On multiple Next.js replicas, cache storage
and tag invalidation must be shared between instances.

References: [Strapi webhooks](https://docs.strapi.io/cms/backend-customization/webhooks)
and [Next.js revalidateTag](https://nextjs.org/docs/app/api-reference/functions/revalidateTag).

## Linting & Formatting

Biome handles JavaScript, TypeScript, JSON, linting, and import organization.
Prettier handles the SCSS and Markdown files.

- `npm run lint`: check Biome lint rules.
- `npm run lint:fix`: apply safe lint fixes.
- `npm run check`: check lint rules, formatting, and imports together.
- `npm run check:fix`: apply safe fixes, formatting, and import organization.
- `npm run format`: format Biome-supported files, SCSS, and Markdown.
- `npm run format:check`: verify formatting without writing changes.

Install the recommended Biome VS Code extension for formatting and safe fixes on save.

The configuration was generated with Biome 2.5.15 using
`biome migrate eslint --write --include-inspired` and `biome migrate prettier --write`.
Generated output and the npm lockfile are excluded from Biome checks. Semicolons
are explicitly enabled to preserve the previous Prettier style.

The migration preserves supported ESLint rules and TypeScript overrides. React
Compiler validation is explicitly enabled at error severity with Biome's experimental
[`nursery.useReactCompiler`](https://biomejs.dev/linter/rules/use-react-compiler/javascript/)
rule; the ESLint migration tool does not map the individual compiler-related rules
to it automatically. Some other ESLint rules still have no Biome equivalent. The
Prettier import-order and JSON-sorting plugins were removed; Biome's import
organizer now controls imports. See the [Biome migration guide](https://biomejs.dev/guides/migrate-eslint-prettier/).
