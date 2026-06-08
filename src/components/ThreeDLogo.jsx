import { useEffect, useRef } from 'react';

// Your image URL
const LOGO_SRC = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_vP32FjoRgyvyiTfvEdc6eUeRn8I9fhQWPA&s'; 

function ThreeDLogo() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const logoImgRef = useRef(null);

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
    
    // Smooth, professional slow-spin speed
    let rotationAngle = 0;
    const rotationSpeed = 0.008; 

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

      rotationAngle += rotationSpeed;

      if (logoImgRef.current) {
        const img = logoImgRef.current;
        
        // Target baseline sizing
        const baseWidth = width * 0.75;
        const aspectRatio = img.height / img.width;
        const baseHeight = baseWidth * aspectRatio;

        // 3D Perspective controls
        const radius = baseWidth / 2; // Radius of the virtual cylinder rotation
        const projectionDistance = 400; // Camera focal length / perspective depth

        // High-fidelity slicing: Slice the image into 1-pixel wide segments 
        // to map them into 3D coordinates smoothly.
        for (let x = 0; x < img.width; x++) {
          // Normalize x coordinate between -1 and 1
          const normalizedX = (x / img.width) * 2 - 1;
          
          // Current angular position of this specific slice on the cylinder
          const sliceAngle = normalizedX * (Math.PI / 2.5) + rotationAngle;

          // Compute 3D Coordinates (X, Z)
          const 3dX = Math.sin(sliceAngle) * radius;
          const 3dZ = Math.cos(sliceAngle) * radius;

          // Don't render the slice if it cycles behind the center plane 
          // (Creates a clean front-facing wrap-around)
          if (3dZ < 0) continue;

          // Apply perspective math
          const perspectiveScale = projectionDistance / (projectionDistance + (radius - 3dZ));
          
          const screenX = width / 2 + 3dX * perspectiveScale;
          const screenY = height / 2;
          const finalHeight = baseHeight * perspectiveScale;

          ctx.save();
          
          // Move to the segment's screen coordinate
          ctx.translate(screenX, screenY);
          
          // Scale based on distance from the camera
          ctx.scale(perspectiveScale, perspectiveScale);

          // Subtle dynamic lighting shading: darker at the edges/depths, brighter upfront
          const lightingShade = 0.3 + 0.7 * (3dZ / radius);
          ctx.globalAlpha = lightingShade;

          // Draw the exact 1px wide strip of the logo
          ctx.drawImage(
            img,
            x, 0, 1, img.height, // Source slice
            -0.5, -baseHeight / 2, 1.5, baseHeight // Destination slice (slight overlap prevents gaps)
          );

          ctx.restore();
        }
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
