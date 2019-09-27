# utilitify
> The utilities for working with a collections such as objects, arrays and primitives such as numbers, strings, etc.

[![Build Status](https://travis-ci.org/xcritical-software/utilitify.svg?branch=master)](https://travis-ci.org/xcritical-software/utilitify)

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

> Check if any JavaScript value is object

```js
import { isObject } from 'utilitify';

const obj = { a: 1, b: 2 };

isObject(obj);
//=> true

isObject(1);
//=> false
```
