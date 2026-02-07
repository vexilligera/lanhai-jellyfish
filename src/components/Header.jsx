import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Logo from './Logo';
import LanguageSwitcher from './LanguageSwitcher';
import './Header.css';

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <header className={`header ${scrolled ? 'header--scrolled' : ''} ${menuOpen ? 'header--menu-open' : ''}`}>
      <div className="header__inner container">
        <Link to="/" className="header__logo" aria-label="Home">
          <Logo size={36} color="var(--color-primary-light)" />
        </Link>

        <div className="header__right">
          <LanguageSwitcher />
          <button
            className={`header__burger ${menuOpen ? 'header__burger--open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        <nav className={`header__nav ${menuOpen ? 'header__nav--open' : ''}`}>
          <Link
            to="/"
            className={`header__link ${location.pathname === '/' ? 'header__link--active' : ''}`}
          >
            {t('nav.home')}
          </Link>
          <Link
            to="/species"
            className={`header__link ${location.pathname.startsWith('/species') ? 'header__link--active' : ''}`}
          >
            {t('nav.species')}
          </Link>
          <Link
            to="/contact"
            className={`header__link ${location.pathname === '/contact' ? 'header__link--active' : ''}`}
          >
            {t('nav.contact')}
          </Link>
          <div className="header__nav-lang">
            <LanguageSwitcher />
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
