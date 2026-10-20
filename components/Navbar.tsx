"use client";

import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-primary fixed-top">
      <a
        className="navbar-brand scrolling-link"
        href="#title"
        onClick={closeMenu}
      >
        <img
          alt="logo"
          src="/assets/images/logo.png"
        />
      </a>

      <button
        aria-controls="my-navbar"
        aria-expanded={open}
        aria-label="Toggle navigation"
        className="navbar-toggler"
        onClick={() => setOpen(!open)}
        type="button"
      >
        <span className="navbar-toggler-icon" />
      </button>

      <div
        className={`navbar-collapse flex-grow-1 text-right ${open ? "show" : ""
          }`}
        id="my-navbar"
      >
        <ul className="navbar-nav ml-auto flex-nowrap">
          <li className="nav-item">
            <a
              className="scrolling-link nav-link"
              href="#title"
              onClick={closeMenu}
            >
              Top
            </a>
          </li>

          <li className="nav-item">
            <a
              className="scrolling-link nav-link"
              href="#mozart"
              onClick={closeMenu}
            >
              Mozart
            </a>
          </li>

          <li className="nav-item">
            <a
              className="scrolling-link nav-link"
              href="#rules"
              onClick={closeMenu}
            >
              Rules
            </a>
          </li>

          <li className="nav-item">
            <a
              className="scrolling-link nav-link"
              href="#game"
              onClick={closeMenu}
            >
              Game
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
