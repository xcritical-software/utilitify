import kindOf from 'kind-of';

import { isObject } from './isObject';
import cloneShallow from './cloneShallow';
import { AllType } from '../interfaces';


const cloneDeep = (val: AllType, instanceClone?: Function | undefined): AllType => {
  switch (kindOf(val)) {
    case 'object':
      return cloneObjectDeep(val, instanceClone); // eslint-disable-line
    case 'array':
      return cloneArrayDeep(val, instanceClone); // eslint-disable-line
    default:
      return cloneShallow(val);
  }
};

export const cloneObjectDeep = (obj: AllType, instanceClone?: Function | undefined): AllType => {
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

export const cloneArrayDeep = (arr: AllType[], instanceClone?: Function | undefined): AllType[] => {
  const res = arr.map((item: AllType) => cloneDeep(item, instanceClone));

  return res;
};

export default cloneDeep;
