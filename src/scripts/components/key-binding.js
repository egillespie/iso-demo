const createElement = require('./util/create-element')
const kebabify = require('../util/kebabify')
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

    const keyDownEventHandler = KeyDownEventHandler.instance()
    const action = this.getAttribute('action')
    const key = keyDownEventHandler.lookupKeyForAction(action)

    const keyBinding = createElement('div', { class: 'key-binding' })
    const label = this.getAttribute('label')
    const id = `key-${kebabify(label)}`

    const keyLabel = createElement('label', { for: id })
    keyLabel.textContent = label

    const keyInput = createElement('input', {
      type: 'text',
      name: id,
      id: id,
      size: 3,
      readonly: 'readonly',
      value: key
    })

    keyBinding.append(keyLabel, keyInput)
    this.shadowRoot.append(styleLink, keyBinding)
  }

  addEventListeners () {
  }
}

customElements.define('key-binding', KeyBinding)

module.exports = KeyBinding
