const canvasSketch = require("canvas-sketch");
const { PixelCanvas } = require("../lib/pixels");
const { linspace } = require("../lib/math");

const settings = {
  dimensions: [2048, 2048],
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = "#FF00FF33";
    context.fillRect(0, 0, width, height);

    const NODE_COUNT = 20;

    // var nodes = linspace(0, 1, NODE_COUNT, true).map((x) => {
    //   return [x, 0];
    // });

    const pixels = new PixelCanvas(context);

    pixels.put([0, 0], [0, 255, 0, 255]);

    pixels.display(context);
  };
};

canvasSketch(sketch, settings);
