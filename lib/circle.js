// Function to find the circle on
// which the given three points lie
function findCircle(x1, y1, x2, y2, x3, y3) {
  var x12 = x1 - x2;
  var x13 = x1 - x3;

  var y12 = y1 - y2;
  var y13 = y1 - y3;

  var y31 = y3 - y1;
  var y21 = y2 - y1;

  var x31 = x3 - x1;
  var x21 = x2 - x1;

  //x1^2 - x3^2
  var sx13 = Math.pow(x1, 2) - Math.pow(x3, 2);

  // y1^2 - y3^2
  var sy13 = Math.pow(y1, 2) - Math.pow(y3, 2);

  var sx21 = Math.pow(x2, 2) - Math.pow(x1, 2);
  var sy21 = Math.pow(y2, 2) - Math.pow(y1, 2);

  var f =
    (sx13 * x12 + sy13 * x12 + sx21 * x13 + sy21 * x13) /
    (2 * (y31 * x12 - y21 * x13));
  var g =
    (sx13 * y12 + sy13 * y12 + sx21 * y13 + sy21 * y13) /
    (2 * (x31 * y12 - x21 * y13));

  var c = -Math.pow(x1, 2) - Math.pow(y1, 2) - 2 * g * x1 - 2 * f * y1;

  // eqn of circle be
  // x^2 + y^2 + 2*g*x + 2*f*y + c = 0
  // where centre is (h = -g, k = -f) and radius r
  // as r^2 = h^2 + k^2 - c
  var h = -g;
  var k = -f;
  var sqr_of_r = h * h + k * k - c;

  // r is the radius
  var r = Math.sqrt(sqr_of_r);

  // document.write("Centre = (" + h + ", " + k + ")" + "<br>");
  // document.write("Radius = " + r.toFixed(5));

  return [[h, k], r];
}

export { findCircle };
