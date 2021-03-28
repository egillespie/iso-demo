const keyBindings = require('../state/key-bindings')

// Looks for a matching key binding and if found, prevents the event from
// propagating and performs the bound action.
module.exports = function (event) {
  const action = keyBindings[event.code]
  if (action) {
    event.preventDefault()
    action()
  }
}
