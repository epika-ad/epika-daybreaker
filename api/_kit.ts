/**
 * What the Figma kit's functions share: settings, the signed confirmation
 * link, sending through Resend, and the two emails.
 *
 * Environment variables (Vercel › Settings › Environment Variables):
 * - RESEND_API_KEY      required, a full-access key (sending only is not
 *                       enough to save sign-ups to the audience)
 * - KIT_SECRET          required, signs the confirmation links
 * - RESEND_FROM         the sender, "Epika <info@epika.ad>" once epika.ad is
 *                       verified in Resend; until then the default only
 *                       delivers to the Resend account's own address
 * - RESEND_AUDIENCE_ID  optional, the list every confirmed sign-up is saved
 *                       to; people who didn't ask for Pro news are saved as
 *                       unsubscribed, so a broadcast never reaches them
 * - SITE_URL            optional, the site the emails link to (defaults to
 *                       the one that made the request)
 * - FIGMA_URL           optional, the shared Figma file (defaults to Epika's)
 * Files starting with "_" are not served as functions.
 */
import { createHmac, timingSafeEqual } from "node:crypto";

export const inbox = "info@epika.ad";

export const reply = (status: number, body: Record<string, unknown>) =>
  Response.json(body, { status });

// enough to catch typos; Resend rejects anything it can't deliver
export const isEmail = (email: string) =>
  email.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const siteOf = (request: Request) =>
  (process.env.SITE_URL ?? new URL(request.url).origin).replace(/\/$/, "");

// ---------------- the confirmation link ----------------

type Signup = { email: string; pro: boolean; expires: number };

const week = 7 * 24 * 60 * 60 * 1000;

const signature = (data: string, secret: string) =>
  createHmac("sha256", secret).update(data).digest("base64url");

export const sign = (email: string, pro: boolean, secret: string) => {
  const data = Buffer.from(
    JSON.stringify({ email, pro, expires: Date.now() + week }),
  ).toString("base64url");
  return `${data}.${signature(data, secret)}`;
};

/** The signup a link stands for, or why it can't be used. */
export const verify = (
  token: string,
  secret: string,
): Signup | "invalid" | "expired" => {
  const [data, given] = token.split(".");
  if (!data || !given) return "invalid";
  const expected = Buffer.from(signature(data, secret));
  const actual = Buffer.from(given);
  if (expected.length !== actual.length || !timingSafeEqual(expected, actual)) {
    return "invalid";
  }
  try {
    const signup = JSON.parse(
      Buffer.from(data, "base64url").toString(),
    ) as Signup;
    return signup.expires < Date.now() ? "expired" : signup;
  } catch {
    return "invalid";
  }
};

// ---------------- Resend ----------------

const resend = "https://api.resend.com";

