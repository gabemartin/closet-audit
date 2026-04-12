import { useState, type FormEvent } from "react";

const categories = [
  "tops",
  "bottoms",
  "dresses",
  "outerwear",
  "shoes",
  "accessories",
] as const;

const conditions = ["like new", "good", "fair"] as const;

const sizes = ["XXS", "XS", "S", "M", "L", "XL", "XXL", "OS"] as const;

export default function ListItemForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="text-center py-16">
        <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--color-sage-light)] text-3xl mb-4">
          ✓
        </span>
        <h2 className="font-[var(--font-display)] font-bold text-xl">
          Item listed!
        </h2>
        <p className="mt-2 text-sm text-[var(--color-muted)]">
          Your community can now see and request this piece.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <button
            onClick={() => setSubmitted(false)}
            className="px-6 py-2.5 text-sm font-semibold text-white bg-[var(--color-sage)] hover:bg-[var(--color-sage-dark)] rounded-[var(--radius-button)] transition-colors"
          >
            List another
          </button>
          <a
            href="/browse"
            className="px-6 py-2.5 text-sm font-semibold text-[var(--color-charcoal)] bg-white border border-[var(--color-border)] hover:border-[var(--color-charcoal)]/20 rounded-[var(--radius-button)] transition-colors"
          >
            Browse items
          </a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Photo upload placeholder */}
      <div>
        <label className="block text-sm font-medium mb-2">Photos</label>
        <div className="border-2 border-dashed border-[var(--color-border)] rounded-[var(--radius-card)] p-8 text-center hover:border-[var(--color-sage)] transition-colors cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8 mx-auto text-[var(--color-muted)] mb-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5V18a2.25 2.25 0 002.25 2.25h13.5A2.25 2.25 0 0021 18v-1.5m-6-6l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
          <p className="text-sm text-[var(--color-muted)]">
            Tap to add photos
          </p>
          <p className="text-xs text-[var(--color-muted)]/60 mt-1">
            Up to 4 photos recommended
          </p>
        </div>
      </div>

      {/* Title */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium mb-2">
          Title
        </label>
        <input
          id="title"
          type="text"
          required
          placeholder='e.g. "Sage green midi dress"'
          className="w-full px-4 py-2.5 text-sm rounded-[var(--radius-button)] border border-[var(--color-border)] bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-sage)]/30 focus:border-[var(--color-sage)] transition"
        />
      </div>

      {/* Description */}
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium mb-2"
        >
          Description
        </label>
        <textarea
          id="description"
          rows={3}
          placeholder="Fit notes, fabric, occasions it's good for…"
          className="w-full px-4 py-2.5 text-sm rounded-[var(--radius-button)] border border-[var(--color-border)] bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-sage)]/30 focus:border-[var(--color-sage)] transition resize-none"
        />
      </div>

      {/* Category & Size row */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="category" className="block text-sm font-medium mb-2">
            Category
          </label>
          <select
            id="category"
            required
            className="w-full px-4 py-2.5 text-sm rounded-[var(--radius-button)] border border-[var(--color-border)] bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-sage)]/30 focus:border-[var(--color-sage)] transition capitalize"
          >
            <option value="">Select…</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="size" className="block text-sm font-medium mb-2">
            Size
          </label>
          <select
            id="size"
            required
            className="w-full px-4 py-2.5 text-sm rounded-[var(--radius-button)] border border-[var(--color-border)] bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-sage)]/30 focus:border-[var(--color-sage)] transition"
          >
            <option value="">Select…</option>
            {sizes.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Condition */}
      <div>
        <label className="block text-sm font-medium mb-2">Condition</label>
        <div className="flex gap-2">
          {conditions.map((c) => (
            <label
              key={c}
              className="flex-1 relative cursor-pointer"
            >
              <input
                type="radio"
                name="condition"
                value={c}
                required
                className="peer sr-only"
              />
              <div className="text-center py-2.5 text-sm rounded-[var(--radius-button)] border border-[var(--color-border)] bg-white peer-checked:border-[var(--color-sage)] peer-checked:bg-[var(--color-sage-light)]/40 peer-checked:text-[var(--color-sage-dark)] font-medium capitalize transition-colors">
                {c}
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Tags */}
      <div>
        <label htmlFor="tags" className="block text-sm font-medium mb-2">
          Tags
        </label>
        <input
          id="tags"
          type="text"
          placeholder="e.g. formal, spring, date party (comma separated)"
          className="w-full px-4 py-2.5 text-sm rounded-[var(--radius-button)] border border-[var(--color-border)] bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-sage)]/30 focus:border-[var(--color-sage)] transition"
        />
      </div>

      <button
        type="submit"
        className="w-full py-3.5 text-sm font-semibold text-white bg-[var(--color-sage)] hover:bg-[var(--color-sage-dark)] rounded-[var(--radius-button)] transition-colors"
      >
        List Item
      </button>
    </form>
  );
}
