import findIndex from 'lodash.findindex';
import omit from 'lodash.omit';

import compose from './compose';
import { AllType } from '../interfaces';


export function isNil(value: AllType): boolean {
  return value == null;
}

export function isNull(value: AllType): boolean {
  return value === null;
}

export function isUndefined(value: AllType): boolean {
  return value === undefined;
}

export function getObjectWithoutEmptyPropsFrom(object: object): object {
  return compose(
    (obj: object): object => {
      const result = {};

      Object.keys(obj).forEach((key: string) => {
        switch (typeof obj[key]) {
          case 'string':
            if (obj[key] !== '') {
              result[key] = obj[key];
            }
            break;
          default:
            result[key] = obj[key];
        }
      });

      return result;
    },
    (obj: object): object => {
      const result = {};

      Object.keys(obj).forEach((key: string) => {
        if (!isNil(obj[key])) {
          result[key] = obj[key];
        }
      });

      return result;
    },
  )(object);
}

export function getObjectWithoutUndefinedPropsFrom(object: object): object {
  const result = {};

  Object.keys(object).forEach((key: string) => {
    if (!isUndefined(object[key])) {
      result[key] = object[key];
    }
  });

  return result;
}

export function upsertObjectToArray(arr: AllType[], prop: object, newVal: AllType): void {
  const index = findIndex(arr, prop);
  if (index !== -1) {
    arr.splice(index, 1, newVal);
  } else {
    arr.push(newVal);
  }
}

export function getObjectFromArrayByProp(arr: AllType[], prop: string): AllType {
  const index = findIndex(arr, prop);

  if (index !== -1) {
    return arr[index];
  }

  return {};
}

export function getArrayOfObjectsWithoutProp(arr: AllType[], propName: string): AllType[] {
  return arr.map(obj => omit(obj, [propName]));
}
