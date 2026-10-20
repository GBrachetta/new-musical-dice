"use client";

import { useEffect, useState } from "react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <a
      aria-label="Go back to top"
      className={`scrolling-link floating-btn ${visible ? "active" : ""}`}
      href="#title"
      id="btn-to-top"
      title="Go to top"
    >
      <i
        aria-hidden="true"
        className="fas fa-arrow-circle-up fa-3x"
      />
    </a>
  );
}
