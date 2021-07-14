module.exports = function (element, attribute, value) {
  if (value) {
    element.setAttribute(attribute, value)
  } else {
    element.removeAttribute(attribute)
  }
}
