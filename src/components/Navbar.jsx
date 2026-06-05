import React from 'react';

function Navbar({ setView, currentView }) {
  const getStyle = (viewName) => ({
    background: 'none',
    border: 'none',
    color: currentView === viewName ? '#444444' : '#ffffff',
    cursor: 'pointer',
    fontSize: '10px',
    fontFamily: 'Syncopate',
    textTransform: 'uppercase',
    letterSpacing: '0.1em'
  });

  return (
    <div>
      <div className="top-ticker">ESTABLISHED SYSTEMS. GLOBAL SHIPPING ACTIVE. TERMINAL IS OPEN.</div>
      <nav className="luxury-nav">
        <ul className="nav-links-left">
          <li><button onClick={() => setView('home')} style={getStyle('home')}>HOME</button></li>
          <li><button onClick={() => setView('catalog')} style={getStyle('catalog')}>CATALOG</button></li>
          <li><button onClick={() => setView('about')} style={getStyle('about')}>ABOUT</button></li>
        </ul>
        <div className="nav-logo-center raw-title" onClick={() => setView('home')}>GENRAGE</div>
        <div className="nav-icons-right">
          <span style={{ cursor: 'pointer' }}>🔍</span>
          <span style={{ cursor: 'pointer' }}>👤</span>
          <span onClick={() => setView('catalog')} style={{ cursor: 'pointer' }}>👜</span>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;