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

const arr1 = [1, 2, 3];

const arr2 = [2, 3, 4];

describe('This is the tests for the "difference" utils', () => {
  test('difference checking', () => {
    const testObj = { ...obj, ...obj2 };
    expect(difference(testObj, obj)).toEqual(obj2);
    expect(difference(obj, testObj)).toEqual({ c: { d: 3 } });
    expect(difference(arr1, arr2)).toEqual([1]);
    expect(difference(obj)).toEqual(obj);
  });

  test('isDifference checking', () => {
    expect(isDifference(obj, obj2)).toEqual(true);
    expect(isDifference(obj)).toEqual(true);
    expect(isDifference(arr1, arr2)).toEqual(true);
  });
});
