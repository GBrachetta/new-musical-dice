"use client";

import { useState } from "react";

type AboutModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function AboutModal({ onClose, open }: AboutModalProps) {
  const [closing, setClosing] = useState(false);

  if (!open && !closing) {
    return null;
  }

  const handleClose = () => {
    setClosing(true);

    setTimeout(() => {
      setClosing(false);
      onClose();
    }, 500);
  };

  return (
    <>
      <div
        className={`modal fade show d-block ${closing ? "modal-closing" : ""}`}
        id="aboutModal"
        onMouseDown={(event) => {
          if (event.target === event.currentTarget) {
            handleClose();
          }
        }}
        role="dialog"
        tabIndex={-1}
      >
        <div
          className="modal-dialog modal-lg"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">About me</h5>

              <button
                aria-label="Close"
                className="close"
                onClick={handleClose}
                type="button"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <div className="modal-body">
              <h3 className="heading-modal">Guillermo Brachetta</h3>

              <img
                alt="avatar"
                className="img-fluid my-3"
                src="/assets/images/avatar.png"
              />

              <p>
                I&apos;m a passionate musician.
                <br />
                Well, that is true; but it is also true that I am passionate
                about everything I do.
                <br />
                It is music, for sure, and it is coding as well.
                <br />
                Fortunatelly I was able to combine two of my passions and
                obsessions in this app.
              </p>
            </div>

            <div className="modal-footer">
              <button
                className="btn btn-primary"
                onClick={handleClose}
                type="button"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`modal-backdrop fade show ${closing ? "modal-backdrop-closing" : ""}`}
      />
    </>
  );
}
