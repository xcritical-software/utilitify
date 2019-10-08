import {
  isNil,
  getObjectWithoutEmptyPropsFrom,
  getTruncatedString,
  upsertObjectToArray,
  getObjectFromArrayByProp,
  getArrayOfObjectsWithoutProp,
  isJsonString,
  getJsonFromString,
} from '../utils';


const objectWithEmptyProps = {
  a: 1,
  b: null as null,
  c: 'string',
  d: undefined as undefined,
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

  test('getObjectWithoutEmptyPropsFrom checking', () => {
    expect(getObjectWithoutEmptyPropsFrom(objectWithEmptyProps))
      .toEqual({ a: 1, c: 'string' });
  });

  test('getTruncatedString checking', () => {
    expect(getTruncatedString('longString', 4)).toEqual('long');
    expect(getTruncatedString('longString', 4, '...')).toEqual('long...');
    expect(getTruncatedString('', 4)).toEqual('');
    expect(getTruncatedString('short', 6)).toEqual('short');
    expect(getTruncatedString(null, 6)).toEqual('');
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

  test('isJsonString checking', () => {
    expect(isJsonString('a')).toEqual(false);
    expect(isJsonString('{"e":2}')).toEqual(true);
  });

  test('getJsonFromString checking', () => {
    expect(getJsonFromString('a')).toEqual({});
    expect(getJsonFromString('{"e":2}')).toEqual({ e: 2 });
  });
});
