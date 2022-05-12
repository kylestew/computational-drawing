const canvasSketch = require("canvas-sketch");
const { variablyThickLine } = require("../lib/drawing.js");
const mark = require("../lib/marking.js");

const settings = {
  dimensions: [2048, 2048],
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    context.translate(width / 2, height / 2);

    context.lineWidth = 1.0;

    const lines = variablyThickLine(
      [-width / 2, -height / 2],
      [width / 2, height / 2],
      [0.15, 0.5, 0.85],
      600,
      300
    );

    lines.forEach((line) => {
      // console.log(line[0], line[1]);
      mark.line(context, line[0], line[1]);
    });
    // mark.curveThroughPoints(context, pts, 0.7, true);
  };
};

canvasSketch(sketch, settings);
