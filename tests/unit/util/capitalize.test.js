const capitalize = require('../../../src/scripts/util/capitalize')

test('capitalizes first letter of a word', () => {
  expect(capitalize('hello')).toEqual('Hello')
  expect(capitalize('Hello')).toEqual('Hello')
})
