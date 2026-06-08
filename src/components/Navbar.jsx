import { useNavigate, useLocation } from 'react-router-dom';
import ThreeDLogo from './ThreeDLogo';

function Navbar({ cartCount, wishlistCount, onCartOpen, onWishlistOpen, onSearchOpen }) {
  const navigate = useNavigate();
  const location = useLocation();

  const getStyle = (path) => ({
    background: 'none',
    border: 'none',
    color: location.pathname === path ? '#ffffff' : '#555555',
    cursor: 'pointer',
    fontSize: '9px',
    fontFamily: 'Syncopate',
    textTransform: 'uppercase',
    letterSpacing: '0.15em',
    transition: 'color 0.25s ease',
    padding: '4px 0',
    position: 'relative',
  });

  return (
    <div>
      <div className="top-ticker">
        <div className="top-ticker-track">
          ESTABLISHED SYSTEMS · GLOBAL SHIPPING ACTIVE · FREE SHIPPING ABOVE ₹2000 · ARCHIVE CORE DROP ONLINE // RAW TEXTURES READY · USE CODE CORE10 FOR 10% OFF · ESTABLISHED SYSTEMS · GLOBAL SHIPPING ACTIVE · FREE SHIPPING ABOVE ₹2000 · ARCHIVE CORE DROP ONLINE // RAW TEXTURES READY · USE CODE CORE10 FOR 10% OFF ·&nbsp;
        </div>
      </div>

      <nav className="luxury-nav">
        <ul className="nav-links-left">
          <li>
            <button onClick={() => navigate('/')} style={getStyle('/')}>
              HOME
              {location.pathname === '/' && <span className="nav-active-line" />}
            </button>
          </li>
          <li>
            <button onClick={() => navigate('/catalog')} style={getStyle('/catalog')}>
              CATALOG
              {location.pathname === '/catalog' && <span className="nav-active-line" />}
            </button>
          </li>
          <li>
            <button onClick={() => navigate('/about')} style={getStyle('/about')}>
              ABOUT
              {location.pathname === '/about' && <span className="nav-active-line" />}
            </button>
          </li>
        </ul>

        <div className="nav-logo-center" onClick={() => navigate('/')}>
          <ThreeDLogo />
        </div>

        <div className="nav-icons-right">
          {/* Search */}
          <button className="nav-icon-btn" onClick={onSearchOpen} aria-label="Search Catalog">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>

          {/* Wishlist */}
          <button className="nav-icon-btn" aria-label="Wishlist" onClick={onWishlistOpen} style={{ position: 'relative' }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill={wishlistCount > 0 ? '#ffffff' : 'none'} stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
            {wishlistCount > 0 && <span className="nav-cart-badge">{wishlistCount}</span>}
          </button>

          {/* Account */}
          <button className="nav-icon-btn" aria-label="User Account" onClick={() => alert('SECURE USER SESSION: ARCHIVE DATABASE DISCONNECTED.')}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </button>

          {/* Cart */}
          <button className="nav-icon-btn" onClick={onCartOpen} aria-label="Open Utility Cart">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
            {cartCount > 0 && <span className="nav-cart-badge">{cartCount}</span>}
          </button>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;