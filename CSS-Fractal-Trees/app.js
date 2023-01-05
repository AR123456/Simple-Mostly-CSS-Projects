const canvas = document.getElementById("fractalTree");
const generateButton = document.querySelector(".generate-tree-button");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
// get all the methods avalable in the canvas api
const ctx = canvas.getContext("2d");

// recursion - snowflakes, crystals , tree roots, blood vessesl
// tree of pythagoras is drawn around a right tri angel
// Mandelbrot set
// this is code for H-Tree fractal
// one function with different rules
// takes in the starting positions length of first line, angle, width branches, color of main body and color of leaves

function drawTree(startX, startY, len, angel, branchWidth, color1, color2) {
  ctx.beginPath();
  // save the context to the stack
  ctx.save();
  ctx.strokeStyle = color1;
  ctx.fillStyle = color2;
  ctx.lineWidth = branchWidth;
  //   move canvas based on the xy values passed in
  ctx.translate(startX, startY);
  // convert degrees to radians -
  // radians work with tan sine cosine ect and the canvas API expects radians
  ctx.rotate((angle * Math.PI) / 180);
  //   start a new path here
  ctx.moveTo(0, 0);
  // move the line to one length of a tree segment using a - value allows tree to grow up
  ctx.lineTo(0, -len);
  ctx.stroke();
  // set limit on drawing so that we stop when computer rendering limit is reached
  if (len < 10) {
    // stop drawing and return
    // restore goes back to what things were when ctx.save() was called
    ctx.restore();
    return;
  }
}
