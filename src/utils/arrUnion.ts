type United = string | number | null | undefined | object;

const union = (init: United[], ...rest: United[]): United[] => {
  if (!Array.isArray(init)) {
    throw new TypeError('arrUnion expects the first argument to be an array.');
  }

  const result = [...new Set(init)];

  rest.forEach((arg) => {
    if (arg) {
      const item = Array.isArray(arg) ? arg : [arg];
      item.forEach((element) => {
        if (!result.includes(element)) {
          result.push(element);
        }
      });
    }
  });

  return result;
};

export default union;
