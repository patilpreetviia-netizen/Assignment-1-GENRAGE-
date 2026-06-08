import { useState } from 'react';

/**
 * ProductImage Component
 * Renders a product image with a sleek, technical wireframe fallback if the image
 * path is empty, missing, or fails to load.
 */
function ProductImage({ src, alt, className = '', style = {} }) {
  const [hasError, setHasError] = useState(false);

  // If there's no src, trigger the fallback immediately
  const triggerFallback = !src || hasError;

  if (triggerFallback) {
    // Elegant Cyber-Minimal wireframe design matching the GENRAGE aesthetic
    return (
      <div 
        className={`fallback-wireframe ${className}`} 
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#050505',
          border: '1px solid #111111',
          position: 'relative',
          overflow: 'hidden',
          padding: '24px',
          ...style
        }}
      >
        {/* Technical Grid lines */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'linear-gradient(#0c0c0c 1px, transparent 1px), linear-gradient(90deg, #0c0c0c 1px, transparent 1px)',
          backgroundSize: '20px 20px',
          opacity: 0.8,
          pointerEvents: 'none'
        }} />

        {/* Outer Corner Accents */}
        <div style={{ position: 'absolute', top: '10px', left: '10px', width: '8px', height: '8px', borderTop: '1px solid #333', borderLeft: '1px solid #333' }} />
        <div style={{ position: 'absolute', top: '10px', right: '10px', width: '8px', height: '8px', borderTop: '1px solid #333', borderRight: '1px solid #333' }} />
        <div style={{ position: 'absolute', bottom: '10px', left: '10px', width: '8px', height: '8px', borderBottom: '1px solid #333', borderLeft: '1px solid #333' }} />
        <div style={{ position: 'absolute', bottom: '10px', right: '10px', width: '8px', height: '8px', borderBottom: '1px solid #333', borderRight: '1px solid #333' }} />

        {/* Blueprint Circle & Crosshairs */}
        <div style={{
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          border: '1px dashed #222222',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '20px'
        }}>
          {/* Vertical axis */}
          <div style={{ position: 'absolute', width: '1px', height: '140px', backgroundColor: 'rgba(51, 51, 51, 0.3)' }} />
          {/* Horizontal axis */}
          <div style={{ position: 'absolute', height: '1px', width: '140px', backgroundColor: 'rgba(51, 51, 51, 0.3)' }} />
          
          {/* Inner circle */}
          <div style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            border: '1px solid #1c1c1c',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#444" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          </div>
        </div>

        {/* Text Details */}
        <div style={{ textAlign: 'center', zIndex: 1, pointerEvents: 'none' }}>
          <div className="sub-mono" style={{ fontSize: '8px', color: '#555', letterSpacing: '0.3em', marginBottom: '6px' }}>
            [ CORE SHIELD ARCHIVE ]
          </div>
          <div 
            style={{ 
              fontFamily: 'Syncopate, sans-serif', 
              fontSize: '9px', 
              color: '#888', 
              fontWeight: 700,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              maxWidth: '180px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              margin: '0 auto 8px auto'
            }}
          >
            {alt}
          </div>
          <div style={{ fontFamily: 'monospace', fontSize: '8px', color: '#333', letterSpacing: '0.05em' }}>
            SYS.REF // {Math.random().toString(36).substring(2, 8).toUpperCase()}<br />
            FABRICATE // INCOMING
          </div>
        </div>
      </div>
    );
  }

  return (
    <img 
      src={src} 
      alt={alt} 
      className={className} 
      style={style} 
      onError={() => setHasError(true)}
      loading="lazy"
    />
  );
}

export default ProductImage;
