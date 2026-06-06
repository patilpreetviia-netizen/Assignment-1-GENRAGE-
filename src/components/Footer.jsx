function Footer() {
  return (
    <footer>
      {/* Aspect Row 1 */}
      <div className="split-info-row">
        <div className="split-text-block">
          <span className="sub-mono">// THE SIGNATURE</span>
          <h2 className="raw-title" style={{ marginTop: '12px' }}>GENRAGE PANTS</h2>
          <p>
            GENRAGE PANTS represent a deliberate rebellion against the fleeting nature of modern fast fashion. Designed under "The Signature" line, these garments are approached more like structural architecture than temporary apparel, utilizing robust hardware options and uncompromising construction methods. By focusing entirely on pure black executions, the design strips away superficial distractions to emphasize form, utility, and resilience.
          </p>
          <button className="split-btn" onClick={() => alert('SYSTEM // ARCHIVE TRACK: ACTIVE INTEGRATION INITIATED')}>
            Read Track
          </button>
        </div>
        <div className="split-image-block">
          <img src="https://genrage.com/cdn/shop/files/Artboard_2_8.png?v=1768487310&width=600" alt="Mission Context" />
        </div>
      </div>

      {/* Aspect Row 2 */}
      <div className="split-info-row reverse">
        <div className="split-text-block">
          <span className="sub-mono">// FUTURE FOCUS</span>
          <h2 className="raw-title" style={{ marginTop: '12px' }}>Structural Form</h2>
          <p>
            GENRAGE is an architectural approach to apparel, engineered as a direct antidote to disposable fast fashion. By focusing on pure black executions, structural hardware, and exceptional durability, the brand builds enduring personal infrastructure designed to outlast generations.
          </p>
          <button className="split-btn" onClick={() => alert('SYSTEM // LAB ARCHIVE: INTEL ACCESS GRANTED')}>
            Explore Lab
          </button>
        </div>
        <div className="split-image-block">
          <img src="https://i.pinimg.com/736x/24/83/28/248328411a20b4824b9474232ef71387.jpg" alt="Vision Context" />
        </div>
      </div>

      {/* Bottom Credits */}
      <div className="footer-credits">
        <h5>© 2026 PREET PATIL. ALL RIGHTS RESERVED. TERMINAL SECURED.</h5>
      </div>
    </footer>
  );
}

export default Footer;