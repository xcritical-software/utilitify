import kindOf from 'kind-of';

import {
  TypedArray,
  IRegExpConstructor,
  IArrayBufferConstructor,
  ITypedArrayConstructor,
} from '../interfaces';


export const cloneRegExp = (val: RegExp): RegExp => {
  const RegExpConstructor = val.constructor as IRegExpConstructor;
  const re = new RegExpConstructor(val.source, val.flags);
  re.lastIndex = val.lastIndex;

  return re;
};

export const cloneArrayBuffer = (val: ArrayBuffer): ArrayBuffer => {
  const ArrayBufferConstructor = val.constructor as IArrayBufferConstructor;
  const res = new ArrayBufferConstructor(val.byteLength);
  new Uint8Array(res).set(new Uint8Array(val));

  return res;
};

export const cloneTypedArray = (val: TypedArray): TypedArray => {
  const TypedArrayConstructor = val.constructor as ITypedArrayConstructor;
  const result = new TypedArrayConstructor(val.buffer, val.byteOffset, val.length);

  return result;
};

export const cloneSymbol = (val: symbol): symbol => Object(Symbol.prototype.valueOf.call(val));

const cloneShallow = (val: any): any => {
  switch (kindOf(val)) {
    case 'array':
      return val.slice();
    case 'object':
      return { ...val };
    case 'date':
      return new val.constructor(Number(val));
    case 'map':
      return new Map(val);
    case 'set':
      return new Set(val);
    case 'symbol':
      return cloneSymbol(val);
    case 'arraybuffer':
      return cloneArrayBuffer(val);
    case 'float32array':
    case 'float64array':
    case 'int16array':
    case 'int32array':
    case 'int8array':
    case 'uint16array':
    case 'uint32array':
    case 'uint8clampedarray':
    case 'uint8array':
      return cloneTypedArray(val);
    case 'regexp':
      return cloneRegExp(val);
    case 'error':
      return Object.create(val);
    default: {
      return val;
    }
  }
};

export default cloneShallow;
