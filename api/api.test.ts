// The Figma double opt-in and the brief, through the real handlers, with
// Resend faked.
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { sign } from "./_kit.js";
import { POST as brief } from "./brief.js";
import { GET as confirm } from "./confirm.js";
import { POST as subscribe } from "./subscribe.js";

const site = "https://daybreaker.epika.ad";
type Call = {
  url: string;
  body: Record<string, unknown> & { text: string; html: string };
};
let calls: Call[];

beforeEach(() => {
  calls = [];
  vi.stubGlobal("fetch", async (url: string, init: RequestInit) => {
    calls.push({ url, body: JSON.parse(String(init.body)) });
    return new Response("{}", { status: 200 });
  });
  vi.stubEnv("RESEND_API_KEY", "re_test");
  vi.stubEnv("KIT_SECRET", "test-secret");
  vi.stubEnv("RESEND_AUDIENCE_ID", "aud_1");
});
afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
  vi.useRealTimers();
});

const post = (handler: (r: Request) => Promise<Response>, body: unknown) =>
  handler(
    new Request(`${site}/api/x`, {
      method: "POST",
      body: JSON.stringify(body),
    }),
  );
const linkIn = (call: Call | undefined) =>
  call?.body.text.match(/https:\/\/\S+\/api\/confirm\?t=\S+/)?.[0] ?? "";
const landing = async (url: string) =>
  (await confirm(new Request(url))).headers.get("location");

describe("the Figma file", () => {
  it("asks for a real email and ignores bots", async () => {
    expect((await post(subscribe, { email: "nope" })).status).toBe(400);
    expect(
      (await post(subscribe, { email: "a@b.co", company: "x" })).status,
    ).toBe(200);
    expect(calls).toEqual([]);
  });

  it("confirms the address first, then sends the file", async () => {
    expect((await post(subscribe, { email: " Olti@Epika.ad " })).status).toBe(
      200,
    );
    const [first] = calls;
    expect(first?.body).toMatchObject({
      to: ["olti@epika.ad"],
      subject: "Confirm and we'll send the file",
      reply_to: "info@epika.ad",
    });

    expect(await landing(linkIn(first))).toBe(`${site}/#/figma-confirmed`);
    const second = calls.at(-1);
    expect(second?.body.subject).toBe("Your daybreaker Figma file");
    expect(second?.body.html).toContain("https://www.figma.com/design/");
    expect(second?.body.html).toContain(`${site}/daybreaker.fig`);
    // no box ticked, so no list
    expect(calls.some((call) => call.url.includes("/audiences/"))).toBe(false);
  });

  it("adds people to the Pro list only when they tick the box", async () => {
    await post(subscribe, { email: "mario@epika.ad", pro: true });
    await landing(linkIn(calls[0]));
    expect(calls.at(-1)).toMatchObject({
      url: "https://api.resend.com/audiences/aud_1/contacts",
      body: { email: "mario@epika.ad" },
    });
  });

  it("turns away links that were changed or are too old", async () => {
    await post(subscribe, { email: "olti@epika.ad" });
    const token = new URL(linkIn(calls[0])).searchParams.get("t") ?? "";
    const forged = Buffer.from(
      JSON.stringify({ email: "x@evil.co", pro: false, expires: 9e15 }),
    ).toString("base64url");
    expect(
      await landing(`${site}/api/confirm?t=${forged}.${token.split(".")[1]}`),
    ).toBe(`${site}/#/figma-error`);

    const old = sign("old@epika.ad", false, "test-secret");
    vi.useFakeTimers({ now: Date.now() + 8 * 24 * 60 * 60 * 1000 });
    expect(
      await landing(`${site}/api/confirm?t=${encodeURIComponent(old)}`),
    ).toBe(`${site}/#/figma-expired`);
  });
});

describe("the brief", () => {
  it("lands in the studio's inbox, answerable straight back", async () => {
    expect((await post(brief, { email: "a@b.co" })).status).toBe(400);
    const response = await post(brief, {
      name: "Ada <b>",
      email: "ada@co.com",
      needs: ["Website"],
      about: "A shop.",
    });
    expect(response.status).toBe(200);
    expect(calls.at(-1)?.body).toMatchObject({
      to: ["info@epika.ad"],
      reply_to: "ada@co.com",
    });
    expect(calls.at(-1)?.body.html).toContain("Ada &lt;b&gt;");
  });
});
