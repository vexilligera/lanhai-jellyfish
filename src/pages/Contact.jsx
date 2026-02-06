import { useState } from 'react';
import './Contact.css';

function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    inquiryType: 'price',
    species: '',
    quantity: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const subject = encodeURIComponent(
      `${form.inquiryType === 'bulk' ? 'Bulk Order' : 'Price'} Inquiry - ${form.species || 'Jellyfish'}`
    );
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nCompany: ${form.company || 'N/A'}\nInquiry Type: ${form.inquiryType === 'bulk' ? 'Bulk Sales' : 'Price Inquiry'}\nSpecies of Interest: ${form.species || 'N/A'}\nQuantity: ${form.quantity || 'N/A'}\n\nMessage:\n${form.message}`
    );

    window.location.href = `mailto:donggua.lanhai@gmail.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <div className="contact-page">
      <section className="contact-page__hero">
        <div className="container">
          <p className="section-eyebrow">Get in Touch</p>
          <h1 className="section-title">Contact Us</h1>
          <p className="contact-page__subtitle">
            Interested in pricing, bulk orders, or have questions about our
            jellyfish? Fill out the form below and we'll get back to you
            promptly.
          </p>
        </div>
      </section>

      <section className="contact-page__content container">
        <div className="contact-page__grid">
          {/* Form */}
          <div className="contact-page__form-wrap">
            {submitted ? (
              <div className="contact-page__success">
                <div className="contact-page__success-icon">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                </div>
                <h3>Email Client Opened!</h3>
                <p>
                  Your inquiry details have been pre-filled in your email client.
                  Simply review and send the email. If your email client didn't
                  open, you can reach us directly at{' '}
                  <a href="mailto:donggua.lanhai@gmail.com">donggua.lanhai@gmail.com</a>.
                </p>
                <button
                  className="btn btn--outline"
                  onClick={() => setSubmitted(false)}
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="contact-form__row">
                  <div className="contact-form__field">
                    <label htmlFor="name">Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your name"
                    />
                  </div>
                  <div className="contact-form__field">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div className="contact-form__row">
                  <div className="contact-form__field">
                    <label htmlFor="company">Company / Organization</label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={form.company}
                      onChange={handleChange}
                      placeholder="Optional"
                    />
                  </div>
                  <div className="contact-form__field">
                    <label htmlFor="inquiryType">Inquiry Type *</label>
                    <select
                      id="inquiryType"
                      name="inquiryType"
                      value={form.inquiryType}
                      onChange={handleChange}
                    >
                      <option value="price">Price Inquiry</option>
                      <option value="bulk">Bulk Sales</option>
                      <option value="custom">Custom Order</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="contact-form__row">
                  <div className="contact-form__field">
                    <label htmlFor="species">Species of Interest</label>
                    <input
                      type="text"
                      id="species"
                      name="species"
                      value={form.species}
                      onChange={handleChange}
                      placeholder="e.g., Moon Jellyfish, Japanese Sea Nettle"
                    />
                  </div>
                  <div className="contact-form__field">
                    <label htmlFor="quantity">Estimated Quantity</label>
                    <input
                      type="text"
                      id="quantity"
                      name="quantity"
                      value={form.quantity}
                      onChange={handleChange}
                      placeholder="e.g., 10-50 specimens"
                    />
                  </div>
                </div>

                <div className="contact-form__field contact-form__field--full">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us about your needs, timeline, shipping requirements, etc."
                  />
                </div>

                <button type="submit" className="btn btn--primary btn--lg contact-form__submit">
                  Send Inquiry
                </button>
              </form>
            )}
          </div>

          {/* Sidebar */}
          <div className="contact-page__sidebar">
            <div className="contact-page__info-card">
              <h3>Direct Email</h3>
              <a href="mailto:donggua.lanhai@gmail.com" className="contact-page__email-link">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
                donggua.lanhai@gmail.com
              </a>
            </div>

            <div className="contact-page__info-card">
              <h3>TikTok</h3>
              <a href="https://www.tiktok.com/@lanhai.marine" target="_blank" rel="noopener noreferrer" className="contact-page__tiktok-link">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.87a8.28 8.28 0 0 0 4.76 1.49V6.89a4.85 4.85 0 0 1-1-.2z"/>
                </svg>
                @lanhai.marine
              </a>
            </div>

            <div className="contact-page__info-card">
              <h3>Business Hours</h3>
              <p>Monday - Friday</p>
              <p>9:00 AM - 6:00 PM (CST)</p>
            </div>

            <div className="contact-page__info-card">
              <h3>What We Offer</h3>
              <ul>
                <li>Individual specimens</li>
                <li>Bulk orders for aquariums</li>
                <li>Research partnerships</li>
                <li>Event & exhibition supply</li>
                <li>Custom breeding requests</li>
                <li>Global shipping</li>
              </ul>
            </div>

            <div className="contact-page__info-card contact-page__info-card--highlight">
              <h3>Bulk Orders</h3>
              <p>
                Ordering 50+ specimens? Contact us for special bulk pricing and
                dedicated support for your project.
              </p>
            </div>

            <div className="contact-page__info-card">
              <h3>About LanHai</h3>
              <p>
                We are the jellyfish division of LanHai Marine, one of China's most established marine life companies since 1978. All 30+ species are artificially bred in our lab facilities.
              </p>
              <a href="https://lanhai-marine.com/" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginTop: '8px' }}>
                Visit LanHai Marine
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;
