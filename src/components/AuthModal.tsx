import React, { useState, useEffect, useRef } from "react";
import { signIn, signUp } from "../lib/auth";

type Mode = "signin" | "signup";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: Mode;
}

export default function AuthModal({ isOpen, onClose, initialMode = "signin" }: Props) {
  const [mode, setMode] = useState<Mode>(initialMode);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [isOpen]);

  useEffect(() => {
    setError("");
  }, [mode]);

  function reset() {
    setName("");
    setEmail("");
    setPassword("");
    setError("");
  }

  function handleClose() {
    reset();
    onClose();
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    try {
      if (mode === "signup") {
        if (!name.trim() || !email.trim() || !password.trim()) {
          setError("All fields are required.");
          return;
        }
        signUp(name.trim(), email.trim(), password);
      } else {
        if (!email.trim() || !password.trim()) {
          setError("Email and password are required.");
          return;
        }
        signIn(email.trim(), password);
      }
      reset();
      onClose();
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    }
  }

  if (!isOpen) return null;

  return (
    <dialog
      ref={dialogRef}
      className="backdrop:bg-charcoal/40 backdrop:backdrop-blur-sm bg-transparent p-0 m-auto max-w-md w-[calc(100%-2rem)] rounded-card overflow-visible"
      onClose={handleClose}
      onClick={(e) => {
        if (e.target === dialogRef.current) handleClose();
      }}
    >
      <div className="bg-cream rounded-card shadow-xl p-6 sm:p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display font-bold text-xl text-charcoal">
            {mode === "signin" ? "Welcome back" : "Create an account"}
          </h2>
          <button
            type="button"
            onClick={handleClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-muted hover:text-charcoal hover:bg-border/50 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "signup" && (
            <div>
              <label className="block text-xs font-medium text-muted mb-1.5">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-button border border-border bg-warm-white text-charcoal text-sm focus:outline-none focus:ring-2 focus:ring-sage/40 focus:border-sage transition"
                placeholder="Your first name"
                autoFocus
              />
            </div>
          )}
          <div>
            <label className="block text-xs font-medium text-muted mb-1.5">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-button border border-border bg-warm-white text-charcoal text-sm focus:outline-none focus:ring-2 focus:ring-sage/40 focus:border-sage transition"
              placeholder="you@example.com"
              autoFocus={mode === "signin"}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-muted mb-1.5">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-button border border-border bg-warm-white text-charcoal text-sm focus:outline-none focus:ring-2 focus:ring-sage/40 focus:border-sage transition"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="text-xs text-red-600 bg-red-50 px-3 py-2 rounded-button">{error}</p>
          )}

          <button
            type="submit"
            className="w-full py-3 text-sm font-semibold text-white bg-sage hover:bg-sage-dark rounded-button transition-colors"
          >
            {mode === "signin" ? "Sign In" : "Sign Up"}
          </button>
        </form>

        <p className="mt-5 text-center text-xs text-muted">
          {mode === "signin" ? (
            <>
              Don&apos;t have an account?{" "}
              <button
                type="button"
                onClick={() => setMode("signup")}
                className="text-sage-dark font-semibold hover:underline"
              >
                Sign up
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => setMode("signin")}
                className="text-sage-dark font-semibold hover:underline"
              >
                Sign in
              </button>
            </>
          )}
        </p>
      </div>
    </dialog>
  );
}
