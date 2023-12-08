const canvas = document.querySelector(".ufo");
const SPKcanvas = document.querySelector(".sparkles");

const c = canvas.getContext("2d");
const s = SPKcanvas.getContext("2d");


let x = (initialX = canvas.width / 2);
let y = canvas.height / 2 ;


let sinval = 0;

const keys = {
  d: {
    pressed: false,
  },

  a: {
    pressed: false,
  },
  w: {
    pressed: false,
  },
  s: {
    pressed: false,
  },
};

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.position = "fixed";
canvas.style.top = "0";
canvas.style.left = "0";
canvas.style.zIndex = "9999"; // Set a high z-index value

SPKcanvas.width = window.innerWidth;
SPKcanvas.height = window.innerHeight;
SPKcanvas.style.position = "fixed";
SPKcanvas.style.top = "0";
SPKcanvas.style.left = "0";
SPKcanvas.style.zIndex = "9999";

canvas.style.display="none";
SPKcanvas.style.display="none";

UFOtog=false;

function toggleUFO(){
    if(UFOtog){
        canvas.style.display="none";
        SPKcanvas.style.display="none";
        UFOtog = false   
    }else{
        canvas.style.display = "";
        SPKcanvas.style.display = "";
        c.clearRect(0,0,canvas.width,canvas.height);
        s.clearRect(0,0,canvas.width,canvas.height);

        x = 500;
        y = 500 ;
        UFOtog= "true";
        
    }
};

const gravity = 5;
const ufoimg = new Image();
ufoimg.src = "ufo.gif";

const sparkleimg = new Image();
sparkleimg.src = "sparkle.png";




ufoimg.onload = function () {
  console.log("Image loaded successfully");
    
  c.drawImage(ufoimg, x, y, 80, 80);
  animate();

};

function animate() {
  // Move the UFO
  let xOld = x;
    let yOld = y;

  if(keys.d.pressed||keys.a.pressed||keys.s.pressed||keys.w.pressed){

    

  if (keys.d.pressed) x += 20; // Adjust the speed as needed
  if (keys.a.pressed) x += -20;
  if (keys.s.pressed) y += +16;
  if (keys.w.pressed) y += -16;
  }else{
  sinval += 3;
  y += Math.sin(sinval / 30) * 5; // Adjust the movement pattern as needed
  }

  // Clear the canvas
  c.clearRect(xOld, yOld, 80, 80);

  s.drawImage(sparkleimg, x+10, y+60,50,50);


  // Draw the UFO with the new position

  c.drawImage(ufoimg, x, y, 80, 80);

  // Request the next frame
  requestAnimationFrame(animate);
}

ufoimg.onerror = function () {
  console.error("Error loading image");
};

window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});


window.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "d":
      keys.d.pressed = true;
      break;
    case "a":
      keys.a.pressed = true;
      break;
    case "w":
      keys.w.pressed = true;
      break;
    case "s":
      keys.s.pressed = true;
      break;
    case "u":
        toggleUFO();
        break;
  }
});

window.addEventListener("keyup", (event) => {
  switch (event.key) {
    case "d":
      keys.d.pressed = false;
      break;
    case "a":
      keys.a.pressed = false;
      break;
    case "w":
      keys.w.pressed = false;
      break;
    case "s":
      keys.s.pressed = false;
      break;
  }
});
