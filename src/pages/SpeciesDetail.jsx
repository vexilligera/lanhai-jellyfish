import { useParams, Link, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { speciesList } from '../data/species';
import { mediaUrl } from '../utils/asset';
import './SpeciesDetail.css';

function SpeciesDetail() {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const species = speciesList.find((s) => s.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
    setSelectedImage(0);
  }, [id]);

  if (!species) {
    return <Navigate to="/species" replace />;
  }

  return (
    <div className="detail">
      <div className="detail__hero">
        <div className="container">
          <Link to="/species" className="detail__back">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Back to Species
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
                alt={`${species.name} - Image ${selectedImage + 1}`}
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
                    <img src={mediaUrl(img)} alt={`${species.name} thumbnail ${idx + 1}`} loading="lazy" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="detail__info">
            <div className="detail__info-header">
              <h1 className="detail__name">{species.name}</h1>
              <p className="detail__scientific">{species.scientificName}</p>
            </div>

            <div className="detail__meta">
              <div className="detail__meta-item">
                <span className="detail__meta-label">Habitat</span>
                <span className="detail__meta-value">{species.habitat}</span>
              </div>
              <div className="detail__meta-item">
                <span className="detail__meta-label">Size</span>
                <span className="detail__meta-value">{species.size}</span>
              </div>
              <div className="detail__meta-item">
                <span className="detail__meta-label">Diet</span>
                <span className="detail__meta-value">{species.diet}</span>
              </div>
              <div className="detail__meta-item">
                <span className="detail__meta-label">Lifespan</span>
                <span className="detail__meta-value">{species.lifespan}</span>
              </div>
              <div className="detail__meta-item">
                <span className="detail__meta-label">Sting Level</span>
                <span className="detail__meta-value">{species.stingLevel}</span>
              </div>
            </div>

            <div className="detail__description">
              {species.description.split('\n\n').map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>

            <div className="detail__actions">
              <Link to="/contact" className="btn btn--primary">
                Inquire About This Species
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Other Species */}
      <div className="detail__related container">
        <h2 className="section-title">Other Species</h2>
        <div className="detail__related-grid">
          {speciesList
            .filter((s) => s.id !== species.id)
            .slice(0, 3)
            .map((s) => (
              <Link to={`/species/${s.id}`} key={s.id} className="detail__related-card">
                <div className="detail__related-img-wrap">
                  <img src={mediaUrl(s.thumbnail)} alt={s.name} loading="lazy" />
                </div>
                <div className="detail__related-text">
                  <h3>{s.name}</h3>
                  <p>{s.scientificName}</p>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}

export default SpeciesDetail;
