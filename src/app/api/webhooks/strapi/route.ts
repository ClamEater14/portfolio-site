import { timingSafeEqual } from "node:crypto";
import { revalidateTag } from "next/cache";

import { PROJECTS_CACHE_TAG } from "../../../../constants/cache-tags";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const secret = process.env.STRAPI_WEBHOOK_SECRET;

  if (!secret) {
    return Response.json({ error: "Webhook is not configured" }, { status: 503 });
  }

  const authorization = Buffer.from(request.headers.get("authorization") ?? "");
  const expectedAuthorization = Buffer.from(`Bearer ${secret}`);

  if (authorization.length !== expectedAuthorization.length || !timingSafeEqual(authorization, expectedAuthorization)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Expire immediately: the next projects request waits for fresh data.
  // Related categories and media also affect the list, so accept all webhook events.
  revalidateTag(PROJECTS_CACHE_TAG, { expire: 0 });

  return Response.json({ revalidated: true });
}
