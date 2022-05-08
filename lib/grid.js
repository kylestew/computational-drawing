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

export { rectangularGridOfPoints };
