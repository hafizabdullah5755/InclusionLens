import React, { useState } from "react";
import "./Contact.css";

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section className="contact-section">
      <h2>Contact Us</h2>

      {!sent ? (
        <form onSubmit={handleSubmit} className="contact-form">
          <input
            name="name"
            placeholder="Name"
            onChange={handleChange}
            value={form.name}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            value={form.email}
            required
          />
          <textarea
            name="message"
            placeholder="Message"
            rows="5"
            onChange={handleChange}
            value={form.message}
            required
          />
          <button type="submit">Send Message</button>
        </form>
      ) : (
        <p className="thank-you">✅ Thank you! We’ll get back to you soon.</p>
      )}
    </section>
  );
}

export default Contact;
