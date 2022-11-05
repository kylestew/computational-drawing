var cSpline = require("cardinal-spline");
const { map2, LINEAR, EASE_OUT } = require("../lib/easing");

function points(ctx, pts) {
  pts.forEach((pt) => {
    const [x, y] = pt.pos;
    const size = pt.size ?? 2.0;

    ctx.fillStyle = pt.color ?? "#000000FF";

    ctx.beginPath();
    ctx.arc(x, y, size / 2, 0, 2.0 * Math.PI);
    ctx.fill();
  });
}

function curveWithPoints(ctx, pts) {
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

  ctx.stroke();
}

function curveThroughPoints(
  ctx,
  pts,
  tension = 0.5,
  closed = false,
  showPoints = false
) {
  const points = cSpline(pts.flat(), tension, 32, closed);

  ctx.beginPath();
  ctx.moveTo(points[0], points[1]);
  for (let i = 2; i < points.length - 1; i += 2) {
    ctx.lineTo(points[i], points[i + 1]);
  }

  ctx.stroke();

  if (showPoints) {
    ctx.beginPath();
    pts.forEach((pt) => {
      ctx.rect(pt[0] - 4, pt[1] - 4, 8, 8);
      ctx.fill();
    });
  }
}

function line(ctx, ptA, ptB) {
  ctx.beginPath();
  ctx.moveTo(ptA[0], ptA[1]);
  ctx.lineTo(ptB[0], ptB[1]);
  ctx.stroke();
}

function aLine(ctx, ptA, ptB, weight, value) {
  const strokeColor = map2(value, 0, MAX_VALUES - 1, 0, 220, LINEAR, EASE_OUT);
  console.log(strokeColor);
  // stroke(strokeColor);
  ctx.strokeStyle = "black";

  ctx.lineWidth = weight;

  ctx.beginPath();
  ctx.moveTo(ptA[0], ptA[1]);
  ctx.lineTo(ptB[0], ptB[1]);
  ctx.stroke();
}

export { points, curveWithPoints, curveThroughPoints, line, aLine };
