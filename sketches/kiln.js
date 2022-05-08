const canvasSketch = require("canvas-sketch");
// const { rectangularGridOfPoints } = require("../lib/grid.js");
const mark = require("../lib/marking.js");
const { squiggle } = require("../lib/drawing");
const { randomInArray } = require("../lib/random");
const Color = require("canvas-sketch-util/color");
const colors = require("riso-colors");

const settings = {
  dimensions: [2048, 2048],
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    const padding = width * 0.3;
    context.translate(width / 2, height / 2);

    context.lineWidth = 3.0;
    context.lineCap = "round";

    let pts = squiggle((width - padding) / 1.5, width * 12);
    const interations = 960;
    const primary = randomInArray(colors);
    const secondary = randomInArray(colors);
    for (let i = 0; i < interations; i++) {
      const interp = i / interations;

      let col = Color.blend(primary, secondary, interp);

      context.strokeStyle = col.hex + "08";

      pts = pts.map((pt) => {
        return [
          pt[0] + (Math.random() - 0.45) * 4,
          pt[1] + (Math.random() - 0.55) * 4,
        ];
      });

      mark.curveWithPoints(context, pts);
    }
  };
};

canvasSketch(sketch, settings);
