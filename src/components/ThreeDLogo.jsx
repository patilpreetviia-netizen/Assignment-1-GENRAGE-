import { useEffect, useRef } from 'react';

// Your image URL
const LOGO_SRC = 'data:image/png;base64,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'; 

function ThreeDLogo() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const logoImgRef = useRef(null);

  // Preload the image asset
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
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;
    
    // Constant, continuous spin metrics
    let angleY = 0;
    const continuousSpeedY = 0.015; // Tweak this number to change rotation speed

    const resizeCanvas = () => {
      const container = containerRef.current;
      if (container && canvas) {
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const render = () => {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const width = canvas.width;
      const height = canvas.height;

      // Update rotation steadily without looking for mouse input
      angleY += continuousSpeedY;

      if (logoImgRef.current) {
        ctx.save();
        
        // Move layout origin to the dead center of the canvas
        ctx.translate(width / 2, height / 2);
        
        // Simulating 3D horizontal rotation by scaling the width using a Cosine wave
        const horizontalScale = Math.cos(angleY);
        
        // Determine rendering dimensions based on canvas scale
        const targetWidth = width * 0.75;
        const aspectRatio = logoImgRef.current.height / logoImgRef.current.width;
        const targetHeight = targetWidth * aspectRatio;

        // Execute the simulated 3D scale transformation matrix
        ctx.scale(horizontalScale, 1);

        // Draw image cleanly aligned to center limits
        ctx.drawImage(
          logoImgRef.current, 
          -targetWidth / 2, 
          -targetHeight / 2, 
          targetWidth, 
          targetHeight
        );
        
        ctx.restore();
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="nav-logo-3d-wrapper"
      /* Removed pointer cursors and touch/mouse interaction handlers entirely */
      style={{ width: '100%', height: '100%', pointerEvents: 'none' }} 
    >
      <canvas 
        ref={canvasRef} 
        style={{ display: 'block', width: '100%', height: '100%' }}
      />
    </div>
  );
}

export default ThreeDLogo;