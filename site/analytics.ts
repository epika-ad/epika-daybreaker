/**
 * PostHog for the website only (never the library). EU Cloud.
 *
 * Until a visitor accepts, PostHog keeps nothing on their device (memory
 * persistence) and records nothing: they still count, and still land on the
 * map, from their IP. Accepting turns on persistence and session recordings,
 * with every input masked. Without VITE_POSTHOG_KEY, or under tests, all of
 * this does nothing.
 */
import posthog from "posthog-js";

const key = import.meta.env.VITE_POSTHOG_KEY as string | undefined;
export const enabled = Boolean(key) && import.meta.env.MODE !== "test";

export type Consent = "granted" | "denied" | null;
const consentKey = "daybreaker-consent";

export const readConsent = (): Consent => {
  try {
    const value = localStorage.getItem(consentKey);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return null;
  }
};

const grant = () => {
  posthog.set_config({ persistence: "localStorage+cookie" });
  posthog.startSessionRecording();
};

export const setConsent = (consent: "granted" | "denied") => {
  try {
    localStorage.setItem(consentKey, consent);
  } catch {
    // private mode: the choice lasts for this visit
  }
  if (enabled && consent === "granted") grant();
};

export const startAnalytics = () => {
  if (!enabled || !key) return;
  posthog.init(key, {
    api_host: "https://eu.i.posthog.com",
    ui_host: "https://eu.posthog.com",
    defaults: "2025-05-24",
    persistence: "memory",
    // a page view on every history change, so each page counts
    capture_pageview: "history_change",
    disable_session_recording: true,
    session_recording: { maskAllInputs: true },
  });
  if (readConsent() === "granted") grant();
};

/** One named event; does nothing without PostHog. */
export const track = (event: string, properties?: Record<string, unknown>) => {
  if (enabled) posthog.capture(event, properties);
};
