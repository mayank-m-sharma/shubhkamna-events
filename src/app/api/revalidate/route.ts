import { revalidateTag } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";
import { parseBody } from "next-sanity/webhook";

interface WebhookPayload {
  _type?: string;
}

// Called by a Sanity webhook (configured in manage.sanity.io, see README's
// "Manual steps") on every publish. Revalidates by the changed document's
// own `_type`, which matches the cache tag every getX() fetcher in
// src/lib/sanity/ already sets — one webhook endpoint covers every
// singleton document and homePage, no per-document routes needed.
export async function POST(request: NextRequest): Promise<NextResponse> {
  const { isValidSignature, body } = await parseBody<WebhookPayload>(
    request,
    process.env.SANITY_REVALIDATE_SECRET,
  );

  if (!isValidSignature) {
    return NextResponse.json({ message: "Invalid signature" }, { status: 401 });
  }

  if (!body?._type) {
    return NextResponse.json(
      { message: "Missing _type in webhook payload" },
      { status: 400 },
    );
  }

  // Next 16's cache-profile system requires a second "profile" argument;
  // "max" is the profile with no fixed expiration, matching an on-demand
  // webhook purge rather than a background time-based revalidation.
  revalidateTag(body._type, "max");

  return NextResponse.json({ revalidated: true, tag: body._type });
}
