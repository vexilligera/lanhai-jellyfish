import { useRef, useState, useCallback, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { speciesList } from '../data/species';
import { mediaUrl } from '../utils/asset';
import SpeciesCard from '../components/SpeciesCard';
import './Home.css';

function Home() {
  const { t } = useTranslation();
  const featuredSpecies = speciesList.filter((s) => s.featured);
  const heroSources = useMemo(() => [
    mediaUrl('hero-1.mp4'),
    mediaUrl('hero-2.mp4'),
    mediaUrl('hero-3.mp4'),
    mediaUrl('hero-4.mp4'),
  ], []);
  const videoARef = useRef(null);
  const videoBRef = useRef(null);
  const [activeVideo, setActiveVideo] = useState(0); // 0=A, 1=B
  const lastSrc = useRef(null);

  // Pick a random source different from last
  const pickSrc = useCallback(() => {
    const choices = heroSources.filter((s) => s !== lastSrc.current);
    const src = choices[Math.floor(Math.random() * choices.length)];
    lastSrc.current = src;
    return src;
  }, [heroSources]);

  // Preload a video: set src, load, seek to random position, then pause (ready to play instantly)
  const preload = useCallback((video, src) => {
    if (!video) return;
    video.src = src;
    video.load();
    const onReady = () => {
      const maxStart = Math.max(0, video.duration - 6);
      video.currentTime = Math.random() * maxStart;
    };
    video.addEventListener('canplay', onReady, { once: true });
  }, []);

  // Initialize: load & play A, preload B
  useEffect(() => {
    const vA = videoARef.current;
    const vB = videoBRef.current;
    const srcA = pickSrc();
    if (vA) {
      vA.src = srcA;
      vA.load();
      const onReady = () => {
        const maxStart = Math.max(0, vA.duration - 6);
        vA.currentTime = Math.random() * maxStart;
        vA.play();
      };
      vA.addEventListener('canplay', onReady, { once: true });
    }
    // Preload B so it's ready for the first transition
    preload(vB, pickSrc());
  }, [pickSrc, preload]);

  // Every 5s, crossfade to the preloaded video, then preload the next one
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveVideo((prev) => {
        const next = prev === 0 ? 1 : 0;
        const nextVideo = next === 0 ? videoARef.current : videoBRef.current;
        const prevVideo = prev === 0 ? videoARef.current : videoBRef.current;

        // Play the already-preloaded video instantly
        if (nextVideo) nextVideo.play();

        // After fade completes, pause the old one and preload next clip into it
        setTimeout(() => {
          if (prevVideo) {
            prevVideo.pause();
            preload(prevVideo, pickSrc());
          }
        }, 1200);

        return next;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [pickSrc, preload]);

  return (
    <div className="home">
      <Helmet>
        <title>LanHai Jellyfish — {t('about.title')}</title>
        <meta name="description" content="LanHai Jellyfish - Asia's largest jellyfish supplier. Over 30 lab-bred species for aquariums, research, and exhibitions. Backed by LanHai Marine since 1978." />
        <meta property="og:title" content="LanHai Jellyfish — Premium Live Jellyfish" />
        <meta property="og:description" content="Asia's largest jellyfish supplier. Over 30 lab-bred species for aquariums, research, and exhibitions." />
        <meta property="og:type" content="website" />
      </Helmet>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero__video-wrap">
          <video
            ref={videoARef}
            className={`hero__video ${activeVideo === 0 ? 'hero__video--active' : ''}`}
            muted
            playsInline
            poster={mediaUrl('DSC_0175.png')}
          />
          <video
            ref={videoBRef}
            className={`hero__video ${activeVideo === 1 ? 'hero__video--active' : ''}`}
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
