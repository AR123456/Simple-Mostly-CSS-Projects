import random from "https://cdn.skypack.dev/random";
import seedrandom from "https://cdn.skypack.dev/seedrandom";

class TinySpecksPattern {
  // defining the getter worklet will accept the following input properties:
  static get inputProperties() {
    return [
      "--pattern-seed",
      "--pattern-colors",
      "--pattern-speck-count",
      "--pattern-speck-min-size",
      "--pattern-speck-max-size",
    ];
  }
  paint(ctx, geometry, props) {
    const { width, height } = geometry;
    // input properties vars
    const seed = props.get("--pattern-seed").value;
    const colors = props.getAll("--pattern-colors").map((c) => c.toString());
    const count = props.get("--pattern-speck-count").value;
    const minSize = props.get("--pattern-speck-min-size").value;
    const maxSize = props.get("--pattern-speck-max-size").value;
    // initialize our pseudo-random number generator:
    // re-seeding seedrandom with the same seed value every time paint() runs, resulting in a consistent stream of random numbers across renders.
    random.use(seedrandom(seed));
    // for loop to generate each speck
    for (let i = 0; i < count; i++) {
      // we define an x and y position for the speck.
      const x = random.float(0, width);
      const y = random.float(0, height);
      // random size for the radius
      const radius = random.float(minSize, maxSize);
      // random color
      ctx.fillStyle = colors[random.int(0, colors.length - 1)];
      // now use cts to render
      // save the drawing contexts's state
      ctx.save();
      // translate the specks center point defined by x and y vars - and apply rotation
      // translating before rotating ensures object rotates around its center axi
      ctx.translate(x, y);
      ctx.rotate(((random.float(0, 360) * 180) / Math.PI) * 2);
      ctx.translate(-x, -y);
      // draw
      ctx.beginPath();
      ctx.ellipse(x, y, radius, radius / 2, 0, Math.PI * 2, 0);
      ctx.fill();
      // restore the drawing context:
      ctx.restore();
    }
  }
}

if (typeof registerPaint !== "undefined") {
  registerPaint("tinySpecksPattern", TinySpecksPattern);
}
