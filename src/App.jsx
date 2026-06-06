import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Categories from './components/Categories';
import ProductCards from './components/ProductCards';
import LookbookFeature from './components/LookbookFeature';
import PromoVideoBanner from './components/PromoVideoBanner';
import Newsletter from './components/Newsletter';
import SizeGuideModal from './components/SizeGuideModal';
import Footer from './components/Footer';
import ProductDetail from './components/ProductDetail';
import CartSidebar from './components/CartSidebar';
import SearchOverlay from './components/SearchOverlay';
import ToastContainer from './components/ToastContainer';

const allProducts = [
  { 
    id: 1, 
    name: "GENRAGE BLACK VEST", 
    price: "₹1,299", 
    rawPrice: 1299,
    category: "vests", 
    src: "https://genrage.com/cdn/shop/files/apocalypse-black-boxy-unisex-vest-genrage-1.png?v=1780470235&width=1080",
    description: "Heavyweight drop-shoulder tactical vest. Engineered with robust box silhouette styling, reinforced hardware stitch-lines, and unrefined cotton structures. Features raw edge details for a worn-in cyber-industrial look.",
    details: ["100% French Terry Cotton", "360 GSM Heavyweight Build", "Oversized silhouette", "Hand wash cold, line dry"]
  },
  { 
    id: 2, 
    name: "GENRAGE BLACK BOXY FIT T SHIRT", 
    price: "₹1,999", 
    rawPrice: 1999,
    category: "tees", 
    src: "https://genrage.com/cdn/shop/files/aghora-black-boxy-oversized-tshirt-genrage-2.png?v=1779978043&width=1080",
    description: "Premium boxy drop-shoulder tee. Features signature GENRAGE screen print at front, distressed hems, and thick ribbed collar. Crafted for ultimate comfort and durability in urban environments.",
    details: ["100% Combed Organic Cotton", "240 GSM Premium Jersey", "Boxy drop-shoulder silhouette", "Machine wash cold"]
  },
  { 
    id: 3, 
    name: "GENRAGE GREY ART BAGGY TRACK PANTS", 
    price: "₹2,999", 
    rawPrice: 2999,
    category: "pants", 
    src: "https://genrage.com/cdn/shop/files/dawn-melange-unisex-straight-fit-baggy-pants-genrage-1.png?v=1780290592&width=1000",
    description: "Ultra-baggy straight-fit track pants in melange grey. Completed with adjustable metal toggle drawstrings, deep side pockets, and signature embroidered logo on left pocket. Designed for fluid movement.",
    details: ["80% Cotton, 20% Polyester fleece", "380 GSM Heavyweight fabric", "Baggy straight-fit pattern", "Embroidered brand detailing"]
  },
  { 
    id: 4, 
    name: "GENRAGE BLACK SLEEVELESS HOODIE", 
    price: "₹1,999", 
    rawPrice: 1999,
    category: "hoodies", 
    src: "https://genrage.com/cdn/shop/files/gaze-black-boxy-sleeveless-hoodie-genrage-1.png?v=1779977481&width=1000",
    description: "Boxy sleeveless crop hoodie with a double-lined hood and raw edge armholes. The absolute core layering utility piece for high-impact streetwear aesthetics.",
    details: ["100% Organic Loopback Cotton", "320 GSM Midweight fabric", "Double layered structured hood", "Raw cut armholes"]
  },
  { 
    id: 5, 
    name: "GENRAGE RED SIGNATURE VEST", 
    price: "₹999", 
    rawPrice: 999,
    category: "vests", 
    src: "https://assets.myntassets.com/w_412,q_50,,dpr_3,fl_progressive,f_webp/assets/images/2026/FEBRUARY/15/WJwZxxL6_762e4f8c767a408c9e3e0a69c8e9d0f1.jpg",
    description: "High-contrast bold red signature vest. Made from premium elastic cotton rib, featuring an aesthetic racerback cut and signature printed typography along the back collar line.",
    details: ["95% Ribbed Cotton, 5% Elastane", "280 GSM Stretch Fit", "Breathable core layering", "High impact colorway"]
  },
  { 
    id: 6, 
    name: "GENRAGE BLACK HOODIE", 
    price: "₹1,999", 
    rawPrice: 1999,
    category: "hoodies", 
    src: "https://genrage.com/cdn/shop/files/pierce-black-boxy-oversized-hoodie-genrage-1.png?v=1780118820&width=1000",
    description: "The definitive GENRAGE heavy oversized hoodie. Featuring double-layered hood without drawstrings, dropped armholes, kangaroo pocket, and rib-knit cuffs and waist hem. The ultimate cozy armor.",
    details: ["100% French Terry Cotton", "420 GSM Heavyweight Armor", "Deep double-lined hood", "Preshrunk for perfect fit"]
  }
];

