import toPath from 'lodash.topath';
import isNumber from 'lodash.isnumber';


type Many<T> = T | readonly T[];

type PropertyName = string | number | symbol;
type PropertyPath = Many<PropertyName>;

export const setInWithPath = (obj: any,
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

export function setIn<TReturn, TValue>(
  obj: TReturn,
  value: TValue,
  field: PropertyPath,
): TReturn {
  return setInWithPath(obj, value, toPath(field), 0);
}
