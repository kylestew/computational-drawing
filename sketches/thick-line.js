const canvasSketch = require("canvas-sketch");
const { variablyThickLine } = require("../lib/drawing.js");
const mark = require("../lib/marking.js");
const { rectGrid } = require("../lib/grid");
const { chunk } = require("../lib/array");

const settings = {
  dimensions: [1080, 1920],
};

const primary = "#e2725b";
const secondary = "#30d5c8";
const background = "#fffdd0";

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = background;
    context.fillRect(0, 0, width, height);

    const rowCount = 16;
    const rowHeight = height / (rowCount + 1.1);
    const vPadding = rowHeight;
    const hPadding = width / 12;

    context.translate(hPadding, vPadding);

    const lines = chunk(
      rectGrid(rowCount, 2, width - hPadding * 2, height - vPadding * 2)
    );

    context.lineWidth = 1.6;
    context.lineCap = "round";

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const marks = variablyThickLine(
        line[0],
        line[1],
        [0, 0.25, 0.5, 0.75, 1],
        rowHeight,
        i * 20 + 72,
        i % 2 == 0
      );

      for (let j = 0; j < marks.length; j++) {
        const line = marks[j];
        context.strokeStyle = j % 2 == 0 ? primary : secondary;
        mark.line(context, line[0], line[1]);
      }
    }
  };
};

canvasSketch(sketch, settings);
