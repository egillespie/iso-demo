const createElement = require('./util/create-element')
const KeyDownEventHandler = require('../events/key-down-event-handler')
const cssUrl = require('url:../../styles/components/key-binding.css')

class KeyBinding extends HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.initializeLayout()
    this.addEventListeners()
  }

  initializeLayout () {
    const styleLink = createElement('link', {
      rel: 'stylesheet',
      href: cssUrl
    })

    const inputId = 'key-input'
    this.keyLabel = createElement('label', { for: inputId })
    const keyForm = createElement('form')
    this.keyInput = createElement('input', {
      type: 'text',
      name: inputId,
      id: inputId,
      size: 3,
      readonly: 'readonly',
      value: ''
    })
    const keyReset = createElement('gg-icon', { name: 'close' })
    keyForm.append(this.keyInput, keyReset)

    this.shadowRoot.append(styleLink, this.keyLabel, keyForm)
  }

  addEventListeners () {
  }

  // Call `attributeChangedCallback` when the 'name' attribute changes.
  static get observedAttributes () {
    return ['action', 'label']
  }

  // Called when the 'name' attribute is changed to allow the icon to change.
  attributeChangedCallback (name, _oldValue, newValue) {
    if (name === 'action') {
      const key = KeyDownEventHandler.instance().lookupKeyForAction(newValue)
      this.keyInput.value = key
    } else if (name === 'label') {
      this.keyLabel.textContent = newValue
    }
  }
}

customElements.define('key-binding', KeyBinding)

module.exports = KeyBinding
