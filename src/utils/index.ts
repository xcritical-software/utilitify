import union from './arrUnion';
import cloneDeep, { cloneObjectDeep, cloneArrayDeep } from './cloneDeep';
import cloneShallow, {
  cloneRegExp, cloneArrayBuffer, cloneTypedArray, cloneSymbol,
} from './cloneShallow';
import mergeDeep from './mergeDeep';
import compose from './compose';


export {
  union,
  cloneDeep,
  cloneObjectDeep,
  cloneArrayDeep,
  cloneShallow,
  cloneRegExp,
  cloneArrayBuffer,
  cloneTypedArray,
  cloneSymbol,
  mergeDeep,
  compose,
};

export * from './isObject';
export * from './difference';
export * from './delIn';
export * from './setIn';
export * from './utils';
export * from './string';
