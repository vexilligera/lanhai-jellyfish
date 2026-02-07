import { useRef, useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { speciesList } from '../data/species';
import { mediaUrl } from '../utils/asset';
import SpeciesCard from '../components/SpeciesCard';
import './Home.css';

function Home() {
  const { t } = useTranslation();
  const featuredSpecies = speciesList.filter((s) => s.featured);
  // videoA permanently holds hero-1, videoB permanently holds hero-2
  const videoARef = useRef(null);
  const videoBRef = useRef(null);
  const [activeVideo, setActiveVideo] = useState(0); // 0=A, 1=B

  const seekAndPlay = useCallback((video) => {
    if (!video || !video.duration) return;
    const maxStart = Math.max(0, video.duration - 4);
    video.currentTime = Math.random() * maxStart;
    video.play();
  }, []);

  // Every 3s, swap to the other video at a random position
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveVideo((prev) => {
        const next = prev === 0 ? 1 : 0;
        const nextVideo = next === 0 ? videoARef.current : videoBRef.current;
        const prevVideo = prev === 0 ? videoARef.current : videoBRef.current;

        seekAndPlay(nextVideo);
        setTimeout(() => { if (prevVideo) prevVideo.pause(); }, 1200);

        return next;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [seekAndPlay]);

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero__video-wrap">
          <video
            ref={videoARef}
            className={`hero__video ${activeVideo === 0 ? 'hero__video--active' : ''}`}
            src={mediaUrl('hero-1.mp4')}
            autoPlay
            muted
            playsInline
            poster={mediaUrl('DSC_0175.png')}
          />
          <video
            ref={videoBRef}
            className={`hero__video ${activeVideo === 1 ? 'hero__video--active' : ''}`}
            src={mediaUrl('hero-2.mp4')}
            muted
            playsInline
          />
          <div className="hero__overlay" />
        </div>

        <div className="hero__content container">
          <p className="hero__eyebrow">{t('hero.eyebrow')}</p>
          <h1 className="hero__title">
            {t('hero.title1')}
            <br />
            <span className="hero__title-accent">{t('hero.titleAccent')}</span>
            <br />
            {t('hero.title2')}
          </h1>
          <p className="hero__subtitle">
            {t('hero.subtitle')}{' '}
            <a href="https://lanhai-marine.com/" target="_blank" rel="noopener noreferrer" className="hero__link">
              {t('hero.lanhaiMarine')}
            </a>.
          </p>
          <div className="hero__actions">
            <Link to="/species" className="btn btn--primary">
              {t('hero.exploreSpecies')}
            </Link>
            <Link to="/contact" className="btn btn--outline">
              {t('hero.getInTouch')}
            </Link>
          </div>
        </div>

        <div className="hero__scroll-hint">
          <span>{t('hero.scroll')}</span>
          <div className="hero__scroll-line" />
        </div>
      </section>

      {/* About Section */}
      <section className="about container">
        <div className="about__grid">
          <div className="about__text">
            <p className="section-eyebrow">{t('about.eyebrow')}</p>
            <h2 className="section-title">{t('about.title')}</h2>
            <p className="about__description">
              {t('about.desc1Prefix')}{' '}
              <a href="https://lanhai-marine.com/" target="_blank" rel="noopener noreferrer" className="about__link">
                {t('hero.lanhaiMarine')}
              </a>
              {t('about.desc1')}
            </p>
            <p className="about__description">
              {t('about.desc2')}{' '}
              <Link to="/contact" className="about__link">{t('about.contactUs')}</Link>.
            </p>
            <a href="https://lanhai-marine.com/" target="_blank" rel="noopener noreferrer" className="btn btn--outline btn--sm about__cta">
              {t('about.visitLanhai')}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/>
              </svg>
            </a>
          </div>
          <div className="about__stats">
            <div className="about__stat">
              <span className="about__stat-number">{t('about.stat1Num')}</span>
              <span className="about__stat-label">{t('about.stat1Label')}</span>
            </div>
            <div className="about__stat">
              <span className="about__stat-number">{t('about.stat2Num')}</span>
              <span className="about__stat-label">{t('about.stat2Label')}</span>
            </div>
            <div className="about__stat">
              <span className="about__stat-number">{t('about.stat3Num')}</span>
              <span className="about__stat-label">{t('about.stat3Label')}</span>
            </div>
            <div className="about__stat">
              <span className="about__stat-number">{t('about.stat4Num')}</span>
              <span className="about__stat-label">{t('about.stat4Label')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Species */}
      <section className="featured container">
        <div className="featured__header">
          <div>
            <p className="section-eyebrow">{t('featured.eyebrow')}</p>
            <h2 className="section-title">{t('featured.title')}</h2>
          </div>
          <Link to="/species" className="btn btn--outline btn--sm">
            {t('featured.viewAll')}
          </Link>
        </div>
        <div className="featured__grid">
          {featuredSpecies.slice(0, 6).map((species) => (
            <SpeciesCard key={species.id} species={species} />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="cta__inner container">
          <h2 className="cta__title">{t('cta.title')}</h2>
          <p className="cta__text">{t('cta.text')}</p>
          <Link to="/contact" className="btn btn--primary btn--lg">
            {t('cta.button')}
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
