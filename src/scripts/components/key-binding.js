const KeyDownEventHandler = require('../events/key-down-event-handler')
const ConfirmModal = require('./modal/confirm-modal')
const createElement = require('./util/create-element')
const createStyleElement = require('./util/create-style-element')
const syncAttribute = require('./util/sync-attribute')
const invokeOnChangeAttribute = require('./util/invoke-on-change-attribute')
const css = require('bundle-text:../../styles/components/key-binding.css')

class KeyBinding extends HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.initializeLayout()
  }

  connectedCallback () {
    window.addEventListener(
      `statechange:keybinding.${this.action.toLowerCase()}`, this
    )
    this.resetButton.addEventListener('click', this)
  }

  disconnectedCallback () {
    window.removeEventListener(
      `statechange:keybinding.${this.action.toLowerCase()}`, this
    )
    this.resetButton.removeEventListener('click', this)
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
    const confirmModal = new ConfirmModal()
    confirmModal.innerHTML =
      `<p>Reset the key binding for "${this.label}" to its default value?</p>`
    confirmModal.heading = 'Confirm'
    confirmModal.confirmLabel = 'Yes'
    confirmModal.closeLabel = 'No'
    confirmModal.addEventListener('modal:action', event => {
      if (event.action === 'confirm') {
        KeyDownEventHandler.instance().resetKeyBinding(this.action)
      }
      confirmModal.remove()
    }, { once: true })
    this.shadowRoot.append(confirmModal)
    confirmModal.show = true
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

  onChangeAction (action, oldAction) {
    if (action === oldAction) return
    if (oldAction) {
      window.removeEventListener(
        `statechange:keybinding.${oldAction.toLowerCase()}`, this
      )
    }
    if (KeyDownEventHandler.instance().lookupKeyForAction(action)) {
      window.addEventListener(
        `statechange:keybinding.${action.toLowerCase()}`, this
      )
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

  handleEvent (event) {
    if (event.type === `statechange:keybinding.${this.action.toLowerCase()}`) {
      this.syncActionKey()
    } else if (event.type === 'click') {
      this.resetKeyBinding()
    }
  }
}

customElements.define('key-binding', KeyBinding)

module.exports = KeyBinding
