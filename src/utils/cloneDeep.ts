import kindOf from 'kind-of';

import { isObject } from './isObject';
import cloneShallow from './cloneShallow';


const cloneDeep = (val: any, instanceClone?: Function | undefined): any => {
  switch (kindOf(val)) {
    case 'object':
      return cloneObjectDeep(val, instanceClone); // eslint-disable-line
    case 'array':
      return cloneArrayDeep(val, instanceClone); // eslint-disable-line
    default:
      return cloneShallow(val);
  }
};

export const cloneObjectDeep = (obj: any, instanceClone?: Function | undefined): any => {
  if (isObject(obj)) {
    const res = Object.entries(obj).reduce((current, [key, value]) => {
      const clonedValue = cloneDeep(value, instanceClone);

      return {
        ...current,
        [key]: clonedValue,
      };
    }, {});

    return res;
  }

  if (instanceClone !== undefined) {
    return instanceClone(obj);
  }

  return obj;
};

export const cloneArrayDeep = (arr: any[], instanceClone?: Function | undefined): any[] => {
  const res = arr.map((item: any) => cloneDeep(item, instanceClone));

  return res;
};

export default cloneDeep;
