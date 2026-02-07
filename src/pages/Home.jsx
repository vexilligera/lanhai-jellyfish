import { useRef, useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { speciesList } from '../data/species';
import { mediaUrl } from '../utils/asset';
import SpeciesCard from '../components/SpeciesCard';
import './Home.css';

function Home() {
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
          {featuredSpecies.slice(0, 6).map((species) => (
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
