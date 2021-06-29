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

    this.resetButton = createElement('button', { type: 'button' })
    this.resetButton.append(createElement('gg-icon', {
      name: 'close',
      'aria-hidden': 'true'
    }))
    keyForm.append(this.keyInput, this.resetButton)

    this.shadowRoot.append(styleLink, this.keyLabel, keyForm)
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
    const action = this.getRootNode().host.getAttribute('action')
    KeyDownEventHandler.instance().resetKeyBinding(action)
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
        `Reset key binding for "${newValue}" action`
      )
    }
  }
}

customElements.define('key-binding', KeyBinding)

module.exports = KeyBinding
