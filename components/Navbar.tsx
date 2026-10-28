"use client";

import { useEffect, useState } from "react";

const links = [
  { id: "game", label: "The game" },
  { id: "rules", label: "How it works" },
];

export default function Navbar() {
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const sections = links.map(({ id }) => document.querySelector(`#${id}`));

    let frame = 0;

    const update = () => {
      frame = 0;
      const threshold =
        (document.querySelector(".site-header")?.getBoundingClientRect()
          .bottom ?? 80) + 24;

      let current = "";

      for (const section of sections) {
        if (section && section.getBoundingClientRect().top <= threshold)
          current = section.id;
      }

      setActive(current);
      setScrolled(window.scrollY > 12);
    };
    const schedule = () => {
      if (!frame) frame = globalThis.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      globalThis.cancelAnimationFrame(frame);
    };
  }, []);

  const activeIndex = links.findIndex(({ id }) => id === active);

  return (
    <header
      className="site-header"
      data-scrolled={scrolled}
    >
      <nav
        aria-label="Main navigation"
        className="site-nav container"
      >
        <a
          aria-label="Musical Dice, back to top"
          className="site-brand"
          href="#title"
        >
          <span
            aria-hidden="true"
            className="brand-mark"
          >
            <i className="fa-solid fa-dice" />
          </span>
          Musical Dice
        </a>
        <div className="site-nav-links">
          <span
            aria-hidden="true"
            className="nav-indicator"
            style={{
              opacity: activeIndex === -1 ? 0 : 1,
              transform: `translateX(${Math.max(0, activeIndex) * 100}%)`,
            }}
          />
          {links.map(({ id, label }) => (
            <a
              aria-current={active === id ? "location" : undefined}
              className={active === id ? "nav-current" : undefined}
              href={`#${id}`}
              key={id}
            >
              {label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}
