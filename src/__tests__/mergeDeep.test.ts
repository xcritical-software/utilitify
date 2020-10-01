/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/ban-ts-ignore */
import { mergeDeep } from '../utils';


describe('This is the tests for the "merge deep" util', () => {
  test('should not merge the __proto__ property', () => {
    const src = JSON.parse('{ "__proto__": { "xxx": "polluted" } }');
    const dst = {};

    mergeDeep(dst, src);
    // @ts-ignore
    if (typeof dst.__proto__ !== 'undefined') { // eslint-disable-line
      // Should not overwrite the __proto__ property or pollute the Object prototype
      // @ts-ignore
      expect(dst.__proto__).toBe(Object.prototype); // eslint-disable-line
    }

    // @ts-ignore
    expect(({}).xxx).toBeUndefined();
  });

  test('Merge two objects', () => {
    expect(mergeDeep({ a: 1, b: 2 }, { b: 3, c: 4 })).toEqual({ a: 1, b: 3, c: 4 });

    expect(mergeDeep({ a: 1, b: [2, 3] }, { b: [3, 4], c: 3 })).toEqual({
      a: 1,
      b: [2, 3, 4],
      c: 3,
    });

    expect(mergeDeep(1, { a: 1, b: 2 })).toEqual({ a: 1, b: 2 });

    expect(mergeDeep({ a: 1, b: 2 }, 1)).toEqual({ a: 1, b: 2 });

    expect(mergeDeep({ a: 1, b: [2, { c: 3 }] }, { b: [3, { c: 4 }], d: 3 })).toEqual({
      a: 1,
      b: [2, { c: 3 }, 3, { c: 4 }],
      d: 3,
    });

    expect(mergeDeep({ a: 1, b: { c: 2 } }, { b: { c: 4 } })).toEqual({ a: 1, b: { c: 4 } });

    expect(mergeDeep({ a: { b: { c: 'c', d: 'd' } } }, { a: { b: { e: 'e', f: 'f' } } }))
      .toEqual({
        a: {
          b: {
            c: 'c', d: 'd', e: 'e', f: 'f',
          },
        },
      });
  });
});
