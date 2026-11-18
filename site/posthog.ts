import posthog from "posthog-js";

const apiKey = import.meta.env.VITE_POSTHOG_KEY;
const apiHost = import.meta.env.VITE_POSTHOG_HOST;

if (!apiKey || !apiHost) {
  if (import.meta.env.DEV) {
    const missingVariable = !apiKey ? "VITE_POSTHOG_KEY" : "VITE_POSTHOG_HOST";

    console.error(
      new Error(
        `${missingVariable} variable required by PostHog is missing or un-configured, this causes events to be silently missed. This error stops appearing once ${missingVariable} is configured`,
      ),
    );
  }
} else {
  posthog.init(apiKey, {
    api_host: apiHost,
    defaults: "2026-08-30",
    capture_exceptions: true,
    logs: {
      serviceName: "daybreaker-documentation",
      environment: import.meta.env.MODE,
    },
  });
}

export const log = {
  info: (
    message: string,
    attributes?: Parameters<typeof posthog.logger.info>[1],
  ) => {
    if (!apiKey || !apiHost) return;
    posthog.logger.info(message, attributes);
  },
};

export const capture = (
  event: string,
  properties?: Record<string, unknown>,
) => {
  if (!apiKey || !apiHost) return;
  posthog.capture(event, properties);
};

export default posthog;
