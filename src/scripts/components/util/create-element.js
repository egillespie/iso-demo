module.exports = function (tagName, attributes) {
  const e = document.createElement(tagName)
  for (const attributeName in attributes) {
    const attribute = attributes[attributeName]
    const value = attribute instanceof Array
      ? attribute.join(' ')
      : (attribute || '')
    e.setAttribute(attributeName, value)
  }
  return e
}
