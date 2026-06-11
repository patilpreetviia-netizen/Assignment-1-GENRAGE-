import { useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

function Hero() {
  const navigate = useNavigate();
  const textRef = useRef(null);

  useEffect(() => {
    if (textRef.current) {
      gsap.fromTo(
        textRef.current.children,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.5, stagger: 0.3, ease: 'power4.out', delay: 0.5 }
      );
    }
  }, []);

  return (
    <header className="hero-showcase">
      <div
        className="hero-split-side"
        style={{ backgroundImage: `url('https://genrage.com/cdn/shop/files/GENRAGE_BANNER.png?crop=center&height=1200&v=1779454108&width=1200')` }}
      ></div>
      <div
        className="hero-split-side"
        style={{ backgroundImage: `url('https://genrage.com/cdn/shop/files/GENRAGE_BANNER.png?crop=center&height=1200&v=1779454108&width=1200')` }}
      ></div>

      <div className="hero-text-overlay" ref={textRef}>
        <h1 className="hero-main-heading raw-title">RAW<br />STAPLES<br />ARCHIVE</h1>
        <button className="hero-action-btn" onClick={() => navigate('/catalog')}>ENTER APP</button>
      </div>
    </header>
  );
}

export default Hero;