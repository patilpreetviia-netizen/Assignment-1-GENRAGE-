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
import WishlistSidebar from './components/WishlistSidebar';
import SearchOverlay from './components/SearchOverlay';
import ToastContainer from './components/ToastContainer';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';

const allProducts = [
  {
    id: 1,
    name: "GENRAGE BLACK VEST",
    price: "₹1,299",
    rawPrice: 1299,
    category: "vests",
    src: "https://genrage.com/cdn/shop/files/apocalypse-black-boxy-unisex-vest-genrage-1.png?v=1780470235&width=1080",
    description: "Heavyweight drop-shoulder tactical vest. Engineered with robust box silhouette styling, reinforced hardware stitch-lines, and unrefined cotton structures. Features raw edge details for a worn-in cyber-industrial look.",
    details: ["100% French Terry Cotton", "360 GSM Heavyweight Build", "Oversized silhouette", "Hand wash cold, line dry"],
    stock: 4,
    spec: { fabric: "French Terry Cotton", gsm: "360 GSM", fit: "Oversized Silhouette", finish: "Raw edge details" }
  },
  {
    id: 2,
    name: "GENRAGE BLACK BOXY FIT T SHIRT",
    price: "₹1,999",
    rawPrice: 1999,
    category: "tees",
    src: "https://genrage.com/cdn/shop/files/aghora-black-boxy-oversized-tshirt-genrage-2.png?v=1779978043&width=1080",
    description: "Premium boxy drop-shoulder tee. Features signature GENRAGE screen print at front, distressed hems, and thick ribbed collar. Crafted for ultimate comfort and durability in urban environments.",
    details: ["100% Combed Organic Cotton", "240 GSM Premium Jersey", "Boxy drop-shoulder silhouette", "Machine wash cold"],
    stock: 8,
    spec: { fabric: "Combed Organic Cotton", gsm: "240 GSM", fit: "Boxy drop-shoulder", finish: "Thick ribbed collar" }
  },
  {
    id: 3,
    name: "GENRAGE GREY ART BAGGY TRACK PANTS",
    price: "₹2,999",
    rawPrice: 2999,
    category: "pants",
    src: "https://genrage.com/cdn/shop/files/basic-grey-baggy-pants-genrage-1.png?v=1780668495&width=1000",
    description: "Ultra-baggy straight-fit track pants in melange grey. Completed with adjustable metal toggle drawstrings, deep side pockets, and signature embroidered logo on left pocket. Designed for fluid movement.",
    details: ["80% Cotton, 20% Polyester fleece", "380 GSM Heavyweight fabric", "Baggy straight-fit pattern", "Embroidered brand detailing"],
    stock: 3,
    spec: { fabric: "80% Cotton, 20% Polyester fleece", gsm: "380 GSM", fit: "Baggy straight-fit pattern", finish: "Metal toggle drawstrings" }
  },
  {
    id: 4,
    name: "GENRAGE BLACK SLEEVELESS HOODIE",
    price: "₹1,999",
    rawPrice: 1999,
    category: "hoodies",
    src: "https://genrage.com/cdn/shop/files/gaze-black-boxy-sleeveless-hoodie-genrage-1.png?v=1779977481&width=1000",
    description: "Boxy sleeveless crop hoodie with a double-lined hood and raw edge armholes. The absolute core layering utility piece for high-impact streetwear aesthetics.",
    details: ["100% Organic Loopback Cotton", "320 GSM Midweight fabric", "Double layered structured hood", "Raw cut armholes"],
    stock: 5,
    spec: { fabric: "Organic Loopback Cotton", gsm: "320 GSM", fit: "Sleeveless crop fit", finish: "Raw cut armholes" }
  },
  {
    id: 5,
    name: "GENRAGE BLACK BAGGY PANTS",
    price: "₹999",
    rawPrice: 999,
    category: "pants",
    src: "https://genrage.com/cdn/shop/files/basic-black-baggy-pants-genrage-1.png?v=1780668291&width=1000",
    description: "High-contrast bold red signature vest. Made from premium elastic cotton rib, featuring an aesthetic racerback cut and signature printed typography along the back collar line.",
    details: ["95% Ribbed Cotton, 5% Elastane", "280 GSM Stretch Fit", "Breathable core layering", "High impact colorway"],
    stock: 12,
    spec: { fabric: "95% Ribbed Cotton, 5% Elastane", gsm: "280 GSM", fit: "Racerback stretch fit", finish: "High impact colorway" }
  },
  {
    id: 6,
    name: "GENRAGE DARK GREY BASIC BAGGY PANTS",
    price: "₹1,999",
    rawPrice: 1999,
    category: "pants",
    src: "https://genrage.com/cdn/shop/files/dark-grey-basic-baggy-pants-genrage-1.png?v=1780668486&width=1000",
    description: "The definitive GENRAGE heavy oversized hoodie. Featuring double-layered hood without drawstrings, dropped armholes, kangaroo pocket, and rib-knit cuffs and waist hem. The ultimate cozy armor.",
    details: ["100% French Terry Cotton", "420 GSM Heavyweight Armor", "Deep double-lined hood", "Preshrunk for perfect fit"],
    stock: 6,
    spec: { fabric: "French Terry Cotton", gsm: "420 GSM", fit: "Heavy oversized silhouette", finish: "Preshrunk fit" }
  },
  {
    id: 7,
    name: "VAMP CORDUROY FULL SLEEVES T SHIRT",
    price: "₹2,499",
    rawPrice: 2499,
    category: "t-shirts",
    src: "https://genrage.com/cdn/shop/files/vamp-corduroy-full-sleeves-t-shirt-genrage-1.png?v=1779977953&width=1080",
    description: "Heavyweight full-zip hoodie featuring custom cybernetic screenprint designs, custom metal zipper, double-lined hood, and deep utility pockets.",
    details: ["100% Cotton Fleece", "400 GSM Ultra-heavyweight", "Full zipper closure", "Cyber graphic details"],
    stock: 3,
    spec: { fabric: "Cotton Fleece", gsm: "400 GSM", fit: "Boxy unisex fit", finish: "Custom screenprint" }
  },
  {
    id: 8,
    name: "WHITE PHENOM WOMEN'S LONG SLEEVE BABY TEE",
    price: "₹1,199",
    rawPrice: 1199,
    category: "t-shirts",
    src: "https://genrage.com/cdn/shop/files/white-phenom-women-s-long-sleeve-baby-tee-genrage-2.png?v=1780118543&width=1000",
    description: "Minimalist urban utility vest with side slits and raw sleeve holes. Made from durable bio-washed cotton, designed as a premium foundational layering piece.",
    details: ["100% Combed Cotton", "320 GSM Heavy Rib", "Slightly cropped fit", "High durability stitch lines"],
    stock: 9,
    spec: { fabric: "Combed Cotton", gsm: "320 GSM", fit: "Slightly cropped fit", finish: "Bio-washed rib" }
  },
  {
    id: 9,
    name: "MINI-MUTATION UNISEX BLACK SHORTS",
    price: "₹1,299",
    rawPrice: 1299,
    category: "shorts",
    src: "https://genrage.com/cdn/shop/files/mini-mutation-unisex-black-shorts-genrage-1.png?v=1779978077&width=1000",
    description: "Deep charcoal heavy ribbed tactical vest. Featuring reinforced neck bindings, unrefined bottom hem line, and signature metal hardware rivet details.",
    details: ["98% Cotton, 2% Elastane", "340 GSM Midweight Rib", "Regular crop length", "Hardware rivet detailing"],
    stock: 5,
    spec: { fabric: "98% Cotton, 2% Elastane", gsm: "340 GSM", fit: "Regular crop length", finish: "Hardware rivet detailing" }
  },
  {
    id: 10,
    name: "RAKSHAK GREY UNISEX BOXY VEST",
    price: "₹2,799",
    rawPrice: 2799,
    category: "vests",
    src: "https://genrage.com/cdn/shop/files/rakshak-grey-unisex-boxy-vest-genrage-1.png?v=1779977387&width=1000",
    description: "Multi-panel box-cut baggy sweatpants. Feature deep zippered cargo pockets, adjustable drawstrings at cuff hem, and heavy structural panels for architectural shape.",
    details: ["100% Organic Cotton Terry", "390 GSM Structure", "Ultra-baggy shape", "Zippered cargo pockets"],
    stock: 4,
    spec: { fabric: "Organic Cotton Terry", gsm: "390 GSM", fit: "Ultra-baggy silhouette", finish: "Multi-panel layout" }
  },
  {
    id: 11,
    name: "BLACK MAHORAGA UNISEX OVERSIZED TSHIRT",
    price: "₹2,899",
    rawPrice: 2899,
    category: "t-shirts",
    src: "https://genrage.com/cdn/shop/files/mahoraga-black-tshirt-genrage-2.png?v=1780669117&width=1080",
    description: "Fluid-draping straight baggy pants. Equipped with heavy elastic waistband, inner drawstrings, and minimal branding. Extremely versatile for loungewear or outdoor exploration.",
    details: ["75% Cotton, 25% Polyester", "360 GSM Melange Fleece", "Straight wide leg drape", "Invisible zip side pockets"],
    stock: 7,
    spec: { fabric: "75% Cotton, 25% Polyester", gsm: "360 GSM", fit: "Straight wide leg drape", finish: "Invisible zipper pockets" }
  },
  {
    id: 12,
    name: "CRUEL GREY BAGGY PANTS",
    price: "₹2,899",
    rawPrice: 2899,
    category: "pants",
    src: "https://genrage.com/cdn/shop/files/strix-dark-grey-baggy-pants-genrage-1.png?v=1780669007&width=1080",
    description: "Concrete grey heavy-washed baggy pants. Designed with dual rear pockets, heavy-duty belt loops, and customized industrial print.",
    details: ["100% Organic Cotton Fleece", "380 GSM Cement wash", "Extreme oversized fit", "Belt loop structures"],
    stock: 3,
    spec: { fabric: "Organic Cotton Fleece", gsm: "380 GSM", fit: "Extreme oversized fit", finish: "Cement wash dye" }
  },
  {
    id: 13,
    name: "BAGGY JEANS",
    price: "₹1,499",
    rawPrice: 1499,
    category: "pants",
    src: "https://genrage.com/cdn/shop/files/smoke-grey-washed-baggy-bootcut-jeans-genrage-1.png?v=1780118813&width=3712",
    description: "Heavy-fleece baggy shorts featuring raw edge bottom hem, thick dynamic drawstring cords, and deep mesh pocket linings.",
    details: ["100% French Terry Cotton", "340 GSM Comfort Build", "Relaxed boxy cut", "Raw cut bottom hem"],
    stock: 11,
    spec: { fabric: "French Terry Cotton", gsm: "340 GSM", fit: "Relaxed boxy cut shorts", finish: "Raw edge hem" }
  },
  {
    id: 14,
    name: "GENRAGE BLACK BALLOON PANTS",
    price: "₹1,399",
    rawPrice: 1399,
    category: "pants",
    src: "https://genrage.com/cdn/shop/files/genrage-black-balloon-pants-genrage-1.png?v=1780668338&width=1000",
    description: "Minimalist athletic sweatshorts with subtle side branding print. Ideal for layering over thermal skins or wearing solo.",
    details: ["90% Cotton, 10% Poly blend", "320 GSM Active Terry", "Classic mid-thigh length", "Screen printed design details"],
    stock: 14,
    spec: { fabric: "90% Cotton, 10% Polyester", gsm: "320 GSM", fit: "Mid-thigh athletic profile", finish: "Side branding print" }
  },
  {
    id: 15,
    name: "LEATHER DUFFLE BAG",
    price: "₹1,699",
    rawPrice: 1699,
    category: "bags",
    src: "https://genrage.com/cdn/shop/files/leather-duffle-bag-genrage-1.png?v=1779977510&width=1000",
    description: "Heavy-wash black denim-like sweat jorts. Offer the style of denim shorts with the extreme comfort of loopback terry fabric.",
    details: ["100% Combed Cotton Terry", "360 GSM Knit Denim", "Ultra relaxed knee-length fit", "Faux fly front seam detail"],
    stock: 5,
    spec: { fabric: "Combed Cotton Terry", gsm: "360 GSM", fit: "Knee-length relaxed fit", finish: "Knit denim dye wash" }
  },
  {
    id: 16,
    name: "LEATHER BACKPACK",
    price: "₹1,249",
    rawPrice: 1249,
    category: "bags",
    src: "https://genrage.com/cdn/shop/files/leather-bagpack-genrage-1.png?v=1779977794&width=1000",
    description: "Raw-cut racerback vest with an asymmetric back panel detail. Heavy drop texture cotton, highly breathable and durable.",
    details: ["100% Fine Ribbed Cotton", "300 GSM Heavy Rib", "Asymmetric panel lines", "Frayed bottom hem styling"],
    stock: 8,
    spec: { fabric: "Fine Ribbed Cotton", gsm: "300 GSM", fit: "Asymmetric racerback fit", finish: "Frayed bottom hem" }
  },
  {
    id: 17,
    name: "GENRAGE PENDANT CHAIN",
    price: "₹1,299",
    rawPrice: 1299,
    category: "chains",
    src: "https://genrage.com/cdn/shop/files/genrage-pendant-chain-genrage.png?v=1779977608&width=1000",
    description: "Utility shorts with modular straps and mesh overlay detail. Perfect for tactical technical wear styles.",
    details: ["100% Ripstop Nylon/Cotton blend", "280 GSM Tech shell", "Modular strap lines", "D-ring hardware attachments"],
    stock: 4,
    spec: { fabric: "Ripstop Nylon/Cotton blend", gsm: "280 GSM", fit: "Modular tactical utility", finish: "D-ring adjustments" }
  },
  {
    id: 18,
    name: "SWORD CHARM PENDANT CHAIN",
    price: "₹2,999",
    rawPrice: 2999,
    category: "chains",
    src: "https://genrage.com/cdn/shop/files/sword-charm-pendant-genrage.png?v=1779978098&width=1000",
    description: "Heavy canvas straight fit baggy track pants with distressed double knee details and contrast sewing lines.",
    details: ["100% Heavy Cotton Canvas", "400 GSM Rough Build", "Wide straight leg profile", "Contrast double stitch seams"],
    stock: 2,
    spec: { fabric: "Heavy Cotton Canvas", gsm: "400 GSM", fit: "Wide straight leg profile", finish: "Contrast double stitching" }
  }
];

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Cart management state
  const [cart, setCart] = useState(() => {
    const localData = localStorage.getItem('genrage_cart');
    return localData ? JSON.parse(localData) : [];
  });
  const [cartOpen, setCartOpen] = useState(false);

  // Wishlist management state
  const [wishlist, setWishlist] = useState(() => {
    const localData = localStorage.getItem('genrage_wishlist');
    return localData ? JSON.parse(localData) : [];
  });
  const [wishlistOpen, setWishlistOpen] = useState(false);

  // Search state
  const [searchOpen, setSearchOpen] = useState(false);

  // Toast notifications state
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    localStorage.setItem('genrage_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('genrage_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Scroll to top on route changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

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

  const toggleWishlist = (productId) => {
    setWishlist((prev) => {
      const isAlreadyWishlisted = prev.includes(productId);
      if (isAlreadyWishlisted) {
        triggerToast('SYSTEM // REMOVED FROM WISHLIST');
        return prev.filter(id => id !== productId);
      } else {
        const prod = allProducts.find(p => p.id === productId);
        triggerToast(`SYSTEM // WISHLIST ADDED: ${prod?.name || 'ITEM'}`);
        return [...prev, productId];
      }
    });
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
    navigate(`/product/${productId}`);
  };

  return (
    <div className="app-luxury-minimal-root">
      <Navbar
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        wishlistCount={wishlist.length}
        onCartOpen={() => setCartOpen(true)}
        onWishlistOpen={() => setWishlistOpen(true)}
        onSearchOpen={() => setSearchOpen(true)}
      />

      <Routes>
        <Route path="/" element={
          <>
            <Hero />
            <Categories />
            <ProductCards
              title="Incoming Core Drops"
              limit={4}
              products={allProducts}
              wishlist={wishlist}
              onToggleWishlist={toggleWishlist}
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
        } />

        <Route path="/catalog" element={
          <div style={{ paddingTop: '20px' }}>
            <h2 className="statement-headline raw-title" style={{ textAlign: 'center', margin: '40px 0 20px 0', fontSize: '32px', letterSpacing: '0.05em' }}>
              System Collection Archive
            </h2>
            <ProductCards
              title="Full Hardware"
              products={allProducts}
              wishlist={wishlist}
              onToggleWishlist={toggleWishlist}
              onSelectProduct={handleNavigateToPdp}
              onAddToCart={addToCart}
            />
          </div>
        } />

        <Route path="/about" element={
          <div style={{ paddingTop: '20px' }}>
            <h2 className="statement-headline raw-title" style={{ textAlign: 'center', margin: '40px 0 20px 0', fontSize: '32px', letterSpacing: '0.05em' }}>
              Core Manifest // Identity
            </h2>
            <LookbookFeature />
          </div>
        } />

        <Route path="/product/:id" element={
          <ProductDetail
            products={allProducts}
            wishlist={wishlist}
            onToggleWishlist={toggleWishlist}
            onAddToCart={addToCart}
            onOpenSizeGuide={() => setIsModalOpen(true)}
            onSelectProduct={handleNavigateToPdp}
          />
        } />
      </Routes>

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

      <WishlistSidebar
        isOpen={wishlistOpen}
        onClose={() => setWishlistOpen(false)}
        wishlist={wishlist}
        products={allProducts}
        onToggleWishlist={toggleWishlist}
        onAddToCart={addToCart}
        onSelectProduct={handleNavigateToPdp}
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