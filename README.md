# utilitify
> The utilities for working with a collections such as objects, arrays and primitives such as numbers, strings, etc.

[![Build Status](https://travis-ci.com/xcritical-software/utilitify.svg?branch=master)](https://travis-ci.com/xcritical-software/utilitify)

## Install

Install with [yarn](https://yarnpkg.com/):

```sh
$ yarn add utilitify
```

Install with [npm](https://www.npmjs.com/):

```sh
$ npm install --save utilitify
```

## Usage

These utilities include a different methods for working with JavaScript collections and primitives.

For example, if you want to merge two objects recursively, you can use a method 'mergeDeep':

```js
import { mergeDeep } from 'utilitify';

mergeDeep({ a: { b: { c: 'c', d: 'd' } } }, { a: { b: { e: 'e', f: 'f' } } });
//=> { a: { b: { c: 'c', d: 'd', e: 'e', f: 'f' } } }
```

You can find all methods in API section.

## About

<details>
<summary><strong>Contributing</strong></summary>

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](../../issues/new).

</details>

<details>
<summary><strong>Running Tests</strong></summary>

Running and reviewing unit tests is a great way to get familiarized with a library and its API. You can install dependencies and run tests with the following command:

```sh
$ yarn && yarn test
```

</details>

## API

#### `mergeDeep`

> Recursively merge values in a javascript object.

```js
import { mergeDeep } from 'utilitify';

mergeDeep({ a: 1, b: [2, 3] }, { b: [3, 4], c: 3 });
//=> { a: 1, b: [2, 3, 4], c: 3 }
```

#### `cloneDeep`

> Recursively (deep) clone JavaScript native types, like Object, Array, RegExp, Date as well as primitives.

```js
import { cloneDeep } from 'utilitify';

const obj = { a: 'b' };
const arr = [obj];
const copy = cloneDeep(arr);
obj.c = 'd';
 
console.log(copy);
//=> [{ a: 'b' }]
 
console.log(arr);
//=> [{ a: 'b', c: 'd' }]
```

#### `cloneShallow`

> Creates a shallow clone of any JavaScript value.

```js
import { cloneShallow } from 'utilitify';

const arr = [{ a: 0 }, { b: 1 }];
const foo = cloneShallow(arr);
// foo =>  [{ 'a': 0 }, { 'b': 1 }]
 
// array is cloned
assert(actual === expected); // false
 
// array elements are not
assert.deepEqual(actual[0], expected[0]); // true
```

#### `union`

> Combines a list of arrays, returning a single array with unique values, using strict equality for comparisons.

```js
import { union } from 'utilitify';

union(['a'], ['b', 'c'], ['d', 'e', 'f']);
//=> ['a', 'b', 'c', 'd', 'e', 'f']

union(['a', 'a'], ['b', 'c']);
//=> ['a', 'b', 'c']
```

#### `isObject`

> Check if any JavaScript value is object.

```js
import { isObject } from 'utilitify';

const obj = { a: 1, b: 2 };

isObject(obj);
//=> true

isObject(1);
//=> false
```

#### `isNil`

> Check if any JavaScript value is null or undefined.

```js
import { isNil } from 'utilitify';

const obj = { a: 1, b: 2 };

isNil(obj);
//=> false

isNil(null);
//=> true
```

#### `isNull`

> Check if any JavaScript value is null.

```js
import { isNull } from 'utilitify';

isNull(undefined);
//=> false

isNull(null);
//=> true
```

#### `isUndefined`

> Check if any JavaScript value is undefined.

```js
import { isUndefined } from 'utilitify';

isUndefined(null);
//=> false

isUndefined(undefined);
//=> true
```

#### `getObjectWithoutEmptyPropsFrom`

> Remove from object all values which equal 'null', 'undefined' or empty string.

```js
import { getObjectWithoutEmptyPropsFrom } from 'utilitify';

const objectWithEmptyProps = {
  a: 1,
  b: null,
  c: 'string',
  d: undefined,
  e: '',
};

getObjectWithoutEmptyPropsFrom(objectWithEmptyProps);
//=> { a: 1, c: 'string' }
```

#### `getObjectWithoutUndefinedPropsFrom`

> Remove from object all values which equal 'undefined'.

```js
import { getObjectWithoutUndefinedPropsFrom } from 'utilitify';

const objectWithUndefinedProps = {
  a: 1,
  b: null,
  c: 'string',
  d: undefined,
  e: '',
};

getObjectWithoutUndefinedPropsFrom(objectWithUndefinedProps);
//=> { a: 1, b: null, c: 'string', e: '' }
```

#### `getTruncatedString`

> Get truncated string by number of symbols (second argument) with punctuation mark on the end if need.

```js
import { getTruncatedString } from 'utilitify';

getTruncatedString('string', 3);
//=> str

getTruncatedString('string', 3, '...');
//=> str...
```

#### `upsertObjectToArray`

> Update object in array. If object does not exist, method push new value (third argument) to array.

```js
import { upsertObjectToArray } from 'utilitify';

const arr = [{ a: 1 }, { b: 2 }];

upsertObjectToArray(arr, { a: 1 }, { a: 3 });
console.log(arr);
//=> [{ a: 3 }, { b: 2 }]
```

#### `getObjectFromArrayByProp`

> Get object from array by it's property.

```js
import { getObjectFromArrayByProp } from 'utilitify';

const arr = [{ a: 1 }, { b: 2 }];

getObjectFromArrayByProp(arr, 'a');
//=> { a: 1 }
```

#### `getArrayOfObjectsWithoutProp`

> Get new array of objects from which are deleted property (second argument).

```js
import { getArrayOfObjectsWithoutProp } from 'utilitify';

const arr = [{ a: 1, c: 10 }, { b: 2 }];

getArrayOfObjectsWithoutProp(arr, 'a');
//=> [{ c: 10 }, { b: 2 }]
```

#### `isJsonString`

> Check if string is JSON.

```js
import { isJsonString } from 'utilitify';

const str = '{"a":2}';

isJsonString(str);
//=> true
```

#### `getJsonFromString`

> Get JSON from string if possibly. If string is not valid JSON string, method returns empty object.

```js
import { getJsonFromString } from 'utilitify';

const validStr = '{"a":2}';
const invalidStr = '{a:2}';

getJsonFromString(validStr);
//=> { a: 2 }

getJsonFromString(invalidStr);
//=> {}
```

#### `toPascalCase`

> Convert any string to 'PascalCase' string.

```js
import { toPascalCase } from 'utilitify';

toPascalCase('pascal case');
//=> PascalCase
```

#### `compose`

> Compose several functions which return some result.

```js
import { compose } from 'utilitify';

const inc = (value) => value + 1;
const mul2 = (value) => value * 2;

compose(inc, mul2)(1);
//=> 4
```

#### `setIn`

> Set new value (second argument) in object by property (third argument) and return new object.

```js
import { setIn } from 'utilitify';

const obj = {
  a: 1,
  b: 2,
  c: {
    d: 3,
  },
};

const result = setIn(obj, 5, 'd.f.r');
console.log(result);
//=> { a: 1, b: 2, c: { d: 3 }, d: { f: { r: 5 } } }
```

#### `delIn`

> Delete property (second argument) in object and return new object.

```js
import { delIn } from 'utilitify';

const obj = {
  a: 1,
  b: 2,
  c: {
    d: 3,
  },
};

const result = delIn(obj, 'c.d');
console.log(result);
//=> { a: 1, b: 2, c: {} }
```

#### `difference`

> Compare two objects (or arrays) and return a new object (or array) who represent the diff.

```js
import { difference } from 'utilitify';

const obj = {
  a: 1,
  b: 2,
  c: {
    d: 3,
  },
};

const obj2 = {
  c: {
    d: {
      f: 5,
    },
  },
  g: 5,
};

const testObj = { ...obj, ...obj2 };

const result = difference(obj, testObj);
console.log(result);
//=> { c: { d: 3 } }
```

#### `isDifference`

> Compare two objects (or arrays) and return 'true' if equal or 'false' if not.

```js
import { isDifference } from 'utilitify';

const arr1 = [1, 2, 3];

const arr2 = [2, 3, 4];

isDifference(arr1, arr2);
//=> true
```
