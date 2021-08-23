import capitalize from '../../../src/scripts/util/capitalize.mjs'

test('capitalizes first letter of a word', () => {
  expect(capitalize('hello')).toEqual('Hello')
  expect(capitalize('Hello')).toEqual('Hello')
})
