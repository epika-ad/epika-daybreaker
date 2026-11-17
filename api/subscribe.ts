/**
 * Step one of getting the Figma file: POST { email, pro } and we email a
 * link to confirm the address (double opt-in). The file goes out from
 * api/confirm once they click it. Settings are listed in _kit.ts.
 */
import { confirmEmail, isEmail, reply, send, sign, siteOf } from "./_kit.js";

type Payload = { email?: unknown; pro?: unknown; company?: unknown };

export async function POST(request: Request): Promise<Response> {
  const secret = process.env.KIT_SECRET;
  if (!process.env.RESEND_API_KEY || !secret) {
    return reply(500, { error: "not_configured" });
  }

  let payload: Payload;
  try {
    payload = (await request.json()) as Payload;
  } catch {
    return reply(400, { error: "invalid_request" });
  }

  // a field people never see: bots fill it in, so pretend it worked
  if (payload.company) return reply(200, { ok: true });

  const email = String(payload.email ?? "")
    .trim()
    .toLowerCase();
  if (!isEmail(email)) return reply(400, { error: "invalid_email" });

  const token = sign(email, payload.pro === true, secret);
  const link = `${siteOf(request)}/api/confirm?t=${encodeURIComponent(token)}`;
  const sent = await send({ to: email, ...confirmEmail(link) });
  return sent ? reply(200, { ok: true }) : reply(502, { error: "send_failed" });
}
