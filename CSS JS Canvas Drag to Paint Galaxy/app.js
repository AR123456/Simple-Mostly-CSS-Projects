const w = window.innerWidth;
const h = window.innerHeight;
// console.log(w, h);
const dustCanvas = document.createElement("canvas");
const dustCtx = dustCanvas.getContext("2d");
const starCanvas = document.createElement("canvas");
const starCtx = starCanvas.getContext("2d");

document.body.appendChild(dustCanvas);
document.body.appendChild(starCanvas);

dustCanvas.width = starCanvas.width = w;
dustCanvas.height = starCanvas.height = h;
// console.log(dustCanvas.width, dustCanvas.height);
//https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation
// lighter- Where both shapes overlap the color is determined by adding color values.
dustCtx.globalCompositeOperation = "lighter";
starCtx.globalCompositeOperation = "lighter";

const galaxies = [];
const mouse = {
  pos: {
    x: w * 0.5,
    y: h * 0.5,
  },

  speed: 0,
};
const randomNumbers = (length) =>
  Array.from(new Array(length), () => Math.random());
const PI = Math.PI;
const TAU = PI * 2;
const r = () => Math.random();
const angle2 = (p1, p2) => Math.atan2(p2[1] - p1[1], p2[0] - p1[0]);
const distance2 = (p1, p2) =>
  Math.sqrt(Math.pow(p1[0] - p2[0], 2) + Math.pow(p1[1] - p2[1], 2));
const createDustParticle = (color) => {
  const canvas = document.createElement("canvas");

  const w = 100;
  const h = 100;

  const cx = w * 0.5;
  const cy = h * 0.5;

  canvas.width = w;
  canvas.height = h;

  const ctx = canvas.getContext("2d");
  canvas.ctx = ctx;

  const xRand = -5 + r() * 10;
  const yRand = -5 + r() * 10;
  const xRand2 = 10 + r() * (cx / 2);
  const yRand2 = 10 + r() * (cy / 2);

  var color = color || {
    r: Math.round(150 + r() * 100),
    g: Math.round(50 + r() * 100),
    b: Math.round(50 + r() * 100),
  };
  ctx.fillStyle = `rgba(${color.r},${color.g},${color.b},.02)`;
  Array.from(new Array(200), () => randomNumbers(3)).forEach((p, i, arr) => {
    const length = arr.length;
    const x = Math.cos((TAU / xRand / length) * i) * p[2] * xRand2 + cy;
    const y = Math.sin((TAU / yRand / length) * i) * p[2] * yRand2 + cy;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.arc(x, y, p[2] * 4, 0, TAU);
    ctx.fill();
  });
  //   console.log(canvas);
  return canvas;
};
////
const Galaxy = function (x, y) {};
//
const Star = function (x, y) {};
//
const Dust = function (x, y, size) {};
//
const updateStarDust = (s, g) => {};
//
const update = () => {};
//
const render = () => {};
//
let currentGalaxy = null;

let drawingMode = false;
//
const activateDraw = (e) => {};
//
const disableDraw = (e) => {};
//
const draw = (e) => {};
//

//// the drawing loop
const loop = () => {
  draw();
  update();
  render();
  window.requestAnimationFrame(loop);
};

loop();

/// move event
const moveEvent = (e) => {
  mouse.speed = distance2([e.layerX, e.layerY], [mouse.pos.x, mouse.pos.y]);
  mouse.pos.x = e.layerX;
  mouse.pos.y = e.layerY;
  draw(e);
};

//  window listeners
window.addEventListener("mousedown", activateDraw);
window.addEventListener("mousemove", moveEvent);
window.addEventListener("mouseup", disableDraw);
window.addEventListener("touchstart", activateDraw);
window.addEventListener("touchmove", moveEvent);
window.addEventListener("touchend", disableDraw);
