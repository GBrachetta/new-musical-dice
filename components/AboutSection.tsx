"use client";

import { useState } from "react";

import AboutModal from "./AboutModal";

export default function AboutSection() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="footer-link-button"
        onClick={() => setOpen(true)}
        type="button"
      >
        About me
      </button>

      <AboutModal
        onClose={() => setOpen(false)}
        open={open}
      />
    </>
  );
}
