/**
 * Step two: the link in the confirmation email lands here. A valid link
 * sends the Figma file, adds the address to the Pro list only if they ticked
 * the box, and sends them back to the site to say so.
 */
import { fileEmail, remember, send, siteOf, verify } from "./_kit.js";

export async function GET(request: Request): Promise<Response> {
  const site = siteOf(request);
  const back = (route: string) => Response.redirect(`${site}/#/${route}`, 303);

  const secret = process.env.KIT_SECRET;
  const token = new URL(request.url).searchParams.get("t") ?? "";
  if (!secret || !process.env.RESEND_API_KEY) return back("figma-error");

  const signup = verify(token, secret);
  if (signup === "invalid") return back("figma-error");
  if (signup === "expired") return back("figma-expired");

  const sent = await send({ to: signup.email, ...fileEmail(site) });
  if (!sent) return back("figma-error");
  if (signup.pro) await remember(signup.email);
  return back("figma-confirmed");
}
