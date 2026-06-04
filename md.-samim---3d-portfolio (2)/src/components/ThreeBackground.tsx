import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  z: number;
  px: number;
  py: number;
}

export default function ThreeBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const particles: Particle[] = [];
    const count = 75;
    const speed = 0.5;

    // Initialize 3D cloud
    for (let i = 0; i < count; i++) {
      particles.push({
        x: (Math.random() - 0.5) * 1000,
        y: (Math.random() - 0.5) * 1000,
        z: Math.random() * 1000,
        px: 0,
        py: 0
      });
    }

    // Capture mouse coordinates
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = (e.clientX - width / 2) * 0.15;
      targetY = (e.clientY - height / 2) * 0.15;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    const fov = 350; // Field of view depth projection limit

    function draw() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, width, height);

      // Smooth camera interpolation
      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;

      // Draw background ambient theme glow
      const bgGrad = ctx.createRadialGradient(
        width / 2 + currentX,
        height / 2 + currentY,
        10,
        width / 2,
        height / 2,
        Math.max(width, height)
      );
      bgGrad.addColorStop(0, '#ffffff'); // Crisp white center shimmer
      bgGrad.addColorStop(0.5, '#f8fafc'); // Softest slate-50 gray-blue
      bgGrad.addColorStop(1, '#f1f5f9'); // Clean slate-100 edge
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Sort particles by depth Z coordinate for correct layering
      particles.sort((a, b) => b.z - a.z);

      ctx.strokeStyle = 'rgba(14, 116, 144, 0.05)'; // Deep cyan grid lines
      ctx.lineWidth = 1;

      // Update and project particles in 3D coordinates
      for (let i = 0; i < count; i++) {
        const p = particles[i];

        // Slowly drift forward
        p.z -= speed;
        if (p.z <= 0) {
          p.z = 1000;
          p.x = (Math.random() - 0.5) * 1000;
          p.y = (Math.random() - 0.5) * 1000;
        }

        // Apply rotation based on mouse coordinates
        const angleY = currentX * 0.0005;
        const angleX = currentY * 0.0005;

        // Rotate Y axis
        let x1 = p.x * Math.cos(angleY) - p.z * Math.sin(angleY);
        let z1 = p.z * Math.cos(angleY) + p.x * Math.sin(angleY);

        // Rotate X axis
        let y1 = p.y * Math.cos(angleX) - z1 * Math.sin(angleX);
        let z2 = z1 * Math.cos(angleX) + p.y * Math.sin(angleX);

        // Projecting 3D onto 2D screen coordinates
        const scale = fov / (fov + z2);
        const x2 = x1 * scale + width / 2;
        const y2 = y1 * scale + height / 2;

        p.px = x2;
        p.py = y2;

        if (x2 >= 0 && x2 <= width && y2 >= 0 && y2 <= height) {
          const brightness = Math.max(0, Math.min(1, scale * 1.5));
          const size = Math.max(1, scale * 3.5);

          // Render particle star
          ctx.fillStyle = `rgba(14, 116, 144, ${brightness * 0.4})`; // Premium Deep Cyan/Teal
          ctx.beginPath();
          ctx.arc(x2, y2, size, 0, Math.PI * 2);
          ctx.fill();

          // Connect adjacent stars with faint light paths
          if (i > 0) {
            const prev = particles[i - 1];
            const dx = p.px - prev.px;
            const dy = p.py - prev.py;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 120) {
              ctx.strokeStyle = `rgba(99, 102, 241, ${(1 - dist / 120) * 0.16 * brightness})`; // Premium Deep Indigo
              ctx.beginPath();
              ctx.moveTo(p.px, p.py);
              ctx.lineTo(prev.px, prev.py);
              ctx.stroke();
            }
          }
        }
      }

      animationId = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="cosmic-3d-bg"
      className="absolute top-0 left-0 w-full h-full pointer-events-none block z-0"
    />
  );
}
