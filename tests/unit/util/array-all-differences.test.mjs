import allArrayDifferences from '../../../src/scripts/util/array-all-differences.mjs'

test('includes all differences in first argument', () => {
  const array1 = [1, 2, 3, 4, 5]
  const array2 = [4, 5]
  const result = allArrayDifferences(array1, array2)
  expect(result).toEqual([1, 2, 3])
})

test('includes all differences in second argument', () => {
  const array1 = [4, 5]
  const array2 = [1, 2, 3, 4, 5]
  const result = allArrayDifferences(array1, array2)
  expect(result).toEqual([1, 2, 3])
})

test('includes all differences in both arguments', () => {
  const array1 = [1, 2, 3, 4, 5]
  const array2 = [4, 5, 6, 7, 8]
  const result = allArrayDifferences(array1, array2)
  expect(result).toEqual([1, 2, 3, 6, 7, 8])
})

test('empty array when arrays are identical', () => {
  const array1 = [1, 2, 3, 4, 5]
  const array2 = [1, 2, 3, 4, 5]
  const result = allArrayDifferences(array1, array2)
  expect(result).toEqual([])
})
