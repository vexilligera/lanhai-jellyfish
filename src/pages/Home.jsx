import { useRef, useState, useCallback, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { speciesList } from '../data/species';
import { mediaUrl } from '../utils/asset';
import SpeciesCard from '../components/SpeciesCard';
import './Home.css';

function Home() {
  const featuredSpecies = speciesList.filter((s) => s.featured);
  const heroVideos = useMemo(() => [mediaUrl('hero-1.mp4'), mediaUrl('hero-2.mp4')], []);
  const videoARef = useRef(null);
  const videoBRef = useRef(null);
  const [activeVideo, setActiveVideo] = useState(0);
  const nextIndex = useRef(1);
  const transitionStarted = useRef(false);

  // Initialize: videoA plays hero-1, videoB preloads hero-2
  useEffect(() => {
    if (videoBRef.current) {
      videoBRef.current.src = heroVideos[1];
      videoBRef.current.load();
    }
  }, [heroVideos]);

  // Poll timeupdate to start crossfade 1s before video ends
  const handleTimeUpdate = useCallback((which) => {
    const current = which === 'A' ? videoARef.current : videoBRef.current;
    if (!current || transitionStarted.current) return;
    const remaining = current.duration - current.currentTime;
    if (remaining <= 1.2 && remaining > 0) {
      transitionStarted.current = true;
      const next = which === 'A' ? videoBRef.current : videoARef.current;
      if (next) next.play();
      setActiveVideo((prev) => (prev === 0 ? 1 : 0));
    }
  }, []);

  const handleVideoEnded = useCallback((which) => {
    transitionStarted.current = false;
    // Preload the next clip into the video that just finished
    nextIndex.current = (nextIndex.current + 1) % heroVideos.length;
    const endedVideo = which === 'A' ? videoARef.current : videoBRef.current;
    if (endedVideo) {
      endedVideo.src = heroVideos[nextIndex.current];
      endedVideo.load();
    }
  }, [heroVideos]);

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero__video-wrap">
          <video
            ref={videoARef}
            className={`hero__video ${activeVideo === 0 ? 'hero__video--active' : ''}`}
            autoPlay
            muted
            playsInline
            poster={mediaUrl('DSC_0175.png')}
            src={heroVideos[0]}
            onTimeUpdate={() => handleTimeUpdate('A')}
            onEnded={() => handleVideoEnded('A')}
          />
          <video
            ref={videoBRef}
            className={`hero__video ${activeVideo === 1 ? 'hero__video--active' : ''}`}
            muted
            playsInline
            onTimeUpdate={() => handleTimeUpdate('B')}
            onEnded={() => handleVideoEnded('B')}
          />
          <div className="hero__overlay" />
        </div>

        <div className="hero__content container">
          <p className="hero__eyebrow">Premium Live Jellyfish</p>
          <h1 className="hero__title">
            Discover the
            <br />
            <span className="hero__title-accent">Ethereal Beauty</span>
            <br />
            of Jellyfish
          </h1>
          <p className="hero__subtitle">
            Asia's largest jellyfish supplier — over 30 lab-bred species,
            backed by the expertise of{' '}
            <a href="https://lanhai-marine.com/" target="_blank" rel="noopener noreferrer" className="hero__link">
              LanHai Marine
            </a>.
          </p>
          <div className="hero__actions">
            <Link to="/species" className="btn btn--primary">
              Explore Species
            </Link>
            <Link to="/contact" className="btn btn--outline">
              Get in Touch
            </Link>
          </div>
        </div>

        <div className="hero__scroll-hint">
          <span>Scroll</span>
          <div className="hero__scroll-line" />
        </div>
      </section>

      {/* About Section */}
      <section className="about container">
        <div className="about__grid">
          <div className="about__text">
            <p className="section-eyebrow">About LanHai Jellyfish</p>
            <h2 className="section-title">Asia's Largest Jellyfish Supplier</h2>
            <p className="about__description">
              LanHai Jellyfish is the jellyfish division of{' '}
              <a href="https://lanhai-marine.com/" target="_blank" rel="noopener noreferrer" className="about__link">
                LanHai Marine
              </a>
              , one of China's earliest and most established marine life companies, founded in 1978. With over 46 years of industry experience and a 15,000+ m² breeding facility, we are the largest dedicated jellyfish supplier in Asia.
            </p>
            <p className="about__description">
              All of our jellyfish are artificially bred and raised in our laboratory facilities, ensuring consistent quality, health, and availability year-round. We currently offer more than 30 species — from the iconic Moon Jellyfish to the dramatic Japanese Sea Nettle — serving aquariums, research institutions, exhibitions, and private collectors worldwide. For our full species list,{' '}
              <Link to="/contact" className="about__link">contact us</Link>.
            </p>
            <a href="https://lanhai-marine.com/" target="_blank" rel="noopener noreferrer" className="btn btn--outline btn--sm about__cta">
              Visit LanHai Marine
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/>
              </svg>
            </a>
          </div>
          <div className="about__stats">
            <div className="about__stat">
              <span className="about__stat-number">30+</span>
              <span className="about__stat-label">Lab-Bred Species</span>
            </div>
            <div className="about__stat">
              <span className="about__stat-number">46 yrs</span>
              <span className="about__stat-label">Industry Experience</span>
            </div>
            <div className="about__stat">
              <span className="about__stat-number">15,000 m²</span>
              <span className="about__stat-label">Breeding Facility</span>
            </div>
            <div className="about__stat">
              <span className="about__stat-number">#1</span>
              <span className="about__stat-label">Jellyfish Supplier in Asia</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Species */}
      <section className="featured container">
        <div className="featured__header">
          <div>
            <p className="section-eyebrow">Our Collection</p>
            <h2 className="section-title">Featured Species</h2>
          </div>
          <Link to="/species" className="btn btn--outline btn--sm">
            View All Species
          </Link>
        </div>
        <div className="featured__grid">
          {featuredSpecies.map((species) => (
            <SpeciesCard key={species.id} species={species} />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="cta__inner container">
          <h2 className="cta__title">Interested in Our Jellyfish?</h2>
          <p className="cta__text">
            Whether you're looking for a single specimen or bulk orders for your
            aquarium, we'd love to hear from you. Get in touch for pricing,
            availability, and shipping information.
          </p>
          <Link to="/contact" className="btn btn--primary btn--lg">
            Contact Us for Pricing
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
