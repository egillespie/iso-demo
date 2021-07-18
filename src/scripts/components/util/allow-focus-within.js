const focusableElements = require('./const/focusable-elements-selector')

module.exports = function (parentElement) {
  parentElement
    .querySelectorAll(focusableElements)
    .forEach(e => e.removeAttribute('tabindex'))
}
