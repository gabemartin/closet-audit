import React, { useState, useEffect, type FormEvent } from "react";
import { withBase } from "../lib/paths";

const categories = [
  "dresses",
  "tops",
  "bottoms",
  "sets",
  "outerwear",
  "shoes",
  "accessories",
] as const;

const conditions = ["like new", "good", "fair"] as const;
const sizes = ["XXS", "XS", "S", "M", "L", "XL", "XXL", "OS"] as const;

const occasionOptions = [
  "formal",
  "gameday",
  "date party",
  "21st",
  "rush",
  "going out",
  "wedding guest",
  "casual",
] as const;

export default function ListItemForm() {
  const [mounted, setMounted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [selectedOccasions, setSelectedOccasions] = useState<Set<string>>(new Set());

  useEffect(() => {
    setMounted(true);
  }, []);

  function toggleOccasion(occ: string) {
    setSelectedOccasions((prev) => {
      const next = new Set(prev);
      if (next.has(occ)) next.delete(occ);
      else next.add(occ);
      return next;
    });
  }

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
          Your piece is now live. People in your community can request to rent it.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <button
            onClick={() => {
              setSubmitted(false);
              setSelectedOccasions(new Set());
            }}
            className="px-6 py-2.5 text-sm font-semibold text-white bg-[var(--color-sage)] hover:bg-[var(--color-sage-dark)] rounded-[var(--radius-button)] transition-colors"
          >
            List another
          </button>
          <a
            href={withBase("/browse")}
            className="px-6 py-2.5 text-sm font-semibold text-[var(--color-charcoal)] bg-white border border-[var(--color-border)] hover:border-[var(--color-charcoal)]/20 rounded-[var(--radius-button)] transition-colors"
          >
            Browse items
          </a>
        </div>
      </div>
    );
  }

  const inputClass =
    "w-full px-4 py-2.5 text-sm rounded-[var(--radius-button)] border border-[var(--color-border)] bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-sage)]/30 focus:border-[var(--color-sage)] transition";

  if (!mounted) return null;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Photo upload */}
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
            Show the full outfit — front, back, and on-body if you can
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
          placeholder='e.g. "Champagne satin slip dress"'
          className={inputClass}
        />
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium mb-2">
          Description
        </label>
        <textarea
          id="description"
          rows={3}
          placeholder="Fit notes, brand, how you wore it, any flaws…"
          className={`${inputClass} resize-none`}
        />
      </div>

      {/* Category, Size, Price row */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label htmlFor="category" className="block text-sm font-medium mb-2">
            Category
          </label>
          <select id="category" required className={`${inputClass} capitalize`}>
            <option value="">Select…</option>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="size" className="block text-sm font-medium mb-2">
            Size
          </label>
          <select id="size" required className={inputClass}>
            <option value="">Select…</option>
            {sizes.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="price" className="block text-sm font-medium mb-2">
            Rent Price
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[var(--color-muted)]">$</span>
            <input
              id="price"
              type="number"
              min="0"
              step="5"
              required
              placeholder="25"
              className={`${inputClass} pl-7`}
            />
          </div>
        </div>
      </div>

      {/* Condition */}
      <div>
        <label className="block text-sm font-medium mb-2">Condition</label>
        <div className="flex gap-2">
          {conditions.map((c) => (
            <label key={c} className="flex-1 relative cursor-pointer">
              <input type="radio" name="condition" value={c} required className="peer sr-only" />
              <div className="text-center py-2.5 text-sm rounded-[var(--radius-button)] border border-[var(--color-border)] bg-white peer-checked:border-[var(--color-sage)] peer-checked:bg-[var(--color-sage-light)]/40 peer-checked:text-[var(--color-sage-dark)] font-medium capitalize transition-colors">
                {c}
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Occasions multi-select */}
      <div>
        <label className="block text-sm font-medium mb-2">Best for (select all that apply)</label>
        <div className="flex flex-wrap gap-2">
          {occasionOptions.map((occ) => (
            <button
              key={occ}
              type="button"
              onClick={() => toggleOccasion(occ)}
              className={`px-3 py-1.5 text-xs font-medium rounded-[var(--radius-pill)] transition-colors capitalize ${
                selectedOccasions.has(occ)
                  ? "bg-[var(--color-lavender)] text-white"
                  : "bg-[var(--color-lavender-light)]/50 text-[var(--color-muted)] hover:bg-[var(--color-lavender-light)]"
              }`}
            >
              {occ}
            </button>
          ))}
        </div>
      </div>

      {/* Fit note */}
      <div>
        <label htmlFor="fit" className="block text-sm font-medium mb-2">
          Fit note <span className="text-[var(--color-muted)] font-normal">(optional)</span>
        </label>
        <input
          id="fit"
          type="text"
          placeholder='e.g. "runs small", "fits XS-S", "TTS"'
          className={inputClass}
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
