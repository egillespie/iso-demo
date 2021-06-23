const ActionRequestEvent = require('./action-request-event')
const deepCopy = require('../util/deep-copy')

// Sources:
// https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/KeyboardEvent
// https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code/code_values
const DEFAULT_KEY_BINDINGS = Object.freeze({
  KeyW: { key: 'w', action: 'movePlayerNorth' },
  KeyA: { key: 'a', action: 'movePlayerWest' },
  KeyS: { key: 's', action: 'movePlayerSouth' },
  KeyD: { key: 'd', action: 'movePlayerEast' },
  KeyO: { key: 'o', action: 'toggleOpacity' },
  KeyP: { key: 'p', action: 'togglePlayerSprite' }
})

class KeyDownEventHandler {
  constructor () {
    this.resetAllKeyBindings()
  }

  static instance () {
    if (!KeyDownEventHandler._instance) {
      KeyDownEventHandler._instance = new KeyDownEventHandler()
    }
    return KeyDownEventHandler._instance
  }

  handleEvent (event) {
    if (document.activeElement === document.body) {
      const binding = this.keyBindings[event.code]
      if (binding) {
        event.preventDefault()
        window.dispatchEvent(new ActionRequestEvent(binding.action))
      }
    }
  }

  lookupCodeForAction (action, keyBindings = this.keyBindings) {
    return Object.keys(keyBindings).find(
      code => keyBindings[code].action === action
    )
  }

  lookupKeyForAction (action, keyBindings = this.keyBindings) {
    const code = this.lookupCodeForAction(action, keyBindings)
    return keyBindings[code]?.key
  }

  assignKeyBinding (action, keyboardEvent) {
    const oldCode = this.lookupCodeForAction(action)
    delete this.keyBindings[oldCode]
    this.keyBindings[keyboardEvent.code] = { action, key: keyboardEvent.key }
  }

  resetKeyBinding (action) {
    const code = this.lookupCodeForAction(action, DEFAULT_KEY_BINDINGS)
    const key = DEFAULT_KEY_BINDINGS[code].key
    this.assignKeyBinding(action, { key, code })
  }

  resetAllKeyBindings () {
    this.keyBindings = deepCopy(DEFAULT_KEY_BINDINGS)
  }
}

module.exports = KeyDownEventHandler
