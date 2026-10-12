const TAU = Math.PI * 2;

const W = 500;

const H = W;
const getPixelIndex = (x, y, imageData) =>
  (Math.floor(x) + Math.floor(y) * imageData.width) * 4;
const clamp = (value, min, max) => Math.max(min, Math.min(value, max));
let points = [];
// for slider

const FRAMES_PER_SECOND = 60; // one "second" of painting = 60 frames
const MAX_SECONDS = 30; // must match the slider's max
const snapshots = []; // snapshots[n] = canvas after n seconds
// slider 2
let minDecay = 0.03;
let imageData;
const ctx = document.querySelector(".js-lines").getContext("2d");
const ctxGhost = document.createElement("canvas").getContext("2d");
const imageUrl = "./flower.jpg";

const loadImage = () => {
  const img = new Image();
  img.crossOrigin = "";

  return new Promise(function (resolve, reject) {
    img.addEventListener("load", () => {
      resolve(img);
    });

    img.src = imageUrl;
  });
};

const setupCanvas = (width, height) => {
  ctx.canvas.width = width;
  ctx.canvas.height = height;
  ctxGhost.canvas.width = width;
  ctxGhost.canvas.height = height;
};

const getImageData = (ctxDest, image) => {
  ctxDest.drawImage(image, 0, 0, ctxDest.canvas.width, ctxDest.canvas.height);

  const imageData = ctxDest.getImageData(0, 0, W, H);

  return imageData;
};

const getColorFromPosition = ({ x, y }, imageData) => {
  const pixelIndex = getPixelIndex(x, y, imageData);

  return {
    r: imageData.data[pixelIndex],
    g: imageData.data[pixelIndex + 1],
    b: imageData.data[pixelIndex + 2],
  };
};

const getPoint = (width, height) => {
  const pos = {
    x: Math.random() * width,
    y: Math.random() * height,
  };

  const color = getColorFromPosition(pos, imageData);
  const lightness = (color.r + color.g + color.b) / (3 * 255);
  // const decay = 1 - clamp(lightness * 0.2, 0.03, 0.1);
  //  new code to help on darker images
  // const decay = 1 - clamp(lightness * 0.2, 0.18, 0.1);
  const decay = 1 - clamp(lightness * 0.2, minDecay, 0.1);
  const life = 1;
  const r = 1;

  return {
    pos,
    color,
    life,
    decay,
    r,
  };
};

const update = (point) => {
  point.r += 0.1;

  point.life *= point.decay;
};

const draw = (point) => {
  ctx.fillStyle = `rgba(${point.color.r}, ${point.color.g}, ${point.color.b}, 0.1)`;
  ctx.beginPath();
  ctx.arc(
    point.pos.x - point.r / 2,
    point.pos.y - point.r / 2,
    point.r,
    0,
    TAU,
  );
  ctx.closePath();
  ctx.fill();
};

const clear = () => ctx.clearRect(0, 0, W, H);

const step = () => {
  points.forEach((point) => {
    update(point);
    draw(point);
  });

  for (let i = 0; i < 10; i++) {
    points.push(getPoint(W, H));
    points.push(getPoint(W, H));
    points.push(getPoint(W, H));
  }

  points = points.filter((p) => p.life > 0.01);
};

// build snapshot
const buildSnapshots = (image) => {
  snapshots.length = 0;

  // snapshot 0 = the untouched photo
  ctx.drawImage(image, 0, 0, W, H);
  snapshots.push(ctx.getImageData(0, 0, W, H));

  // then paint from a blank canvas, saving one snapshot per second
  ctx.clearRect(0, 0, W, H);
  points = [];
  for (let s = 1; s <= MAX_SECONDS; s++) {
    for (let f = 0; f < FRAMES_PER_SECOND; f++) step();
    snapshots.push(ctx.getImageData(0, 0, W, H));
  }
};

const start = async () => {
  const image = await loadImage();

  setupCanvas(W, H);

  imageData = getImageData(ctxGhost, image);

  buildSnapshots(image);
  ctx.putImageData(snapshots[0], 0, 0);

  const slider = document.querySelector(".js-duration");
  slider.addEventListener("input", (e) => {
    ctx.putImageData(snapshots[parseInt(e.target.value, 10)], 0, 0);
  });
  const detailSlider = document.querySelector(".js-detail");
  const status = document.querySelector(".js-status");

  detailSlider.addEventListener("change", (e) => {
    minDecay = parseInt(e.target.value, 10) / 100;
    status.textContent = "Repainting...";
    setTimeout(() => {
      buildSnapshots(image);
      ctx.putImageData(snapshots[parseInt(slider.value, 10)], 0, 0);
      status.textContent = "";
    }, 50);
  });
};

start();
