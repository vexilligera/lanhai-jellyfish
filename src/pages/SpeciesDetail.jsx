import { useParams, Link, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { speciesList } from '../data/species';
import { mediaUrl } from '../utils/asset';
import './SpeciesDetail.css';

function SpeciesDetail() {
  const { id } = useParams();
  const { t } = useTranslation();
  const [selectedImage, setSelectedImage] = useState(0);
  const species = speciesList.find((s) => s.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
    setSelectedImage(0);
  }, [id]);

  if (!species) {
    return <Navigate to="/species" replace />;
  }

  const name = t(`species.${species.id}.name`);
  const scientificName = t(`species.${species.id}.scientificName`);
  const description = t(`species.${species.id}.description`);
  const priceLabel = species.price === 'Inquire'
    ? t('detail.priceInquire')
    : t('detail.priceFrom', { price: species.price });

  return (
    <div className="detail">
      <div className="detail__hero">
        <div className="container">
          <Link to="/species" className="detail__back">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            {t('detail.back')}
          </Link>
        </div>
      </div>

      <div className="detail__content container">
        <div className="detail__grid">
          {/* Image Gallery */}
          <div className="detail__gallery">
            <div className="detail__main-image-wrap">
              <img
                src={mediaUrl(species.images[selectedImage])}
                alt={`${name} - Image ${selectedImage + 1}`}
                className="detail__main-image"
              />
            </div>
            {species.images.length > 1 && (
              <div className="detail__thumbnails">
                {species.images.map((img, idx) => (
                  <button
                    key={idx}
                    className={`detail__thumb ${idx === selectedImage ? 'detail__thumb--active' : ''}`}
                    onClick={() => setSelectedImage(idx)}
                  >
                    <img src={mediaUrl(img)} alt={`${name} thumbnail ${idx + 1}`} loading="lazy" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="detail__info">
            <div className="detail__info-header">
              <h1 className="detail__name">{name}</h1>
              <p className="detail__scientific">{scientificName}</p>
              <span className="detail__price">{priceLabel}</span>
            </div>

            <div className="detail__meta">
              <div className="detail__meta-item">
                <span className="detail__meta-label">{t('detail.habitat')}</span>
                <span className="detail__meta-value">{t(`species.${species.id}.habitat`)}</span>
              </div>
              <div className="detail__meta-item">
                <span className="detail__meta-label">{t('detail.size')}</span>
                <span className="detail__meta-value">{t(`species.${species.id}.size`)}</span>
              </div>
              <div className="detail__meta-item">
                <span className="detail__meta-label">{t('detail.diet')}</span>
                <span className="detail__meta-value">{t(`species.${species.id}.diet`)}</span>
              </div>
              <div className="detail__meta-item">
                <span className="detail__meta-label">{t('detail.lifespan')}</span>
                <span className="detail__meta-value">{t(`species.${species.id}.lifespan`)}</span>
              </div>
              <div className="detail__meta-item">
                <span className="detail__meta-label">{t('detail.stingLevel')}</span>
                <span className="detail__meta-value">{t(`species.${species.id}.stingLevel`)}</span>
              </div>
            </div>

            <div className="detail__description">
              {description.split('\n\n').map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>

            <div className="detail__actions">
              <Link to="/contact" className="btn btn--primary">
                {t('detail.inquireButton')}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Other Species */}
      <div className="detail__related container">
        <h2 className="section-title">{t('detail.otherSpecies')}</h2>
        <div className="detail__related-grid">
          {speciesList
            .filter((s) => s.id !== species.id)
            .map((s) => (
              <Link to={`/species/${s.id}`} key={s.id} className="detail__related-card">
                <div className="detail__related-img-wrap">
                  <img src={mediaUrl(s.thumbnail)} alt={t(`species.${s.id}.name`)} loading="lazy" />
                </div>
                <div className="detail__related-text">
                  <h3>{t(`species.${s.id}.name`)}</h3>
                  <p>{t(`species.${s.id}.scientificName`)}</p>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}

export default SpeciesDetail;
