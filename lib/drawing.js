import { randomRange } from "./random";
import { distOfPath, invlerp, linspace } from "./math";
import { zip, zip3 } from "./array";

/*
 * A SQUIGGLE (pg 36)
 *
 * RETURNS:
 * - array of unconnected points
 */
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
    currentAngle += randomRange(0.5, 4);
    radius += randomRange(-3, 3);
  }

  return points;
}

/*
 * A VARIABLE THICK LINE (pg 37)
 * Contains thick and thin moments (draws hash marks parallel, but twists as line evolves)
 *
 * RETURNS:
 * - array of hash marks (x,y pairs forming a straight line)
 */
function variablyThickLine(
  startPt,
  endPt,
  thinMoments = [0.5],
  thickness = 20,
  density = 20
) {
  // generate evenly spaced positions between start end end points
  const [x0, y0] = startPt;
  const [x1, y1] = endPt;
  const xs = linspace(x0, x1, density, true);
  const ys = linspace(y0, y1, density, true);

  // mirror thin moment endpoints so start and end are thick moments
  thinMoments.sort();
  thinMoments = [0.0 - thinMoments[0], ...thinMoments];
  thinMoments.push(1.0 - thinMoments[thinMoments.length - 1] + 1.0);

  // generate t value between thin moment stops
  // t ranges from [-1, 1] to allow for full rotation
  const pctBetweenMoments = (pct) => {
    let idx = 0;
    while (idx < thinMoments.length) {
      if (thinMoments[idx] > pct) break;
      idx++;
    }
    const t = invlerp(thinMoments[idx - 1], thinMoments[idx], pct);
    if (idx % 2 == 0) {
      return 1 - t;
    }
    return t;
  };

  // rotate Math.PI between every stop in thin moments
  const thetas = linspace(0, 1, density, true).map((t) => {
    return pctBetweenMoments(t) * Math.PI;
  });

  console.log(thinMoments);
  console.log(thetas);

  return zip(zip(xs, ys), thetas).map(([pt, theta]) => {
    return hashMark(pt, thickness, theta);
  });
}

/*
 * HASH MARK
 * A line through a given midpoint with length and angle
 */
const hashMark = (midPt, length, theta) => {
  const [x, y] = midPt;
  return [
    [x + length * 0.5 * Math.cos(theta), y + length * 0.5 * Math.sin(theta)],
    [x - length * 0.5 * Math.cos(theta), y - length * 0.5 * Math.sin(theta)],
  ];
};

export { squiggle, variablyThickLine };
