/**
 * TRAX.50 — smart / fuzzy sneaker search.
 *
 * Pure, side-effect-free helpers used by the client-side header search. No
 * server-only imports here so this module is safe to bundle for the browser.
 *
 * Matching is:
 *  - case-insensitive and punctuation/accent-insensitive ("white/green" == "white green"),
 *  - tolerant of partial words ("dun" -> "Dunk", "990v" -> 990v3/990v6),
 *  - alias-aware for common sneaker abbreviations ("af1" -> Air Force 1,
 *    "aj4" -> Air Jordan 4, "am90" -> Air Max 90, "xt6" -> XT-6, "nb" -> New
 *    Balance, "jfg" -> Joe Freshgoods, "sbb" -> Shattered Backboard ...).
 */

export type SearchScorable = {
  name: string;
  brand: string;
  audience: string;
  id: string;
};

/** Collapse to lower-case alphanumeric word tokens (keeps digits, drops punctuation). */
export function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, " and ")
    .split(/[^a-z0-9]+/)
    .filter(Boolean)
    .join(" ");
}

const WORDS = (s: string): string[] =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .split(/[^a-z0-9]+/)
    .filter(Boolean);

/**
 * Canonical searchable haystack for a product: name + brand + audience + id,
 * plus alias keywords that let abbreviations match. All single normalized string.
 */
export function buildHaystack(p: SearchScorable): string {
  const name = normalize(p.name);
  const brand = normalize(p.brand);
  const audience = p.audience;
  const id = p.id.toLowerCase();

  const aliases: string[] = [];

  const add = (...keys: string[]) => aliases.push(...keys);
  // Sneaker abbreviations -> canonical model words already present in the name.
  if (/air force 1|af1/.test(name)) add("af1", "af 1", "airforce1", "force 1");
  if (/air max 90/.test(name)) add("am90", "am 90", "airmax90");
  if (/air max 1\b/.test(name)) add("am1", "am 1", "airmax1");
  if (/air jordan 4/.test(name)) add("aj4", "aj 4", "jordan 4");
  if (/air jordan 11/.test(name)) add("aj11", "aj 11", "jordan 11");
  if (/air jordan 1/.test(name)) add("aj1", "aj 1", "j1");
  if (/joe freshgoods/.test(name)) add("jfg");
  if (/shattered backboard/.test(name)) add("sbb");
  if (/gel kayano 14/.test(name)) add("kayano", "k14", "kayano 14", "gel k14");
  if (/gel lyte iii|gel lyte 3/.test(name)) add("gl3", "gel lyte 3");
  if (/shattered/.test(name)) add("sbb");
  if (brand === "nike" || brand === "jordan") {
    add("air");
  }
  if (brand === "new balance") add("nb");
  if (brand === "adidas") add("adidas originals");
  if (brand === "asics") add("asics gel");
  if (name.includes("grade school") || audience === "kids") add("gs", "kid", "kids");
  if (name.includes("samba")) add("samba og");
  if (name.includes("gazelle")) add("gazelle 85");

  return normalize([name, brand, audience, id].join(" ") + " " + aliases.join(" "));
}

/** Small Levenshtein distance for typo tolerance. */
function levenshtein(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  if (!m) return n;
  if (!n) return m;
  const dp = Array.from({ length: m + 1 }, (_, i) => [i, ...Array(n).fill(0)]);
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
      );
    }
  }
  return dp[m][n];
}

/** True when a single query token is satisfied by a haystack word. */
function tokenMatchesQueryWord(word: string, token: string): boolean {
  if (!token) return false;
  if (word === token) return true; // exact
  if (word.startsWith(token) && token.length >= 2) return true; // "dun" -> "dunk"
  if (token.startsWith(word) && word.length >= 3) return true; // "dunk" but product token prefix
  // typo tolerance for reasonably long tokens
  if (token.length >= 5 && levenshtein(word.slice(0, token.length), token) <= 1)
    return true;
  return false;
}

