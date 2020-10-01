/* eslint-disable @typescript-eslint/ban-ts-ignore */
import { AllType } from '../interfaces';


const compose = (...funcs: Function[]): AllType => {
  const len = funcs.length;

  if (funcs.some((func: Function) => typeof func !== 'function')) {
    throw new TypeError('Expected a function');
  }

  return (...args: AllType[]): AllType => {
    let index = 1;

    // @ts-ignore TS7041
    let result = len ? funcs[index - 1].apply(this, args) : args[0];

    while (index < len) {
      // @ts-ignore TS7041
      result = funcs[index].call(this, result);
      index += 1;
    }

    return result;
  };
};

export default compose;
