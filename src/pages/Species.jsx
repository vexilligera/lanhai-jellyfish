import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { speciesList } from '../data/species';
import SpeciesCard from '../components/SpeciesCard';
import './Species.css';

function Species() {
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    if (!search.trim()) return speciesList;
    const q = search.toLowerCase();
    return speciesList.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.scientificName.toLowerCase().includes(q) ||
        s.shortDescription.toLowerCase().includes(q)
    );
  }, [search]);

  return (
    <div className="species-page">
      <section className="species-page__hero">
        <div className="container">
          <p className="section-eyebrow">Our Collection</p>
          <h1 className="section-title">Jellyfish Species</h1>
          <p className="species-page__subtitle">
            Browse our growing catalog of captive-bred jellyfish species. We
            currently offer more than 30 species and are continuously
            expanding our collection. Showing {speciesList.length} featured species below
            — <Link to="/contact" className="species-page__link">contact us</Link> for the full list.
          </p>
        </div>
      </section>

      <section className="species-page__content container">
        <div className="species-page__toolbar">
          <div className="species-page__search-wrap">
            <svg className="species-page__search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.3-4.3"/>
            </svg>
            <input
              type="text"
              className="species-page__search"
              placeholder="Search species by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <span className="species-page__count">
            {filtered.length} {filtered.length === 1 ? 'species' : 'species'} found
          </span>
        </div>

        {filtered.length > 0 ? (
          <div className="species-page__grid">
            {filtered.map((species) => (
              <SpeciesCard key={species.id} species={species} />
            ))}
          </div>
        ) : (
          <div className="species-page__empty">
            <p>No species found matching "{search}"</p>
            <button
              className="btn btn--outline btn--sm"
              onClick={() => setSearch('')}
            >
              Clear search
            </button>
          </div>
        )}
      </section>
    </div>
  );
}

export default Species;
