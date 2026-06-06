import { useState } from 'react';

function CartSidebar({ isOpen, onClose, cart = [], onRemove, onUpdateQty, onClearCart, triggerToast }) {
  const [checkoutActive, setCheckoutActive] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState('form'); // 'form' | 'processing' | 'success'
  const [orderNumber, setOrderNumber] = useState('');

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zip: '',
    cardNum: '',
    cardExpiry: '',
    cardCvv: ''
  });

  const subtotal = cart.reduce((sum, item) => sum + (item.rawPrice * item.quantity), 0);

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    
    // Simple validation check
    if (!formData.name || !formData.email || !formData.address || !formData.cardNum) {
      alert('Please fill in all secure authentication credentials.');
      return;
    }

    setCheckoutStep('processing');
    
    // Simulate payment transaction authorization delay
    setTimeout(() => {
      const generatedOrder = `GR-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderNumber(generatedOrder);
      setCheckoutStep('success');
      onClearCart();
      triggerToast('SYSTEM // TRANSACTION AUTHORIZED');
    }, 1800);
  };

  const resetCheckoutState = () => {
    setCheckoutActive(false);
    setCheckoutStep('form');
    setFormData({
      name: '',
      email: '',
      address: '',
      city: '',
      zip: '',
      cardNum: '',
      cardExpiry: '',
      cardCvv: ''
    });
  };

  return (
    <div className={`cart-drawer-overlay ${isOpen ? 'active' : ''}`} onClick={onClose}>
      <div className="cart-drawer-surface" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="cart-drawer-header">
          <h3 className="raw-title" style={{ fontSize: '14px', letterSpacing: '0.05em' }}>
            System Utility Cart
          </h3>
          <button className="cart-drawer-close" onClick={onClose} aria-label="Close cart">
            ✕
          </button>
        </div>

        {/* Cart Listing */}
        <div className="cart-drawer-items">
          {cart.length === 0 && !checkoutActive ? (
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
                  
                  <div className="cart-item-meta">
                    Size: {item.size}
                  </div>
                  
                  <div className="cart-item-bottom">
                    <div className="cart-item-qty">
                      <button 
                        className="qty-btn"
                        onClick={() => onUpdateQty(item.cartId, -1)}
                      >
                        -
                      </button>
                      <span className="qty-val">{item.quantity}</span>
                      <button 
                        className="qty-btn"
                        onClick={() => onUpdateQty(item.cartId, 1)}
                      >
                        +
                      </button>
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

        {/* Footer (If items in cart) */}
        {cart.length > 0 && !checkoutActive && (
          <div className="cart-drawer-footer">
            <div className="cart-subtotal-row">
              <span>SUBTOTAL ARCHIVE VALUE:</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            
            <button 
              className="cart-checkout-btn"
              onClick={() => setCheckoutActive(true)}
            >
              Proceed to secure checkout
            </button>
          </div>
        )}

        {/* Slide-in Checkout Panel */}
        <div className={`checkout-panel ${checkoutActive ? 'active' : ''}`}>
          <div className="checkout-header">
            {checkoutStep !== 'success' && (
              <button 
                className="checkout-back-btn" 
                onClick={() => checkoutStep !== 'processing' && setCheckoutActive(false)}
                disabled={checkoutStep === 'processing'}
              >
                ← Back
              </button>
            )}
            <h3 className="raw-title" style={{ fontSize: '14px', letterSpacing: '0.05em' }}>
              Secure Payment Core
            </h3>
          </div>

          {checkoutStep === 'form' && (
            <form className="checkout-form" onSubmit={handleCheckoutSubmit}>
              <div className="checkout-input-group">
                <label className="checkout-label">Customer Name</label>
                <input 
                  type="text" 
                  name="name" 
                  value={formData.name}
                  onChange={handleInputChange}
                  className="checkout-input" 
                  required 
                />
              </div>

              <div className="checkout-input-group">
                <label className="checkout-label">Secure Contact Email</label>
                <input 
                  type="email" 
                  name="email" 
                  value={formData.email}
                  onChange={handleInputChange}
                  className="checkout-input" 
                  required 
                />
              </div>

              <div className="checkout-input-group">
                <label className="checkout-label">Delivery Address</label>
                <input 
                  type="text" 
                  name="address" 
                  value={formData.address}
                  onChange={handleInputChange}
                  className="checkout-input" 
                  required 
                />
              </div>

              <div className="checkout-row-double">
                <div className="checkout-input-group">
                  <label className="checkout-label">City</label>
                  <input 
                    type="text" 
                    name="city" 
                    value={formData.city}
                    onChange={handleInputChange}
                    className="checkout-input" 
                    required 
                  />
                </div>
                <div className="checkout-input-group">
                  <label className="checkout-label">ZIP / postal</label>
                  <input 
                    type="text" 
                    name="zip" 
                    value={formData.zip}
                    onChange={handleInputChange}
                    className="checkout-input" 
                    required 
                  />
                </div>
              </div>

              <div className="checkout-input-group" style={{ marginTop: '10px', borderTop: '1px solid #111', paddingTop: '16px' }}>
                <label className="checkout-label">Card Number (Mock)</label>
                <input 
                  type="text" 
                  name="cardNum" 
                  value={formData.cardNum}
                  onChange={handleInputChange}
                  placeholder="0000 0000 0000 0000"
                  className="checkout-input" 
                  maxLength="19"
                  required 
                />
              </div>

              <div className="checkout-row-double">
                <div className="checkout-input-group">
                  <label className="checkout-label">Expiry</label>
                  <input 
                    type="text" 
                    name="cardExpiry" 
                    value={formData.cardExpiry}
                    onChange={handleInputChange}
                    placeholder="MM/YY" 
                    className="checkout-input" 
                    maxLength="5"
                    required 
                  />
                </div>
                <div className="checkout-input-group">
                  <label className="checkout-label">CVV</label>
                  <input 
                    type="password" 
                    name="cardCvv" 
                    value={formData.cardCvv}
                    onChange={handleInputChange}
                    placeholder="***" 
                    className="checkout-input" 
                    maxLength="4"
                    required 
                  />
                </div>
              </div>

              <div className="checkout-summary-box">
                <div className="checkout-summary-row">
                  <span>Acquisitions subtotal:</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                <div className="checkout-summary-row">
                  <span>Shipping logistics:</span>
                  <span style={{ color: '#00ff66' }}>COMPLIMENTARY</span>
                </div>
                <div className="checkout-summary-row total">
                  <span>Total payment value:</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
              </div>

              <button type="submit" className="cart-checkout-btn">
                Authorize Transaction
              </button>
            </form>
          )}

          {checkoutStep === 'processing' && (
            <div className="checkout-success-view">
              <div className="sub-mono" style={{ color: '#888888' }}>
                [ VERIFYING ACCOUNT LEDGERS ... ]
              </div>
              <div 
                style={{ 
                  width: '30px', 
                  height: '30px', 
                  border: '2px solid #222', 
                  borderTopColor: '#fff', 
                  borderRadius: '50%', 
                  animation: 'spin 1s linear infinite',
                  margin: '20px auto'
                }} 
              />
              <span className="sub-mono" style={{ fontSize: '9px', letterSpacing: '0.2em' }}>
                SECURING SHIELD NODE ENCRYPTION
              </span>
              <style dangerouslySetInnerHTML={{__html: `
                @keyframes spin {
                  0% { transform: rotate(0deg); }
                  100% { transform: rotate(360deg); }
                }
              `}} />
            </div>
          )}

          {checkoutStep === 'success' && (
            <div className="checkout-success-view">
              <div className="success-mark">✓</div>
              <h4 className="raw-title" style={{ fontSize: '16px', letterSpacing: '0.05em' }}>
                Acquisition Complete
              </h4>
              <p className="statement-body" style={{ fontSize: '11px', color: '#666', lineHeight: '1.6' }}>
                Your order transaction request has been successfully recorded in our central servers.
                <br /><br />
                Order Code ID:<br />
                <strong style={{ color: '#ffffff', fontFamily: 'monospace', fontSize: '13px' }}>{orderNumber}</strong>
              </p>
              
              <button 
                className="split-btn" 
                style={{ marginTop: '20px', alignSelf: 'center' }}
                onClick={() => {
                  resetCheckoutState();
                  onClose();
                }}
              >
                Close & Terminal Home
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CartSidebar;