const call = (path: string, body: unknown) =>
  fetch(`${resend}${path}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

/** Sends one email; false (and a log line) when Resend refuses it. */
export const send = async (email: {
  to: string;
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
}) => {
  const response = await call("/emails", {
    from: process.env.RESEND_FROM ?? "Epika <onboarding@resend.dev>",
    to: [email.to],
    reply_to: email.replyTo ?? inbox,
    subject: email.subject,
    html: email.html,
    text: email.text,
  });
  if (!response.ok) {
    console.error("resend send failed", response.status, await response.text());
  }
  return response.ok;
};

/** Saves a confirmed sign-up to the audience, when there is one. */
export const remember = async (email: string, pro: boolean) => {
  const audience = process.env.RESEND_AUDIENCE_ID;
  if (!audience) return;
  const response = await call(`/audiences/${audience}/contacts`, {
    email,
    unsubscribed: !pro,
  }).catch((error: unknown) => error);
  if (!(response instanceof Response) || !response.ok) {
    console.error("resend audience add failed", response);
  }
};

// ---------------- the emails ----------------

const safe = (text: string) =>
  text.replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ] ?? c,
  );

// the site's light theme: paper, plum ink, red
const ink = "#350a3f";
const dimmed = "#664a68";
const red = "#ee1c4d";

const layout = (preheader: string, body: string) => `<!doctype html>
<html lang="en">
  <body style="margin:0;background:#f7f6f4;font-family:Helvetica,Arial,sans-serif;color:${ink}">
    <span style="display:none;max-height:0;overflow:hidden;opacity:0">${preheader}</span>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:40px 16px">
      <tr><td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;background:#ffffff;border-radius:20px;padding:40px">
          <tr><td>
            <p style="margin:0;font-size:14px;font-weight:600;color:${red}">/daybreaker</p>
            ${body}
          </td></tr>
        </table>
        <p style="margin:20px 0 0;font-size:12px;line-height:1.5;color:#8a7b8b">Epika, a creative studio in Tirana · <a href="https://epika.ad" style="color:#8a7b8b">epika.ad</a></p>
      </td></tr>
    </table>
  </body>
</html>`;

const heading = (text: string) =>
  `<h1 style="margin:16px 0 0;font-size:30px;line-height:1.1;letter-spacing:-0.5px">${text}<span style="color:${red}">.</span></h1>`;
const paragraph = (html: string) =>
  `<p style="margin:16px 0 0;font-size:16px;line-height:1.55;color:${dimmed}">${html}</p>`;
const button = (href: string, label: string) =>
  `<p style="margin:28px 0 0"><a href="${safe(href)}" style="display:inline-block;background:${red};color:#ffffff;text-decoration:none;font-weight:600;font-size:16px;padding:14px 24px;border-radius:999px">${label}</a></p>`;

/** Email 1: confirm the address, and the file comes after. */
export const confirmEmail = (link: string) => ({
  subject: "Confirm and we'll send the file",
  html: layout(
    "One click, then daybreaker for Figma is yours.",
    `${heading("Almost there")}
     ${paragraph("Click below to confirm your email and we'll send the daybreaker Figma file straight after.")}
     ${button(link, "Confirm my email")}
     ${paragraph("If you didn't ask for this, ignore it and nothing happens.")}
     ${paragraph("Epika")}`,
  ),
  text: [
    "Almost there.",
    "",
    "Open this link to confirm your email and we'll send the daybreaker Figma file straight after:",
    link,
    "",
    "If you didn't ask for this, ignore it and nothing happens.",
    "",
    "Epika",
  ].join("\n"),
});

// the shared file in Figma; anyone with the link can view and duplicate it
const figma =
  process.env.FIGMA_URL ??
  "https://www.figma.com/design/bXKYuy1YfoCCAOzDBuMWjE/daybreaker";

/** Email 2: the file. */
export const fileEmail = (site: string) => {
  const file = `${site}/daybreaker.fig`;
  const domain = site.replace(/^https?:\/\//, "");
  return {
    subject: "Your daybreaker Figma file",
    html: layout(
      "Duplicate it, change it, ship it.",
      `${heading("Here's your Figma file")}
       ${button(figma, "Open in Figma")}
       ${paragraph(`Duplicate it to your drafts and it's yours to change. Rather work offline? <a href="${safe(file)}" style="color:${red}">Download the .fig</a> instead.`)}
       ${paragraph(`The React side is one command away: <code style="font-family:Menlo,Consolas,monospace;font-size:14px;background:#f3eff3;padding:2px 6px;border-radius:6px;color:${ink}">npm install daybreaker</code>, docs at <a href="${safe(site)}" style="color:${red}">${safe(domain)}</a>.`)}
       ${paragraph("If you build something with it, we'd honestly like to see it. Just reply to this email.")}
       ${paragraph("Olti and the Epika team")}`,
    ),
    text: [
      "Here's your Figma file.",
      "",
      figma,
      "",
      "Duplicate it to your drafts and it's yours to change.",
      `Rather work offline? Download the .fig instead: ${file}`,
      "",
      `The React side is one command away: npm install daybreaker, docs at ${domain}.`,
      "",
      "If you build something with it, we'd honestly like to see it. Just reply to this email.",
      "",
      "Olti and the Epika team",
      "Epika, a creative studio in Tirana · epika.ad",
    ].join("\n"),
  };
};

/** A brief from "Work with Epika", for the studio's inbox. */
export const briefEmail = (brief: {
  name: string;
  email: string;
  needs: string[];
  about: string;
}) => ({
  subject: `New brief from ${brief.name}`,
  html: layout(
    `${brief.needs.join(", ") || "Not sure yet"}`,
    `${heading(`Brief from ${safe(brief.name)}`)}
     ${paragraph(`<strong>Email:</strong> ${safe(brief.email)}<br><strong>Needs:</strong> ${safe(brief.needs.join(", ") || "Not sure yet")}`)}
     ${paragraph(safe(brief.about || "No details yet.").replace(/\n/g, "<br>"))}
     ${paragraph("Reply to this email to answer them directly.")}`,
  ),
  text: [
    `Name: ${brief.name}`,
    `Email: ${brief.email}`,
    `Needs: ${brief.needs.join(", ") || "Not sure yet"}`,
    "",
    brief.about || "No details yet.",
  ].join("\n"),
});

export const leadEmail = (email: string, pro: boolean) => ({
  subject: `New Figma sign-up: ${email}`,
  html: layout(
    pro ? "Wants Pro news" : "Figma file only",
    `${heading("Someone got the Figma file")}
     ${paragraph(`<strong>Email:</strong> ${safe(email)}<br><strong>Pro news:</strong> ${pro ? "Yes" : "No"}`)}
     ${paragraph("Reply to this email to write to them directly.")}`,
  ),
  text: [`Email: ${email}`, `Pro news: ${pro ? "Yes" : "No"}`].join("\n"),
});
