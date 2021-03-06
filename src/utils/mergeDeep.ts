
import union from './arrUnion';
import cloneDeep from './cloneDeep';
import { isObject } from './isObject';


const checkValidKeys = (key: string): boolean => key !== '__proto__' && key !== 'constructor' && key !== 'prototype';

const merge = (target: any, obj: any): any => {
  Object.keys(obj).forEach((key: string): void => {
    if (checkValidKeys(key)) {
      const oldVal = obj[key];
      const newVal = target[key];

      if (isObject(newVal) && isObject(oldVal)) {
        target[key] = merge(newVal, oldVal);
      } else if (Array.isArray(newVal)) {
        target[key] = union([], newVal, oldVal);
      } else {
        target[key] = cloneDeep(oldVal);
      }
    }
  });

  return target;
};

const mergeDeep = (orig: any, ...rest: any[]): any => {
  const source = !isObject(orig) && !Array.isArray(orig) ? {} : { ...orig };
  const target = cloneDeep(source);

  rest.forEach((val: any): void => {
    if (isObject(val) || Array.isArray(val)) {
      merge(target, val);
    }
  });

  return target;
};

export default mergeDeep;
