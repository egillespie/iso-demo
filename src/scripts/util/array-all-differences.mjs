// Returns all differences between two arrays. The items in both arrays are
// first converted to strings with `JSON.stringify` for deep comparison.
export default function (array1, array2) {
  const diff1 = array1.filter(item1 => {
    const str1 = JSON.stringify(item1)
    return !array2.map((item2) => JSON.stringify(item2)).includes(str1)
  })
  const diff2 = array2.filter((item2) => {
    const str2 = JSON.stringify(item2)
    return !array1.map((item1) => JSON.stringify(item1)).includes(str2)
  })
  return [...diff1, ...diff2]
}
