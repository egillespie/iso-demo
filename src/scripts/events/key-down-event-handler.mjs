import ActionRequestEvent from './action-request-event'
import state from '../state/index'
import defineStateHolder from '../state/define-state-holder'
import registerState from '../state/register-state'
import deepCopy from '../util/deep-copy'

const STORAGE_KEY = 'keyBindings'

export default class KeyDownEventHandler {
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

  // Sources:
  // https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/KeyboardEvent
  // https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code/code_values
  static get defaultKeyBindings () {
    return Object.freeze({
      KeyW: { key: 'w', action: 'movePlayerNorth' },
      KeyA: { key: 'a', action: 'movePlayerWest' },
      KeyS: { key: 's', action: 'movePlayerSouth' },
      KeyD: { key: 'd', action: 'movePlayerEast' },
      KeyO: { key: 'o', action: 'toggleOpacity' },
      KeyP: { key: 'p', action: 'togglePlayerSprite' }
    })
  }

  static get keyOverrides () {
    return Object.freeze({
      ArrowUp: '↑',
      ArrowDown: '↓',
      ArrowLeft: '←',
      ArrowRight: '→',
      ' ': '﹍'
    })
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
    return KeyDownEventHandler.keyOverrides[key] || key
  }

  resetKeyBinding (action) {
    const code = this.lookupCodeForAction(
      action, KeyDownEventHandler.defaultKeyBindings
    )
    const key = KeyDownEventHandler.defaultKeyBindings[code].key
    this.assignKeyBinding(action, { key, code })
  }

  resetKeyBindings () {
    // Reset each key separately to trigger state changes for all key bindings
    Object.values(KeyDownEventHandler.defaultKeyBindings)
      .forEach(keyBinding => this.resetKeyBinding(keyBinding.action))
  }
}
