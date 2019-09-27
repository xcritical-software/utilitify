export type TypedArray = Int8Array | Uint8Array | Uint8ClampedArray | Int16Array | Uint16Array
| Int32Array | Uint32Array | Float32Array | Float64Array;

export type AllType = undefined | null | boolean | Buffer | number | string | Date | RegExp | Error
| Iterator<any> | any[] | Function | Promise<any> | Map<any, any> | WeakMap<any, any> | Set<any>
| WeakSet<any> | TypedArray | any;

export interface IRegExpConstructor {
  new (source: string, flags: string): RegExp;
}

export interface IArrayBufferConstructor {
  new (byteLength: number): ArrayBuffer;
}

export interface ITypedArrayConstructor {
  new (buffer: ArrayBuffer, byteOffset: number, length: number): TypedArray;
}
