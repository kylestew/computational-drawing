class PixelCanvas {
  constructor(context) {
    this.width = context.canvas.width;
    this.height = context.canvas.height;
    this.imageData = context.getImageData(0, 0, this.width, this.height);
  }

  /*
   * PixelCanvas is normalized coords [-1, 1]
   */
  normalizedIndexForPoint(pt) {
    // assuming a square canvas - update for other needs

    // scale up and translate
    const halfWidth = this.width / 2;
    const x = parseInt(pt[0] * halfWidth + halfWidth);
    const y = parseInt(pt[1] * -halfWidth + halfWidth);

    return y * (this.width * 4) + x * 4;
  }

  /*
   * Draw a pixel into the canvas
   *
   * Params:
   * - point: [X, Y]
   * - color: [R, G, B, A]
   */
  put(pt, color) {
    const idx = this.normalizedIndexForPoint(pt);

    this.imageData.data[idx + 0] = color[0];
    this.imageData.data[idx + 1] = color[1];
    this.imageData.data[idx + 2] = color[2];
    this.imageData.data[idx + 3] = color[3];
  }

  display(context) {
    context.putImageData(this.imageData, 0, 0);
  }
}

export { PixelCanvas };
