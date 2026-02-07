import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { mediaUrl } from '../utils/asset';
import './SpeciesCard.css';

function SpeciesCard({ species }) {
  const { t } = useTranslation();
  const name = t(`species.${species.id}.name`);
  const scientificName = t(`species.${species.id}.scientificName`);
  const shortDescription = t(`species.${species.id}.shortDescription`);

  return (
    <Link to={`/species/${species.id}`} className="species-card">
      <div className="species-card__image-wrap">
        <img
          src={mediaUrl(species.thumbnail)}
          alt={name}
          className="species-card__image"
          loading="lazy"
        />
        <div className="species-card__overlay" />
        <span className="species-card__price">{species.price}</span>
      </div>
      <div className="species-card__content">
        <h3 className="species-card__name">{name}</h3>
        <p className="species-card__scientific">{scientificName}</p>
        <p className="species-card__desc">{shortDescription}</p>
        <span className="species-card__cta">
          {t('card.learnMore')}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </span>
      </div>
    </Link>
  );
}

export default SpeciesCard;
