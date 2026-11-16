"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

import Icon from "@/components/Icon";

const imageSource = "/assets/images/mozart-game.jpg";
const imageDescription =
  "Historical rules and numbered tables for the musical dice game";

export default function HistoricalImage() {
  const [open, setOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const modal = dialog.current;

    if (!modal) return;

    if (!open) {
      if (modal.open) modal.close();

      return;
    }

    const previousOverflow = document.body.style.overflow;

    if (!modal.open) modal.showModal();
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
      if (modal.open) modal.close();
    };
  }, [open]);

  const openImage = () => {
    setHasOpened(true);
    setOpen(true);
  };

  return (
    <>
      <figure className="historical-figure">
        <button
          aria-haspopup="dialog"
          className="historical-image-link"
          onClick={openImage}
          type="button"
        >
          <Image
            alt={imageDescription}
            fetchPriority="low"
            height={865}
            loading="eager"
            sizes="(max-width: 800px) 100vw, 50vw"
            src={imageSource}
            width={1120}
          />
        </button>
        <figcaption>
          <span>Rules and tables from the historical musical dice game.</span>
          <button
            aria-haspopup="dialog"
            className="image-enlarge-control"
            onClick={openImage}
            type="button"
          >
            View full-size image
          </button>
        </figcaption>
      </figure>
      <dialog
        aria-label="Historical musical dice game rules and tables"
        className="historical-image-modal"
        onClick={(event) => {
          if (event.target === event.currentTarget) setOpen(false);
        }}
        onClose={() => setOpen(false)}
        ref={dialog}
      >
        <div className="historical-modal-content">
          <div className="historical-modal-toolbar">
            <span>Musical dice game · Rules and tables</span>
            <button
              aria-label="Close image"
              className="image-modal-close"
              onClick={() => setOpen(false)}
              type="button"
            >
              <Icon name="xmark" />
            </button>
          </div>
          {hasOpened && (
            <Image
              alt={imageDescription}
              height={865}
              loading="eager"
              sizes="100vw"
              src={imageSource}
              unoptimized
              width={1120}
            />
          )}
        </div>
      </dialog>
    </>
  );
}
