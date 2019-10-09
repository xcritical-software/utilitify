import { compose } from '../utils';


const func1 = (value: number): number => value + 1;
const func2 = (value: number): number => value * 2;

describe('This is the tests for the "compose" util', () => {
  test('compose checking', () => {
    expect(compose(func1, func2)(1)).toEqual(4);
    expect(compose()(1)).toEqual(1);

    try {
      expect(compose(func1, {} as Function)(1)).toEqual(4);
    } catch (e) {
      expect(e).toBeInstanceOf(TypeError);
    }
  });
});
