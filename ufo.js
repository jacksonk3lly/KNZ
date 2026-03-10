function initUFO() {
  if (!document.querySelector(".ufo")) {
      const canvas = document.createElement('canvas');
      canvas.className = 'ufo';
      document.body.appendChild(canvas);
  }
  if (!document.querySelector(".sparkles")) {
      const canvas = document.createElement('canvas');
      canvas.className = 'sparkles';
      document.body.appendChild(canvas);
  }

  const canvas = document.querySelector(".ufo");
  const SPKcanvas = document.querySelector(".sparkles");
  if (!canvas || !SPKcanvas) return;

  const c = canvas.getContext("2d");
  const s = SPKcanvas.getContext("2d");

  let x = window.innerWidth / 2;
  let y = window.innerHeight / 2;
  let targetX = x;
  let targetY = y;
  let sinval = 0;
  let hue = 0;
  let lastScrollY = window.scrollY;

  const particles = [];
  const sparkleimg = new Image();
  sparkleimg.src = "sparkle.png";

  const ufoimg = new Image();
  ufoimg.src = "UFO.gif";

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = Math.max(document.body.scrollHeight, window.innerHeight);
    SPKcanvas.width = window.innerWidth;
    SPKcanvas.height = Math.max(document.body.scrollHeight, window.innerHeight);
  }

  resize();

  function createParticle(px, py) {
    hue = (hue + 10) % 360;
    particles.push({
      x: px,
      y: py,
      size: Math.random() * 30 + 20,
      opacity: 1,
      life: 1.0,
      rotation: Math.random() * Math.PI * 2,
      hue: hue
    });
  }

  function animate() {
    // Track scroll changes to keep particles "pinned"
    const currentScrollY = window.scrollY;
    const scrollDelta = currentScrollY - lastScrollY;
    lastScrollY = currentScrollY;

    // Movement toward target (slower 0.05)
    x += (targetX - x) * 0.05;
    y += (targetY - y) * 0.05;

    sinval += 0.05;
    const hoverY = y + Math.sin(sinval) * 10;

    // Create a new sparkle frequently
    if (Math.random() > 0.5) {
      createParticle(x - 10 + (Math.random() * 20 - 10), hoverY + 30 + (Math.random() * 10));
    }

    c.clearRect(0, 0, canvas.width, canvas.height);
    s.clearRect(0, 0, SPKcanvas.width, SPKcanvas.height);

    // Update and draw sparkles
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.life -= 0.008; 
      p.opacity = p.life;
      p.size -= 0.05;

      if (p.life <= 0) {
        particles.splice(i, 1);
        continue;
      }

      s.save();
      s.globalAlpha = p.opacity;
      s.filter = `hue-rotate(${p.hue}deg) brightness(1.2)`;
      s.translate(p.x, p.y);
      s.rotate(p.rotation);
      s.drawImage(sparkleimg, -p.size / 2, -p.size / 2, p.size, p.size);
      s.restore();
    }
    
    c.drawImage(ufoimg, x - 40, hoverY - 40, 80, 80);
    requestAnimationFrame(animate);
  }

  ufoimg.onload = () => animate();

  window.addEventListener("touchstart", (e) => {
      targetX = e.touches[0].pageX;
      targetY = e.touches[0].pageY;
  }, { passive: true });

  window.addEventListener("touchmove", (e) => {
      targetX = e.touches[0].pageX;
      targetY = e.touches[0].pageY;
  }, { passive: true });

  window.addEventListener("mousemove", (e) => {
      targetX = e.pageX;
      targetY = e.pageY;
  });

  window.addEventListener("resize", resize);
  window.addEventListener("load", resize);
  setInterval(resize, 2000);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initUFO);
} else {
  initUFO();
}
