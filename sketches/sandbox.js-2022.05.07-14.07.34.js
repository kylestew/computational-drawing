const canvasSketch = require("canvas-sketch");

const settings = {
  dimensions: [2048, 2048],
};

function dist(p0, p1) {
  const a = p1[0] - p0[0];
  const b = p1[1] - p0[0];
  return Math.sqrt(a * a + b * b);
}

function distOfPath(pts) {
  let accum = 0;
  for (let i = 1; i < pts.length; i++) {
    const p0 = pts[i - 1];
    const p1 = pts[i];
    accum += dist(p0, p1);
  }
  return accum;
}

function rectangularGridOfPoints(rows, cols, width, height, flipped = false) {
  // create grid of points
  var pts = [];
  const cell_width = width / (cols - 1);
  const cell_height = height / (rows - 1);
  for (var y = 0; y < rows; ++y) {
    for (var x = 0; x < cols; ++x) {
      pts.push([x * cell_width, y * cell_height]);
    }
  }
  return pts;
}

function randomRange(min, max) {
  return min + Math.random() * (max - min);
}

function squiggle(radius, length) {
  let currentLength = 0;
  let currentAngle = 0;
  let points = [];

  while (currentLength <= length) {
    let newX = radius * Math.cos(currentAngle);
    let newY = radius * Math.sin(currentAngle);
    let newPoint = [newX, newY];
    points.push(newPoint);

    // how far have we traveled
    currentLength = distOfPath(points);

    // squiggle it up!
    // currentAngle += randomRange(1, 5);
    currentAngle += randomRange(0.5, 3);
    radius += randomRange(-3, 3);
  }

  return points;
}

function drawCurve(ctx, pts) {
  if (pts.length == 0) return;

  ctx.beginPath();
  ctx.moveTo(pts[0][0], pts[0][1]);
  let i = 1;
  while (i < pts.length - 2) {
    const [x1, y1] = pts[i++];
    const [x2, y2] = pts[i];

    const xc = (x1 + x2) / 2;
    const yc = (y1 + y2) / 2;

    ctx.quadraticCurveTo(x1, y1, xc, yc);
  }
  const [x1, y1] = pts[i++];
  const [x2, y2] = pts[i];
  ctx.quadraticCurveTo(x1, y1, x2, y2);

  console.log(pts);

  ctx.stroke();
}

function drawPoints(ctx, pts) {
  pts.forEach((pt) => {
    ctx.beginPath();
    ctx.arc(pt[0], pt[1], 4, 0, 2.0 * Math.PI);
    ctx.fill();
  });
}

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
    // drawPoints(context, positions);

    context.lineWidth = 3.0;
    context.lineCap = "round";
    positions.forEach((position) => {
      context.save();
      context.translate(position[0], position[1]);
      const pts = squiggle(width / 8, width * 1.6);
      drawCurve(context, pts);
      // drawPoints(context, pts);
      context.restore();
    });
  };
};

canvasSketch(sketch, settings);
