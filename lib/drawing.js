import { randomRange } from "./random";
import { distOfPath } from "./math";

/*
 * A SQUIGGLE (pg 36)
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

export { squiggle };
