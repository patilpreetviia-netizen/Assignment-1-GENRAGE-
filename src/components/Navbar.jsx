import ThreeDLogo from './ThreeDLogo';

function Navbar({ setView, currentView, cartCount, onCartOpen, onSearchOpen }) {
  const getStyle = (viewName) => ({
    background: 'none',
    border: 'none',
    color: currentView === viewName ? '#ffffff' : '#555555',
    cursor: 'pointer',
    fontSize: '9px',
    fontFamily: 'Syncopate',
    textTransform: 'uppercase',
    letterSpacing: '0.15em',
    transition: 'color 0.25s ease'
  });

  return (
    <div>
      <div className="top-ticker">
        <div className="top-ticker-track">
          ESTABLISHED SYSTEMS. GLOBAL SHIPPING ACTIVE. ARCHIVE CORE DROP ONLINE // RAW TEXTURES ARCHIVE READY. ESTABLISHED SYSTEMS. GLOBAL SHIPPING ACTIVE. ARCHIVE CORE DROP ONLINE // RAW TEXTURES ARCHIVE READY.
        </div>
      </div>
      
      <nav className="luxury-nav">
        <ul className="nav-links-left">
          <li>
            <button onClick={() => setView('home')} style={getStyle('home')}>
              HOME
            </button>
          </li>
          <li>
            <button onClick={() => setView('catalog')} style={getStyle('catalog')}>
              CATALOG
            </button>
          </li>
          <li>
            <button onClick={() => setView('about')} style={getStyle('about')}>
              ABOUT
            </button>
          </li>
        </ul>
        
        <div className="nav-logo-center" onClick={() => setView('home')}>
          <ThreeDLogo />
        </div>
        
        <div className="nav-icons-right">
          <button className="nav-icon-btn" onClick={onSearchOpen} aria-label="Search Catalog">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
          
          <button className="nav-icon-btn" aria-label="User Account" onClick={() => alert('SECURE USER SESSION: ARCHIVE DATABASE DISCONNECTED.')}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </button>
          
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