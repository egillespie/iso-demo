import kebabToCamelCase from '../../../src/scripts/util/kebab-to-camel-case'

test('converts kebab-case string to camelCase', () => {
  expect(kebabToCamelCase('kebab')).toEqual('kebab')
  expect(kebabToCamelCase('kebab-case')).toEqual('kebabCase')
  expect(kebabToCamelCase('kebab-case-long')).toEqual('kebabCaseLong')
})
