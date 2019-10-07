import transform from 'lodash.transform';
import { isObject } from './isObject';

/**
 * Deep diff between two object, using lodash
 * @param  {Object} object Object compared
 * @param  {Object} base   Object to compare with
 * @return {Object}        Return a new object who represent the diff
 */

export function difference<T>(
  object: T,
  base: T | any[] | object = {},
): T | T[] | Record<string, any> {
  if (Array.isArray(object)) {
    return object.filter(x => !(base as any[]).includes(x));
  }

  const mergedObject = {
    ...base,
    ...object,
  };

  function changes(
    subObject: T | Record<string, any>,
    subBase: T | Record<string, any>,
    subMergedObject?: Record<string, any>,
  ): Record<string, any> {
    return transform(subMergedObject, (result, _value, key) => {
      const value = subObject[key];

      if (!Object.prototype.hasOwnProperty.call(subBase, key)) {
        result[key] = value;
        // eslint-disable-next-line eqeqeq
      } else if (value != subBase[key]) {
        const newValue = (isObject(value) && isObject(subBase[key]))
          ? changes(value, subBase[key], {
            ...subBase[key],
            ...value,
          }) : value;
        result[key] = newValue;
      }
    });
  }
  return changes(object, base, mergedObject);
}

export function isDifference(object: any, base: any = {}): boolean {
  return Array.isArray(object)
    ? (difference(object, base)).length > 0
    : Object.keys(difference(object, base)).length > 0;
}
