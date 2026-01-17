let particlesReady = false;

// UMD wrapper
(function (root, factory) {
  if (typeof define === "function" && define.amd) {
    define(["html2canvas"], factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory(require("html2canvas"));
  } else {
    root.disintegrate = factory(root.html2canvas);
  }
})(typeof self !== "undefined" ? self : this, function (html2canvas) {
  "use strict";

  let disElems;
  let dises = [];
  let disParticleTypes = [];
  let numCanvasesLoaded = 0;
  let raf;

  function findParentWithAttr(el, attr) {
    let original = el;
    while ((el = el.parentElement) && !el.hasAttribute(attr));
    if (original === el) el = el.parentNode;
    return el;
  }

  function getCoords(elem) {
    let box = elem.getBoundingClientRect();
    return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset,
    };
  }

  function getNumberArraysFromString(string) {
    let array = [];
    let re = /\[(.*?)(?=\])/g;
    let matches;
    do {
      matches = re.exec(string);
      if (matches) array.push(matches[1].split(",").map(Number));
    } while (matches);
    return array;
  }

  function processDisElement(el) {
    let ignoreColors = [];
    if (el.dataset.disIgnoreColors) {
      ignoreColors = getNumberArraysFromString(el.dataset.disIgnoreColors);
    }

    let particleType = el.dataset.disParticleType || "Particle";
    let particleColor = [];
    if (el.dataset.disColor) {
      particleColor = getNumberArraysFromString(el.dataset.disColor)[0];
    }

    let particleReductionFactor = parseInt(el.dataset.disReductionFactor || 35);

    let disObj = {
      elem: el,
      type: el.dataset.disType,
      container: findParentWithAttr(el, "data-dis-container") || document.body,
      actualWidth: el.offsetWidth,
      actualHeight: el.offsetHeight,
      lastWidth: el.offsetWidth,
      lastHeight: el.offsetHeight,
      count: 0,
      particleArr: [],
      animationDuration: 1000,
      canvas: undefined,
      ctx: undefined,
      scrnCanvas: undefined,
      scrnCtx: undefined,
      ignoreColors,
      isAnimating: false,
      particleReductionFactor,
      particleType,
      particleColor,
    };

    dises.push(disObj);
    getScreenshot(disObj);
  }

  function getScreenshot(disObj) {
    html2canvas(disObj.elem, { scale: 1 }).then((canvas) => {
      numCanvasesLoaded++;

      disObj.scrnCanvas = canvas;
      disObj.scrnCtx = canvas.getContext("2d");

      if (!disObj.canvas) {
        disObj.canvas = document.createElement("canvas");
        disObj.canvas.width = document.documentElement.scrollWidth;
        disObj.canvas.height = document.documentElement.scrollHeight;
        disObj.canvas.style.position = "absolute";
        disObj.canvas.style.top = 0;
        disObj.canvas.style.left = 0;
        disObj.canvas.style.pointerEvents = "none";
        disObj.canvas.style.zIndex = "1001";
        disObj.ctx = disObj.canvas.getContext("2d");
        document.body.appendChild(disObj.canvas);
      }

      if (numCanvasesLoaded === dises.length) {
        window.dispatchEvent(new Event("particlesReady"));
      }
    });
  }

  function getAllImageData(disObj) {
    return disObj.scrnCtx.getImageData(
      0,
      0,
      disObj.actualWidth,
      disObj.actualHeight
    ).data;
  }

  function createParticle(disObj, x, y, wx, wy, rgb, index) {
    let Type =
      disParticleTypes.find((t) => t.name === disObj.particleType) ||
      disParticleTypes[0];

    let p = new Type();
    p.rgbArray = rgb;
    p.startX = wx;
    p.startY = wy;
    p.arrayIndex = index;
    p.index = disObj.particleArr[index].myParticles.length;

    disObj.animationDuration = p.animationDuration;
    disObj.particleArr[index].myParticles.push(p);
  }

  function createSimultaneousParticles(disObj) {
    let pos = getCoords(disObj.elem);
    let data = getAllImageData(disObj);

    disObj.particleArr[0] = { startTime: Date.now(), myParticles: [] };

    for (let i = 0; i < data.length; i += 4) {
      if (disObj.count % disObj.particleReductionFactor === 0) {
        let x = (i / 4) % disObj.actualWidth;
        let y = Math.floor(i / 4 / disObj.actualWidth);

        createParticle(
          disObj,
          x,
          y,
          pos.left + x,
          pos.top + y,
          data.slice(i, i + 4),
          0
        );
      }
      disObj.count++;
    }
  }

  function animateParticles(disObj) {
    disObj.ctx.clearRect(
      0,
      0,
      document.documentElement.scrollWidth,
      document.documentElement.scrollHeight
    );

    disObj.particleArr.forEach((group) => {
      let percent = (Date.now() - group.startTime) / disObj.animationDuration;
      group.myParticles.forEach((p) => p.draw(disObj.ctx, percent));

      if (percent > 1) {
        disObj.elem.dispatchEvent(new Event("disComplete"));
        disObj.particleArr = [];
        disObj.isAnimating = false;
      }
    });
  }

  function disUpdate() {
    dises.forEach((disObj) => {
      if (disObj.particleArr.length) animateParticles(disObj);
    });
    raf = requestAnimationFrame(disUpdate);
  }

  function getDisObj(el) {
    return dises.find((d) => d.elem === el);
  }

  function addParticleType(type) {
    disParticleTypes.push(type);
  }

  function init() {
    disElems = document.querySelectorAll("[data-dis-type]");
    dises = [];
    numCanvasesLoaded = 0;

    disElems.forEach((el) => processDisElement(el));

    if (!raf) raf = requestAnimationFrame(disUpdate);
  }

  function genNormalizedVal() {
    return (Math.random() * 6 - 3) / 3;
  }

  function Particle() {
    this.name = "Particle";
    this.animationDuration = 1000;
    this.draw = (ctx, p) => {
      ctx.fillStyle = `rgba(${this.rgbArray[0]},${this.rgbArray[1]},${
        this.rgbArray[2]
      },${1 - p})`;
      ctx.fillRect(this.startX, this.startY, 4, 4);
    };
  }

  function ExplodingParticle() {
    this.name = "ExplodingParticle";
    this.animationDuration = 1000;
    this.radius = 4 + Math.random() * 4;
    this.speed = { x: Math.random() * 6 - 3, y: Math.random() * 6 - 3 };
    this.draw = (ctx) => {
      ctx.beginPath();
      ctx.arc(this.startX, this.startY, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.rgbArray[0]},${this.rgbArray[1]},${this.rgbArray[2]},1)`;
      ctx.fill();
      this.startX += this.speed.x;
      this.startY += this.speed.y;
      this.radius -= 0.2;
    };
  }

  addParticleType(Particle);
  addParticleType(ExplodingParticle);

  return {
    init,
    createSimultaneousParticles,
    getDisObj,
  };
});

// readiness
window.addEventListener("particlesReady", () => {
  particlesReady = true;
});

// init
window.addEventListener("load", () => {
  disintegrate.init();
});

// delete handler
document.addEventListener("click", (e) => {
  if (!e.target.classList.contains("delete")) return;
  if (!particlesReady) return;

  const parent = e.target.closest(".card-container");
  const card = parent.querySelector(".card");
  const disObj = disintegrate.getDisObj(card);

  disintegrate.createSimultaneousParticles(disObj);
  card.style.visibility = "hidden";

  disObj.elem.addEventListener("disComplete", () => parent.remove());
});
