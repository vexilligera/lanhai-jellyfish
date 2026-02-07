import { Link } from 'react-router-dom';
import Logo from './Logo';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner container">
        <div className="footer__top">
          <div className="footer__brand">
            <Link to="/" className="footer__logo" aria-label="Home">
              <Logo size={32} color="var(--color-primary)" />
            </Link>
            <p className="footer__tagline">
              Asia's largest jellyfish supplier. Over 30 lab-bred species, backed by{' '}
              <a href="https://lanhai-marine.com/" target="_blank" rel="noopener noreferrer" className="footer__ext-link">LanHai Marine</a>.
            </p>
          </div>

          <div className="footer__links">
            <div className="footer__col">
              <h4 className="footer__col-title">Explore</h4>
              <Link to="/" className="footer__col-link">Home</Link>
              <Link to="/species" className="footer__col-link">Species</Link>
              <Link to="/contact" className="footer__col-link">Contact</Link>
            </div>
            <div className="footer__col">
              <h4 className="footer__col-title">LanHai Marine</h4>
              <a href="https://lanhai-marine.com/" target="_blank" rel="noopener noreferrer" className="footer__col-link">Main Website</a>
              <a href="mailto:donggua.lanhai@gmail.com" className="footer__col-link footer__col-link--icon">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
                donggua.lanhai@gmail.com
              </a>
              <a href="https://www.tiktok.com/@lanhai.marine" target="_blank" rel="noopener noreferrer" className="footer__col-link footer__col-link--icon">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.87a8.28 8.28 0 0 0 4.76 1.49V6.89a4.85 4.85 0 0 1-1-.2z"/>
                </svg>
                @lanhai.marine
              </a>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <p>&copy; {new Date().getFullYear()} LanHai Jellyfish. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
