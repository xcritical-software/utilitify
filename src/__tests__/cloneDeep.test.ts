import { cloneDeep, cloneObjectDeep } from '../utils';


const obj = {
  a: 1,
  b: 2,
  c: {
    d: 3,
  },
};

const arr = [{ a: 1 }, { b: 2 }];

const objWithoutOneProp: { a: string; c?: string } = { a: 'b' };
const arrWithObjWithoutOneProp = [objWithoutOneProp];

const customCloneArray = (arrStr: string[]): string[] => [...arrStr];

describe('This is the tests for the "deep clone" utils', () => {
  test('cloneDeep checking', () => {
    expect(cloneDeep(obj)).toEqual(obj);
    expect(cloneDeep(arr)).toEqual(arr);
    expect(cloneDeep(1)).toEqual(1);

    const copy = cloneDeep(arrWithObjWithoutOneProp);
    objWithoutOneProp.c = 'd';

    expect(copy).toEqual([{ a: 'b' }]);
    expect(arrWithObjWithoutOneProp).toEqual([{ a: 'b', c: 'd' }]);
  });

  test('cloneObjectDeep checking', () => {
    expect(cloneObjectDeep(['1', '2'], customCloneArray)).toEqual(['1', '2']);
    expect(cloneObjectDeep(['1', '2'])).toEqual(['1', '2']);
  });
});
