import { Maybe, IJson } from '../interfaces';

import { isNil } from './utils';


export function getTruncatedString(
  str: string | null,
  length: number,
  punctuationMark?: Maybe<string>,
): string {
  if (isNil(str)) return '';

  if (str.length <= length) return str;

  return punctuationMark
    ? `${str.substring(0, length)}${punctuationMark}`
    : `${str.substring(0, length)}`;
}

export function isJsonString(str: string): boolean {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }

  return true;
}

export function getJsonFromString(str: string): IJson {
  let result;

  try {
    result = JSON.parse(str);
  } catch (e) {
    return {};
  }

  return result;
}

export function toPascalCase(string: string): string {
  return `${string}`
    .replace(new RegExp(/[-_]+/, 'g'), ' ')
    .replace(new RegExp(/[^\w\s]/, 'g'), '')
    .replace(
      new RegExp(/\s+(.)(\w+)/, 'g'),
      (_, $2: string, $3: string): string => `${$2.toUpperCase()}${$3.toLowerCase()}`,
    )
    .replace(new RegExp(/\s/, 'g'), '')
    .replace(new RegExp(/\w/), (s: string): string => s.toUpperCase());
}
