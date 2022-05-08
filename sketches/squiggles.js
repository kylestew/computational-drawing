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
    context.translate(padding, padding);

    context.fillStyle = "red";

    const positions = rectangularGridOfPoints(
      3,
      3,
      width - padding * 2,
      height - padding * 2
    );
    mark.points(context, positions);

    context.lineWidth = 3.0;
    context.lineCap = "round";

    positions.forEach((position) => {
      context.save();
      context.translate(position[0], position[1]);
      const pts = squiggle(width / 8, width * 1.6);

      mark.curveWithPoints(context, pts);

      context.restore();
    });
  };
};

canvasSketch(sketch, settings);
