import random from "https://cdn.skypack.dev/random";
import seedrandom from "https://cdn.skypack.dev/seedrandom";
// elper function that will allow us to quickly cook up a Voronoi tessellation:
import { createVoronoiTessellation } from "https://cdn.skypack.dev/@georgedoescode/generative-utils";
class VoronoiPattern {
  static get inputProperties() {
    return ["--pattern-seed", "--pattern-colors", "--pattern-background"];
  }

  paint(ctx, geometry, props) {
    const { width, height } = geometry;

    const background = props.get("--pattern-background").toString();
    const seed = props.get("--pattern-seed").value;
    const colors = props.getAll("--pattern-colors").map((c) => c.toString());

    random.use(seedrandom(seed));

    ctx.fillStyle = background;
    ctx.fillRect(0, 0, width, height);

    const { cells } = createVoronoiTessellation({
      width,
      height,
      points: [...Array(96)].map(() => ({
        x: random.float(0, width),
        y: random.float(0, height),
      })),
    });

    cells.forEach((cell) => {
      ctx.fillStyle = colors[random.int(0, colors.length - 1)];

      const cx = cell.centroid.x;
      const cy = cell.centroid.y;

      ctx.save();

      ctx.translate(cx, cy);
      ctx.rotate((random.float(0, 360) / 180) * Math.PI);
      ctx.translate(-cx, -cy);

      ctx.fillRect(
        cx - cell.innerCircleRadius / 2,
        cy - cell.innerCircleRadius / 2,
        cell.innerCircleRadius,
        cell.innerCircleRadius / 3
      );

      ctx.restore();
    });
  }
}

if (typeof registerPaint !== "undefined") {
  registerPaint("voronoiPattern", VoronoiPattern);
}
