import React from 'react';

function LookbookFeature() {
  return (
    <section className="lookbook-strip">
      <div className="lookbook-aside">
        <span className="sub-mono">VOLUME 01 // ARCHIVE</span>
        <h2 className="raw-title" style={{ marginTop: '12px' }}>ARTICLES-<br />GENRAGE</h2>
        <p>A meticulous study examining spatial geometry, dropped side proportions, and unrefined cotton structures across organic urban environments.</p>
      </div>
      <div className="lookbook-gallery">
        <div className="gallery-box">
          <img src="https://genrage.com/cdn/shop/articles/hf_20260501_182318_19838559-d4af-4ad2-ac3f-9858cc3b944e.png?v=1780308567&width=1200" alt="Aspect 1" />
        </div>
        <div className="gallery-box">
          <img src="https://genrage.com/cdn/shop/articles/mobile.png?v=1777557662&width=1200" alt="Aspect 2" />
        </div>
        <div className="gallery-box">
          <img src="https://genrage.com/cdn/shop/articles/Artboard_14.png?v=1775126214&width=1200" alt="Aspect 3" />
        </div>
      </div>
    </section>
  );
}

export default LookbookFeature;