"use client";

import { type ReactNode, useId, useState } from "react";

type AnimatedDisclosureProps = {
  children: ReactNode;
  id?: string;
  title: string;
};

export default function AnimatedDisclosure({
  children,
  id,
  title,
}: AnimatedDisclosureProps) {
  const [open, setOpen] = useState(false);
  const contentId = useId();

  return (
    <div
      className="history-disclosure"
      id={id}
    >
      <button
        aria-controls={contentId}
        aria-expanded={open}
        className="history-disclosure-toggle"
        onClick={() => setOpen(!open)}
        type="button"
      >
        <span>{title}</span>
        <i
          aria-hidden="true"
          className="fa-solid fa-chevron-down"
        />
      </button>
      <div
        className={`disclosure-content ${open ? "is-open" : ""}`}
        id={contentId}
        inert={!open}
      >
        <div className="disclosure-inner">{children}</div>
      </div>
    </div>
  );
}