function App() {
  const [view, setView] = useState('home');
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Cart management state
  const [cart, setCart] = useState(() => {
    const localData = localStorage.getItem('genrage_cart');
    return localData ? JSON.parse(localData) : [];
  });
  const [cartOpen, setCartOpen] = useState(false);
  
  // Search state
  const [searchOpen, setSearchOpen] = useState(false);
  
  // Toast notifications state
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    localStorage.setItem('genrage_cart', JSON.stringify(cart));
  }, [cart]);

  // Scroll to top on view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [view, selectedProductId]);

  const triggerToast = (message) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  const addToCart = (product, size) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (item) => item.id === product.id && item.size === size
      );
      if (existingItemIndex > -1) {
        const newCart = [...prevCart];
        newCart[existingItemIndex].quantity += 1;
        return newCart;
      } else {
        return [
          ...prevCart,
          {
            cartId: `${product.id}-${size}-${Date.now()}`,
            id: product.id,
            name: product.name,
            price: product.price,
            rawPrice: product.rawPrice,
            src: product.src,
            size: size,
            quantity: 1
          }
        ];
      }
    });
    triggerToast(`SYSTEM // ADDED ${product.name} (SIZE ${size})`);
  };

  const removeFromCart = (cartId) => {
    setCart((prevCart) => prevCart.filter((item) => item.cartId !== cartId));
    triggerToast('SYSTEM // ITEM REMOVED');
  };

  const updateCartQuantity = (cartId, delta) => {
    setCart((prevCart) => {
      return prevCart.map((item) => {
        if (item.cartId === cartId) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : item;
        }
        return item;
      }).filter((item) => item.quantity > 0);
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const handleNavigateToPdp = (productId) => {
    setSelectedProductId(productId);
    setView('pdp');
  };

  return (
    <div className="app-luxury-minimal-root">
      <Navbar 
        setView={setView} 
        currentView={view} 
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        onCartOpen={() => setCartOpen(true)}
        onSearchOpen={() => setSearchOpen(true)}
      />
      
      {view === 'home' && (
        <>
          <Hero setView={setView} />
          <Categories />
          <ProductCards 
            title="Incoming Core Drops" 
            limit={4} 
            products={allProducts}
            onSelectProduct={handleNavigateToPdp}
            onAddToCart={addToCart}
          />
          
          <div style={{ textAlign: 'center', backgroundColor: '#000', padding: '20px 0 60px 0' }}>
            <button 
              onClick={() => setIsModalOpen(true)}
              style={{ background: 'none', border: '1px solid #111', color: '#555', fontSize: '9px', fontFamily: 'Syncopate', textTransform: 'uppercase', letterSpacing: '0.2em', padding: '12px 30px', cursor: 'pointer' }}
            >
              [ View Sizing Architecture ]
            </button>
          </div>

          <LookbookFeature />
          <PromoVideoBanner />
          <Newsletter />
        </>
      )}

      {view === 'catalog' && (
        <div style={{ paddingTop: '20px' }}>
          <h2 className="statement-headline raw-title" style={{ textAlign: 'center', margin: '40px 0 20px 0', fontSize: '32px', letterSpacing: '0.05em' }}>
            System Collection Archive
          </h2>
          <ProductCards 
            title="Full Hardware" 
            products={allProducts}
            onSelectProduct={handleNavigateToPdp}
            onAddToCart={addToCart}
          />
        </div>
      )}

      {view === 'about' && (
        <div style={{ paddingTop: '20px' }}>
          <h2 className="statement-headline raw-title" style={{ textAlign: 'center', margin: '40px 0 20px 0', fontSize: '32px', letterSpacing: '0.05em' }}>
            Core Manifest // Identity
          </h2>
          <LookbookFeature />
        </div>
      )}

      {view === 'pdp' && selectedProductId && (
        <ProductDetail 
          productId={selectedProductId}
          products={allProducts}
          onBack={() => setView('catalog')}
          onAddToCart={addToCart}
          onOpenSizeGuide={() => setIsModalOpen(true)}
          onSelectProduct={handleNavigateToPdp}
        />
      )}

      <Footer />
      
      <SizeGuideModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      
      <CartSidebar 
        isOpen={cartOpen} 
        onClose={() => setCartOpen(false)} 
        cart={cart}
        onRemove={removeFromCart}
        onUpdateQty={updateCartQuantity}
        onClearCart={clearCart}
        triggerToast={triggerToast}
      />

      <SearchOverlay 
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        products={allProducts}
        onSelectProduct={handleNavigateToPdp}
      />

      <ToastContainer toasts={toasts} />
    </div>
  );
}

export default App;