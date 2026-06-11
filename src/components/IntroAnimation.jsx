import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const IntroAnimation = ({ onComplete }) => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const [isRendered, setIsRendered] = useState(true);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setIsRendered(false);
        if (onComplete) onComplete();
      }
    });

    tl.to(textRef.current, {
      opacity: 1,
      duration: 1,
      ease: 'power2.inOut'
    })
    .to(textRef.current, {
      opacity: 0,
      duration: 1,
      delay: 0.5,
      ease: 'power2.inOut'
    })
    .to(containerRef.current, {
      yPercent: -100,
      duration: 1.2,
      ease: 'power4.inOut'
    });

  }, [onComplete]);

  if (!isRendered) return null;

  return (
    <div 
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        backgroundColor: '#000',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontFamily: 'Syncopate'
      }}
    >
      <div ref={textRef} style={{ opacity: 0, fontSize: '2rem', letterSpacing: '0.2em' }} className="raw-title">
        GENRAGE
      </div>
    </div>
  );
};

export default IntroAnimation;
