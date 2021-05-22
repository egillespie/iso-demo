module.exports = function (tagName, className) {
  const e = document.createElement(tagName)
  if (className) {
    e.classList.add(className)
  }
  return e
}
