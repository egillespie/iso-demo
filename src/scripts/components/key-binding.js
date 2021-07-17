const createElement = require('./util/create-element')
const createStyleElement = require('./util/create-style-element')
const syncAttribute = require('./util/sync-attribute')
const KeyDownEventHandler = require('../events/key-down-event-handler')
const invokeOnChangeAttribute = require('./util/invoke-on-change-attribute')
const css = require('bundle-text:../../styles/components/key-binding.css')

class KeyBinding extends HTMLElement {
  constructor () {
    super()
    this._syncActionKey = this.syncActionKey.bind(this)
    this._resetKeyBinding = this.resetKeyBinding.bind(this)
    this.attachShadow({ mode: 'open' })
    this.initializeLayout()
  }

  connectedCallback () {
    window.addEventListener(
      `statechange:keybinding.${this.action.toLowerCase()}`,
      this._syncActionKey
    )
    this.resetButton.addEventListener('click', this._resetKeyBinding)
  }

  disconnectedCallback () {
    window.removeEventListener(
      `statechange:keybinding.${this.action.toLowerCase()}`,
      this._syncActionKey
    )
    this.resetButton.removeEventListener('click', this._resetKeyBinding)
  }

  get action () {
    return this.getAttribute('action')
  }

  set action (value) {
    this.setAttribute('action', value)
  }

  get label () {
    return this.getAttribute('label')
  }

  set label (value) {
    syncAttribute(this, 'label', value)
  }

  initializeLayout () {
    const inputId = 'key-input'
    this.keyLabel = createElement('label', { for: inputId })
    this.keyInput = createElement('input', {
      type: 'text',
      name: inputId,
      id: inputId,
      size: 3,
      readonly: 'readonly',
      value: ''
    })
    this.resetButton = createElement('button', { type: 'button' })
    this.resetButton.append(createElement('gg-icon', {
      icon: 'close',
      'aria-hidden': 'true'
    }))
    const keyForm = createElement('form')
    keyForm.append(this.keyInput, this.resetButton)
    this.shadowRoot.append(createStyleElement(css), this.keyLabel, keyForm)
  }

  resetKeyBinding () {
    const reset = confirm(
      `Reset the key binding for "${this.label}" to its default value?`
    )
    if (reset) {
      KeyDownEventHandler.instance().resetKeyBinding(this.action)
    }
  }

  syncActionKey () {
    const key = KeyDownEventHandler.instance().lookupKeyForAction(this.action)
    this.keyInput.value = key
  }

  static get observedAttributes () {
    return ['action', 'label']
  }

  attributeChangedCallback () {
    invokeOnChangeAttribute(this, ...arguments)
  }

  onChangeAction (action) {
    const key = KeyDownEventHandler.instance().lookupKeyForAction(action)
    if (key) {
      this.syncActionKey()
    } else {
      console.error(`Invalid value for attribute 'action': '${action}'`)
    }
  }

  onChangeLabel (label) {
    this.keyLabel.textContent = label
    this.resetButton.setAttribute(
      'aria-label',
      `Reset the key binding for "${label}".`
    )
  }
}

customElements.define('key-binding', KeyBinding)

module.exports = KeyBinding
