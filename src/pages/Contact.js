// src/pages/Contact.js
import React, { useState, useRef } from "react";

export default function Contact() {
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");
  const statusRef = useRef(null);

  const onChange = (e) =>
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!values.name.trim()) e.name = "Name is required.";
    if (!values.email.trim()) e.email = "Email is required.";
    else if (!/^\S+@\S+\.\S+$/.test(values.email)) e.email = "Enter a valid email.";
    if (!values.message.trim()) e.message = "Message is required.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = (evt) => {
    evt.preventDefault();
    setStatus("");
    if (!validate()) {
      setStatus("Please correct the errors and try again.");
      statusRef.current?.focus();
      return;
    }
    // Simulated submit
    setTimeout(() => {
      setStatus("Message sent. Thanks for reaching out!");
      setValues({ name: "", email: "", message: "" });
      statusRef.current?.focus();
    }, 300);
  };

  return (
    <section aria-labelledby="contact-heading" className="page-section">
      <h1 id="contact-heading">Contact Us</h1>

      <p
        className="visually-hidden"
        role="status"
        aria-live="polite"
        aria-atomic="true"
        tabIndex="-1"
        ref={statusRef}
      >
        {status}
      </p>

      <form noValidate onSubmit={onSubmit} aria-describedby="contact-help">
        <p id="contact-help" className="visually-hidden">
          All fields are required. After submit you’ll hear a status message.
        </p>

        <div className="form-row">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            value={values.name}
            onChange={onChange}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-err" : undefined}
            required
          />
          {errors.name && (
            <p id="name-err" className="error" role="alert">
              {errors.name}
            </p>
          )}
        </div>

        <div className="form-row">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={values.email}
            onChange={onChange}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-err" : undefined}
            required
          />
          {errors.email && (
            <p id="email-err" className="error" role="alert">
              {errors.email}
            </p>
          )}
        </div>

        <div className="form-row">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            rows="5"
            value={values.message}
            onChange={onChange}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "message-err" : undefined}
            required
          />
          {errors.message && (
            <p id="message-err" className="error" role="alert">
              {errors.message}
            </p>
          )}
        </div>

        <button type="submit">Send</button>
      </form>
    </section>
  );
}
