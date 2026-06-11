import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

function Categories() {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (sectionRef.current) {
      gsap.fromTo(
        sectionRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          }
        }
      );
    }
  }, []);

  return (
    <section className="statement-banner" ref={sectionRef}>
      <span className="sub-mono">// STRUCTURAL MANIFESTO</span>
      <h2 className="statement-headline raw-title" style={{ marginTop: '14px' }}>DISRUPTING THE SILHOUETTE</h2>
      <p className="statement-body">
        High-impact materials, oversized tailoring, and heavyweight technical structures executed in monochrome formats. Engineered for modern survivalism.
      </p>
    </section>
  );
}

export default Categories;