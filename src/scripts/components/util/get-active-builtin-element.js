// Returns the builtin browser element that has focus, even if it's within a
// custom web component. Useful for returning focus after a focus trap.
module.exports = function getActiveBuiltinElement (rootElement = document) {
  return rootElement.activeElement.shadowRoot
    ? getActiveBuiltinElement(rootElement.activeElement.shadowRoot)
    : rootElement.activeElement
}
