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

export { dist, distOfPath };
