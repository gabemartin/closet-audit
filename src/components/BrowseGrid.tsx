import React, { useState, useEffect } from "react";
import type { Item, Closet } from "../data/mock";
import { withBase } from "../lib/paths";

interface Props {
  items: Item[];
  closets: Closet[];
  categories: readonly { id: string; label: string }[];
  occasions: readonly { id: string; label: string }[];
}

export default function BrowseGrid({ items = [], closets = [], categories = [], occasions = [] }: Props) {
  const [mounted, setMounted] = useState(false);
  const [activeCat, setActiveCat] = useState("all");
  const [activeOccasion, setActiveOccasion] = useState("all");
  const [query, setQuery] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  const closetMap = Object.fromEntries(closets.map((c) => [c.id, c]));

  const filtered = items.filter((item) => {
      const matchCat = activeCat === "all" || item.category === activeCat;
      const matchOccasion =
        activeOccasion === "all" || (item.occasion && item.occasion.includes(activeOccasion as any));
      const q = query.toLowerCase();
      const matchQuery =
        !q ||
        (item.title && item.title.toLowerCase().includes(q)) ||
        (item.occasion && item.occasion.some((o) => o.includes(q))) ||
        (item.color && item.color.toLowerCase().includes(q)) ||
        (closetMap[item.closetId]?.name && closetMap[item.closetId].name.toLowerCase().includes(q));
      return matchCat && matchOccasion && matchQuery;
    });

    if (!mounted) return null;

    return (
    <div>
      {/* Search */}
      <div className="relative mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-muted)]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
          />
        </svg>
        <input
          type="text"
          placeholder="Search dresses, closets, occasions…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 text-sm rounded-[var(--radius-button)] border border-[var(--color-border)] bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-sage)]/30 focus:border-[var(--color-sage)] transition"
        />
      </div>

      {/* Occasion pills */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-3 -mx-1 px-1 scrollbar-hide">
        {occasions.map((occ) => (
          <button
            key={occ.id}
            onClick={() => setActiveOccasion(occ.id)}
            className={`flex-shrink-0 px-3.5 py-1.5 text-xs font-semibold rounded-[var(--radius-pill)] transition-colors ${
              activeOccasion === occ.id
                ? "bg-[var(--color-charcoal)] text-white"
                : "bg-white border border-[var(--color-border)] text-[var(--color-muted)] hover:border-[var(--color-charcoal)]/20"
            }`}
          >
            {occ.label}
          </button>
        ))}
      </div>

      {/* Category pills */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-6 -mx-1 px-1 scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCat(cat.id)}
            className={`flex-shrink-0 px-3.5 py-1.5 text-xs font-medium rounded-[var(--radius-pill)] transition-colors ${
              activeCat === cat.id
                ? "bg-[var(--color-sage)] text-white"
                : "bg-[var(--color-sage-light)]/40 text-[var(--color-sage-dark)] hover:bg-[var(--color-sage-light)]"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Results count */}
      <p className="text-xs text-[var(--color-muted)] mb-4">
        {filtered.length} item{filtered.length !== 1 && "s"}
      </p>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-[var(--color-muted)]">No items match your filters.</p>
          <button
            onClick={() => {
              setActiveCat("all");
              setActiveOccasion("all");
              setQuery("");
            }}
            className="mt-3 text-sm font-semibold text-[var(--color-sage-dark)] hover:underline"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {filtered.map((item) => {
            const closet = closetMap[item.closetId];
            return (
              <a key={item.id} href={withBase(`/item/${item.id}`)} className="group">
                <div className="relative aspect-[3/4] rounded-[var(--radius-card)] overflow-hidden bg-[var(--color-border)]/40">
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  {/* Price badge */}
                  <span className="absolute top-2 right-2 px-2 py-0.5 text-xs font-bold text-white bg-black/60 backdrop-blur-sm rounded-[var(--radius-pill)]">
                    ${item.rentPrice}
                  </span>
                  {!item.available && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <span className="px-3 py-1 text-xs font-semibold text-white bg-black/60 rounded-[var(--radius-pill)]">
                        Rented
                      </span>
                    </div>
                  )}
                </div>
                <div className="mt-2.5">
                  <p className="text-sm font-semibold truncate group-hover:text-[var(--color-sage-dark)] transition-colors">
                    {item.title}
                  </p>
                  <p className="text-xs text-[var(--color-muted)] mt-0.5">
                    Size {item.size} · {item.condition}
                  </p>
                  {closet && (
                    <p className="text-xs text-[var(--color-muted)] mt-0.5 truncate">
                      {closet.name}
                    </p>
                  )}
                </div>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}
