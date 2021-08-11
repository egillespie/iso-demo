const state = require('../state')
const deepCopy = require('../util/deep-copy')
const defineStateHolder = require('../state/define-state-holder')
const registerState = require('../state/register-state')
const ActionRequestEvent = require('./action-request-event')

const STORAGE_KEY = 'keyBindings'

class KeyDownEventHandler {
  constructor () {
    // Set key bindings to saved/default values
    this.keyBindings = localStorage.getItem(STORAGE_KEY) === null
      ? deepCopy(KeyDownEventHandler.DEFAULT_KEY_BINDINGS)
      : JSON.parse(localStorage.getItem(STORAGE_KEY))

    // Allow others to watch for changes to key bindings
    defineStateHolder(state, 'keyBinding')
    Object.entries(this.keyBindings).forEach(([code, keyBinding]) => {
      const { key, action } = keyBinding
      registerState(state.keyBinding, `keyBinding.${action}`, { code, key })
    })
  }

  static instance () {
    if (!KeyDownEventHandler._instance) {
      KeyDownEventHandler._instance = new KeyDownEventHandler()
    }
    return KeyDownEventHandler._instance
  }

  handleEvent (event) {
    if (state.paused) return
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
    const code = keyboardEvent.code
    const key = this.lookupPrintableKey(keyboardEvent.key)
    this.keyBindings[code] = { action, key }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.keyBindings))
    state.keyBinding[action] = { code, key }
  }

  lookupPrintableKey (key) {
    return KeyDownEventHandler.KEY_OVERRIDES[key] || key
  }

  resetKeyBinding (action) {
    const code = this.lookupCodeForAction(
      action, KeyDownEventHandler.DEFAULT_KEY_BINDINGS
    )
    const key = KeyDownEventHandler.DEFAULT_KEY_BINDINGS[code].key
    this.assignKeyBinding(action, { key, code })
  }

  resetKeyBindings () {
    // Reset each key separately to trigger state changes for all key bindings
    Object.values(KeyDownEventHandler.DEFAULT_KEY_BINDINGS)
      .forEach(keyBinding => this.resetKeyBinding(keyBinding.action))
  }
}

// Sources:
// https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/KeyboardEvent
// https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code/code_values
KeyDownEventHandler.DEFAULT_KEY_BINDINGS = Object.freeze({
  KeyW: { key: 'w', action: 'movePlayerNorth' },
  KeyA: { key: 'a', action: 'movePlayerWest' },
  KeyS: { key: 's', action: 'movePlayerSouth' },
  KeyD: { key: 'd', action: 'movePlayerEast' },
  KeyO: { key: 'o', action: 'toggleOpacity' },
  KeyP: { key: 'p', action: 'togglePlayerSprite' }
})

KeyDownEventHandler.KEY_OVERRIDES = Object.freeze({
  ArrowUp: '↑',
  ArrowDown: '↓',
  ArrowLeft: '←',
  ArrowRight: '→',
  ' ': '﹍'
})

module.exports = KeyDownEventHandler
