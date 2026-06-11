import { useNavigate } from 'react-router-dom';

function CartSidebar({ isOpen, onClose, cart = [], onRemove, onUpdateQty, onClearCart }) {
  const navigate = useNavigate();

  const subtotal = cart.reduce((sum, item) => sum + (item.rawPrice * item.quantity), 0);

  const formatCurrency = (val) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);

  const handleProceedToCheckout = () => {
    onClose();
    navigate('/checkout');
  };

  return (
    <div className={`cart-drawer-overlay ${isOpen ? 'active' : ''}`} onClick={onClose}>
      <div className="cart-drawer-surface" onClick={(e) => e.stopPropagation()}>

        {/* ── HEADER ─────────────────────────────────────────────────── */}
        <div className="cart-drawer-header">
          <h3 className="raw-title" style={{ fontSize: '14px', letterSpacing: '0.05em' }}>
            System Utility Cart
          </h3>
          <button className="cart-drawer-close" onClick={onClose} aria-label="Close cart">
            ✕
          </button>
        </div>

        {/* ── CART ITEMS ──────────────────────────────────────────────── */}
        <div className="cart-drawer-items">
          {cart.length === 0 ? (
            <div className="cart-empty-message sub-mono">
              <span>[ Archive utility cart is empty ]</span>
              <button
                className="split-btn"
                style={{ marginTop: '20px', alignSelf: 'center' }}
                onClick={onClose}
              >
                Go Shop Drops
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.cartId} className="cart-item-row">
                <div className="cart-item-img">
                  <img src={item.src} alt={item.name} />
                </div>

                <div className="cart-item-details">
                  <div className="cart-item-title-row">
                    <span className="cart-item-name">{item.name}</span>
                    <button
                      className="cart-item-remove"
                      onClick={() => onRemove(item.cartId)}
                    >
                      [ Remove ]
                    </button>
                  </div>

                  <div className="cart-item-meta">Size: {item.size}</div>

                  <div className="cart-item-bottom">
                    <div className="cart-item-qty">
                      <button className="qty-btn" onClick={() => onUpdateQty(item.cartId, -1)}>-</button>
                      <span className="qty-val">{item.quantity}</span>
                      <button className="qty-btn" onClick={() => onUpdateQty(item.cartId, 1)}>+</button>
                    </div>
                    <span className="cart-item-price">
                      {formatCurrency(item.rawPrice * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* ── FOOTER ──────────────────────────────────────────────────── */}
        {cart.length > 0 && (
          <div className="cart-drawer-footer">
            <div className="cart-subtotal-row">
              <span>SUBTOTAL ARCHIVE VALUE:</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <div className="cart-upi-badge">
              🔒 Pay via UPI · GPay · PhonePe · Paytm
            </div>
            <button
              id="cart-checkout-proceed-btn"
              className="cart-checkout-btn"
              onClick={handleProceedToCheckout}
            >
              Proceed to Secure Checkout →
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

export default CartSidebar;
