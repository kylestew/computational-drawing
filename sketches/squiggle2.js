const canvasSketch = require("canvas-sketch");
const { rectangularGridOfPoints } = require("../lib/grid.js");
const mark = require("../lib/marking.js");
const { squiggle } = require("../lib/drawing.js");
const { randomInArray, shuffle } = require("../lib/random.js");
const Color = require("canvas-sketch-util/color");
const colors = require("riso-colors");

const settings = {
  dimensions: [2048, 2048],
};

const sketch = () => {
  return ({ context, width, height }) => {
    // context.fillStyle = "white";
    context.fillStyle = "black";
    context.fillRect(0, 0, width, height);

    const padding = width * 0.2;
    context.translate(padding, padding);

    // grid of points (in order)
    const positions = rectangularGridOfPoints(
      3,
      3,
      width - padding * 2,
      height - padding * 2
    );

    context.lineWidth = 12.0;
    context.lineCap = "round";
    context.fillStyle = "red";

    context.globalCompositeOperation = "lighten";

    for (let i = 0; i < 3; i++) {
      const color = randomInArray(colors);
      context.strokeStyle = color.hex;
      const pts = shuffle(positions);
      mark.curveThroughPoints(context, pts, 0.9, true);
    }
  };
};

canvasSketch(sketch, settings);
