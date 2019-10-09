import findIndex from 'lodash.findindex';
import omit from 'lodash.omit';

import compose from './compose';
import { AllType, IJson, Maybe } from '../interfaces';


export function isNil(value: AllType): boolean {
  return value == null;
}

export function getObjectWithoutEmptyPropsFrom(object: object): AllType {
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

export function getTruncatedString(
  str: string,
  length: number,
  punctuationMark?: Maybe<string>,
): string {
  if (isNil(str)) return '';
  if (str.length <= length) return str;
  return punctuationMark
    ? `${str.substring(0, length)}${punctuationMark}`
    : `${str.substring(0, length)}`;
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

export function isJsonString(str: string): boolean {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }

  return true;
}

export function getJsonFromString(str: string): IJson {
  let result;

  try {
    result = JSON.parse(str);
  } catch (e) {
    return {};
  }

  return result;
}
