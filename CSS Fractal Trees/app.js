const canvas = document.getElementById("fractalTree");
const generateButton = document.querySelector(".generate-tree-button");
const sliderText = document.querySelector(".trunk-text");
const branchSlider = document.getElementById("branchWidth");
const leafSlider = document.getElementById("leafAdjuster");
const range = document.querySelectorAll("input[type=range]");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");
let curve = 10;
let curve2 = 0;
//  change to ES^
// branchSlider.oninput = onSliderInput;
// function onSliderInput(event) {
//   //   console.log(event.target.value);
//   branchWidth = event.target.value;
//   generateRandomTree();
// }
// Using more modern ES 6 syntax

branchSlider.addEventListener("input", (e) => {
  // need type of number
  branchWidth = +e.target.value;
  // TODO need to slim this function down to just change trunk width and color , re generation a random tree is slowing things down.
  generateRandomTree();
  // TODO variables for track value change-  should this be in a diff function so as not to slow down generating branch thickness ?
  const value = +e.target.value;
  // the label is the next sybling of the input div so using that to get
  const label = e.target.nextElementSibling;
  // finding the place of the label relative to the track
  // get computed width of range
  const rangeWidth = getComputedStyle(e.target).getPropertyValue("width");
  const labelWidth = getComputedStyle(label).getPropertyValue("width");
  // remove the "px" chars from the length
  const numRangeWidth = +rangeWidth.substring(0, rangeWidth.length - 2);
  const numLabelWidth = +labelWidth.substring(0, labelWidth.length - 2);
  // get min and max from the css
  const max = +e.target.max;
  const min = +e.target.min;
  // calculate to come up with value for "left" property of the thumb
  const left =
    value * (numRangeWidth / max) -
    numLabelWidth / 2 +
    scale(value, min, max, 45, -1);
  label.style.left = `${left}px`;
  // map range of numbers to another range of numbers
  label.innerHTML = value;
});
const scale = (num, in_min, in_max, out_min, out_max) => {
  return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
};

function drawTree(startX, startY, len, angle, branchWidth, color1, color2) {
  ctx.beginPath();
  ctx.save();
  ctx.strokeStyle = color1;
  ctx.fillStyle = color2;
  // adding some shadow to branches and leaves
  ctx.shadowBlur = 15;
  //   ctx.shadowColor = "black";
  ctx.shadowColor =
    "rgba(" +
    Math.random() * 255 +
    "," +
    Math.random() * 255 +
    "," +
    Math.random() * 255 +
    "," +
    ".5";
  (")");
  //   console.log(ctx.shadowColor);
  //   ctx.shadowColor = "rgba(0,0,0,.5)";
  ctx.lineWidth = branchWidth;
  ctx.translate(startX, startY);
  // convert degrees to radians - the canvas API expects radians
  ctx.rotate((angle * Math.PI) / 180);
  //   start a new path here
  ctx.moveTo(0, 0);
  // bezier for slight curve to branches
  if (angle > 0) {
    ctx.bezierCurveTo(10, -len / 2, 10, -len / 2, 0, -len);
  } else {
    ctx.bezierCurveTo(10, -len / 2, -10, -len / 2, 0, -len);
  }
  // strokeStyle = color1
  ctx.stroke();
  // set limit on drawing stop when rendering limit is reached
  if (len < 10) {
    // branches are long enough,so
    // draw leafs
    ctx.beginPath();
    // Math.PI for circle shape
    let r = 10;
    ctx.arc(0, -len, r, 10, Math.PI / 2);
    // fillStyle =color2
    ctx.fill();
    ctx.restore();
    return;
  }
  // introduce some randomness to angle at which branches split - feeding into drawTree call function
  curve = Math.random() * 10 + 10;
  // recursion -
  drawTree(0, -len, len * 0.75, angle + curve, branchWidth * 0.8);
  drawTree(0, -len, len * 0.75, angle - curve, branchWidth * 0.8);
  ctx.restore();
}

// start growing from middle of canvas
drawTree(canvas.width / 2, canvas.height - 80, 120, 0, 25, "brown", "green");

// on button click do this
function generateRandomTree() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // creating variables for each of the args being passed into the draw function
  let centerPoint = canvas.width / 2;
  let len = Math.floor(Math.random() * 20 + 100);
  let angle = 0;
  //   let branchWidth = Math.random() * 70 + 1;
  let color1 =
    "rgb(" +
    Math.random() * 255 +
    "," +
    Math.random() * 255 +
    "," +
    Math.random() * 255 +
    ")";
  let color2 =
    "rgb(" +
    Math.random() * 255 +
    "," +
    Math.random() * 255 +
    "," +
    Math.random() * 255 +
    ")";

  generateButton.style.background = color1;
  sliderText.style.background = color1;

  curve = Math.random() * 25 + 3;
  curve2 = Math.random() * 10;
  drawTree(
    centerPoint,
    canvas.height - 80,
    len,
    angle,
    branchWidth,
    color1,
    color2
  );
}
// TODO set the color of thumb to color1
// https://stackoverflow.com/questions/48297265/slider-webkit-slider-thumb-needed-in-javascript

function setSlideThumbColor() {
  style.innerHTML =
    "input[type='range']::-webkit-slider-thumb {background:'brown';}";
}

function drawAdjustedTrunk() {
  // set limit on drawing stop when rendering limit is reached
  if (len < 10) {
    // branches are long enough,so
    // draw leafs
    ctx.beginPath();
    // Math.PI for circle shape
    let r = 50;
    ctx.arc(0, -len, r, 10, Math.PI / 2);
    // fillStyle =color2
    ctx.fill();
    ctx.restore();
    return;
  }
}
generateButton.addEventListener("click", generateRandomTree);
// window.addEventListener("resize", function () {
//   canvas.width = window.innerWidth;
//   canvas.height = window.innerHeight;
// });
// A series
//https://www.youtube.com/watch?v=wBAtHDdaZ2Y&t=0s
// canvas, draw methods , recursion
//https://www.youtube.com/watch?v=axve3EgJlYI&t=0s
// shadow color and shadow color and Bezier curve
