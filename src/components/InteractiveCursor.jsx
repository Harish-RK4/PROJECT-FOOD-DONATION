import React, { useEffect, useRef } from 'react';

const InteractiveCursor = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    let particlesArray = [];
    
    const mouse = {
      x: null,
      y: null,
    };

    window.addEventListener('resize', () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    });

    window.addEventListener('mousemove', (event) => {
      mouse.x = event.x;
      mouse.y = event.y;
      // Spawn 1-2 particles on mouse move
      for (let i = 0; i < 2; i++) {
        particlesArray.push(new Particle());
      }
    });

    class Particle {
      constructor() {
        this.x = mouse.x;
        this.y = mouse.y;
        this.size = Math.random() * 2.5 + 0.5;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.life = 100; // life in frames
        // We use our primary emerald color for the star glow
        this.color = `rgba(16, 185, 129, ${Math.random() * 0.8 + 0.2})`;
      }
      
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life -= 2;
        if (this.size > 0.1) this.size -= 0.02;
      }
      
      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.beginPath();
        
        // Draw a professional 4-point star
        for (let i = 0; i < 8; i++) {
          ctx.rotate(Math.PI / 4);
          ctx.lineTo(0, 0 - (i % 2 === 0 ? this.size * 2 : this.size / 2));
        }
        
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#10b981';
        ctx.fill();
        ctx.restore();
      }
    }

    function handleParticles() {
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
        
        if (particlesArray[i].life <= 0 || particlesArray[i].size <= 0.1) {
          particlesArray.splice(i, 1);
          i--;
        }
      }
    }

    function animate() {
      // Clear the canvas softly to leave a very subtle trailing glow
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      handleParticles();
      requestAnimationFrame(animate);
    }

    animate();

    return () => {
      window.removeEventListener('resize', () => {});
      window.removeEventListener('mousemove', () => {});
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 9999,
      }}
    />
  );
};

export default InteractiveCursor;
