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

function linspace(start, stop, num, endpoint = false) {
  const div = endpoint ? num - 1 : num;
  const step = (stop - start) / div;
  return Array.from({ length: num }, (_, i) => start + step * i);
}

const lerp = (x, y, a) => x * (1 - a) + y * a;
const clamp = (a, min = 0, max = 1) => Math.min(max, Math.max(min, a));
const invlerp = (x, y, a) => clamp((a - x) / (y - x));
const range = (x1, y1, x2, y2, a) => lerp(x2, y2, invlerp(x1, y1, a));

export { dist, distOfPath, linspace, lerp, clamp, invlerp, range };
