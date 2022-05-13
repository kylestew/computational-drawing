const zip = (a, b) => a.map((k, i) => [k, b[i]]);

const chunk = (arr) => {
  return arr.reduce((result, _, index, array) => {
    if (index % 2 === 0) result.push(array.slice(index, index + 2));
    return result;
  }, []);
};

export { zip, chunk };
