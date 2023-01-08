const canvas = document.getElementById("fractalTree");
const generateButton = document.querySelector(".generate-tree-button");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext("2d");

function drawTree(startX, startY, len, angle, branchWidth, color1, color2) {
  ctx.beginPath();
  ctx.save();
  ctx.strokeStyle = color1;
  ctx.fillStyle = color2;
  // adding some shadow to branches
  ctx.shadowBlur = 15;
  ctx.shadowColor = "black";
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
    ctx.arc(0, -len, 10, 10, Math.PI / 2);
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

// A series
//https://www.youtube.com/watch?v=wBAtHDdaZ2Y&t=0s
// canvas, draw methods , recursion
//https://www.youtube.com/watch?v=axve3EgJlYI&t=0s
// shadow color and shadow color and Bezier curve
