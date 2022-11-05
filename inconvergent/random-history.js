const canvasSketch = require("canvas-sketch");
// const { PixelCanvas } = require("../lib/pixels");
const marking = require("../lib/marking");
const { linspace } = require("../lib/math");
const { noise2D } = require("canvas-sketch-util/random");
const { randomInArray } = require("../lib/random");
const colors = require("riso-colors");

const settings = {
  dimensions: [2048, 2048],
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    context.translate(width / 2, width / 2);
    context.scale(width / 2, width / 2);

    const normalizedToCanvasCoords = (pt) => {
      const hw = width / 2;
      return [pt[0] * hw + hw, pt[1] * -hw + hw];
    };

    const ITERATIONS = 1200;
    const ROW_COUNT = 24;
    const COL_COUNT = width / 12;
    const ALPHA = "99";

    // build out lines of nodes, each with a distinct random color
    var nodes = linspace(-0.6, 0.6, ROW_COUNT, true).flatMap((yPos) => {
      const color = randomInArray(colors).hex + ALPHA;
      return linspace(-0.98, 0.99, COL_COUNT, true).map((x) => {
        return { pos: [x, yPos], vel: 0, size: 0.01, color: color };
      });
    });

    for (let i = 0; i < ITERATIONS; i++) {
      // update position
      nodes.forEach((node) => {
        node.vel = noise2D(node.pos[0], node.pos[1], 2.0, 0.3);
        node.pos[1] += node.vel;
      });

      // display
      marking.points(context, nodes);
    }

    // const pixels = new PixelCanvas(context);
    // for (let i = 0; i < 2048; i++) {
    //   nodes.forEach((node) => {
    //     pixels.put(node.pos, [0, 0, 0, 255]);

    //     node.vel = noise2D(node.pos[0], node.pos[1], 2.0, 0.3);
    //     node.pos[1] += node.vel;
    //   });
    // }
    // pixels.display(context);
  };
};

canvasSketch(sketch, settings);
