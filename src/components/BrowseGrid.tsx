import { useState } from "react";
import type { Item } from "../data/mock";

interface Props {
  items: Item[];
  categories: readonly { id: string; label: string }[];
}

export default function BrowseGrid({ items, categories }: Props) {
  const [active, setActive] = useState("all");
  const [query, setQuery] = useState("");

  const filtered = items.filter((item) => {
    const matchCat = active === "all" || item.category === active;
    const matchQuery =
      !query ||
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()));
    return matchCat && matchQuery;
  });

  return (
    <div>
      {/* Search */}
      <div className="relative mb-6">
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
          placeholder="Search items, tags, occasions…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 text-sm rounded-[var(--radius-button)] border border-[var(--color-border)] bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-sage)]/30 focus:border-[var(--color-sage)] transition"
        />
      </div>

      {/* Category pills */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-8 -mx-1 px-1">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActive(cat.id)}
            className={`flex-shrink-0 px-4 py-1.5 text-sm font-medium rounded-[var(--radius-pill)] transition-colors ${
              active === cat.id
                ? "bg-[var(--color-charcoal)] text-white"
                : "bg-white border border-[var(--color-border)] text-[var(--color-muted)] hover:border-[var(--color-charcoal)]/20"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-[var(--color-muted)]">No items match your filters.</p>
          <button
            onClick={() => {
              setActive("all");
              setQuery("");
            }}
            className="mt-3 text-sm font-semibold text-[var(--color-sage-dark)] hover:underline"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filtered.map((item) => (
            <a key={item.id} href={`/item/${item.id}`} className="group">
              <div className="relative aspect-[4/5] rounded-[var(--radius-card)] overflow-hidden bg-[var(--color-border)]/40">
                <img
                  src={item.images[0]}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                {!item.available && (
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <span className="px-3 py-1 text-xs font-semibold text-white bg-black/60 rounded-[var(--radius-pill)]">
                      Currently out
                    </span>
                  </div>
                )}
              </div>
              <div className="mt-3">
                <p className="text-sm font-semibold truncate group-hover:text-[var(--color-sage-dark)] transition-colors">
                  {item.title}
                </p>
                <p className="text-xs text-[var(--color-muted)] mt-0.5">
                  {item.size} · {item.condition}
                </p>
                <p className="text-xs text-[var(--color-muted)] mt-0.5 truncate">
                  {item.owner.name} · {item.owner.community}
                </p>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
