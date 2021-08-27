import kebabToPascalCase from '../../../src/scripts/util/kebab-to-pascal-case'

test('converts kebab-case string to PascalCase', () => {
  expect(kebabToPascalCase('kebab')).toEqual('Kebab')
  expect(kebabToPascalCase('kebab-case')).toEqual('KebabCase')
  expect(kebabToPascalCase('kebab-case-long')).toEqual('KebabCaseLong')
})
