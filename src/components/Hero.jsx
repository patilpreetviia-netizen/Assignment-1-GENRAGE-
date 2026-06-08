import { useNavigate } from 'react-router-dom';

function Hero() {
  const navigate = useNavigate();

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

      <div className="hero-text-overlay">
        <h1 className="hero-main-heading raw-title">RAW<br />STAPLES<br />ARCHIVE</h1>
        <button className="hero-action-btn" onClick={() => navigate('/catalog')}>ENTER APP</button>
      </div>
    </header>
  );
}

export default Hero;