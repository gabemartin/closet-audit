---
name: add-mock-data
description: >-
  Add new clothing items or closet owners to the mock data layer. Use when the
  user asks to add items, closets, listings, inventory, sample data, or expand
  the browse catalog. Covers data schema, Unsplash image conventions, static
  path regeneration, and post-add verification.
---

# Adding Items & Closets

All mock data lives in `src/data/mock.ts`. This is the single source of truth
for items, closets, categories, occasions, communities, conversations, and
messages.

## Closet Schema

Append new entries to the `closets` array. Every closet **must** have a unique
`id` (lowercase, hyphenated slug).

```ts
interface Closet {
  id: string;            // unique slug, used in routes: /closet/:id
  name: string;          // display name, e.g. "Sophia's Styles"
  handle: string;        // social handle without @
  avatar: string;        // 2-letter uppercase initials (fallback)
  profileImage?: string; // Unsplash face-cropped URL via profileImg() helper
  location: string;      // city, state
  bio: string;           // short description
  venmo?: string;        // optional Venmo handle
  followers: number;
  itemCount: number;
  rules: string[];       // rental rules shown on closet page
}
```

For profile images, use the `profileImg()` helper defined in `mock.ts`:

```ts
profileImage: profileImg("photo-XXXXXXXXXXXX-XXXXXXXXXXXX")
```

See the [add-avatar skill](../add-avatar/SKILL.md) for portrait photo
selection guidelines and avatar component details.

## Item Schema

Append new entries to the `items` array. Each `id` must be a unique string
(use incrementing numbers as strings: `"25"`, `"26"`, etc.). The `closetId`
must reference an existing closet's `id`.

```ts
interface Item {
  id: string;
  title: string;
  description: string;       // casual, first-person voice matching existing tone
  size: string;               // "XS" | "S" | "M" | "L" | "XL" | "OS" | shoe size
  fitNote?: string;           // optional, e.g. "runs small", "fits XS-S"
  category: Category;
  occasion: Occasion[];       // at least one
  color: string;
  condition: "like new" | "good" | "fair";
  rentPrice: number;          // whole dollars
  buyPrice?: number;          // optional, higher than rentPrice
  closetId: string;           // FK → Closet.id
  images: string[];           // use img() helper (see below)
  available: boolean;
}
```

### Valid Categories & Occasions

Categories: `"dresses"` · `"tops"` · `"bottoms"` · `"sets"` · `"outerwear"` ·
`"shoes"` · `"accessories"`

Occasions: `"formal"` · `"gameday"` · `"date party"` · `"21st"` · `"rush"` ·
`"going out"` · `"casual"` · `"wedding guest"`

## Images — Unsplash Convention

The file defines a helper at the top of `mock.ts`:

```ts
const img = (id: string, w = 400, h = 500) =>
  `https://images.unsplash.com/${id}?w=${w}&h=${h}&fit=crop&q=80`;
```

Use it for every item image:

```ts
images: [img("photo-XXXXXXXXXXXX-XXXXXXXXXXXX")]
```

### Verify Every Image Before Committing

**Always** check that each Unsplash photo ID returns HTTP 200 before saving.
Run this in the shell for each new ID:

```bash
curl -s -o /dev/null -w "%{http_code}" \
  "https://images.unsplash.com/photo-XXXX?w=400&h=500&fit=crop&q=80"
```

If any return 404, replace the ID and re-check. Batch-check all new IDs at
once when adding multiple items.

## After Adding Data

### 1. Restart the Dev Server

Astro caches `getStaticPaths()` results. Adding new closets or items creates
new static routes (`/closet/:id`, `/item/:id`) that won't resolve until the
dev server restarts.

```bash
# Kill existing server
lsof -i :4321 -t | xargs kill -9 2>/dev/null

# Restart (requires Node 22)
source ~/.nvm/nvm.sh && nvm use 22 && npx astro dev
```

### 2. Verify New Routes

Spot-check that new pages return 200:

```bash
curl -s -o /dev/null -w "%{http_code}" http://localhost:4321/closet/<new-id>
curl -s -o /dev/null -w "%{http_code}" http://localhost:4321/item/<new-id>
```

### 3. Build Check

Run a full build to confirm no breakage:

```bash
source ~/.nvm/nvm.sh && nvm use 22 && npx astro build
```

## Pages That Consume This Data

These pages automatically pick up new closets/items — no template changes needed:

| Route | Source | Notes |
|-------|--------|-------|
| `/browse` | `BrowseGrid.tsx` | Paginated (8/page), client-side filtered |
| `/item/[id]` | `item/[id].astro` | `getStaticPaths` from `items` array |
| `/closet/[id]` | `closet/[id].astro` | `getStaticPaths` from `closets` array |
| `/closets` | `closets.astro` | Lists all closets |
| `/` | `index.astro` | Shows first 4 available items, first 3 closets |

## Style Notes

- Item descriptions use a casual, enthusiastic voice with abbreviations
  ("SO cute", "PERFECT for", "runs TTS")
- Keep descriptions to 1-2 sentences
- Spread new items across multiple closets for variety
- Mix categories — don't add only dresses
- Include a few items with `available: false` for realism
- Include occasional `buyPrice` values (roughly 2× the rent price)
