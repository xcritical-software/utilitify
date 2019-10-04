import toPath from 'lodash.topath';
import isNumber from 'lodash.isnumber';
import { AllType } from 'src/interfaces';


export const setInWithPath = (obj: AllType,
  value: any,
  path: string | string[],
  pathIndex: number): any => {
  if (pathIndex >= path.length) {
    return value;
  }

  const first = path[pathIndex];
  const next = setInWithPath(obj && obj[first], value, path, pathIndex + 1);

  if (!obj) {
    const initialized = isNumber(first) ? [] : {};
    initialized[first] = next;
    return initialized;
  }

  if (Array.isArray(obj)) {
    const copy = [...obj];
    copy[first] = next;
    return copy;
  }
  const result = {
    ...obj,
    [first]: next,
  };

  return result;
};

export const setIn = (
  obj: AllType,
  value: any,
  field: string | string[],
): any => setInWithPath(obj, value, toPath(field), 0);
