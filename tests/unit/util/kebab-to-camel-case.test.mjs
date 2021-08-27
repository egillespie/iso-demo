import kebabToCamelCase from '../../../scripts/util/kebab-to-camel-case.mjs'

test('converts kebab-case string to camelCase', () => {
  expect(kebabToCamelCase('kebab')).toEqual('kebab')
  expect(kebabToCamelCase('kebab-case')).toEqual('kebabCase')
  expect(kebabToCamelCase('kebab-case-long')).toEqual('kebabCaseLong')
})
