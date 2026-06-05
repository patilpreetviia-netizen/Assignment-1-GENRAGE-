import React from 'react';

function ProductCards({ title, limit }) {
  const allProducts = [
    { id: 1, name: "GENRAGE BLACK VEST", price: "₹1,299", src: "https://genrage.com/cdn/shop/files/apocalypse-black-boxy-unisex-vest-genrage-1.png?v=1780470235&width=1080" },
    { id: 2, name: "GENRAGE BLACK BOXY FIT T SHIRT", price: "₹1,999", src: "https://genrage.com/cdn/shop/files/aghora-black-boxy-oversized-tshirt-genrage-2.png?v=1779978043&width=1080" },
    { id: 3, name: "GENRAGE GREY ART BAGGY TRACK PANTS", price: "₹2,999", src: "https://genrage.com/cdn/shop/files/dawn-melange-unisex-straight-fit-baggy-pants-genrage-1.png?v=1780290592&width=1000" },
    { id: 4, name: "GENRAGE BLACK SLEEVELESS HOODIE", price: "₹1,999", src: "https://genrage.com/cdn/shop/files/gaze-black-boxy-sleeveless-hoodie-genrage-1.png?v=1779977481&width=1000" },
    { id: 5, name: "GENRAGE RED SIGNATURE VEST", price: "₹ 999", src: "https://assets.myntassets.com/w_412,q_50,,dpr_3,fl_progressive,f_webp/assets/images/2026/FEBRUARY/15/WJwZxxL6_762e4f8c767a408c9e3e0a69c8e9d0f1.jpg" },
    { id: 6, name: "GENRAGE BLACK HOODIE", price: "₹1,999", src: "https://genrage.com/cdn/shop/files/pierce-black-boxy-oversized-hoodie-genrage-1.png?v=1780118820&width=1000" }
  ];

  const displayedProducts = limit ? allProducts.slice(0, limit) : allProducts;

  return (
    <div className="catalog-wrapper">
      <span className="sub-mono">// {title}</span>
      <div className="catalog-grid" style={{ marginTop: '24px' }}>
        {displayedProducts.map((item) => (
          <div key={item.id} className="catalog-card">
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

      {limit && (
        <div className="ticker-ribbon sub-mono">
          <span>01 / LIMITED AVAILABILITY</span>
          <span>02 / HARDWARE READY</span>
          <span>03 / RAW TEXTURES Only</span>
        </div>
      )}
    </div>
  );
}

export default ProductCards;