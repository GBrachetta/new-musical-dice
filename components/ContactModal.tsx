"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";

type ContactModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function ContactModal({ onClose, open }: ContactModalProps) {
  const [closing, setClosing] = useState(false);
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setSending(true);
    setMessage("");

    const form = event.currentTarget;

    try {
      await emailjs.sendForm(
        "gmail",
        "dice_game",
        form,
        "user_bXMwDjNNrfAYxbs0D1MYH",
      );

      form.reset();
      setMessage("Your email was successfully sent");

      setTimeout(() => {
        setMessage("");
        handleClose();
      }, 2000);
    } catch (error) {
      alert("Send email failed!\r\n Response:\n " + JSON.stringify(error));
    } finally {
      setSending(false);
    }
  };

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
        id="formModal"
        onMouseDown={(event) => {
          if (event.target === event.currentTarget) {
            handleClose();
          }
        }}
        role="dialog"
        tabIndex={-1}
      >
        <div
          className="modal-dialog"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Contact</h5>

              <button
                aria-label="Close"
                className="close"
                onClick={handleClose}
                type="button"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <div className="row">
              <div className="col-12 container">
                <form
                  id="form-contact"
                  onSubmit={handleSubmit}
                >
                  <h5 className="my-4">
                    Please fill in the form to get in touch.
                  </h5>

                  <fieldset>
                    <div className="row justify-content-between">
                      <div className="col-12 form-group">
                        <label htmlFor="inputName">Name</label>
                        <input
                          className="form-control"
                          id="inputName"
                          name="from_name"
                          placeholder="Enter Name"
                          required
                          type="text"
                        />
                      </div>

                      <div className="col-12">
                        <label htmlFor="inputEmail">Email address</label>
                        <input
                          aria-describedby="emailHelp"
                          className="form-control"
                          id="inputEmail"
                          name="from_email"
                          placeholder="Enter email"
                          required
                          type="email"
                        />
                        <small
                          className="form-text text-muted"
                          id="emailHelp"
                        >
                          I&apos;ll never share your email with anyone else.
                        </small>
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="textArea">Leave your message here</label>
                      <textarea
                        className="form-control"
                        id="textArea"
                        name="info_request"
                        required
                        rows={5}
                      />
                    </div>

                    <div className="row my-5 text-center">
                      <div className="col-12">
                        <button
                          className="btn btn-primary btn-block"
                          disabled={sending}
                          type="submit"
                        >
                          {sending ? "Sending..." : "Submit"}
                        </button>
                      </div>
                    </div>

                    <div
                      className={message ? "message-style" : ""}
                      id="messages"
                    >
                      {message}
                    </div>
                  </fieldset>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`modal-backdrop fade show ${closing ? "modal-backdrop-closing" : ""
          }`}
      />
    </>
  );
}
