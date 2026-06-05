import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Categories from './components/Categories';
import ProductCards from './components/ProductCards';
import LookbookFeature from './components/LookbookFeature';
import PromoVideoBanner from './components/PromoVideoBanner';
import Newsletter from './components/Newsletter';
import SizeGuideModal from './components/SizeGuideModal';
import Footer from './components/Footer';

function App() {
  const [view, setView] = useState('home');
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="app-luxury-minimal-root">
      <Navbar setView={setView} currentView={view} />
      
      {view === 'home' && (
        <>
          <Hero setView={setView} />
          <Categories />
          <ProductCards title="Incoming Core Drops" limit={4} />
          
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
          <h2 className="statement-headline raw-title" style={{ textAlign: 'center', margin: '60px 0', fontSize: '36px' }}>
            System Collection Archive
          </h2>
          <ProductCards title="Full Hardware" />
        </div>
      )}

      {view === 'about' && (
        <div style={{ paddingTop: '20px' }}>
          <h2 className="statement-headline raw-title" style={{ textAlign: 'center', margin: '60px 0', fontSize: '36px' }}>
            Core Manifest // Identity
          </h2>
          <LookbookFeature />
        </div>
      )}

      <Footer />
      <SizeGuideModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

export default App;