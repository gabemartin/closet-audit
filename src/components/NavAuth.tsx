import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import { getUser, signOut, onAuthChange, type AuthUser } from "../lib/auth";
import AuthModal from "./AuthModal";
import { withBase } from "../lib/paths";

const useBrowserLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default function NavAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [mounted, setMounted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useBrowserLayoutEffect(() => {
    setUser(getUser());
    setMounted(true);
    return onAuthChange(() => setUser(getUser()));
  }, []);

  useEffect(() => {
    if (!showDropdown) return;
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [showDropdown]);

  if (!mounted) return null;

  if (!user) {
    return (
      <>
        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="px-4 py-2 text-sm font-semibold text-sage-dark hover:text-charcoal transition-colors"
        >
          Log In
        </button>
        <AuthModal isOpen={showModal} onClose={() => setShowModal(false)} />
      </>
    );
  }

  return (
    <>
      {/* Messages */}
      <a
        href={withBase("/messages")}
        className="relative w-9 h-9 rounded-full flex items-center justify-center text-muted hover:text-charcoal hover:bg-sage-light/30 transition-colors"
        aria-label="Messages"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-terracotta text-white text-[9px] font-bold flex items-center justify-center">
          3
        </span>
      </a>

      {/* List Item */}
      <a
        href={withBase("/list")}
        className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-sage hover:bg-sage-dark rounded-button transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
        List Item
      </a>

      {/* Profile */}
      <div ref={dropdownRef} className="relative">
        <button
          type="button"
          onClick={() => setShowDropdown((v) => !v)}
          className="w-9 h-9 rounded-full bg-lavender-light text-lavender flex items-center justify-center text-sm font-bold hover:ring-2 hover:ring-lavender/40 transition"
          aria-label="Profile"
        >
          {user.name.charAt(0).toUpperCase()}
        </button>

        {showDropdown && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-card border border-border shadow-lg py-1 z-50">
            <div className="px-3 py-2 border-b border-border">
              <p className="text-sm font-semibold text-charcoal truncate">{user.name}</p>
              <p className="text-xs text-muted truncate">{user.email}</p>
            </div>
            <button
              type="button"
              onClick={() => {
                signOut();
                setShowDropdown(false);
              }}
              className="w-full text-left px-3 py-2 text-sm text-muted hover:text-charcoal hover:bg-cream transition-colors"
            >
              Sign Out
            </button>
          </div>
        )}
      </div>

      <AuthModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  );
}
