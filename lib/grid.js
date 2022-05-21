function rectGrid(rows, cols, width, height, flipped = false) {
  rectGridFn(
    (pt) => {
      return pt;
    },
    rows,
    cols,
    width,
    height,
    flipped
  );
}

function rectGridFn(fn, rows, cols, width, height, flipped = false) {
  // create grid of points
  var pts = [];
  const cell_width = width / (cols - 1);
  const cell_height = height / (rows - 1);
  for (var y = 0; y < rows; ++y) {
    for (var x = 0; x < cols; ++x) {
      pts.push(fn([x * cell_width, y * cell_height], y, x));
    }
  }
  return pts;
}

export { rectGrid, rectGridFn };
