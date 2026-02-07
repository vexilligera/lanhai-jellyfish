import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './Contact.css';

function Contact() {
  const { t } = useTranslation();
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
          <p className="section-eyebrow">{t('contact.eyebrow')}</p>
          <h1 className="section-title">{t('contact.title')}</h1>
          <p className="contact-page__subtitle">{t('contact.subtitle')}</p>
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
                <h3>{t('contact.successTitle')}</h3>
                <p>
                  {t('contact.successText')}{' '}
                  <a href="mailto:donggua.lanhai@gmail.com">donggua.lanhai@gmail.com</a>.
                </p>
                <button
                  className="btn btn--outline"
                  onClick={() => setSubmitted(false)}
                >
                  {t('contact.sendAnother')}
                </button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="contact-form__row">
                  <div className="contact-form__field">
                    <label htmlFor="name">{t('contact.fullName')}</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder={t('contact.namePlaceholder')}
                    />
                  </div>
                  <div className="contact-form__field">
                    <label htmlFor="email">{t('contact.email')}</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder={t('contact.emailPlaceholder')}
                    />
                  </div>
                </div>

                <div className="contact-form__row">
                  <div className="contact-form__field">
                    <label htmlFor="company">{t('contact.company')}</label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={form.company}
                      onChange={handleChange}
                      placeholder={t('contact.companyPlaceholder')}
                    />
                  </div>
                  <div className="contact-form__field">
                    <label htmlFor="inquiryType">{t('contact.inquiryType')}</label>
                    <select
                      id="inquiryType"
                      name="inquiryType"
                      value={form.inquiryType}
                      onChange={handleChange}
                    >
                      <option value="price">{t('contact.priceInquiry')}</option>
                      <option value="bulk">{t('contact.bulkSales')}</option>
                      <option value="custom">{t('contact.customOrder')}</option>
                      <option value="other">{t('contact.other')}</option>
                    </select>
                  </div>
                </div>

                <div className="contact-form__row">
                  <div className="contact-form__field">
                    <label htmlFor="species">{t('contact.speciesOfInterest')}</label>
                    <input
                      type="text"
                      id="species"
                      name="species"
                      value={form.species}
                      onChange={handleChange}
                      placeholder={t('contact.speciesPlaceholder')}
                    />
                  </div>
                  <div className="contact-form__field">
                    <label htmlFor="quantity">{t('contact.quantity')}</label>
                    <input
                      type="text"
                      id="quantity"
                      name="quantity"
                      value={form.quantity}
                      onChange={handleChange}
                      placeholder={t('contact.quantityPlaceholder')}
                    />
                  </div>
                </div>

                <div className="contact-form__field contact-form__field--full">
                  <label htmlFor="message">{t('contact.message')}</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    placeholder={t('contact.messagePlaceholder')}
                  />
                </div>

                <button type="submit" className="btn btn--primary btn--lg contact-form__submit">
                  {t('contact.sendInquiry')}
                </button>
              </form>
            )}
          </div>

          {/* Sidebar */}
          <div className="contact-page__sidebar">
            <div className="contact-page__info-card">
              <h3>{t('contact.directEmail')}</h3>
              <a href="mailto:donggua.lanhai@gmail.com" className="contact-page__email-link">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
                donggua.lanhai@gmail.com
              </a>
            </div>

            <div className="contact-page__info-card">
              <h3>{t('contact.tiktok')}</h3>
              <a href="https://www.tiktok.com/@lanhai.marine" target="_blank" rel="noopener noreferrer" className="contact-page__tiktok-link">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.87a8.28 8.28 0 0 0 4.76 1.49V6.89a4.85 4.85 0 0 1-1-.2z"/>
                </svg>
                @lanhai.marine
              </a>
            </div>

            <div className="contact-page__info-card">
              <h3>{t('contact.businessHours')}</h3>
              <p>{t('contact.businessDays')}</p>
              <p>{t('contact.businessTime')}</p>
            </div>

            <div className="contact-page__info-card">
              <h3>{t('contact.whatWeOffer')}</h3>
              <ul>
                <li>{t('contact.offer1')}</li>
                <li>{t('contact.offer2')}</li>
                <li>{t('contact.offer3')}</li>
                <li>{t('contact.offer4')}</li>
                <li>{t('contact.offer5')}</li>
                <li>{t('contact.offer6')}</li>
              </ul>
            </div>

            <div className="contact-page__info-card contact-page__info-card--highlight">
              <h3>{t('contact.bulkOrders')}</h3>
              <p>{t('contact.bulkText')}</p>
            </div>

            <div className="contact-page__info-card">
              <h3>{t('contact.aboutLanhai')}</h3>
              <p>{t('contact.aboutText')}</p>
              <a href="https://lanhai-marine.com/" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginTop: '8px' }}>
                {t('contact.visitLanhai')}
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
