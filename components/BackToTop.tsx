"use client";

import { useEffect, useState } from "react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 500);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <a
      aria-hidden={!visible}
      aria-label="Go back to top"
      className={`scrolling-link floating-btn ${visible ? "active" : ""}`}
      href="#title"
      id="btn-to-top"
      tabIndex={visible ? 0 : -1}
    >
      <i
        aria-hidden="true"
        className="fa-solid fa-arrow-up"
      />
    </a>
  );
}
