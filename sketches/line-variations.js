const canvasSketch = require("canvas-sketch");
const mark = require("../lib/marking.js");
const { hashMark } = require("../lib/drawing");
const { rectGridFn } = require("../lib/grid");
const { map2, QUADRATIC, EASE_IN } = require("../lib/easing");

const settings = {
  dimensions: [2048, 2048],
};

const sketch = () => {
  return ({ context, width, height }) => {
    const makeLines = (rows, cols) => {
      return rectGridFn(
        (pt, row, col) => {
          const line = hashMark(pt, lineLength, -Math.PI / 4.0);
          return {
            a: line[0],
            b: line[1],
            weight: map2(2 * col, 0, cols, 2, 10, QUADRATIC, EASE_IN),
            value: row,
          };
        },
        rows,
        cols,
        width - hPadding * 2,
        height - vPadding * 2
      );
    };
    const drawLines = (lineFn) => {
      lines.forEach((line) => {
        lineFn(context, line.a, line.b, line.weight, line.value);
      });
    };

    const vPadding = height * 0.12;
    const hPadding = width * 0.12;
    const lineLength = width * 0.2;

    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);
    context.translate(hPadding, vPadding);

    const lines = makeLines(5, 10);

    lines.forEach((line) => {
      console.log(line.weight);
    });

    // drawLines(mark.line);
    drawLines(mark.aLine);
  };
};

canvasSketch(sketch, settings);
