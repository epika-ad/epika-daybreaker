/**
 * The "Work with Epika" form: POST { name, email, needs, about } and the brief
 * lands in the studio's inbox, with Reply-To set to the sender.
 */
import { briefEmail, inbox, isEmail, reply, send } from "./_kit.js";

type Payload = {
  name?: unknown;
  email?: unknown;
  needs?: unknown;
  about?: unknown;
  company?: unknown;
};

const clip = (value: unknown, max: number) =>
  String(value ?? "")
    .trim()
    .slice(0, max);

export async function POST(request: Request): Promise<Response> {
  if (!process.env.RESEND_API_KEY)
    return reply(500, { error: "not_configured" });

  let payload: Payload;
  try {
    payload = (await request.json()) as Payload;
  } catch {
    return reply(400, { error: "invalid_request" });
  }

  // the same trap for bots as the Figma form
  if (payload.company) return reply(200, { ok: true });

  const email = clip(payload.email, 254).toLowerCase();
  const name = clip(payload.name, 120);
  if (!name) return reply(400, { error: "missing_name" });
  if (!isEmail(email)) return reply(400, { error: "invalid_email" });
  const needs = Array.isArray(payload.needs)
    ? payload.needs
        .map((need) => clip(need, 40))
        .filter(Boolean)
        .slice(0, 8)
    : [];

  const sent = await send({
    to: process.env.BRIEF_TO ?? inbox,
    replyTo: email,
    ...briefEmail({ name, email, needs, about: clip(payload.about, 5000) }),
  });
  return sent ? reply(200, { ok: true }) : reply(502, { error: "send_failed" });
}
