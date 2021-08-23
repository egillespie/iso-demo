import CommonModal from './common-modal.mjs'
import ModalActionEvent from './modal-action-event.mjs'
import createElement from '../util/create-element.mjs'

const ALLOWED_KEY_CODES = [
  /^Digit[0-9]$/,
  /^Key[A-Z]$/,
  /^Arrow(Left|Right|Up|Down)$/,
  /^Space$/
]

export default class KeyCaptureModal extends CommonModal {
  constructor () {
    super()
    this.addButton('cancel-label', 'Cancel', this.cancel)
    this.initializeLayout()
    this._captureKey = this.captureKey.bind(this)
  }

  connectedCallback () {
    super.connectedCallback()
    window.addEventListener('keydown', this._captureKey)
  }

  disconnectedCallback () {
    window.removeEventListener('keydown', this._captureKey)
    super.disconnectedCallback()
  }

  static get observedAttributes () {
    return ['cancel-label', ...CommonModal.observedAttributes]
  }

  initializeLayout () {
    super.initializeLayout()
    const style = createElement('style')
    style.textContent = /* css */`
      .key-capture-note {
        display: inline-block;
        margin: 0 0 1rem;
        font-style: italic;
      }
    `
    this.shadowRoot.prepend(style)
    const notes = createElement('small', { class: 'key-capture-note' })
    notes.textContent = 'Only arrow keys, space bar, and keys that produce ' +
      'printable characters can be used.'
    this.content.append(notes)
  }

  captureKey (event) {
    if (ALLOWED_KEY_CODES.some(regex => regex.test(event.code))) {
      event.preventDefault()
      this.hide()
      this.dispatchEvent(new ModalActionEvent('key-captured', { event }))
    }
  }

  escape () {
    this.cancel()
  }

  cancel () {
    this.hide()
    this.dispatchEvent(new ModalActionEvent('cancel'))
  }
}

customElements.define('key-capture-modal', KeyCaptureModal)
