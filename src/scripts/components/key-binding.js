const createElement = require('./util/create-element')
const createStyleElement = require('./util/create-style-element')
const KeyDownEventHandler = require('../events/key-down-event-handler')
const css = require('bundle-text:../../styles/components/key-binding.css')

class KeyBinding extends HTMLElement {
  constructor () {
    super()
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
  }

  connectedCallback () {
    this.attachShadow({ mode: 'open' })
    this.initializeLayout()
    this.addEventListeners()
  }

  initializeLayout () {
    this.resetButton.append(createElement('gg-icon', {
      icon: 'close',
      'aria-hidden': 'true'
    }))
    const keyForm = createElement('form')
    keyForm.append(this.keyInput, this.resetButton)
    this.shadowRoot.append(createStyleElement(css), this.keyLabel, keyForm)
  }

  addEventListeners () {
    const action = this.getAttribute('action')
    window.addEventListener(
      `statechange:keybinding.${action.toLowerCase()}`,
      () => this.syncActionKey(action)
    )
    this.resetButton.addEventListener('click', this.resetKeyBinding)
  }

  resetKeyBinding () {
    const label = this.getRootNode().host.getAttribute('label')
    const reset = confirm(
      `Reset the key binding for "${label}" to its default value?`
    )
    if (reset) {
      const action = this.getRootNode().host.getAttribute('action')
      KeyDownEventHandler.instance().resetKeyBinding(action)
    }
  }

  syncActionKey (action) {
    const key = KeyDownEventHandler.instance().lookupKeyForAction(action)
    this.keyInput.value = key
  }

  // Call `attributeChangedCallback` when the 'name' attribute changes.
  static get observedAttributes () {
    return ['action', 'label']
  }

  // Called when the 'name' attribute is changed to allow the icon to change.
  attributeChangedCallback (name, _oldValue, newValue) {
    if (name === 'action') {
      this.syncActionKey(newValue)
    } else if (name === 'label') {
      this.keyLabel.textContent = newValue
      this.resetButton.setAttribute(
        'aria-label',
        `Reset the key binding for "${newValue}".`
      )
    }
  }
}

customElements.define('key-binding', KeyBinding)

module.exports = KeyBinding
