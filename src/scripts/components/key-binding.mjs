import KeyDownEventHandler from '../events/key-down-event-handler.mjs'
import { ConfirmModal, KeyCaptureModal } from './modals.mjs'
import syncAttribute from './util/sync-attribute.mjs'
import invokeOnChangeAttribute from './util/invoke-on-change-attribute.mjs'

const html = /* html */`
  <style>
  :host {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 20px;
  }

  label {
    text-align: right;
  }

  form {
    display: flex;
    align-items: center;
  }

  form input {
    display: inline-block;
    width: 1.75rem;
    text-align: center;
    line-height: 1rem;
  }

  form button {
    margin-left: 0.3rem;
    background: none;
    color: inherit;
    border: none;
    padding: 0;
    font: inherit;
    cursor: pointer;
    line-height: 0;
  }

  form button:hover {
    transform: scale(1.1) translateY(-1px);
    transition: transform 0.2s;
  }

  form button:active {
    transform: scale(1) translateY(0);
    transition: transform 0.1s;
  }
  </style>
  <label id="key-label" for="key-input"></label>
  <form>
    <input id="key-input" type="text" name="key-input" size="3" readonly />
    <button id="reset-button" type="button">
      <gg-icon icon="close" aria-hidden="true"></gg-icon>
    </button>
  </form>
`

export default class KeyBinding extends HTMLElement {
  constructor () {
    super()
    this.initializeLayout()
    this._syncActionKey = this.syncActionKey.bind(this)
    this._resetKeyBinding = this.resetKeyBinding.bind(this)
    this._captureKeyBinding = this.captureKeyBinding.bind(this)
  }

  connectedCallback () {
    window.addEventListener(
      `statechange:keybinding.${this.action.toLowerCase()}`, this._syncActionKey
    )
    this.resetButton.addEventListener('click', this._resetKeyBinding)
    this.keyInput.addEventListener('click', this._captureKeyBinding)
  }

  disconnectedCallback () {
    window.removeEventListener(
      `statechange:keybinding.${this.action.toLowerCase()}`, this._syncActionKey
    )
    this.resetButton.removeEventListener('click', this._resetKeyBinding)
    this.keyInput.removeEventListener('click', this._captureKeyBinding)
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
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.innerHTML = html
    this.keyLabel = this.shadowRoot.getElementById('key-label')
    this.keyInput = this.shadowRoot.getElementById('key-input')
    this.resetButton = this.shadowRoot.getElementById('reset-button')
    this.keyCapture = this.shadowRoot.getElementById('key-capture')
    this.modalKeyLabel = this.shadowRoot.getElementById('modal-key-label')
  }

  resetKeyBinding () {
    const confirmModal = new ConfirmModal()
    confirmModal.innerHTML = /* html */`
      <p slot="content">
        Reset the key binding for "${this.label}" to its default value?
      </p>
    `
    confirmModal.heading = 'Confirm'
    confirmModal.confirmLabel = 'Yes'
    confirmModal.closeLabel = 'No'
    confirmModal.addEventListener('modal:action', event => {
      if (event.action === 'confirm') {
        KeyDownEventHandler.instance().resetKeyBinding(this.action)
      }
      confirmModal.remove()
    })
    this.shadowRoot.append(confirmModal)
    confirmModal.show = true
  }

  syncActionKey () {
    const key = KeyDownEventHandler.instance().lookupKeyForAction(this.action)
    this.keyInput.value = key
  }

  captureKeyBinding () {
    const keyCaptureModal = new KeyCaptureModal()
    keyCaptureModal.innerHTML = /* html */`
      <p slot="content">
        Press the key you would like to assign to
        <strong>${this.label}</strong>.
      </p>
    `
    keyCaptureModal.heading = 'Waiting for key press...'
    keyCaptureModal.addEventListener('modal:action', event => {
      if (event.action === 'key-captured') {
        KeyDownEventHandler.instance().assignKeyBinding(
          this.action, event.details.event
        )
      }
      keyCaptureModal.remove()
      this.keyInput.blur()
    })
    this.shadowRoot.append(keyCaptureModal)
    keyCaptureModal.show = true
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
    this.modalKeyLabel = label
    this.keyLabel.textContent = label
    this.resetButton.setAttribute(
      'aria-label',
      `Reset the key binding for "${label}".`
    )
  }
}

customElements.define('key-binding', KeyBinding)