/**
 * Alias map: each alias token maps to the canonical substrings it stands for.
 * A query token that is (or contains) an alias expands to its canonical phrase.
 */
const ALIASES: Record<string, string[]> = {
  af1: ["air force 1", "force 1"],
  "af 1": ["air force 1"],
  af: ["air force 1", "air force"],
  am90: ["air max 90"],
  "am 90": ["air max 90"],
  airmax90: ["air max 90"],
  am1: ["air max 1"],
  aj1: ["air jordan 1"],
  aj4: ["air jordan 4"],
  aj11: ["air jordan 11"],
  "aj 1": ["air jordan 1"],
  "aj 4": ["air jordan 4"],
  "aj 11": ["air jordan 11"],
  j1: ["air jordan 1"],
  nb: ["new balance"],
  jfg: ["joe freshgoods"],
  sbb: ["shattered backboard"],
  k14: ["gel kayano 14"],
  kayano: ["gel kayano 14"],
  "gel k14": ["gel kayano 14"],
  gl3: ["gel lyte iii"],
  xt6: ["xt 6"],
  "xt 6": ["xt 6"],
  am: ["air max"],
  "og": ["og"],
};

function expandToken(rawToken: string): { word: string; substrings: string[] } {
  const token = rawToken; // normalized single word (digits+letters, punctuation removed already)
  const substrings: string[] = [];
  const tokenNorm = token.replace(/\s+/g, "");
  let expanded = false;
  for (const [key, canonicals] of Object.entries(ALIASES)) {
    const keyNorm = key.replace(/\s+/g, "");
    if (tokenNorm === keyNorm) {
      substrings.push(...canonicals);
      expanded = true;
    }
  }
  // For short alias tokens (af, am, nb, og …) only use the canonical phrases to
  // avoid substring false positives (e.g. "am" inside "samba"). Longer/mixed
  // tokens (af1, am90, 550, 990v6 …) also match literally.
  if (!expanded || token.length >= 4) substrings.push(token);
  return { word: token, substrings };
}

/**
 * Score a product for a query. Returns a positive relevance score if it matches,
 * or 0 when it should be excluded. Higher = better.
 */
export function scoreProduct(haystack: string, query: string): number {
  const q = query.trim();
  if (!q) return 0;

  // Fast alias / phrase match against the whole haystack.
  const qNorm = normalize(q);
  const qNormNoSpace = qNorm.replace(/\s+/g, "");
  // Known whole-query aliases like "af1"
  for (const [key, canonicals] of Object.entries(ALIASES)) {
    if (qNormNoSpace === key.replace(/\s+/g, "")) {
      for (const c of canonicals) {
        if (haystack.includes(normalize(c))) return 100;
      }
    }
  }

  const tokens = WORDS(q);
  if (!tokens.length) return 0;

  let score = 0;
  for (const token of tokens) {
    const { substrings } = expandToken(token);
    // 1) any alias canonical present as a contiguous phrase?
    let hit = substrings.some((s) => haystack.includes(normalize(s)));
    let hitTok = token;
    if (!hit) {
      // 2) fuzzy per-word
      const words = haystack.split(" ");
      hitTok = words.find((w) => tokenMatchesQueryWord(w, token)) || "";
      hit = !!hitTok;
    }
    if (!hit) return 0; // every token must be satisfied
    // 3) contribution — prefer exact/prefix matches near start, penalize long words
    const idx = haystack.indexOf(hitTok === token ? token : normalize(token));
    const base = substrings.some((s) => haystack.includes(normalize(s)))
      ? 20
      : 14;
    score += base + (idx >= 0 ? Math.max(0, 30 - idx) : 0);
  }

  // Whole-phrase closeness bonus
  if (haystack.includes(qNorm)) score += 40;
  else if (haystack.includes(qNormNoSpace)) score += 20;

  return score;
}
