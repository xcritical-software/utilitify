export type Maybe<T> = T | null | undefined;

export type TypedArray = Int8Array | Uint8Array | Uint8ClampedArray | Int16Array | Uint16Array
| Int32Array | Uint32Array | Float32Array | Float64Array;

export interface IRegExpConstructor {
  new (source: string, flags: string): RegExp;
}

export interface IArrayBufferConstructor {
  new (byteLength: number): ArrayBuffer;
}

export interface ITypedArrayConstructor {
  new (buffer: ArrayBuffer, byteOffset: number, length: number): TypedArray;
}

export interface IKeyValue<T> {
  [key: string]: T;
}

export interface IJson {
  [key: string]: any;
}
