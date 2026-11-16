"use client";

import { useState } from "react";

import ContactModal from "./ContactModal";

export default function ContactSection() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="footer-link-button"
        onClick={() => setOpen(true)}
        type="button"
      >
        Contact
      </button>

      <ContactModal
        onClose={() => setOpen(false)}
        open={open}
      />
    </>
  );
}
