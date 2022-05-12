const canvasSketch = require("canvas-sketch");
const random = require("canvas-sketch-util/random");
const { rectangularGridOfPoints } = require("../lib/grid.js");
const mark = require("../lib/marking.js");
const { findCircle } = require("../lib/circle.js");
const { invlerp } = require("../lib/math");
const { randomInArray } = require("../lib/random");
const Color = require("canvas-sketch-util/color");
const colors = require("riso-colors");

const settings = {
  dimensions: [2048, 2048],
};

const SPEED = 128;
const FREQ = 0.008;
const STEPS = 32;
const DENSITY = 64;
const LINE_WIDTH = 2.0;
const ALPHA = "33";

const wanderingLine = (ctx, startPt) => {
  let [x, y] = startPt;
  let pts = [];
  for (let i = 0; i < STEPS; i++) {
    pts.push([x, y]);

    // x, y, freq, amp
    const theta = random.noise2D(x, y, FREQ) * Math.PI;
    const speed = SPEED;
    [x, y] = [x + speed * Math.cos(theta), y + speed * Math.sin(theta)];
  }

  return pts;
};

const minRadOfCurve = (pts) => {
  if (pts.length < 3) return 0;

  let minRad = Infinity;
  for (let i = 2; i < pts.length - 3; i++) {
    const [x1, y1] = pts[i];
    const [x2, y2] = pts[i + 1];
    const [x3, y3] = pts[i + 2];
    minRad = Math.min(findCircle(x1, y1, x2, y2, x3, y3)[1], minRad);
  }
  return minRad;
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = "black";
    context.fillRect(0, 0, width, height);

    const padding = width * 0.1;
    context.translate(padding, padding);
    // context.translate(width / 2, height / 2);

    context.fillStyle = "red";
    context.strokeStyle = "#000000" + ALPHA;
    context.lineWidth = LINE_WIDTH;
    context.lineCap = "round";

    // context.scale(2.0, 2.0);

    // grid of points (in order)
    const positions = rectangularGridOfPoints(
      DENSITY,
      DENSITY,
      width - padding * 2,
      height - padding * 2
    );

    let lines = [];
    let rads = [];
    positions.forEach((pt) => {
      const line = wanderingLine(context, pt);

      // determine max radius
      let rad = minRadOfCurve(line);

      lines.push([line, rad]);
      if (!isNaN(rad)) rads.push(rad);
    });

    // grab the middle sized rad values to use for color range mapping
    rads.sort(function (a, b) {
      return a - b;
    });
    // console.log(rads);

    const start = parseInt(rads.length / 4);
    const end = start + parseInt(rads.length / 2);
    const midRads = rads.slice(start, end);
    // console.log(start, end, midRads);

    let minRad = Math.min(...midRads);
    let maxRad = Math.max(...midRads);
    // console.log("rad range", minRad, maxRad);

    const primary = randomInArray(colors);
    const secondary = randomInArray(colors);

    lines.forEach(([line, rad]) => {
      const interp = invlerp(minRad, maxRad, rad);
      let col = Color.blend(primary, secondary, interp);
      // context.strokeStyle = col.hex;
      context.strokeStyle = col.hex + ALPHA;

      // mark.points(context, line);
      mark.curveThroughPoints(context, line, 0.5, false);
    });
  };
};

canvasSketch(sketch, settings);
