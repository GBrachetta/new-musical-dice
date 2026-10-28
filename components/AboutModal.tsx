"use client";

import { useEffect, useId, useRef } from "react";
import Image from "next/image";

type AboutModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function AboutModal({ onClose, open }: AboutModalProps) {
  const dialog = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const modal = dialog.current;

    if (!open) {
      modal?.close();

      return;
    }

    const previousOverflow = document.body.style.overflow;

    modal?.showModal();
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
      modal?.close();
    };
  }, [open]);

  return (
    <dialog
      aria-labelledby={titleId}
      className="about-dialog"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      onClose={onClose}
      ref={dialog}
    >
      <div className="about-dialog-content">
        <button
          aria-label="Close About me"
          className="about-dialog-close"
          onClick={onClose}
          type="button"
        >
          <i
            aria-hidden="true"
            className="fa-solid fa-xmark"
          />
        </button>
        <div className="about-portrait">
          <Image
            alt="Guillermo Brachetta"
            height={500}
            sizes="(max-width: 650px) 80vw, 320px"
            src="/assets/images/avatar.png"
            width={500}
          />
          <span>Musician &amp; developer</span>
        </div>
        <div className="about-biography">
          <p className="about-kicker">About me</p>
          <h2 id={titleId}>
            Guillermo{" "}
            <br />
            Brachetta
          </h2>
          <div className="about-divider" />
          <p>
            I&apos;m a passionate musician. Well, that is true; but it is also
            true that I am passionate about everything I do.
          </p>
          <p>
            It is music, for sure, and it is coding as well. Fortunately I was
            able to combine two of my passions and obsessions in this app.
          </p>
          <div className="about-profile-links">
            <a
              href="https://www.gbrachetta.com/"
              rel="noopener noreferrer"
              target="_blank"
            >
              My website
            </a>
            <a
              href="https://github.com/GBrachetta/"
              rel="noopener noreferrer"
              target="_blank"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </dialog>
  );
}
