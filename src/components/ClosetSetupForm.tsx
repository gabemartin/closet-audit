import { useState, type FormEvent } from "react";
import { withBase } from "../lib/paths";

const COMMON_RULES = [
  "Return within 2 days of rental date",
  "Venmo before pickup",
  "Try-ons available",
  "Do NOT wash items",
  "$5/day late fee if not returned on time",
  "If damaged, you must pay retail price",
  "If shipped, return within 2 days and send tracking number",
  "Prices negotiable — DM to discuss",
] as const;

const STEPS = ["Name", "Details", "Rules", "Done"] as const;

interface ClosetData {
  name: string;
  handle: string;
  location: string;
  bio: string;
  venmo: string;
  rules: string[];
}

function StepIndicator({ current, steps }: { current: number; steps: readonly string[] }) {
  return (
    <div className="flex items-center justify-center gap-2 mb-10">
      {steps.map((label, i) => {
        const isActive = i === current;
        const isComplete = i < current;
        return (
          <div key={label} className="flex items-center gap-2">
            {i > 0 && (
              <div
                className={`w-8 h-px transition-colors ${
                  isComplete ? "bg-sage" : "bg-border"
                }`}
              />
            )}
            <div className="flex items-center gap-1.5">
              <span
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                  isActive
                    ? "bg-sage text-white"
                    : isComplete
                      ? "bg-sage-light text-sage-dark"
                      : "bg-border text-muted"
                }`}
              >
                {isComplete ? "✓" : i + 1}
              </span>
              <span
                className={`text-xs font-medium hidden sm:inline ${
                  isActive ? "text-charcoal" : "text-muted"
                }`}
              >
                {label}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function ClosetSetupForm() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<ClosetData>({
    name: "",
    handle: "",
    location: "",
    bio: "",
    venmo: "",
    rules: [],
  });
  const [customRule, setCustomRule] = useState("");

  function update(partial: Partial<ClosetData>) {
    setData((prev) => ({ ...prev, ...partial }));
  }

  function toggleRule(rule: string) {
    setData((prev) => ({
      ...prev,
      rules: prev.rules.includes(rule)
        ? prev.rules.filter((r) => r !== rule)
        : [...prev.rules, rule],
    }));
  }

  function addCustomRule() {
    const trimmed = customRule.trim();
    if (trimmed && !data.rules.includes(trimmed)) {
      update({ rules: [...data.rules, trimmed] });
      setCustomRule("");
    }
  }

  function removeRule(rule: string) {
    update({ rules: data.rules.filter((r) => r !== rule) });
  }

  function handleNext(e: FormEvent) {
    e.preventDefault();
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  }

  function handleBack() {
    setStep((s) => Math.max(s - 1, 0));
  }

  function handleNameInput(value: string) {
    const handle = value
      .toLowerCase()
      .replace(/[^a-z0-9\s.-]/g, "")
      .replace(/\s+/g, "")
      .slice(0, 30);
    update({ name: value, handle });
  }

  const inputClass =
    "w-full px-4 py-3 text-sm rounded-button border border-border bg-white focus:outline-none focus:ring-2 focus:ring-sage/30 focus:border-sage transition";

  const primaryBtn =
    "px-8 py-3 text-sm font-semibold text-white bg-sage hover:bg-sage-dark rounded-button transition-colors";

  const secondaryBtn =
    "px-8 py-3 text-sm font-semibold text-charcoal bg-white border border-border hover:border-charcoal/20 rounded-button transition-colors";

  // Step 0: Name
  if (step === 0) {
    return (
      <div>
        <StepIndicator current={0} steps={STEPS} />
        <form onSubmit={handleNext} className="space-y-6">
          <div className="text-center mb-8">
            <h2 className="font-display font-bold text-2xl">
              Name your closet
            </h2>
            <p className="mt-2 text-sm text-muted">
              This is how renters will find you. You can always change it later.
            </p>
          </div>

          <div>
            <label htmlFor="closet-name" className="block text-sm font-medium mb-2">
              Closet name
            </label>
            <input
              id="closet-name"
              type="text"
              required
              maxLength={40}
              value={data.name}
              onChange={(e) => handleNameInput(e.target.value)}
              placeholder='e.g. "Jordan&#39;s Closet" or "Rent My Fits"'
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="handle" className="block text-sm font-medium mb-2">
              Handle
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-muted">
                @
              </span>
              <input
                id="handle"
                type="text"
                required
                maxLength={30}
                value={data.handle}
                onChange={(e) =>
                  update({
                    handle: e.target.value
                      .toLowerCase()
                      .replace(/[^a-z0-9._-]/g, "")
                      .slice(0, 30),
                  })
                }
                placeholder="jordanscloset"
                className={`${inputClass} pl-8`}
              />
            </div>
            <p className="mt-1.5 text-xs text-muted">
              closetaudit.com/@{data.handle || "yourhandle"}
            </p>
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-medium mb-2">
              Location
            </label>
            <input
              id="location"
              type="text"
              required
              value={data.location}
              onChange={(e) => update({ location: e.target.value })}
              placeholder='e.g. "Oxford, MS" or "UGA campus"'
              className={inputClass}
            />
          </div>

          <div className="flex justify-end pt-2">
            <button type="submit" className={primaryBtn}>
              Continue
            </button>
          </div>
        </form>
      </div>
    );
  }

  // Step 1: Details
  if (step === 1) {
    return (
      <div>
        <StepIndicator current={1} steps={STEPS} />
        <form onSubmit={handleNext} className="space-y-6">
          <div className="text-center mb-8">
            <h2 className="font-display font-bold text-2xl">
              Tell renters about your closet
            </h2>
            <p className="mt-2 text-sm text-muted">
              A short bio and payment info so people know what to expect.
            </p>
          </div>

          {/* Preview card */}
          <div className="p-5 rounded-card bg-warm-white border border-border flex items-center gap-4">
            <span className="w-14 h-14 rounded-full bg-sage-light text-sage-dark flex items-center justify-center text-lg font-bold shrink-0">
              {data.name
                .split(/\s+/)
                .map((w) => w[0])
                .join("")
                .slice(0, 2)
                .toUpperCase() || "?"}
            </span>
            <div className="min-w-0">
              <p className="font-semibold text-sm truncate">{data.name || "Your Closet"}</p>
              <p className="text-xs text-muted">@{data.handle || "handle"} · {data.location || "Location"}</p>
            </div>
          </div>

          <div>
            <label htmlFor="bio" className="block text-sm font-medium mb-2">
              Bio
            </label>
            <textarea
              id="bio"
              rows={3}
              required
              maxLength={200}
              value={data.bio}
              onChange={(e) => update({ bio: e.target.value })}
              placeholder='e.g. "Selling + Rentals. Formals, gameday, date parties. Read rules before renting!"'
              className={`${inputClass} resize-none`}
            />
            <p className="mt-1 text-xs text-muted text-right">
              {data.bio.length}/200
            </p>
          </div>

          <div>
            <label htmlFor="venmo" className="block text-sm font-medium mb-2">
              Venmo username{" "}
              <span className="text-muted font-normal">(optional)</span>
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-muted">
                @
              </span>
              <input
                id="venmo"
                type="text"
                value={data.venmo}
                onChange={(e) => update({ venmo: e.target.value.replace(/\s/g, "") })}
                placeholder="yourvenmo"
                className={`${inputClass} pl-8`}
              />
            </div>
            <p className="mt-1.5 text-xs text-muted">
              Renters will see this so they can pay you directly.
            </p>
          </div>

          <div className="flex justify-between pt-2">
            <button type="button" onClick={handleBack} className={secondaryBtn}>
              Back
            </button>
            <button type="submit" className={primaryBtn}>
              Continue
            </button>
          </div>
        </form>
      </div>
    );
  }

  // Step 2: Rules
  if (step === 2) {
    return (
      <div>
        <StepIndicator current={2} steps={STEPS} />
        <form onSubmit={handleNext} className="space-y-6">
          <div className="text-center mb-8">
            <h2 className="font-display font-bold text-2xl">
              Set your rental rules
            </h2>
            <p className="mt-2 text-sm text-muted">
              Pick from common rules or write your own. Renters see these before requesting.
            </p>
          </div>

          <div className="space-y-2">
            {COMMON_RULES.map((rule) => {
              const isSelected = data.rules.includes(rule);
              return (
                <button
                  key={rule}
                  type="button"
                  onClick={() => toggleRule(rule)}
                  className={`w-full text-left px-4 py-3 text-sm rounded-button border transition-colors flex items-center gap-3 ${
                    isSelected
                      ? "border-sage bg-sage-light/30 text-charcoal"
                      : "border-border bg-white text-muted hover:border-sage/50"
                  }`}
                >
                  <span
                    className={`w-5 h-5 rounded shrink-0 flex items-center justify-center text-xs transition-colors ${
                      isSelected
                        ? "bg-sage text-white"
                        : "border border-border"
                    }`}
                  >
                    {isSelected && "✓"}
                  </span>
                  {rule}
                </button>
              );
            })}
          </div>

          {/* Custom rules already added */}
          {data.rules
            .filter((r) => !COMMON_RULES.includes(r as (typeof COMMON_RULES)[number]))
            .map((rule) => (
              <div
                key={rule}
                className="flex items-center gap-2 px-4 py-3 text-sm rounded-button border border-sage bg-sage-light/30"
              >
                <span className="w-5 h-5 rounded bg-sage text-white shrink-0 flex items-center justify-center text-xs">
                  ✓
                </span>
                <span className="flex-1">{rule}</span>
                <button
                  type="button"
                  onClick={() => removeRule(rule)}
                  className="text-muted hover:text-charcoal transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}

          <div>
            <label className="block text-sm font-medium mb-2">Add your own rule</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={customRule}
                onChange={(e) => setCustomRule(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addCustomRule();
                  }
                }}
                placeholder="e.g. No perfume on items please"
                className={`${inputClass} flex-1`}
              />
              <button
                type="button"
                onClick={addCustomRule}
                className="px-4 py-2.5 text-sm font-semibold text-sage-dark bg-sage-light/50 hover:bg-sage-light rounded-button transition-colors shrink-0"
              >
                Add
              </button>
            </div>
          </div>

          <div className="flex justify-between pt-2">
            <button type="button" onClick={handleBack} className={secondaryBtn}>
              Back
            </button>
            <button type="submit" className={primaryBtn}>
              Create Closet
            </button>
          </div>
        </form>
      </div>
    );
  }

  // Step 3: Done
  return (
    <div>
      <StepIndicator current={3} steps={STEPS} />
      <div className="text-center py-8">
        <span className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-sage-light text-4xl mb-6">
          🎉
        </span>
        <h2 className="font-display font-bold text-2xl">
          Your closet is live!
        </h2>
        <p className="mt-3 text-sm text-muted max-w-sm mx-auto">
          <strong>{data.name}</strong> is set up and ready to go. Now add your first item so renters can find you.
        </p>

        {/* Preview card */}
        <div className="mt-8 max-w-sm mx-auto p-6 rounded-card bg-warm-white border border-border text-center">
          <span className="inline-flex w-16 h-16 rounded-full bg-sage-light text-sage-dark items-center justify-center text-xl font-bold mb-3">
            {data.name
              .split(/\s+/)
              .map((w) => w[0])
              .join("")
              .slice(0, 2)
              .toUpperCase()}
          </span>
          <p className="font-semibold">{data.name}</p>
          <p className="text-xs text-muted">@{data.handle}</p>
          <p className="text-xs text-muted mt-1">📍 {data.location}</p>
          <p className="text-sm mt-2 text-muted">{data.bio}</p>
          {data.venmo && (
            <p className="text-xs text-muted mt-1">💰 Venmo: @{data.venmo}</p>
          )}
          {data.rules.length > 0 && (
            <div className="mt-4 pt-4 border-t border-border text-left">
              <p className="text-xs font-semibold mb-2">Rental Rules</p>
              <ul className="space-y-1">
                {data.rules.map((rule) => (
                  <li key={rule} className="text-xs text-muted flex items-start gap-1.5">
                    <span className="text-sage mt-px">–</span>
                    {rule}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
          <a
            href={withBase("/list")}
            className="px-8 py-3 text-sm font-semibold text-white bg-sage hover:bg-sage-dark rounded-button transition-colors"
          >
            List Your First Item
          </a>
          <a
            href={withBase("/browse")}
            className="px-8 py-3 text-sm font-semibold text-charcoal bg-white border border-border hover:border-charcoal/20 rounded-button transition-colors"
          >
            Browse Items
          </a>
        </div>
      </div>
    </div>
  );
}
