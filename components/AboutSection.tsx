"use client";

import { useState } from "react";

import AboutModal from "./AboutModal";

export default function AboutSection() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="btn btn-link p-0"
        onClick={() => setOpen(true)}
        type="button"
      >
        ABOUT ME
      </button>

      <AboutModal
        onClose={() => setOpen(false)}
        open={open}
      />
    </>
  );
}
