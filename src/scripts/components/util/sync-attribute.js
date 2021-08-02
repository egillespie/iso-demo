module.exports = function (element, attribute, value) {
  if (value != null) {
    element.setAttribute(attribute, value)
  } else {
    element.removeAttribute(attribute)
  }
}
