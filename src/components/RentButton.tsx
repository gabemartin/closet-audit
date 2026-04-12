import React, { useState, useEffect } from "react";
import { isLoggedIn, onAuthChange } from "../lib/auth";
import AuthModal from "./AuthModal";

interface Props {
  price: number;
  available: boolean;
}

export default function RentButton({ price, available }: Props) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [requested, setRequested] = useState(false);

  useEffect(() => {
    setLoggedIn(isLoggedIn());
    return onAuthChange(() => setLoggedIn(isLoggedIn()));
  }, []);

  if (!available) {
    return (
      <button
        className="w-full py-3.5 text-sm font-semibold text-muted bg-border/60 rounded-button cursor-not-allowed"
        disabled
      >
        Currently Rented
      </button>
    );
  }

  function handleClick() {
    if (!loggedIn) {
      setShowModal(true);
      return;
    }
    setRequested(true);
    setTimeout(() => setRequested(false), 2500);
  }

  return (
    <>
      <button
        onClick={handleClick}
        className={
          requested
            ? "w-full py-3.5 text-sm font-semibold text-white bg-sage-dark rounded-button transition-colors"
            : "w-full py-3.5 text-sm font-semibold text-white bg-sage hover:bg-sage-dark rounded-button transition-colors"
        }
      >
        {requested ? "Request Sent!" : `Request to Rent — $${price}`}
      </button>
      <AuthModal isOpen={showModal} onClose={() => setShowModal(false)} initialMode="signup" />
    </>
  );
}
