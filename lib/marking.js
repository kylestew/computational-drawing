function points(ctx, pts) {
  pts.forEach((pt) => {
    ctx.beginPath();
    ctx.arc(pt[0], pt[1], 4, 0, 2.0 * Math.PI);
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

function curveThroughPoints(ctx, pts) {}

export { points, curveWithPoints, curveThroughPoints };
