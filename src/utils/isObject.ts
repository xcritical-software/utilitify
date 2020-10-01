
export const isObject = (val: any): boolean => val !== null
  && typeof val === 'object' && Array.isArray(val) === false;

export const isObjectObject = (o: any): boolean => isObject(o) === true
  && Object.prototype.toString.call(o) === '[object Object]';

export const isPlainObject = (o: any): boolean => {
  if (isObjectObject(o) === false) return false;

  return true;
};
