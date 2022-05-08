const canvasSketch = require("canvas-sketch");
const { rectangularGridOfPoints } = require("../lib/grid.js");
const mark = require("../lib/marking.js");
const { squiggle } = require("../lib/drawing.js");

const settings = {
  dimensions: [2048, 2048],
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    const padding = width * 0.2;
    // context.translate(padding, padding);
    context.translate(width / 2, height / 2);

    context.fillStyle = "red";

    // const positions = rectangularGridOfPoints(
    //   3,
    //   3,
    //   width - padding * 2,
    //   height - padding * 2
    // );
    // mark.points(context, positions);

    context.lineWidth = 3.0;
    context.lineCap = "round";

    const rad = width / 3;
    const pts = [0, 0.25, 0.5, 0.75, 1.0].map((pct) => {
      const theta = pct * 2.0 * Math.PI;
      return [rad * Math.cos(theta), rad * Math.sin(theta)];
    });
    console.log(pts);
    mark.curveThroughPoints(context, pts, 0.7, true, true);
  };
};

canvasSketch(sketch, settings);
