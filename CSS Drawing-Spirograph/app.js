var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var circle1,
  circle2,
  circle3,
  circle4,
  circle5,
  circle6,
  circle7,
  circle8,
  circle9,
  circle10;

function resize() {
  var box = canvas.getBoundingClientRect();
  canvas.width = box.width;
  canvas.height = box.height;
}

function draw() {
  circle2.rotate(0.0044, 0.025, 10, "rgba(52, 50, 90, 0.2)");
  circle3.rotate(0.0045, 0.026, 20, "rgba(52, 50, 90, 0.2)");
  circle4.rotate(0.0046, 0.027, 30, "rgba(52, 50, 90, 0.2)");

  circle5.rotate(0.0181, 0.033, 20, "rgba(104, 14, 42, 0.2)");
  circle6.rotate(0.0282, 0.034, 40, "rgba(104, 14, 42, 0.2)");
  circle7.rotate(0.0383, 0.035, 60, "rgba(104, 14, 42, 0.2)");

  circle8.rotate(0.01, 0.021, 4, "rgba(62, 67, 47, 0.2)");
  circle9.rotate(0.02, 0.022, 10, "rgba(62, 67, 47, 0.2)");
  circle10.rotate(0.03, 0.023, 16, "rgba(62, 67, 47, 0.2)");
  requestAnimationFrame(draw);
}

function start() {
  resize();
  circle1 = new Circle(200);

  circle2 = new Circle(70, circle1);
  circle3 = new Circle(70, circle1);
  circle4 = new Circle(70, circle1);

  circle5 = new Circle(180, circle1);
  circle6 = new Circle(180, circle1);
  circle7 = new Circle(180, circle1);

  circle8 = new Circle(110, circle1);
  circle9 = new Circle(110, circle1);
  circle10 = new Circle(110, circle1);
  draw();
}

function Circle(radius, connectTo) {
  this.x = canvas.width / 2;
  this.y = canvas.height / 2;
  this.radius = radius;
  this.offsetX = 0;
  this.offsetY = 0;
  this.rotation = 0;
  this.rotation2 = 0;
  this.connection = connectTo;
  this.pencilOffsetX = 0;
  this.pencilOffsetY = 0;
}

Circle.prototype.rotate = function (speed, speed2, xA, color) {
  this.x = this.connection.x + this.connection.offsetX;
  this.y = this.connection.y + this.connection.offsetY;
  this.rotation += speed;
  this.rotation2 += speed2;
  this.offsetX =
    Math.cos(this.rotation) * (this.connection.radius - this.radius);
  this.offsetY =
    Math.sin(this.rotation) * (this.connection.radius - this.radius);
  this.pencilOffsetY = Math.cos(this.rotation2) * xA;
  this.pencilOffsetX = Math.sin(this.rotation2) * xA;
  ctx.beginPath();
  ctx.arc(
    this.x + this.offsetX + this.pencilOffsetX,
    this.y + this.offsetY + this.pencilOffsetY,
    1,
    0,
    2 * Math.PI
  );
  ctx.fillStyle = color;
  ctx.fill();
};

start();
