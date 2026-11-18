/**
 * Step two: the link in the confirmation email lands here. A valid link
 * sends the Figma file, saves the lead (on the Pro list only if they ticked
 * the box), tells the studio, and sends them back to the site to say so.
 */
import {
  fileEmail,
  inbox,
  leadEmail,
  remember,
  send,
  siteOf,
  verify,
} from "./_kit.js";

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
  await Promise.all([
    remember(signup.email, signup.pro),
    send({
      to: process.env.BRIEF_TO ?? inbox,
      replyTo: signup.email,
      ...leadEmail(signup.email, signup.pro),
    }),
  ]);
  return back("figma-confirmed");
}
