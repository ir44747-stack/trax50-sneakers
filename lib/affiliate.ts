/**
 * TRAX.50 — Sovrn affiliate-link gateway & STRICT validation.
 *
 * Sovrn (VigLink) manually-wrapped links use the well-known format:
 *
 *     https://redirect.viglink.com?key=[API_KEY]&u=[HTML-ENCODED_DESTINATION]
 *
 * STRICT RULE: No product may render unless it carries a VALID Sovrn tracking
 * URL. Products with a missing, malformed, "#", relative, or non-Sovrn link are
 * treated as NOT renderable and are dropped before the UI ever sees them.
 *
 * Set `SOVRN_PUBLISHER_KEY` (your Sovrn API key) via env. Until a real key is
 * provided a clearly-marked DEMO key is used so the validation pipeline can be
 * tested end-to-end. Real destination product URLs must be swapped in for the
 * demo `example.com` targets before going live (Phase 3 hand-off).
 */

export const SOVRN_HOST = "redirect.viglink.com";

/** Demo publisher key used ONLY when `SOVRN_PUBLISHER_KEY` is not set. */
export const SOVRN_DEMO_KEY = "trax50-demo-publisher-key-0001";

export type SovrnAudience = "men" | "women" | "kids";

/** Result of validating a single tracking URL. */
export type AffiliateValidation = {
  ok: boolean;
  url: string | null;
  reason?: string;
};

function resolvePublisherKey(): string {
  return process.env.SOVRN_PUBLISHER_KEY?.trim() || SOVRN_DEMO_KEY;
}

/** True when the string is non-empty and not a bare placeholder like "#". */
function isUsable(raw: string | undefined | null): boolean {
  if (!raw) return false;
  const t = raw.trim();
  return t.length > 0 && t !== "#" && t !== "" && t !== "about:blank";
}

/**
 * Build a Sovrn tracking URL that wraps a destination product URL.
 * The destination is placed in the `u` parameter; URLSearchParams performs the
 * single HTML/URL-encoding Sovrn expects (do NOT pre-encode, or it double-encodes).
 */
export function buildSovrnAffiliateUrl(destinationUrl: string): string {
  const clean = destinationUrl.trim();
  const params = new URLSearchParams();
  params.set("key", resolvePublisherKey());
  params.set("u", clean);
  return `https://${SOVRN_HOST}?${params.toString()}`;
}

/**
 * STRICT Sovrn validation.
 * A link is valid only if it is an absolute `https` URL on the Sovrn redirect
 * host and carries BOTH a non-empty `key` and a non-empty `u` whose decoded
 * value is itself an absolute `http(s)` URL. Everything else fails.
 */
export function validateSovrnAffiliateUrl(raw: string): AffiliateValidation {
  if (!isUsable(raw)) {
    return { ok: false, url: null, reason: "empty-or-placeholder" };
  }

  let parsed: URL;
  try {
    parsed = new URL(raw.trim());
  } catch {
    return { ok: false, url: null, reason: "malformed-url" };
  }

  if (parsed.protocol !== "https:") {
    return { ok: false, url: null, reason: "must-be-https" };
  }

  if (parsed.hostname.toLowerCase() !== SOVRN_HOST) {
    return { ok: false, url: null, reason: `not-sovrn-host (${parsed.hostname})` };
  }

  const key = parsed.searchParams.get("key");
  const u = parsed.searchParams.get("u");

  if (key === null || !isUsable(key)) {
    return { ok: false, url: null, reason: "missing-key" };
  }
  if (u === null || !isUsable(u)) {
    return { ok: false, url: null, reason: "missing-destination" };
  }

  // Decode `u` and require it to be an absolute http(s) destination.
  let destination: URL;
  try {
    destination = new URL(decodeURIComponent(u));
  } catch {
    return { ok: false, url: null, reason: "malformed-destination" };
  }
  if (destination.protocol !== "https:" && destination.protocol !== "http:") {
    return { ok: false, url: null, reason: "destination-not-http" };
  }

  return { ok: true, url: parsed.toString(), reason: undefined };
}

/** Convenience boolean for the valid state of a product's tracking URL. */
export function isSovrnAffiliateUrlValid(raw: string): boolean {
  return validateSovrnAffiliateUrl(raw).ok;
}

/**
 * STRICT RULE ENFORCEMENT — used by every collection/grid so no product
 * without a valid Sovrn tracking link is ever handed to the render layer.
 * Returns only the products whose tracking URL passes validation.
 */
export function filterToRenderable<T extends { affiliateUrl: string }>(
  items: T[]
): T[] {
  return items.filter((item) => isSovrnAffiliateUrlValid(item.affiliateUrl));
}

/** Returns a validated link or `null` (never a bare "#"). */
export function getValidatedAffiliateUrl(
  raw: string
): string | null {
  return validateSovrnAffiliateUrl(raw).url;
}
