// config
// Distance from container edge → where the scrollbar sits.
const offset = 7;
// Pulls the track slightly inward from rounded corners so it doesn’t clip.
const extraInset = 2;
// Prevents the track from starting too far left — ensures it stays near the right edge.
const minStartRatio = 0.8;
// Minimum thumb length in pixels so it never becomes too small to grab.
const minThumb = 20;
// How many line segments are used to approximate the curved thumb path.
const segments = 50;

// init scrollbars - each has their own scoped functions and settings
document.querySelectorAll("[data-scrollbar]").forEach((container) => {
  initCurvedScrollbar(container);
});

// function - init scrolled container
function initCurvedScrollbar(container) {
  const content = container.querySelector(".scroll-content");

  // create and add SVG-note adding const to svg so its not global scope
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.classList.add("scrollbar-svg");
  svg.setAttribute("aria-hidden", "true");

  const trackPath = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "path",
  );
  trackPath.classList.add("scrollbar-track");

  const thumbPath = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "path",
  );
  thumbPath.classList.add("scrollbar-thumb");

  svg.appendChild(trackPath);
  svg.appendChild(thumbPath);
  container.appendChild(svg);

  // state
  let pathLength = 0;
  let thumbLength = 50;
  let dragging = false;
  let pointerId = null;

  // function - update recalculate the SVG path whenever size changes
  function updatePath() {
    //compute curved path that runs down r side, bends around corners, respects container radius
    const w = container.clientWidth;
    const h = container.clientHeight;
    // https://developer.mozilla.org/en-US/docs/Web/API/Window/getComputedStyle

    const r = parseFloat(getComputedStyle(container).borderRadius) || 0;
    const effectiveRadius = Math.max(r - offset, 0);
    const trackX = w - offset;
    const topY = offset;
    const bottomY = h - offset;
    const cornerX = trackX - effectiveRadius;

    // calculate x start point - ensure that it is never higher than the corner radius start point
    const minStartX = w * minStartRatio;
    let startX = trackX - effectiveRadius * extraInset;
    if (startX < minStartX) startX = minStartX;
    if (startX > cornerX) startX = cornerX;

    // create the dynamic path
    const d = `
      M ${startX} ${topY}
      L ${cornerX} ${topY}                     
      A ${effectiveRadius} ${effectiveRadius} 0 0 1 ${trackX} ${topY + effectiveRadius} 
      L ${trackX} ${bottomY - effectiveRadius} 
      A ${effectiveRadius} ${effectiveRadius} 0 0 1 ${cornerX} ${bottomY} 
      L ${startX} ${bottomY}
    `;
    trackPath.setAttribute("d", d);

    // calculate length of thumb based on content height
    // if visible content is 50% of total thumb 50 % of path if 10% thumb shrinks
    pathLength = trackPath.getTotalLength();
    const ratio = content.clientHeight / content.scrollHeight;
    thumbLength = Math.max(minThumb, pathLength * ratio);

    updateThumb();
  }

  // function - thumb update
  function updateThumb() {
    // compute scroll ratio, convert it distance along svg path, sample points along path, build mini path with those points, make the thumb follow exact curve of track

    const scrollableHeight = content.scrollHeight - content.clientHeight || 1;
    const scrollRatio = content.scrollTop / scrollableHeight;
    const startoffset = (pathLength - thumbLength) * scrollRatio;
    const endoffset = startoffset + thumbLength;

    // the thumb needs to follow the path so we get the generated path points
    // NOTE - the high number of segments help follow the curves
    const points = [];
    for (let i = 0; i <= segments; i++) {
      const t = startoffset + ((endoffset - startoffset) / segments) * i;
      const p = trackPath.getPointAtLength(t);
      points.push(`${p.x} ${p.y}`);
    }

    const segmentD = `M ${points[0]} ${points
      .slice(1)
      .map((pt) => `L ${pt}`)
      .join(" ")}`;
    thumbPath.setAttribute("d", segmentD);
  }

  //  function - grab thumb
  thumbPath.addEventListener("pointerdown", (e) => {
    e.preventDefault();
    dragging = true;
    pointerId = e.pointerId;
    thumbPath.setPointerCapture(pointerId);
  });

  // function - drag thumb
  window.addEventListener("pointermove", (e) => {
    // map pointer position → scroll position.
    if (!dragging || e.pointerId !== pointerId) return;
    const rect = container.getBoundingClientRect();
    //ratio = (mouseY - containerTop) / containerHeight
    let ratio = (e.clientY - rect.top) / rect.height;
    ratio = Math.max(0, Math.min(1, ratio));
    // content.scrollTop = ratio * scrollableHeight
    content.scrollTop = ratio * (content.scrollHeight - content.clientHeight);
    updateThumb();
  });

  // function - release thumb
  window.addEventListener("pointerup", (e) => {
    if (!dragging || e.pointerId !== pointerId) return;
    dragging = false;
    try {
      thumbPath.releasePointerCapture(pointerId);
    } catch {}
    pointerId = null;
  });

  // events
  content.addEventListener("scroll", updateThumb);
  window.addEventListener("resize", updatePath);

  updatePath();
}
