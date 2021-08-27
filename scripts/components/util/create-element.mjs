export default function (tagName, attributes) {
  const e = document.createElement(tagName)
  for (const attributeName in attributes) {
    const attribute = attributes[attributeName]
    const value = attribute instanceof Array
      ? attribute.join(' ')
      : attribute == null ? '' : attribute
    // `attribute == null` is same as `[null, undefined].includes(attribute)`
    e.setAttribute(attributeName, value)
  }
  return e
}
