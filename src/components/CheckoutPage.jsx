import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { verifyAndSubmitOrder } from '../lib/verifyPayment.js';
import { supabase } from '../lib/supabaseClient.js';

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  // Union Territories
  'Andaman & Nicobar Islands', 'Chandigarh', 'Dadra & Nagar Haveli and Daman & Diu',
  'Delhi (NCT)', 'Jammu & Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry',
];

const UPI_ID = '7757891017@fam';

function CheckoutPage({ cart = [], clearCart, triggerToast }) {
  const navigate = useNavigate();

  // ── STEP STATE ────────────────────────────────────────────────────────────
  const [step, setStep] = useState('shipping');
  const [orderId, setOrderId] = useState('');
  const [utrError, setUtrError] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('Pending_Verification');

  // ── REALTIME STATUS SUBSCRIPTION ──────────────────────────────────────────
  useEffect(() => {
    let channel;

    if (step === 'success' && orderId) {
      channel = supabase.channel('schema-db-changes')
        .on(
          'postgres_changes',
          {
            event: 'UPDATE',
            schema: 'public',
            table: 'orders',
            filter: `id=eq.${orderId}`, // Matches database key filter dynamically
          },
          (payload) => {
            if (payload.new && payload.new.payment_status) {
              setPaymentStatus(payload.new.payment_status);
              if (triggerToast) {
                triggerToast(`SYSTEM // STATUS UPDATED: ${payload.new.payment_status.toUpperCase()}`);
              }
            }
          }
        )
        .subscribe();
    }

    return () => {
      if (channel) {
        supabase.removeChannel(channel);
      }
    };
  }, [step, orderId]);

  // ── SHIPPING FORM DATA ────────────────────────────────────────────────────
  const [shipping, setShipping] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    landmark: '',
    pincode: '',
    city: '',
    state: '',
  });
  const [shippingErrors, setShippingErrors] = useState({});

  // ── PAYMENT DATA ──────────────────────────────────────────────────────────
  const [utr, setUtr] = useState('');

  // ── COMPUTED ──────────────────────────────────────────────────────────────
  const subtotal = cart.reduce((s, i) => s + i.rawPrice * i.quantity, 0);
  const formatINR = (v) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(v);

  // ── SHIPPING VALIDATION ───────────────────────────────────────────────────
  const validateShipping = () => {
    const errs = {};
    if (!shipping.fullName.trim()) errs.fullName = 'Full name is required';
    if (!shipping.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) errs.email = 'Valid email required';
    if (!shipping.phone.match(/^[6-9]\d{9}$/)) errs.phone = 'Enter valid 10-digit Indian mobile number';
    if (!shipping.address.trim()) errs.address = 'Address is required';
    if (!shipping.pincode.match(/^\d{6}$/)) errs.pincode = 'Enter valid 6-digit pincode';
    if (!shipping.city.trim()) errs.city = 'City is required';
    if (!shipping.state) errs.state = 'Please select your state';
    return errs;
  };

  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShipping((prev) => ({ ...prev, [name]: value }));
    if (shippingErrors[name]) setShippingErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleShippingSubmit = (e) => {
    e.preventDefault();
    const errs = validateShipping();
    if (Object.keys(errs).length > 0) {
      setShippingErrors(errs);
      return;
    }
    setStep('payment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ── PAYMENT SUBMIT ────────────────────────────────────────────────────────
  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    setUtrError('');

    if (!utr.trim().match(/^[A-Za-z0-9]{12}$/)) {
      setUtrError('VALIDATION ERROR: UTR must be exactly 12 alphanumeric characters.');
      return;
    }

    setStep('processing');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const result = await verifyAndSubmitOrder({
      shippingData: shipping,
      cartItems: cart,
      orderAmount: subtotal,
      utrNumber: utr,
    });

    if (result.success) {
      setOrderId(result.orderId);
      clearCart();
      setStep('success');
      if (triggerToast) triggerToast('SYSTEM // ORDER PLACED — WAITING FOR DEPOSIT');
    } else {
      setStep('payment');
      setUtrError(result.error);
    }
  };

  if (cart.length === 0 && step !== 'success') {
    return (
      <div className="checkout-empty-guard">
        <div className="sub-mono" style={{ marginBottom: '20px', color: '#555' }}>
          [ Cart archive is empty ]
        </div>
        <button className="hero-action-btn" onClick={() => navigate('/')}>
          Return to Store
        </button>
      </div>
    );
  }

  return (
    <div className="checkout-page-root">
      {step !== 'processing' && step !== 'success' && (
        <div className="checkout-stepper-bar">
          <div className={`checkout-step-dot ${step === 'shipping' ? 'active' : step === 'payment' ? 'done' : ''}`}>
            <span className="step-num">1</span>
            <span className="step-label">Shipping</span>
          </div>
          <div className="checkout-step-line" />
          <div className={`checkout-step-dot ${step === 'payment' ? 'active' : ''}`}>
            <span className="step-num">2</span>
            <span className="step-label">Payment</span>
          </div>
          <div className="checkout-step-line" />
          <div className="checkout-step-dot">
            <span className="step-num">3</span>
            <span className="step-label">Confirm</span>
          </div>
        </div>
      )}

      {step === 'shipping' && (
        <div className="checkout-layout">
          <div className="checkout-form-col">
            <button className="checkout-pg-back" onClick={() => navigate(-1)}>
              ← Back to Cart
            </button>
            <h1 className="raw-title checkout-pg-title">Shipping Details</h1>
            <p className="sub-mono" style={{ color: '#555', marginBottom: '32px' }}>
              Enter your delivery information below
            </p>

            <form onSubmit={handleShippingSubmit} noValidate>
              <div className="checkout-row-double">
                <div className="co-field-group">
                  <label className="co-label">Full Name *</label>
                  <input
                    id="co-fullName"
                    type="text"
                    name="fullName"
                    value={shipping.fullName}
                    onChange={handleShippingChange}
                    className={`co-input ${shippingErrors.fullName ? 'error' : ''}`}
                    placeholder="Arjun Sharma"
                  />
                  {shippingErrors.fullName && <span className="co-error-msg">{shippingErrors.fullName}</span>}
                </div>
                <div className="co-field-group">
                  <label className="co-label">Email Address *</label>
                  <input
                    id="co-email"
                    type="email"
                    name="email"
                    value={shipping.email}
                    onChange={handleShippingChange}
                    className={`co-input ${shippingErrors.email ? 'error' : ''}`}
                    placeholder="arjun@email.com"
                  />
                  {shippingErrors.email && <span className="co-error-msg">{shippingErrors.email}</span>}
                </div>
              </div>

              <div className="co-field-group">
                <label className="co-label">Phone Number *</label>
                <div className="co-phone-wrapper">
                  <span className="co-phone-prefix">🇮🇳 +91</span>
                  <input
                    id="co-phone"
                    type="tel"
                    name="phone"
                    value={shipping.phone}
                    onChange={handleShippingChange}
                    className={`co-input co-phone-input ${shippingErrors.phone ? 'error' : ''}`}
                    placeholder="9876543210"
                    maxLength={10}
                  />
                </div>
                {shippingErrors.phone && <span className="co-error-msg">{shippingErrors.phone}</span>}
              </div>

              <div className="co-field-group">
                <label className="co-label">Address (Flat / House No, Building, Area) *</label>
                <input
                  id="co-address"
                  type="text"
                  name="address"
                  value={shipping.address}
                  onChange={handleShippingChange}
                  className={`co-input ${shippingErrors.address ? 'error' : ''}`}
                  placeholder="Flat 4B, Sunrise Apartments, MG Road"
                />
                {shippingErrors.address && <span className="co-error-msg">{shippingErrors.address}</span>}
              </div>

              <div className="co-field-group">
                <label className="co-label">Landmark <span style={{ color: '#444' }}>(Optional)</span></label>
                <input
                  id="co-landmark"
                  type="text"
                  name="landmark"
                  value={shipping.landmark}
                  onChange={handleShippingChange}
                  className="co-input"
                  placeholder="Near City Mall"
                />
              </div>

              <div className="checkout-row-double">
                <div className="co-field-group">
                  <label className="co-label">Pincode *</label>
                  <input
                    id="co-pincode"
                    type="text"
                    name="pincode"
                    value={shipping.pincode}
                    onChange={handleShippingChange}
                    className={`co-input ${shippingErrors.pincode ? 'error' : ''}`}
                    placeholder="400001"
                    maxLength={6}
                  />
                  {shippingErrors.pincode && <span className="co-error-msg">{shippingErrors.pincode}</span>}
                </div>
                <div className="co-field-group">
                  <label className="co-label">City *</label>
                  <input
                    id="co-city"
                    type="text"
                    name="city"
                    value={shipping.city}
                    onChange={handleShippingChange}
                    className={`co-input ${shippingErrors.city ? 'error' : ''}`}
                    placeholder="Mumbai"
                  />
                  {shippingErrors.city && <span className="co-error-msg">{shippingErrors.city}</span>}
                </div>
              </div>

              <div className="co-field-group">
                <label className="co-label">State / Union Territory *</label>
                <select
                  id="co-state"
                  name="state"
                  value={shipping.state}
                  onChange={handleShippingChange}
                  className={`co-input co-select ${shippingErrors.state ? 'error' : ''}`}
                >
                  <option value="">— Select State —</option>
                  {INDIAN_STATES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                {shippingErrors.state && <span className="co-error-msg">{shippingErrors.state}</span>}
              </div>

              <button type="submit" id="co-continue-btn" className="co-submit-btn">
                Continue to Payment →
              </button>
            </form>
          </div>

          <div className="checkout-summary-col">
            <div className="co-summary-card">
              <h3 className="raw-title" style={{ fontSize: '13px', marginBottom: '24px' }}>Order Summary</h3>
              <div className="co-summary-items">
                {cart.map((item) => (
                  <div key={item.cartId} className="co-summary-item">
                    <div className="co-summary-img-wrap">
                      <img src={item.src} alt={item.name} />
                      <span className="co-summary-qty-badge">{item.quantity}</span>
                    </div>
                    <div className="co-summary-item-info">
                      <span className="co-summary-item-name">{item.name}</span>
                      <span className="co-summary-item-size">Size: {item.size}</span>
                    </div>
                    <span className="co-summary-item-price">{formatINR(item.rawPrice * item.quantity)}</span>
                  </div>
                ))}
              </div>
              <div className="co-summary-divider" />
              <div className="co-summary-row">
                <span>Subtotal</span>
                <span>{formatINR(subtotal)}</span>
              </div>
              <div className="co-summary-row">
                <span>Shipping</span>
                <span style={{ color: '#00cc55', fontWeight: 600 }}>FREE</span>
              </div>
              <div className="co-summary-divider" />
              <div className="co-summary-row total">
                <span>Total</span>
                <span>{formatINR(subtotal)}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {step === 'payment' && (
        <div className="checkout-layout checkout-payment-layout">
          <div className="checkout-form-col">
            <button className="checkout-pg-back" onClick={() => setStep('shipping')}>
              ← Back to Shipping
            </button>
            <h1 className="raw-title checkout-pg-title">Complete Payment</h1>

            <div className="upi-payment-card">
              <div className="upi-amount-banner">
                <span className="sub-mono" style={{ color: '#888', marginBottom: '4px', display: 'block' }}>Total Amount Due</span>
                <span className="upi-amount-value">{formatINR(subtotal)}</span>
              </div>

              <div className="upi-qr-section">
                <div className="upi-qr-frame">
                  <img src="/upi-qr.jpeg" alt="GENRAGE UPI Payment QR Code" className="upi-qr-img" />
                  <div className="upi-qr-glow" />
                </div>

                <div className="upi-info-panel">
                  <div className="upi-id-block">
                    <span className="sub-mono" style={{ color: '#555', fontSize: '9px' }}>UPI ID</span>
                    <div className="upi-id-value">
                      <span>{UPI_ID}</span>
                      <button className="upi-copy-btn" onClick={() => {
                        navigator.clipboard.writeText(UPI_ID);
                        if (triggerToast) triggerToast('SYSTEM // UPI ID COPIED TO CLIPBOARD');
                      }}>📋</button>
                    </div>
                  </div>
                  <div className="upi-instructions">
                    <p>1. Scan the QR code or pay to the UPI ID</p>
                    <p>2. Complete your payment via any UPI App</p>
                    <p>3. Note your 12-digit transaction UTR reference sequence</p>
                  </div>
                </div>
              </div>

              <form onSubmit={handlePaymentSubmit}>
                <div className="utr-input-section">
                  <label className="co-label" htmlFor="utr-field">UTR / Transaction Reference Number *</label>
                  <input
                    id="utr-field"
                    type="text"
                    value={utr}
                    onChange={(e) => {
                      setUtr(e.target.value.toUpperCase());
                      setUtrError('');
                    }}
                    className={`co-input utr-input ${utrError ? 'error' : ''}`}
                    placeholder="e.g. 123456789012"
                    maxLength={12}
                  />
                  {utrError && <div className="utr-error-block">⚠ {utrError}</div>}
                </div>

                <button type="submit" id="co-verify-btn" className="co-submit-btn utr-verify-btn" disabled={utr.length !== 12}>
                  Verify &amp; Confirm Order →
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {step === 'processing' && (
        <div className="checkout-processing-view">
          <div className="processing-spinner" />
          <div className="raw-title processing-title">Verifying</div>
          <div className="sub-mono processing-sub">[ ROUTING TRANSACTION — SHIELD NODE ACTIVE ]</div>
        </div>
      )}

      {step === 'success' && (
        <div className="checkout-success-view">
          <div className="success-checkmark-ring">
            <div className="success-checkmark">✓</div>
          </div>
          <h1 className="raw-title" style={{ fontSize: '28px', marginBottom: '12px' }}>Order Placed!</h1>

          <div className="success-order-card">
            <div className="success-order-row">
              <span className="sub-mono">Order UUID</span>
              <span className="success-order-id" style={{ fontSize: '11px' }}>{orderId}</span>
            </div>
            <div className="success-order-row">
              <span className="sub-mono">UTR Reference</span>
              <span>{utr}</span>
            </div>
            <div className="success-order-row">
              <span className="sub-mono">Status</span>
              <span
                className="success-status-badge"
                style={{
                  backgroundColor: ['VERIFIED', 'COMPLETED'].includes(paymentStatus.toUpperCase()) ? 'rgba(0, 204, 85, 0.2)' : 'rgba(255, 170, 0, 0.1)',
                  color: ['VERIFIED', 'COMPLETED'].includes(paymentStatus.toUpperCase()) ? '#00cc55' : '#ffaa00',
                  border: ['VERIFIED', 'COMPLETED'].includes(paymentStatus.toUpperCase()) ? '1px solid #00cc55' : '1px solid #ffaa00'
                }}
              >
                {paymentStatus.replace('_', ' ').toUpperCase()}
              </span>
            </div>
          </div>

          <button className="co-submit-btn" style={{ maxWidth: '300px', marginTop: '32px' }} onClick={() => navigate('/')}>
            Continue Shopping →
          </button>
        </div>
      )}
    </div>
  );
}

export default CheckoutPage;