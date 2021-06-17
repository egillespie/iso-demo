const kebabify = require('../../../src/scripts/util/kebabify')

test('converts falsy values to empty string', () => {
  expect(kebabify(undefined)).toEqual('')
  expect(kebabify(null)).toEqual('')
})

test('converts camelCase to kebab-case', () => {
  expect(kebabify('camelCase')).toEqual('camel-case')
  expect(kebabify('LongCamelCase')).toEqual('long-camel-case')
})

test('converts snake_case to kebab-case', () => {
  expect(kebabify('snake_case')).toEqual('snake-case')
  expect(kebabify('long_snake_case')).toEqual('long-snake-case')
})

test('converts space case to kebab-case', () => {
  expect(kebabify('space case')).toEqual('space-case')
  expect(kebabify('long space case')).toEqual('long-space-case')
})

test('converts UPPERCASE to lower-kebab-case', () => {
  expect(kebabify('UPPER-CASE')).toEqual('upper-case')
})
