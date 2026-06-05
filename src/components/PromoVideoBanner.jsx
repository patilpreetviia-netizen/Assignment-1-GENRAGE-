import React from 'react';

function PromoVideoBanner() {
  return (
    <section className="media-banner">
      <img src="https://images.mid-day.com/images/images/2025/jan/Generage_d.jpg" alt="Cinematic Overlay" />
      <div className="media-content">
        <div className="play-indicator">▶</div>
        <h3 className="raw-title" style={{ fontSize: '28px' }}>CORE SYSTEM MOTION</h3>
        <span className="sub-mono" style={{ display: 'block', marginTop: '12px', color: '#888888' }}>[ AUDIO FEED ENGAGED — 48KHZ ]</span>
      </div>
    </section>
  );
}

export default PromoVideoBanner;