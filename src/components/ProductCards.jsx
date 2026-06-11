import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

function ProductCards({ title, limit, products = [], onSelectProduct, onAddToCart }) {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [sortBy, setSortBy] = useState('DEFAULT');

  // Filter products
  const filteredProducts = activeCategory === 'ALL'
    ? products
    : products.filter(p => p.category === activeCategory.toLowerCase());

  // Sort products
  const sortedProducts = [...filteredProducts];
  if (sortBy === 'PRICE_LOW_HIGH') {
    sortedProducts.sort((a, b) => a.rawPrice - b.rawPrice);
  } else if (sortBy === 'PRICE_HIGH_LOW') {
    sortedProducts.sort((a, b) => b.rawPrice - a.rawPrice);
  }

  // Slice for limit
  const displayedProducts = limit ? sortedProducts.slice(0, limit) : sortedProducts;

  const gridRef = useRef(null);

  useEffect(() => {
    if (gridRef.current && displayedProducts.length > 0) {
      const cards = gridRef.current.children;
      gsap.fromTo(
        cards,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 85%',
          }
        }
      );
    }
  }, [displayedProducts]);

  return (
    <div className="catalog-wrapper">
      {/* If limit is not set, we show catalog filter and sort headers */}
      {!limit ? (
        <div className="catalog-header">
          <div className="catalog-filters">
            <div className="filter-group">
              {['ALL', 'TEES', 'HOODIES', 'VESTS', 'PANTS'].map((category) => (
                <button
                  key={category}
                  className={`filter-btn ${activeCategory === category ? 'active' : ''}`}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
            
            <div>
              <select
                className="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                aria-label="Sort products"
              >
                <option value="DEFAULT">// SORT: SYSTEM DEFAULT</option>
                <option value="PRICE_LOW_HIGH">// PRICE: LOW TO HIGH</option>
                <option value="PRICE_HIGH_LOW">// PRICE: HIGH TO LOW</option>
              </select>
            </div>
          </div>
        </div>
      ) : (
        <span className="sub-mono">// {title}</span>
      )}

      <div className="catalog-grid" ref={gridRef} style={{ marginTop: limit ? '24px' : '0' }}>
        {displayedProducts.map((item) => (
          <div key={item.id} className="catalog-card">
            <div className="catalog-img-frame" onClick={() => onSelectProduct(item.id)}>
              <img src={item.src} alt={item.name} loading="lazy" />
              
              <div className="catalog-overlay-actions">
                <button 
                  className="card-action-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectProduct(item.id);
                  }}
                >
                  View Piece
                </button>
                <button 
                  className="card-action-btn secondary"
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddToCart(item, '02 / MEDIUM');
                  }}
                >
                  Quick Add [M]
                </button>
              </div>
            </div>
            <div className="catalog-info" onClick={() => onSelectProduct(item.id)}>
              <h4 className="catalog-item-title">{item.name}</h4>
              <span className="catalog-pricing">{item.price}</span>
            </div>
          </div>
        ))}
      </div>

      {displayedProducts.length === 0 && (
        <div style={{ textAlign: 'center', padding: '80px 0', color: '#444' }} className="sub-mono">
          [ ARCHIVE EMPTY: NO PRODUCTS MATCH SPECIFIED FILTERS ]
        </div>
      )}

      {limit && (
        <div className="ticker-ribbon sub-mono">
          <span>01 / LIMITED AVAILABILITY</span>
          <span>02 / HARDWARE READY</span>
          <span>03 / RAW TEXTURES ONLY</span>
        </div>
      )}
    </div>
  );
}

export default ProductCards;