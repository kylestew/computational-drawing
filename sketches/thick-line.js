const canvasSketch = require("canvas-sketch");
const { variablyThickLine } = require("../lib/drawing.js");
const mark = require("../lib/marking.js");
const { rectGrid } = require("../lib/grid");
const { chunk } = require("../lib/array");

const settings = {
  dimensions: [1080, 1920],
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    const rowCount = 16;
    const rowHeight = height / (rowCount + 1.1);
    const vPadding = rowHeight;
    const hPadding = width / 20;

    context.translate(hPadding, vPadding);

    const lines = chunk(
      rectGrid(rowCount, 2, width - hPadding * 2, height - vPadding * 2)
    );

    context.lineWidth = 1.2;
    context.lineCap = "round";

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const marks = variablyThickLine(
        line[0],
        line[1],
        [0, 0.25, 0.5, 0.75, 1],
        rowHeight,
        i * 16 + 64,
        i % 2 == 0
      );

      marks.forEach((line) => {
        mark.line(context, line[0], line[1]);
      });
    }
  };
};

canvasSketch(sketch, settings);
