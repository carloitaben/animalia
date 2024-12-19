/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "animalia",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "aws",
      providers: {
        cloudflare: true,
      },
    }
  },
  console: {
    autodeploy: {
      target(event) {
        if (
          event.type === "branch" &&
          event.branch === "main" &&
          event.action === "pushed"
        ) {
          return {
            stage: "production",
          }
        }

        if (event.type === "pull_request") {
          return {
            stage: `pr-${event.number}`,
          }
        }
      },
    },
  },
  async run() {
    const domain =
      $app.stage === "production"
        ? "animalia.carlo.works"
        : $app.stage + "animalia.staging.carlo.works"

    const notionIntegrationToken = new sst.Secret("NotionIntegrationToken")

    const web = new sst.aws.Astro("Web", {
      link: [notionIntegrationToken],
      dev: {
        command: "pnpm dev",
        url: "http://localhost:3000",
        autostart: true,
      },
      domain: {
        name: domain,
        redirects: [`www.${domain}`],
        dns: sst.cloudflare.dns(),
      },
    })

    return {
      web: web.url,
    }
  },
})
