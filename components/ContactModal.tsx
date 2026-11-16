"use client";

import { useEffect, useId, useRef, useState } from "react";

import Icon from "@/components/Icon";

type ContactModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function ContactModal({ onClose, open }: ContactModalProps) {
  const dialog = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const fieldId = useId();
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (sending) return;

    const form = event.currentTarget;

    setSending(true);
    setStatus("idle");

    try {
      const { sendForm } = await import("@emailjs/browser");

      await sendForm("gmail", "dice_game", form, "user_bXMwDjNNrfAYxbs0D1MYH");
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    } finally {
      setSending(false);
    }
  };

  return (
    <dialog
      aria-labelledby={titleId}
      className="about-dialog contact-dialog"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      onClose={onClose}
      ref={dialog}
    >
      <div className="contact-dialog-content">
        <button
          aria-label="Close contact form"
          className="about-dialog-close"
          onClick={onClose}
          type="button"
        >
          <Icon name="xmark" />
        </button>
        <div className="contact-introduction">
          <p className="contact-kicker">Guillermo Brachetta</p>
          <h2 id={titleId}>Get in touch</h2>
          <div className="about-divider" />
          <p>
            Have a question about the music or the game? I&apos;d be happy to
            hear from you.
          </p>
          <div className="contact-direct">
            <span>Prefer email?</span>
            <a href="mailto:brachetta@me.com">brachetta@me.com</a>
          </div>
        </div>
        <form
          aria-busy={sending}
          className="contact-form"
          onSubmit={handleSubmit}
        >
          <fieldset>
            <div className="contact-field">
              <label htmlFor={`${fieldId}-name`}>Your name</label>
              <input
                autoComplete="name"
                id={`${fieldId}-name`}
                name="from_name"
                placeholder="Name"
                readOnly={sending}
                required
                type="text"
              />
            </div>
            <div className="contact-field">
              <label htmlFor={`${fieldId}-email`}>Email address</label>
              <input
                autoComplete="email"
                id={`${fieldId}-email`}
                name="from_email"
                placeholder="you@example.com"
                readOnly={sending}
                required
                type="email"
              />
            </div>
            <div className="contact-field">
              <label htmlFor={`${fieldId}-message`}>Your message</label>
              <textarea
                id={`${fieldId}-message`}
                name="info_request"
                placeholder="What would you like to ask or share?"
                readOnly={sending}
                required
                rows={4}
              />
            </div>
            <button
              className="workbench-button workbench-primary contact-submit"
              disabled={sending}
              type="submit"
            >
              <Icon name={sending ? "spinner" : "paper-plane"} />
              {sending ? "Sending…" : "Send message"}
            </button>
          </fieldset>
          <div
            aria-live="polite"
            className={`contact-feedback ${status}`}
          >
            {status === "success" && (
              <p>Thank you. Your message has been sent.</p>
            )}
            {status === "error" && (
              <p>
                Your message could not be sent. Please try again or email me
                directly.
              </p>
            )}
          </div>
        </form>
      </div>
    </dialog>
  );
}
