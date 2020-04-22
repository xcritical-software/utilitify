import transform from 'lodash.transform';
import { isObject } from './isObject';

/**
 * Deep diff between two objects or arrays, using lodash
 * @param  {Object} object    Object compared
 * @param  {Object} base      Object to compare with
 * @param  {String} byField   Field to compare with (for collection)
 * @return {Object}           Return a new object or array that represent the diff
 */

export function difference<T>(
  object: T,
  base: T | any[] | object = {},
  byField?: string,
): T | T[] | Record<string, any> {
  function changes(
    subObject: T | Record<string, any>,
    subBase: T | Record<string, any>,
    subMergedObject?: Record<string, any>,
  ): Record<string, any> {
    return transform(subMergedObject, (result, _value, key) => {
      const value = subObject[key];

      if (!Object.prototype.hasOwnProperty.call(subBase, key)) {
        result[key] = value;
      } else if (Array.isArray(value) && Array.isArray(subBase[key])) {
        const childDifference = difference(value, subBase[key], byField);

        if (childDifference.length > 0) result[key] = Object.values(childDifference);

        // eslint-disable-next-line eqeqeq
      } else if (value != subBase[key]) {
        const changedValue = (isObject(value) && isObject(subBase[key]))
          ? changes(value, subBase[key], {
            ...subBase[key],
            ...value,
          }) : value;

        if (!isObject(changedValue) || Object.keys(changedValue).length > 0) result[key] = value;

        if (!changedValue && !value && subBase[key]) result[key] = subBase[key];
      }
    });
  }

  if (Array.isArray(object) && Array.isArray(base)) {
    const arraysIsEmpty = object.length === 0 && base.length === 0;

    if (arraysIsEmpty) return [];

    const isCollection = object.some(item => isObject(item)) || base.some(item => isObject(item));

    if (!isCollection && byField) {
      throw new TypeError('difference expects the first argument to be a collection if byField is specified.');
    }

    if (byField) {
      const differencesByValue: object[] = [];

      const biggerArray = base.length > object.length ? base : object;
      const smallerArray = base.length > object.length ? object : base;

      biggerArray.forEach((subBaseValue) => {
        const subObjectValue = smallerArray.find(subValueToCompare => (
          subBaseValue[byField] === subValueToCompare[byField]
        ));

        if (!subObjectValue || Object.keys(subObjectValue).length === 0) {
          differencesByValue.push(subBaseValue);
        } else {
          const foundChanges = changes(subBaseValue, subObjectValue, {
            ...subBaseValue,
            ...subObjectValue,
          });

          if (Object.keys(foundChanges).length > 0) {
            differencesByValue.push(subObjectValue);
          }
        }
      });

      return differencesByValue;
    }

    const differencesByRefWithBase = object.filter((subValue: any) => !base.includes(subValue));
    const differencesByRefWithObject = base.filter((subValue: any) => !object.includes(subValue));

    if (differencesByRefWithBase.length === 0 && differencesByRefWithObject.length === 0) return [];


    if (!isCollection) return [...differencesByRefWithBase, ...differencesByRefWithObject];
  }

  const mergedObject = {
    ...base,
    ...object,
  };

  const result = changes(object, base, mergedObject);

  return Array.isArray(object) && Array.isArray(base) ? Object.values(result) : result;
}

export function isDifference(object: any, base: any = {}, byField?: string): boolean {
  if (object === base) return false;

  const isObjects = isObject(object) && isObject(base);
  const isArrays = Array.isArray(object) && Array.isArray(base);

  if (!isObjects && !isArrays) return true;

  return isArrays
    ? (difference(object, base, byField)).length > 0
    : Object.keys(difference(object, base, byField)).length > 0;
}
