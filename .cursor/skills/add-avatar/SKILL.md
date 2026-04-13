---
name: add-avatar
description: >-
  Add or update profile avatars for closet owners. Use when the user asks to
  add a profile photo, change an avatar, create a new closet with a profile
  image, or update how avatars display. Covers the Closet data schema, Unsplash
  portrait conventions, the Avatar.astro component, the React ProfileAvatar
  helper, and all pages that render avatars.
---

# Adding & Updating Closet Avatars

Profile avatars use circular Unsplash portrait photos inside an Instagram-style
gradient ring. Every closet has a required `avatar` (2-letter initials fallback)
and an optional `profileImage` URL.

## 1. Data — `src/data/mock.ts`

### Relevant Closet Fields

```ts
interface Closet {
  avatar: string;         // 2-letter uppercase initials, e.g. "FC"
  profileImage?: string;  // Unsplash face-cropped URL via profileImg()
  // ...other fields
}
```

### Profile Image Helper

```ts
const profileImg = (id: string, size = 200) =>
  `https://images.unsplash.com/${id}?w=${size}&h=${size}&fit=crop&crop=faces&q=80`;
```

Use `crop=faces` so Unsplash auto-centers on the face. Always use this helper
instead of building URLs manually.

### Adding a Profile Image to a Closet

```ts
{
  id: "new-closet",
  avatar: "NC",
  profileImage: profileImg("photo-XXXXXXXXXXXX-XXXXXXXXXXXX"),
  // ...
}
```

### Choosing Good Portrait Photos

- Pick Unsplash photos that show a **single person, head/shoulders framing**
- Avoid group shots, full-body shots, or images where the face is small
- The `crop=faces` parameter handles centering, but the source photo matters
- Aim for a natural, social-media-profile feel (smiling, good lighting)

### Verify Every Image Before Committing

```bash
curl -s -o /dev/null -w "%{http_code}" \
  "https://images.unsplash.com/photo-XXXX?w=200&h=200&fit=crop&crop=faces&q=80"
```

Must return `200`. If `404`, try a different photo ID.

## 2. Astro Component — `src/components/Avatar.astro`

Used in all `.astro` pages. Props:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string?` | — | `profileImage` URL |
| `initials` | `string` | — | 2-letter fallback text |
| `size` | `"xs" \| "sm" \| "md" \| "lg"` | `"md"` | Controls dimensions |
| `ring` | `boolean` | `true` | Gradient ring border |
| `class` | `string?` | — | Extra CSS classes |

### Size Reference

| Size | Outer | Inner | Use Case |
|------|-------|-------|----------|
| `xs` | 32px | 28px | Thread headers, compact rows |
| `sm` | 40px | 36px | Card listings, small previews |
| `md` | 44px | 40px | Conversation list, default |
| `lg` | 80px | 72px | Profile page header |

### Usage in Astro Pages

```astro
---
import Avatar from "../components/Avatar.astro";
---
<Avatar src={closet.profileImage} initials={closet.avatar} size="sm" />
```

## 3. React Helper — `src/components/MessagesView.tsx`

Astro components can't be used inside React. `MessagesView.tsx` has its own
`ProfileAvatar` function component with the same visual output. It supports
sizes `xs`, `sm`, and `md`.

```tsx
<ProfileAvatar src={closet.profileImage} initials={closet.avatar} size="md" />
```

If adding avatars to a **new** React component, copy the `ProfileAvatar`
function and `avatarSizes` map from `MessagesView.tsx`, or extract them into a
shared `src/components/ProfileAvatar.tsx` file.

## 4. Visual Design

The gradient ring uses the project's design tokens:

```
bg-gradient-to-br from-sage via-lavender to-terracotta
```

- Ring: gradient border (sage → lavender → terracotta)
- Gap: thin `cream`-colored padding between ring and photo
- Fallback: `sage-light` circle with `sage-dark` initials in `font-display`

## 5. Pages That Render Avatars

Update **all** of these when changing avatar behavior:

| Page | File | Size Used |
|------|------|-----------|
| Closets listing | `src/pages/closets.astro` | `sm` |
| Homepage closets | `src/pages/index.astro` | `sm` |
| Closet profile | `src/pages/closet/[id].astro` | `lg` |
| Item detail | `src/pages/item/[id].astro` | `sm` |
| Messages list | `src/components/MessagesView.tsx` | `md` |
| Message thread | `src/components/MessagesView.tsx` | `xs` |

## 6. Post-Change Verification

After adding or changing avatar data:

1. **Check image loads** — verify Unsplash URL returns 200 (see above)
2. **Build check** — `npm run build` must pass cleanly
3. **Visual spot-check** — confirm the avatar renders on `/closets` and the
   closet's profile page
