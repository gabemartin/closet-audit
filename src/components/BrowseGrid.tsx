import React, { useState, useEffect, useRef } from "react";
import type { Item, Closet } from "../data/mock";
import { withBase } from "../lib/paths";

interface Props {
  items: Item[];
  closets: Closet[];
  categories: readonly { id: string; label: string }[];
  occasions: readonly { id: string; label: string }[];
}

const ITEMS_PER_PAGE = 8;
type ViewMode = "grid" | "full" | "fullscreen";

export default function BrowseGrid({ items = [], closets = [], categories = [], occasions = [] }: Props) {
  const [mounted, setMounted] = useState(false);
  const [activeCat, setActiveCat] = useState("all");
  const [activeOccasion, setActiveOccasion] = useState("all");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [fsIndex, setFsIndex] = useState(0);

  const resultsAnchorRef = useRef<HTMLDivElement>(null);
  const filteredRef = useRef<Item[]>([]);
  const skipFirstScroll = useRef(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  const closetMap = Object.fromEntries(closets.map((c) => [c.id, c]));

  useEffect(() => {
    setPage(1);
  }, [activeCat, activeOccasion, query]);

  // Smooth scroll to results top on page change, skipping the initial mount
  useEffect(() => {
    if (skipFirstScroll.current) {
      skipFirstScroll.current = false;
      return;
    }
    if (resultsAnchorRef.current) {
      const y = resultsAnchorRef.current.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
    }
  }, [page]);

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

  // Keep ref in sync for keyboard handler closure
  filteredRef.current = filtered;

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paged = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  function goToPage(n: number) {
    setPage(Math.max(1, Math.min(totalPages, n)));
  }

  // Keyboard navigation for fullscreen mode
  useEffect(() => {
    if (viewMode !== "fullscreen") return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setViewMode("grid");
      if (e.key === "ArrowRight") setFsIndex((i) => Math.min(filteredRef.current.length - 1, i + 1));
      if (e.key === "ArrowLeft") setFsIndex((i) => Math.max(0, i - 1));
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [viewMode]);

  if (!mounted) return null;

  const fsItem = filtered[Math.min(fsIndex, filtered.length - 1)];
  const fsCloset = fsItem ? closetMap[fsItem.closetId] : null;

  return (
    <div>
      {/* ── Fullscreen overlay ───────────────────────────────────────── */}
      {viewMode === "fullscreen" && fsItem && (
        <div
          className="fixed inset-0 z-50 bg-black flex flex-col"
          role="dialog"
          aria-modal="true"
          aria-label="Fullscreen item viewer"
        >
          {/* Header bar */}
          <div className="flex items-center justify-between px-4 py-3 flex-shrink-0">
            <span className="text-white/50 text-sm tabular-nums">
              {Math.min(fsIndex, filtered.length - 1) + 1} / {filtered.length}
            </span>
            <button
              onClick={() => setViewMode("grid")}
              className="p-2 rounded-full text-white/80 hover:bg-white/10 transition"
              aria-label="Close fullscreen"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Image area */}
          <div className="flex-1 relative overflow-hidden">
            <img
              src={fsItem.images[0]}
              alt={fsItem.title}
              className="absolute inset-0 w-full h-full object-contain"
            />
            {!fsItem.available && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                <span className="px-4 py-1.5 text-sm font-semibold text-white bg-black/60 rounded-full">
                  Rented
                </span>
              </div>
            )}

            {/* Prev arrow */}
            <button
              onClick={() => setFsIndex((i) => Math.max(0, i - 1))}
              disabled={fsIndex === 0}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 bg-black/50 rounded-full text-white disabled:opacity-20 hover:bg-black/70 transition"
              aria-label="Previous item"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Next arrow */}
            <button
              onClick={() => setFsIndex((i) => Math.min(filteredRef.current.length - 1, i + 1))}
              disabled={fsIndex >= filtered.length - 1}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 bg-black/50 rounded-full text-white disabled:opacity-20 hover:bg-black/70 transition"
              aria-label="Next item"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Item info strip */}
          <div className="flex-shrink-0 px-5 py-4 bg-black/85 text-white">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="font-semibold text-base leading-snug">{fsItem.title}</p>
                <p className="text-sm text-white/55 mt-0.5">
                  Size {fsItem.size} · {fsItem.condition}
                </p>
                {fsCloset && (
                  <p className="text-sm text-white/40 mt-0.5 truncate">{fsCloset.name}</p>
                )}
              </div>
              <p className="text-xl font-bold flex-shrink-0">${fsItem.rentPrice}</p>
            </div>
            <a
              href={withBase(`/item/${fsItem.id}`)}
              className="mt-3 block text-center py-2.5 rounded-[var(--radius-button)] bg-[var(--color-sage)] text-white text-sm font-semibold hover:opacity-90 transition"
            >
              View Item
            </a>
            <p className="mt-2 text-center text-xs text-white/30">
              ← → arrow keys to navigate · Esc to close
            </p>
          </div>
        </div>
      )}

      {/* ── Search ──────────────────────────────────────────────────── */}
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

      {/* ── Occasion pills ──────────────────────────────────────────── */}
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

      {/* ── Category pills ──────────────────────────────────────────── */}
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

      {/* ── Results count + view mode toggle ────────────────────────── */}
      <div ref={resultsAnchorRef} className="flex items-center justify-between mb-4">
        <p className="text-xs text-[var(--color-muted)]">
          {filtered.length} item{filtered.length !== 1 && "s"}
        </p>

        {/* View mode pill group */}
        <div className="flex items-center gap-0.5 p-0.5 rounded-[var(--radius-button)] border border-[var(--color-border)] bg-white">
          {/* Grid view */}
          <button
            onClick={() => setViewMode("grid")}
            aria-label="Grid view"
            aria-pressed={viewMode === "grid"}
            title="Grid view"
            className={`p-1.5 rounded-[5px] transition-colors ${
              viewMode === "grid"
                ? "bg-[var(--color-charcoal)] text-white"
                : "text-[var(--color-muted)] hover:text-[var(--color-charcoal)]"
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="8" height="8" rx="1" />
              <rect x="13" y="3" width="8" height="8" rx="1" />
              <rect x="3" y="13" width="8" height="8" rx="1" />
              <rect x="13" y="13" width="8" height="8" rx="1" />
            </svg>
          </button>

          {/* Full width / list view */}
          <button
            onClick={() => setViewMode("full")}
            aria-label="List view"
            aria-pressed={viewMode === "full"}
            title="List view"
            className={`p-1.5 rounded-[5px] transition-colors ${
              viewMode === "full"
                ? "bg-[var(--color-charcoal)] text-white"
                : "text-[var(--color-muted)] hover:text-[var(--color-charcoal)]"
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="5" height="16" rx="1" />
              <line x1="11" y1="8" x2="21" y2="8" />
              <line x1="11" y1="12" x2="21" y2="12" />
              <line x1="11" y1="16" x2="21" y2="16" />
            </svg>
          </button>

          {/* Fullscreen view */}
          <button
            onClick={() => { setFsIndex(0); setViewMode("fullscreen"); }}
            aria-label="Fullscreen view"
            aria-pressed={viewMode === "fullscreen"}
            title="Fullscreen view"
            className={`p-1.5 rounded-[5px] transition-colors ${
              viewMode === "fullscreen"
                ? "bg-[var(--color-charcoal)] text-white"
                : "text-[var(--color-muted)] hover:text-[var(--color-charcoal)]"
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 8V5a1 1 0 011-1h3" />
              <path d="M16 4h3a1 1 0 011 1v3" />
              <path d="M20 16v3a1 1 0 01-1 1h-3" />
              <path d="M8 20H5a1 1 0 01-1-1v-3" />
            </svg>
          </button>
        </div>
      </div>

      {/* ── Items ───────────────────────────────────────────────────── */}
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
        <>
          {/* Grid layout */}
          {viewMode === "grid" && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
              {paged.map((item) => {
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

          {/* Full-width list layout */}
          {viewMode === "full" && (
            <div className="flex flex-col gap-3">
              {paged.map((item) => {
                const closet = closetMap[item.closetId];
                return (
                  <a
                    key={item.id}
                    href={withBase(`/item/${item.id}`)}
                    className="group flex gap-0 bg-white rounded-[var(--radius-card)] border border-[var(--color-border)] overflow-hidden hover:border-[var(--color-sage)]/50 hover:shadow-sm transition"
                  >
                    {/* Thumbnail */}
                    <div className="relative w-28 sm:w-36 flex-shrink-0 self-stretch">
                      <img
                        src={item.images[0]}
                        alt={item.title}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      {!item.available && (
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <span className="px-2 py-0.5 text-xs font-semibold text-white bg-black/60 rounded-full">
                            Rented
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Details */}
                    <div className="flex flex-col justify-between flex-1 min-w-0 px-4 py-3.5">
                      <div>
                        <p className="text-sm font-semibold leading-snug group-hover:text-[var(--color-sage-dark)] transition-colors">
                          {item.title}
                        </p>
                        <p className="text-xs text-[var(--color-muted)] mt-1">
                          Size {item.size} · {item.condition}
                        </p>
                        {closet && (
                          <p className="text-xs text-[var(--color-muted)] mt-0.5 truncate">
                            {closet.name}
                          </p>
                        )}
                      </div>
                      <p className="text-base font-bold mt-2">
                        ${item.rentPrice}
                        <span className="text-xs font-normal text-[var(--color-muted)]"> / rental</span>
                      </p>
                    </div>
                  </a>
                );
              })}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <nav aria-label="Pagination" className="flex items-center justify-center gap-1.5 mt-10">
              <button
                onClick={() => goToPage(page - 1)}
                disabled={page === 1}
                className="px-3 py-1.5 text-sm rounded-[var(--radius-button)] border border-[var(--color-border)] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[var(--color-sage-light)]/40 transition-colors"
              >
                Prev
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  onClick={() => goToPage(n)}
                  aria-current={n === page ? "page" : undefined}
                  className={`w-9 h-9 text-sm font-medium rounded-[var(--radius-button)] transition-colors ${
                    n === page
                      ? "bg-[var(--color-charcoal)] text-white"
                      : "border border-[var(--color-border)] hover:bg-[var(--color-sage-light)]/40"
                  }`}
                >
                  {n}
                </button>
              ))}
              <button
                onClick={() => goToPage(page + 1)}
                disabled={page === totalPages}
                className="px-3 py-1.5 text-sm rounded-[var(--radius-button)] border border-[var(--color-border)] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[var(--color-sage-light)]/40 transition-colors"
              >
                Next
              </button>
            </nav>
          )}
        </>
      )}
    </div>
  );
}
