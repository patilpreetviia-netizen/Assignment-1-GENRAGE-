import { useEffect, useRef } from 'react';

// Premium Logo Source
const LOGO_SRC = 'https://genrage.com/cdn/shop/files/logo.png?v=1716806780&width=2800';

function ThreeDLogo() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const logoImgRef = useRef(null);

  // Premium kinetic matrix physics config
  const physicsRef = useRef({
    currentX: 0, currentY: 0,
    targetX: 0, targetY: 0,
    twist: 0, targetTwist: 0,
    velocity: 0.014,
    focalLength: 520, targetFocal: 520
  });

  useEffect(() => {
    const img = new Image();
    img.src = LOGO_SRC;
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      logoImgRef.current = img;
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d', { alpha: true, desynchronized: true });
    let animationId;

    let rotationAngle = 0;
    let waveTime = 0;

    const resizeCanvas = () => {
      if (container && canvas) {
        const dpr = window.devicePixelRatio || 1;
        const rect = container.getBoundingClientRect();

        canvas.width = (rect.width || 240) * dpr;
        canvas.height = (rect.height || 100) * dpr;
        ctx.scale(dpr, dpr);
      }
    };

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      const p = physicsRef.current;
      p.targetX = x * 2.4;
      p.targetY = y * 1.6;
      p.targetTwist = x * 0.45;       // Creates a gorgeous kinetic twist distortion
      p.targetFocal = 440 + (Math.abs(x) * 160); // Dynamic lens compression
    };

    const handleMouseEnter = () => {
      // Snappy, energetic initialization on hover
    };

    const handleMouseLeave = () => {
      const p = physicsRef.current;
      p.targetX = 0;
      p.targetY = 0;
      p.targetTwist = 0;
      p.targetFocal = 520;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    const render = () => {
      if (!canvas || !ctx) return;

      const dpr = window.devicePixelRatio || 1;
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      ctx.clearRect(0, 0, w, h);

      const p = physicsRef.current;

      // Elite Spring-Damper Interpolation Loop
      p.currentX += (p.targetX - p.currentX) * 0.14;
      p.currentY += (p.targetY - p.currentY) * 0.14;
      p.twist += (p.targetTwist - p.twist) * 0.10;
      p.focalLength += (p.targetFocal - p.focalLength) * 0.08;

      // Accelerated velocity decay tracking
      const activeVelocity = p.targetX !== 0 ? 0.024 : 0.014;
      p.velocity += (activeVelocity - p.velocity) * 0.1;
      rotationAngle += p.velocity + (p.currentX * 0.003);

      // Micro-sine ribbon waves 
      waveTime += 0.045;
      const waveY = Math.sin(waveTime) * (p.targetX !== 0 ? 2.5 : 1.2);

      if (logoImgRef.current && logoImgRef.current.complete && logoImgRef.current.width > 0) {
        const img = logoImgRef.current;

        const baseWidth = w * 0.68;
        const aspectRatio = img.height / img.width;
        const baseHeight = baseWidth * aspectRatio;
        const radius = baseWidth / 2;

        // Slice Execution Loop
        for (let x = 0; x < img.width; x++) {
          const normX = (x / img.width) * 2 - 1;

          // Compiles rotation, interactive sway, and micro-ribbon twist mechanics
          const sliceAngle = normX * (Math.PI / 2.2) + rotationAngle + (p.currentX * 0.25) + (normX * p.twist);

          const x3d = Math.sin(sliceAngle) * radius;
          const z3d = Math.cos(sliceAngle) * radius;

          if (z3d < 0) continue; // High-velocity culling

          // Premium camera perspective transform engine
          const perspectiveScale = p.focalLength / (p.focalLength + (radius - z3d));

          const screenX = w / 2 + x3d * perspectiveScale;
          // Apply a vertical offset calculation that reacts fluidly across the image plane
          const screenY = h / 2 + waveY + (p.currentY * 14 * perspectiveScale) + (Math.sin(waveTime + normX) * 1.5);

          ctx.save();
          ctx.translate(screenX, screenY);
          ctx.scale(perspectiveScale, perspectiveScale);

          // Studio Ray-Trace Gloss Shading Simulation
          const normalSpace = z3d / radius;
          const baseAmbient = 0.40 + 0.60 * normalSpace;

          // High-frequency specularity mapping for pristine glass/metallic reflections
          const lightRayAngle = Math.sin(sliceAngle - 0.3);
          const mirrorGlint = Math.pow(Math.max(0, lightRayAngle), 14) * 0.55;

          ctx.globalAlpha = Math.min(1, baseAmbient + mirrorGlint);

          // Render pixel strip segments using fractional sub-pixel overlaps 
          ctx.drawImage(
            img,
            x, 0, 1, img.height,
            -0.55, -baseHeight / 2, 1.65, baseHeight
          );

          ctx.restore();
        }
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="nav-logo-3d-wrapper"
      style={{
        width: '100%',
        height: '100%',
        minHeight: '110px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
          userSelect: 'none'
        }}
      />
    </div>
  );
}

export default ThreeDLogo;