/* eslint no-shadow: 1 */
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
    expect(difference(obj, testObj)).toEqual({ c: { d: 3 }, g: 5 });
    expect(difference(arr1, arr2)).toEqual([1, 4]);
    expect(difference(obj)).toEqual(obj);
  });

  test('isDifference checking', () => {
    expect(isDifference(obj, obj2)).toEqual(true);
    expect(isDifference(obj)).toEqual(true);
    expect(isDifference(arr1, arr2)).toEqual(true);
  });

  test('Check difference between {} and []', () => {
    const object1: any = {};
    const array2: any = [];

    expect(difference(object1, array2)).toEqual({});
    expect(isDifference(object1, array2)).toEqual(true);

    expect(difference(array2, object1)).toEqual({});
    expect(isDifference(array2, object1)).toEqual(true);
  });

  test('Check difference between null and null', () => {
    const null1: any = null;
    const null2: any = null;

    expect(difference(null1, null2)).toEqual({});
    expect(isDifference(null1, null2)).toEqual(false);
  });

  test('Check difference between [] and []', () => {
    const arr1: any = [];
    const arr2: any = [];

    expect(difference(arr1, arr2)).toEqual([]);
    expect(isDifference(arr1, arr2)).toEqual(false);
  });

  test('Check difference between [] and [null]', () => {
    const arr1: any = [];
    const arr2: any = [null];

    expect(difference(arr1, arr2)).toEqual([null]);
    expect(isDifference(arr1, arr2)).toEqual(true);

    expect(difference(arr2, arr1)).toEqual([null]);
    expect(isDifference(arr2, arr1)).toEqual(true);
  });

  test('[array] Check simple array without difference', () => {
    const arr1 = [1, 2, 3];
    const arr2 = [1, 2, 3];

    expect(difference(arr1, arr2)).toEqual([]);
    expect(isDifference(arr1, arr2)).toEqual(false);
  });

  test('[array] Check simple array with difference', () => {
    const arr1 = [1, 2, 3];
    const arr2 = [2, 2.5, 3, 4];

    expect(difference(arr1, arr2)).toEqual([1, 2.5, 4]);
    expect(isDifference(arr1, arr2)).toEqual(true);
  });

  test('[array] Check simple array without difference (if order changed)', () => {
    const arr1 = [1, 2, 3];
    const arr2 = [3, 2, 1];

    expect(difference(arr1, arr2)).toEqual([]);
    expect(isDifference(arr1, arr2)).toEqual(false);
  });

  test('[object] Check simple object without difference', () => {
    const object1 = { value: 1, label: 'One' };
    const object2 = { value: 1, label: 'One' };

    expect(difference(object1, object2)).toEqual({});
    expect(isDifference(object1, object2)).toEqual(false);
  });

  test('[object] Check simple object with difference', () => {
    const object1 = { value: 1, label: 'One2' };
    const object2 = { value: 1, label: 'One' };

    expect(difference(object1, object2)).toEqual({ label: 'One2' });
    expect(isDifference(object1, object2)).toEqual(true);
  });

  test('[object] Check simple object without difference (if order changed)', () => {
    const object1 = { label: 'One', value: 1 };
    const object2 = { value: 1, label: 'One' };

    expect(difference(object1, object2)).toEqual({});
    expect(isDifference(object1, object2)).toEqual(false);
  });

  test('[object] Check simple object with difference (if order changed)', () => {
    const object1 = { label: 'One', value: 5 };
    const object2 = { value: 1, label: 'One' };

    expect(difference(object1, object2)).toEqual({ value: 5 });
    expect(isDifference(object1, object2)).toEqual(true);
  });

  test('[collection] Check simple collection without difference', () => {
    const collection1 = [{ value: 1, label: 'One' }];
    const collection2 = [{ value: 1, label: 'One' }];

    expect(difference(collection1, collection2)).toEqual([]);
    expect(isDifference(collection1, collection2)).toEqual(false);
  });

  test('[collection] Check simple collection without difference (if order changed)', () => {
    const collection1 = [{ label: 'One', value: 1 }];
    const collection2 = [{ value: 1, label: 'One' }];

    expect(difference(collection1, collection2)).toEqual([]);
    expect(isDifference(collection1, collection2)).toEqual(false);
  });

  test('[collection] Check simple collection with difference', () => {
    const collection1 = [{ label: 'One', value: 2 }];
    const collection2 = [{ value: 1, label: 'One' }];

    expect(difference(collection1, collection2)).toEqual([{ label: 'One', value: 2 }]);
    expect(isDifference(collection1, collection2)).toEqual(true);
  });

  test('[collection] Check big collection with one difference (check by order)', () => {
    const collection1 = [{ value: 1, label: 'One' }, { value: 2, label: 'Second' }, { value: 3, label: 'Three' }];
    const collection2 = [{ value: 1, label: 'One' }, { value: 2, label: 'Two' }, { value: 3, label: 'Three' }];

    expect(difference(collection1, collection2)).toEqual([{ value: 2, label: 'Second' }]);
    expect(isDifference(collection1, collection2)).toEqual(true);
  });

  test('[collection] Check big collection with two difference (check by order)', () => {
    const collection1 = [{ value: 1, label: 'One' }, { value: 3, label: 'Three' }, { value: 2, label: 'Two' }];
    const collection2 = [{ value: 1, label: 'One' }, { value: 2, label: 'Two' }, { value: 3, label: 'Three' }];

    expect(difference(collection1, collection2)).toEqual([
      { value: 3, label: 'Three' },
      { value: 2, label: 'Two' },
    ]);

    expect(isDifference(collection1, collection2)).toEqual(true);
  });

  test('[collection] Check big collection without difference (check by field)', () => {
    const collection1 = [{ value: 1, label: 'One' }, { value: 3, label: 'Three' }, { value: 2, label: 'Two' }];
    const collection2 = [{ value: 1, label: 'One' }, { value: 2, label: 'Two' }, { value: 3, label: 'Three' }];

    expect(difference(collection1, collection2, 'value')).toEqual([]);
    expect(isDifference(collection1, collection2, 'value')).toEqual(false);
  });

  test('[collection] Check collection and empty array', () => {
    const collection1 = [{ a: [1, 2, 3] }];
    const collection2: object[] = [];

    expect(difference(collection1, collection2)).toEqual([{ a: [1, 2, 3] }]);
    expect(isDifference(collection1, collection2)).toEqual(true);

    expect(difference(collection2, collection1)).toEqual([{ a: [1, 2, 3] }]);
    expect(isDifference(collection2, collection1)).toEqual(true);
  });

  test('[deepObject] Check deepObject without difference', () => {
    const deepObject1 = { array: [{ value: 1 }, { value: 2 }] };
    const deepObject2 = { array: [{ value: 1 }, { value: 2 }] };

    expect(difference(deepObject1, deepObject2)).toEqual({});
    expect(isDifference(deepObject1, deepObject2)).toEqual(false);
  });

  test('[deepObject] Check deepObject with difference', () => {
    const deepObject1 = { array: [{ value: 1, label: 'One' }, { value: 2, label: { something: false } }] };
    const deepObject2 = { array: [{ value: 1, label: 'One' }, { value: 3 }] };

    expect(difference(deepObject1, deepObject2)).toEqual({
      array: [{ value: 2, label: { something: false } }],
    });

    expect(isDifference(deepObject1, deepObject2)).toEqual(true);
  });

  test('[deepObject] Check deepObject with difference (if only order changed)', () => {
    const deepObject1 = { array: [{ value: 1 }, { value: 1.5 }, { value: 2 }] };
    const deepObject2 = { array: [{ value: 2 }, { value: 1.5 }, { value: 1 }] };

    expect(difference(deepObject1, deepObject2)).toEqual({
      array: [{ value: 1 }, { value: 2 }],
    });
    expect(isDifference(deepObject1, deepObject2)).toEqual(true);
  });

  test('[deepObject] Check deepObject with difference and argument "byField" (if only order changed)', () => {
    const deepObject1 = { array: [{ value: 1 }, { value: 1.5 }, { value: 2 }] };
    const deepObject2 = { array: [{ value: 2 }, { value: 1.5 }, { value: 1 }] };

    expect(difference(deepObject1, deepObject2, 'value')).toEqual({});
    expect(isDifference(deepObject1, deepObject2, 'value')).toEqual(false);
  });

  test('[deepObject] Check deepObject without difference and argument "byField"', () => {
    const deepObject1 = { array: [{ value: 1 }, { value: 2 }] };
    const deepObject2 = { array: [{ value: 1 }, { value: 2 }] };

    expect(difference(deepObject1, deepObject2, 'value')).toEqual({});
    expect(isDifference(deepObject1, deepObject2)).toEqual(false);
  });

  test('[deepObject] Check difference by value if order is changed with byField argument', () => {
    const deepObject1 = { array: [{ value: 1 }, { value: 1.5 }, { value: 2 }] };
    const deepObject2 = { array: [{ value: 2 }, { value: 1.5 }, { value: 1 }] };

    expect(difference(deepObject1, deepObject2, 'value')).toEqual({});
    expect(isDifference(deepObject1, deepObject2, 'value')).toEqual(false);
  });
});
