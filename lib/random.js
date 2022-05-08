function randomRange(min, max) {
  return min + Math.random() * (max - min);
}

const randomInArray = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

export { randomRange, randomInArray };
