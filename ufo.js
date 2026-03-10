// Add canvases to body if they don't exist
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

const c = canvas.getContext("2d");
const s = SPKcanvas.getContext("2d");

let x = window.innerWidth / 2;
let y = window.innerHeight / 2;
let targetX = x;
let targetY = y;

let sinval = 0;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.position = "fixed";
canvas.style.top = "0";
canvas.style.left = "0";
canvas.style.zIndex = "9999";
canvas.style.pointerEvents = "none";

SPKcanvas.width = window.innerWidth;
SPKcanvas.height = window.innerHeight;
SPKcanvas.style.position = "fixed";
SPKcanvas.style.top = "0";
SPKcanvas.style.left = "0";
SPKcanvas.style.zIndex = "9998";
SPKcanvas.style.pointerEvents = "none";

const ufoimg = new Image();
ufoimg.src = "UFO.gif";

const sparkleimg = new Image();
sparkleimg.src = "sparkle.png";

ufoimg.onload = function () {
  animate();
};

function animate() {
  // Smooth movement towards target
  x += (targetX - x) * 0.1;
  y += (targetY - y) * 0.1;

  // Hover effect
  sinval += 0.05;
  const hoverY = y + Math.sin(sinval) * 10;

  c.clearRect(0, 0, canvas.width, canvas.height);
  s.clearRect(0, 0, SPKcanvas.width, SPKcanvas.height);

  // Draw sparkle trailing behind
  s.globalAlpha = 0.5 + Math.sin(sinval) * 0.2;
  s.drawImage(sparkleimg, x - 10, hoverY + 40, 60, 60);
  
  // Draw UFO
  c.drawImage(ufoimg, x - 40, hoverY - 40, 80, 80);

  requestAnimationFrame(animate);
}

// Mobile Touch Support
window.addEventListener("touchstart", (e) => {
    targetX = e.touches[0].clientX;
    targetY = e.touches[0].clientY;
}, { passive: true });

window.addEventListener("touchmove", (e) => {
    targetX = e.touches[0].clientX;
    targetY = e.touches[0].clientY;
}, { passive: true });

// Mouse Support
window.addEventListener("mousemove", (e) => {
    targetX = e.clientX;
    targetY = e.clientY;
});

window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  SPKcanvas.width = window.innerWidth;
  SPKcanvas.height = window.innerHeight;
});
