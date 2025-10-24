import React, { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData((d) => ({ ...d, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      alert("Please fill in all fields.");
      return;
    }
    setTimeout(() => setSubmitted(true), 400);
  };

  return (
    <section style={{ maxWidth: 640, margin: "0 auto", padding: "40px 20px", textAlign: "left" }}>
      <h1>Contact Us</h1>

      {!submitted ? (
        <form onSubmit={onSubmit} className="contact-form" noValidate>
          <label htmlFor="name">Name</label>
          <input id="name" name="name" type="text" value={formData.name} onChange={onChange} required />

          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" value={formData.email} onChange={onChange} required />

          <label htmlFor="message">Message</label>
          <textarea id="message" name="message" rows="5" value={formData.message} onChange={onChange} required />

          <button type="submit">Send Message</button>
        </form>
      ) : (
        <div role="status" aria-live="polite" style={{ textAlign: "center", marginTop: 24 }}>
          <h3>✅ Thank you, {formData.name}!</h3>
          <p>We’ve received your message and will get back to you soon.</p>
        </div>
      )}
    </section>
  );
}
