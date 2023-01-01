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

function drawTree(startX, startY, len, angel, branchWidth, color1, color2) {}
