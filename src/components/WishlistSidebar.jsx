import ProductImage from './ProductImage';

function WishlistSidebar({ 
  isOpen, 
  onClose, 
  wishlist = [], 
  products = [], 
  onToggleWishlist, 
  onAddToCart,
  onSelectProduct 
}) {
  const wishlistedItems = products.filter(p => wishlist.includes(p.id));

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const handleQuickAdd = (e, product) => {
    e.stopPropagation();
    onAddToCart(product, '02 / MEDIUM');
    onToggleWishlist(product.id); // Remove from wishlist on add to cart (standard ecommerce behavior)
  };

  const handleCardClick = (productId) => {
    onSelectProduct(productId);
    onClose();
  };

  return (
    <div className={`cart-drawer-overlay ${isOpen ? 'active' : ''}`} onClick={onClose}>
      <div className="cart-drawer-surface" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="cart-drawer-header">
          <h3 className="raw-title" style={{ fontSize: '14px', letterSpacing: '0.05em' }}>
            System Saved Archive // Wishlist
          </h3>
          <button className="cart-drawer-close" onClick={onClose} aria-label="Close wishlist">
            ✕
          </button>
        </div>

        {/* Wishlist Listing */}
        <div className="cart-drawer-items">
          {wishlistedItems.length === 0 ? (
            <div className="cart-empty-message sub-mono">
              <span>[ Wishlist register is empty ]</span>
              <button 
                className="split-btn" 
                style={{ marginTop: '20px', alignSelf: 'center' }}
                onClick={onClose}
              >
                Explore Drops
              </button>
            </div>
          ) : (
            wishlistedItems.map((item) => (
              <div 
                key={item.id} 
                className="cart-item-row" 
                style={{ cursor: 'pointer' }}
                onClick={() => handleCardClick(item.id)}
              >
                <div className="cart-item-img" style={{ position: 'relative' }}>
                  <ProductImage src={item.src} alt={item.name} />
                </div>
                
                <div className="cart-item-details">
                  <div className="cart-item-title-row">
                    <span className="cart-item-name" style={{ fontSize: '10px' }}>{item.name}</span>
                    <button 
                      className="cart-item-remove"
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleWishlist(item.id);
                      }}
                      style={{ fontSize: '9px', padding: '2px 6px' }}
                    >
                      [ Remove ]
                    </button>
                  </div>
                  
                  <div className="cart-item-meta">
                    Category: {item.category}
                  </div>
                  
                  <div className="cart-item-bottom" style={{ marginTop: '8px' }}>
                    <span className="cart-item-price" style={{ fontSize: '11px' }}>
                      {formatCurrency(item.rawPrice)}
                    </span>
                    
                    <button 
                      className="split-btn"
                      onClick={(e) => handleQuickAdd(e, item)}
                      style={{ 
                        padding: '6px 12px', 
                        fontSize: '8px', 
                        margin: 0, 
                        borderColor: '#333',
                        background: '#111'
                      }}
                    >
                      Add [M]
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer info message */}
        {wishlistedItems.length > 0 && (
          <div className="cart-drawer-footer" style={{ textAlign: 'center', padding: '16px 0', borderTop: '1px solid #111' }}>
            <span className="sub-mono" style={{ fontSize: '8px', color: '#555' }}>
              SAVED PIECES ARE HELD IN TEMPORARY MEMORY STORAGE NODES.
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default WishlistSidebar;
