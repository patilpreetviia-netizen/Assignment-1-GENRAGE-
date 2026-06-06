import { useState, useEffect } from 'react';

function PromoVideoBanner() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeText, setTimeText] = useState('00:00:00');

  // Running clock inside the mock surveillance media stream
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      const now = new Date();
      setTimeText(now.toTimeString().split(' ')[0]);
    }, 1000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <section className="media-banner">
      <img src="https://images.mid-day.com/images/images/2025/jan/Generage_d.jpg" alt="Cinematic Overlay" />
      <div className="media-content" onClick={() => setIsPlaying(true)}>
        <div className="play-indicator">▶</div>
        <h3 className="raw-title" style={{ fontSize: '28px', cursor: 'pointer' }}>CORE SYSTEM MOTION</h3>
        <span className="sub-mono" style={{ display: 'block', marginTop: '12px', color: '#888888', cursor: 'pointer' }}>
          [ AUDIO FEED ENGAGED — Click to Stream ]
        </span>
      </div>

      {isPlaying && (
        <div className="modal-overlay" onClick={() => setIsPlaying(false)}>
          <div 
            className="modal-surface" 
            style={{ 
              maxWidth: '850px', 
              padding: '30px', 
              border: '1px solid #333', 
              position: 'relative',
              textAlign: 'center',
              backgroundColor: '#000000'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #222', paddingBottom: '16px', marginBottom: '20px' }}>
              <span className="sub-mono">// RAW SYSTEM MOTION STREAM</span>
              <button 
                onClick={() => setIsPlaying(false)}
                style={{ background: 'none', border: 'none', color: '#ffffff', cursor: 'pointer', fontSize: '16px' }}
              >
                ✕
              </button>
            </div>

            {/* Simulated Surveillance video feed screen */}
            <div 
              style={{ 
                height: '400px', 
                backgroundColor: '#030303', 
                border: '1px solid #111', 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center', 
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Scanline overlay effect */}
              <div 
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))',
                  backgroundSize: '100% 4px, 6px 100%',
                  pointerEvents: 'none',
                  zIndex: 2
                }}
              />

              {/* Running numbers and metrics */}
              <div style={{ position: 'absolute', top: '20px', left: '20px', textAlign: 'left', fontFamily: 'monospace', fontSize: '10px', color: '#888' }}>
                REC [●] SOURCE: CAM_082<br />
                FEED: active_48khz<br />
                MATRIX: 1920x1080
              </div>

              <div style={{ position: 'absolute', top: '20px', right: '20px', fontFamily: 'monospace', fontSize: '10px', color: '#888' }}>
                TIME: {timeText}<br />
                FPS: 24.00<br />
                ENCRYPTION: SHIELD_AES
              </div>

              {/* Central Pulsing Branding */}
              <div 
                className="raw-title" 
                style={{ 
                  fontSize: '48px', 
                  letterSpacing: '0.1em', 
                  opacity: 0.15,
                  animation: 'pulse 1.5s infinite',
                  color: '#ffffff'
                }}
              >
                GENRAGE
              </div>

              {/* Graphic grid layout */}
              <div style={{ position: 'absolute', bottom: '20px', left: '20px', right: '20px', display: 'flex', justifyContent: 'space-between', fontFamily: 'monospace', fontSize: '9px', color: '#555' }}>
                <span>[ LAYER_01 // CORE_FIT_FABRICATION ]</span>
                <span>[ ENCODING BITRATE: 12.4 MB/S ]</span>
              </div>
            </div>

            <p className="sub-mono" style={{ marginTop: '20px', color: '#666', fontSize: '9px' }}>
              * Streaming direct video data from the Mumbai distribution architecture node.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}

export default PromoVideoBanner;