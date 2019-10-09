import {
  getTruncatedString,
  isJsonString,
  getJsonFromString,
  toPascalCase,
} from '../utils';


describe('This is the tests for the "string" utils', () => {
  test('getTruncatedString checking', () => {
    expect(getTruncatedString('longString', 4)).toEqual('long');
    expect(getTruncatedString('longString', 4, '...')).toEqual('long...');
    expect(getTruncatedString('', 4)).toEqual('');
    expect(getTruncatedString('short', 6)).toEqual('short');
    expect(getTruncatedString(null, 6)).toEqual('');
  });

  test('isJsonString checking', () => {
    expect(isJsonString('a')).toEqual(false);
    expect(isJsonString('{"e":2}')).toEqual(true);
  });

  test('getJsonFromString checking', () => {
    expect(getJsonFromString('a')).toEqual({});
    expect(getJsonFromString('{"e":2}')).toEqual({ e: 2 });
  });

  test('toPascalCase checking', () => {
    expect(toPascalCase('pascalCase')).toEqual('PascalCase');
    expect(toPascalCase('pascal-Case')).toEqual('PascalCase');
    expect(toPascalCase('pascal case')).toEqual('PascalCase');
  });
});
