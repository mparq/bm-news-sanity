import { useState } from "react";

interface PageLayoutProps {
  children?: React.ReactNode;
}

export function PageLayout({
  children = null,
}: PageLayoutProps) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}

function Header() {
  const [showFloatingMenu, setShowFloatingMenu] = useState(false);
  return (
    <header className="header container">
      <div className="header__top">
        <a className="header__logo" href="/">
          <img
            className="custom-logo"
            srcSet="/assets/bhakti-marga-news-logo-200w.png 1x, /assets/bhakti-marga-news-logo-400w.png 1.5x, /assets/bhakti-marga-news-logo-600w.png 2x"
            src="/assets/bhakti-marga-news-logo-600w.png"
            alt="Bhakti Marga News Logo"
            width="187"
            style={{ aspectRatio: '187 / 72' }}
          />
        </a>

        <a className="live-button live-now" href="/">
          <div className="circle"></div>
          Live
        </a>

        <ul className="header__actions">
          <li><a className="standalone-link" href="/">Newsletter</a></li>
          <li><a className="standalone-link" href="/">Contact</a></li>
          <li><a className="standalone-link" href="/">Language</a></li>
        </ul>
        <div className="floating-menu" id="menuActions">
          <div className="floating-menu__button" onClick={() => setShowFloatingMenu(state => !state)}>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <ul className={`floating-menu__actions ${showFloatingMenu ? 'toggled' : ''}`}>
            <li><a className="standalone-link" href="/">Newsletter</a></li>
            <li><a className="standalone-link" href="/">Contact</a></li>
            <li><a className="standalone-link" href="/">Language</a></li>
          </ul>
        </div>
      </div>
      <nav>
        <ul className="primary-categories categories--mobile" aria-label="Primary categories">
          <li><a href="/" className="button button--primary active-page">BM Worldwide</a></li>
          <li><a href="/" className="button button--outline">Paramahamsa Vishwananda</a></li>
          <li><a href="/" className="button button--outline">Initiatives</a></li>
          <li><a href="/" className="button button--outline">Volunteering</a></li>
          <li><a href="/" className="button button--outline">Community</a></li>
        </ul>
        <ul className="primary-categories categories--desktop" aria-label="Primary categories">
          <li><a href="/" className="active-page">BM Worldwide</a></li>
          <li><a href="/">Paramahamsa Vishwananda</a></li>
          <li><a href="/">Initiatives</a></li>
          <li><a href="/">Volunteering</a></li>
          <li><a href="/">Community</a></li>
        </ul>
      </nav>
    </header>
  )
}

function Footer() {
  return (
    <footer>
      <div className="container grid-auto-fit">
        <img className="footer-logo" src="/assets/bhakti-marga-vertical-golden-logo.png" alt="bhakti marga logo" />
        <div className="footer-widget">
          <h5>Bhakti Marga Websites</h5>
          <ul>
            <li><a href="https://paramahamsavishwananda.com">Paramahamsa Vishwananda</a></li>
            <li><a href="https://justlovefestival.org/">Just Love Festival</a></li>
            <li><a href="https://shreepeethanilaya.org/">The Ashram - Shree Peetha Nilaya</a></li>
          </ul>
        </div>
        <div className="footer-widget">
          <h5>Contact and Follow</h5>
          <ul>
            <li><a href="#">Help Centre</a></li>
            <li><a href="#">Subscribe to Newsletter</a></li>
            <li><a href="#">Media Requests</a></li>
          </ul>
          <ul id="follow">
            <li><a href="#" target="_blank" rel="noopener"><i className="fa-brands fa-instagram"></i></a></li>
            <li><a href="#" target="_blank" rel="noopener"><i className="fa-brands fa-youtube"></i></a></li>
            <li><a href="#" target="_blank" rel="noopener"><i className="fa-brands fa-x-twitter"></i></a></li>
            <li><a href="#" target="_blank" rel="noopener"><i className="fa-brands fa-facebook"></i></a></li>
            <li><a href="#" target="_blank" rel="noopener"><i className="fa-brands fa-flickr"></i></a></li>
          </ul>
        </div>
      </div>
    </footer>

  );
}
