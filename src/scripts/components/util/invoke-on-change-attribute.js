const kebabToCamelCase = require('../../util/kebab-to-camel-case')

// Call this in a web component's `attributeChangedCallback` function:
//
// ``` js
// attributeChangedCallback () {
//   invokeOnChangeAttribute(this, ...arguments)
// }
// ```
//
// This function will look for an `onChange*` function on the instance and
// invoke it, where `*` is the camel-case name of the attribute that was
// changed. For example, if a `close-label` attribute is changed, this function
// will call `onChangeCloseLabel` on the instance if it exists.
module.exports = function (instance, name, oldValue, newValue) {
  const funcName = `onChange${kebabToCamelCase(name)}`
  const onChangeHandler = instance[funcName]?.bind(instance)
  if (onChangeHandler) {
    onChangeHandler(newValue, oldValue)
  }
}
