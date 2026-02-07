import { Link } from 'react-router-dom';
import { mediaUrl } from '../utils/asset';
import './SpeciesCard.css';

function SpeciesCard({ species }) {
  return (
    <Link to={`/species/${species.id}`} className="species-card">
      <div className="species-card__image-wrap">
        <img
          src={mediaUrl(species.thumbnail)}
          alt={species.name}
          className="species-card__image"
          loading="lazy"
        />
        <div className="species-card__overlay" />
        <span className="species-card__price">{species.price}</span>
      </div>
      <div className="species-card__content">
        <h3 className="species-card__name">{species.name}</h3>
        <p className="species-card__scientific">{species.scientificName}</p>
        <p className="species-card__desc">{species.shortDescription}</p>
        <span className="species-card__cta">
          Learn more
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </span>
      </div>
    </Link>
  );
}

export default SpeciesCard;
