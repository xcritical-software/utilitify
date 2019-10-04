import { difference, isDifference } from '../utils';


const obj = {
  a: 1,
  b: 2,
  c: {
    d: 3,
  },
};

const obj2 = {
  c: {
    d: {
      f: 5,
    },
  },
  g: 5,
};

describe('This is the tests for the "difference" utils', () => {
  test('difference checking', () => {
    const testObj = { ...obj, ...obj2 };
    expect(difference(testObj, obj)).toEqual(obj2);
    expect(difference(obj, testObj)).toEqual({ c: { d: 3 } });
  });

  test('difference checking', () => {
    expect(isDifference(obj, obj2)).toEqual(true);
  });
});
