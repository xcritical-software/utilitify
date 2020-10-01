import {
  isNil,
  isNull,
  isUndefined,
  getObjectWithoutEmptyPropsFrom,
  getObjectWithoutUndefinedPropsFrom,
  upsertObjectToArray,
  getObjectFromArrayByProp,
  getArrayOfObjectsWithoutProp,
} from '../utils';


const objectWithEmptyProps = {
  a: 1,
  b: null,
  c: 'string',
  d: undefined,
  e: '',
};

const arr1 = [{ a: 1 }, { b: 2 }];
const arr2 = [{ first: 1 }, { second: 2 }];

describe('This is the tests for the "utils"', () => {
  test('isNil checking', () => {
    expect(isNil(1)).toEqual(false);
    expect(isNil(null)).toEqual(true);
    expect(isNil(undefined)).toEqual(true);
  });

  test('isNull checking', () => {
    expect(isNull(1)).toEqual(false);
    expect(isNull(null)).toEqual(true);
    expect(isNull(undefined)).toEqual(false);
  });

  test('isUndefined checking', () => {
    expect(isUndefined(1)).toEqual(false);
    expect(isUndefined(undefined)).toEqual(true);
    expect(isUndefined(null)).toEqual(false);
  });

  test('getObjectWithoutEmptyPropsFrom checking', () => {
    expect(getObjectWithoutEmptyPropsFrom(objectWithEmptyProps))
      .toEqual({ a: 1, c: 'string' });
  });

  test('getObjectWithoutUndefinedPropsFrom checking', () => {
    expect(getObjectWithoutUndefinedPropsFrom(objectWithEmptyProps))
      .toEqual({
        a: 1,
        b: null,
        c: 'string',
        e: '',
      });
  });

  test('upsertObjectToArray checking', () => {
    upsertObjectToArray(arr1, { c: 3 }, 3);
    expect(arr1).toEqual([{ a: 1 }, { b: 2 }, 3]);

    upsertObjectToArray(arr2, { first: 1 }, { first: 3 });
    expect(arr2).toEqual([{ first: 3 }, { second: 2 }]);
  });

  test('getObjectFromArrayByProp checking', () => {
    expect(getObjectFromArrayByProp(arr1, 'a')).toEqual({ a: 1 });
    expect(getObjectFromArrayByProp(arr1, 'e')).toEqual({});
  });

  test('getArrayOfObjectsWithoutProp checking', () => {
    const arr = [{ a: 1, c: 10 }, { b: 2 }];
    expect(getArrayOfObjectsWithoutProp(arr, 'a')).toEqual([{ c: 10 }, { b: 2 }]);
  });
});
