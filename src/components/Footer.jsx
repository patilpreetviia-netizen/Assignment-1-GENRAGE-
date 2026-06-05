import React from 'react';

function Footer() {
  return (
    <footer>
      <div className="split-info-row">
        <div className="split-text-block">
          <span className="sub-mono">// THE SIGNATURE</span>
          <h2 className="raw-title" style={{ marginTop: '12px' }}>GENRAGE PANTS</h2>
          <p>GENRAGE PANTS represent a deliberate rebellion against the fleeting nature of modern fast fashion. Designed under "The Signature" line, these garments are approached more like structural architecture than temporary apparel, utilizing robust hardware options and uncompromising construction methods. By focusing entirely on pure black executions, the design strips away superficial distractions to emphasize form, utility, and resilience. They are engineered not just for the current season, but as enduring wardrobe staples built to withstand daily wear and outlast generations.</p>
          <button className="split-btn">READ TRACK</button>
        </div>
        <div className="split-image-block">
          <img src="https://genrage.com/cdn/shop/files/Artboard_2_8.png?v=1768487310&width=600" alt="Mission Context" />
        </div>
      </div>

      <div className="split-info-row reverse">
        <div className="split-text-block">
          <span className="sub-mono">// FUTURE FOCUS</span>
          <h2 className="raw-title" style={{ marginTop: '12px' }}></h2>
          <p>GENRAGE is an architectural approach to apparel, engineered as a direct antidote to disposable fast fashion. By focusing on pure black executions, structural hardware, and exceptional durability, the brand builds enduring personal infrastructure designed to outlast generations.</p>
          <button className="split-btn">EXPLORE LAB</button>
        </div>
        <div className="split-image-block">
          <img src="https://i.pinimg.com/736x/24/83/28/248328411a20b4824b9474232ef71387.jpg" alt="Vision Context" />
        </div>
        <div><h5>© 2026 GENRAGE. ALL RIGHTS RESERVED.</h5></div>
      </div>
    </footer>
  );
}

export default Footer;