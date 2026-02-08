import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { speciesList } from '../data/species';
import SpeciesCard from '../components/SpeciesCard';
import './Species.css';

function Species() {
  const { t } = useTranslation();
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    if (!search.trim()) return speciesList;
    const q = search.toLowerCase();
    return speciesList.filter(
      (s) =>
        t(`species.${s.id}.name`).toLowerCase().includes(q) ||
        t(`species.${s.id}.scientificName`).toLowerCase().includes(q) ||
        t(`species.${s.id}.shortDescription`).toLowerCase().includes(q)
    );
  }, [search, t]);

  return (
    <div className="species-page">
      <Helmet>
        <title>{t('speciesPage.title')} — LanHai Jellyfish</title>
        <meta name="description" content="Browse our catalog of captive-bred jellyfish species. Moon jellyfish, sea nettles, spotted jellyfish and more. Over 30 species available." />
        <meta property="og:title" content="Jellyfish Species — LanHai Jellyfish" />
        <meta property="og:description" content="Browse over 30 captive-bred jellyfish species available for aquariums, research, and exhibitions." />
      </Helmet>
      <section className="species-page__hero">
        <div className="container">
          <p className="section-eyebrow">{t('speciesPage.eyebrow')}</p>
          <h1 className="section-title">{t('speciesPage.title')}</h1>
          <p className="species-page__subtitle">
            {t('speciesPage.subtitle', { count: speciesList.length })}{' '}
            <Link to="/contact" className="species-page__link">{t('speciesPage.contactForFull')}</Link> {t('speciesPage.contactForFullSuffix')}
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
              placeholder={t('speciesPage.searchPlaceholder')}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <span className="species-page__count">
            {t('speciesPage.speciesFound', { count: filtered.length })}
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
            <p>{t('speciesPage.noResults', { search })}</p>
            <button
              className="btn btn--outline btn--sm"
              onClick={() => setSearch('')}
            >
              {t('speciesPage.clearSearch')}
            </button>
          </div>
        )}
      </section>
    </div>
  );
}

export default Species;
