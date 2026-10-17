import { defineRailway, github, preserve, project, service } from "railway/iac";
// This repository manages only its own resources in the environment. Other
// repositories export their own partial name.
// See https://docs.railway.com/infrastructure-as-code#multi-repo-projects
export const partial = "portfolio-site";
export default defineRailway(() => {
  const portfolioSite = service("portfolio-site", {
    source: github("ClamEater14/portfolio-site", { branch: "main", checkSuites: false }),
    build: { buildCommand: "npm run build", builder: "RAILPACK" },
    start: "npm run start",
    replicas: { "us-west2": 1 },
    domains: ["www.caleblamcodes.dev"],
    networking: { privateNetworkEndpoint: "portfolio-site" },
    env: { RAILPACK_NODE_VERSION: "24", SENTRY_AUTH_TOKEN: preserve(), STRAPI_API_URL: preserve(), STRAPI_WEBHOOK_SECRET: preserve() },
  });

  return project("portfolio-site", {
    // variables: { managed: true },
    resources: [portfolioSite],
  });
});
