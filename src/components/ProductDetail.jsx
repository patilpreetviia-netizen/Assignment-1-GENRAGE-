import { useState } from 'react';

function ProductDetail({ productId, products = [], onBack, onAddToCart, onOpenSizeGuide, onSelectProduct }) {
  const [selectedSize, setSelectedSize] = useState(null);
  const [expandedSection, setExpandedSection] = useState('desc');

  const product = products.find((p) => p.id === productId);
  if (!product) {
    return (
      <div className="pdp-container" style={{ textAlign: 'center', padding: '100px 0' }}>
        <h3 className="raw-title">[ SYSTEM ERROR: PRODUCT NOT FOUND ]</h3>
        <button className="split-btn" style={{ marginTop: '20px' }} onClick={onBack}>
          Return to Archive
        </button>
      </div>
    );
  }

  // Find related products (excluding active product)
  const relatedProducts = products.filter((p) => p.id !== product.id).slice(0, 3);

  const toggleSection = (sectionName) => {
    setExpandedSection(expandedSection === sectionName ? null : sectionName);
  };

  const handleAddToCartClick = () => {
    if (!selectedSize) return;
    onAddToCart(product, selectedSize);
  };

  return (
    <div className="pdp-container">
      {/* Back to archive navigation */}
      <button className="pdp-back-btn" onClick={onBack}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ transform: 'rotate(180deg)', marginRight: '4px' }}>
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
        Back to Archive
      </button>

      {/* Main PDP Content Grid */}
      <div className="pdp-grid">
        <div className="pdp-image-section">
          <div className="pdp-main-frame">
            <img src={product.src} alt={product.name} />
          </div>
        </div>

        <div className="pdp-details-section">
          <div className="pdp-meta">
            <div>
              <span className="sub-mono">// CATEGORY: {product.category}</span>
              <h1 className="pdp-title raw-title">{product.name}</h1>
            </div>
            <div className="pdp-price">{product.price}</div>
          </div>

          {/* Size Selector */}
          <div className="pdp-size-section">
            <div className="pdp-size-header">
              <span className="sub-mono">SELECT ARCHIVE FIT SIZE</span>
              <button className="size-trigger-btn" onClick={onOpenSizeGuide}>
                Size Guide
              </button>
            </div>
            
            <div className="pdp-size-grid">
              {['01 / SMALL', '02 / MEDIUM', '03 / LARGE'].map((size) => (
                <button
                  key={size}
                  className={`size-select-box ${selectedSize === size ? 'active' : ''}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* CTA Add to cart */}
          <button
            className="pdp-cta-btn"
            disabled={!selectedSize}
            onClick={handleAddToCartClick}
          >
            {selectedSize ? 'Add to Utility Cart' : 'Select Sizing Fit'}
          </button>

          {/* Accordion Panels */}
          <div className="pdp-accordions">
            {/* Description Accordion */}
            <div className="accordion-item">
              <button className="accordion-header" onClick={() => toggleSection('desc')}>
                <span>System Description</span>
                <span>{expandedSection === 'desc' ? '—' : '+'}</span>
              </button>
              <div className={`accordion-content ${expandedSection === 'desc' ? 'expanded' : ''}`}>
                <div className="accordion-inner-text">
                  {product.description}
                </div>
              </div>
            </div>

            {/* Specifications Accordion */}
            <div className="accordion-item">
              <button className="accordion-header" onClick={() => toggleSection('specs')}>
                <span>Fabrication & Specifications</span>
                <span>{expandedSection === 'specs' ? '—' : '+'}</span>
              </button>
              <div className={`accordion-content ${expandedSection === 'specs' ? 'expanded' : ''}`}>
                <div className="accordion-inner-text">
                  <ul style={{ listStyleType: 'square', paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {product.details.map((detail, idx) => (
                      <li key={idx}>{detail}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Shipping logistics Accordion */}
            <div className="accordion-item">
              <button className="accordion-header" onClick={() => toggleSection('shipping')}>
                <span>Logistics & Returns Architecture</span>
                <span>{expandedSection === 'shipping' ? '—' : '+'}</span>
              </button>
              <div className={`accordion-content ${expandedSection === 'shipping' ? 'expanded' : ''}`}>
                <div className="accordion-inner-text">
                  All pieces are cataloged and prepared for dispatch within 48 business hours. 
                  <br /><br />
                  Due to the limited nature of Core drops, all sales are final. Size exchanges are processed subject to inventory availability. Shipping calculated securely at payment interface.
                </div>
              </div>
            </div>

            {/* Authenticity Accordion */}
            <div className="accordion-item">
              <button className="accordion-header" onClick={() => toggleSection('auth')}>
                <span>Authenticity Protocol</span>
                <span>{expandedSection === 'auth' ? '—' : '+'}</span>
              </button>
              <div className={`accordion-content ${expandedSection === 'auth' ? 'expanded' : ''}`}>
                <div className="accordion-inner-text">
                  Every garment is integrated with a unique serial encryption signature. 
                  <br /><br />
                  Verifiable via the digital ledger node sequence printed on the garment neck ribbon. Ensures provenance, genuine fabric density verification, and design authenticity.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Acquisitions Grid */}
      <div className="pdp-related-section">
        <h3 className="raw-title" style={{ fontSize: '18px', marginBottom: '30px', letterSpacing: '0.05em' }}>
          Related Acquisitions
        </h3>
        <div className="catalog-grid">
          {relatedProducts.map((item) => (
            <div key={item.id} className="catalog-card" onClick={() => onSelectProduct(item.id)}>
              <div className="catalog-img-frame">
                <img src={item.src} alt={item.name} />
              </div>
              <div className="catalog-info">
                <h4 className="catalog-item-title">{item.name}</h4>
                <span className="catalog-pricing">{item.price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
