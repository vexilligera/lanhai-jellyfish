import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import './Contact.css';

function Contact() {
  const { t, i18n } = useTranslation();
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
      <Helmet>
        <html lang={i18n.language} />
        <title>{t('seo.contactTitle')}</title>
        <meta name="description" content={t('seo.contactDesc')} />
        <meta property="og:title" content={t('seo.contactTitle')} />
        <meta property="og:description" content={t('seo.contactDesc')} />
      </Helmet>
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
              <h3>WhatsApp</h3>
              <a href="https://wa.me/8618666855830" target="_blank" rel="noopener noreferrer" className="contact-page__tiktok-link">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                +86 186 6685 5830
              </a>
            </div>

            <div className="contact-page__info-card">
              <h3>LinkedIn</h3>
              <a href="https://www.linkedin.com/in/ningyuan-zheng-b67b45b0/" target="_blank" rel="noopener noreferrer" className="contact-page__tiktok-link">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                Ningyuan Zheng
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
