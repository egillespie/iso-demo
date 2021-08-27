import state from '../state/index'
import kebabToCamelCase from '../util/kebab-to-camel-case'
import capitalize from '../util/capitalize'
import createElement from './util/create-element'
import syncAttribute from './util/sync-attribute'
import showElement from './util/show-element'
import hideElement from './util/hide-element'
import changeParentElement from './util/change-parent-element'
import allowFocusWithin from './util/allow-focus-within'
import preventFocusWithin from './util/prevent-focus-within'
import getActiveBuiltinElement from './util/get-active-builtin-element'
import invokeOnChangeAttribute from './util/invoke-on-change-attribute'

// A custom event emitted when a modal popup produces an action (such as
// closing). The event may also include details about the triggering action.
export class ModalActionEvent extends CustomEvent {
  constructor (action, details) {
    super('modal:action')
    this.name = this.constructor.name
    this.action = action
    this.details = details
  }
}

const modalHtml = /* html */`
  <style>
  .hidden {
    display: none;
  }

  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }

  .modal-container {
    max-width: 500px;
    margin: 60px auto 0;
    padding: 10px;
    background-color: var(--ui-bg-color);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  }

  .modal-container > section {
    border: 2px groove var(--ui-border-color);
    padding: 0 1rem;
  }

  .modal-container > footer {
    text-align: right;
    margin-top: 10px;
  }

  .modal-container > footer > button {
    background-color: var(--ui-button-color);
    border-color: var(--ui-border-color);
    font-size: var(--ui-font-size-sm);
    line-height: var(--ui-font-size-sm);
    padding: 5px 10px;
    margin-left: 8px;
    margin-right: 2px;
    border-width: 1px;
    border-style: outset;
    vertical-align: bottom;
  }

  .modal-container > footer > button:active {
    border-style: inset;
    padding: 6px 9px 4px 11px;
  }

  .focus-trap {
    pointer-events: none;
    user-select: none;
  }
  </style>

  <div id="modal-mask" class="modal-mask">
    <aside
      class="modal-container"
      role="dialog"
      aria-modal="true"
      aria-labelledby="heading"
      aria-describedby="content"
    >
      <section>
        <h2 id="heading" class="hidden" aria-hidden="true"></h2>
        <div id="content">
          <slot name="content"></slot>
        </div>
      </section>
      <footer id="button-container"></footer>
    </aside>
  </div>
`

export class Modal extends HTMLElement {
  constructor () {
    super()
    this.buttons = new Map()
  }

  addButton (labelAttribute, defaultLabel, onClickFunction) {
    const self = this
    const camelLabel = kebabToCamelCase(labelAttribute)
    Object.defineProperty(this, camelLabel, {
      enumerable: true,
      get () {
        return self.getAttribute(labelAttribute) || defaultLabel
      },
      set (text) {
        syncAttribute(self, labelAttribute, text)
      }
    })
    const element = createElement('button', { type: 'button' })
    element.textContent = this[camelLabel]
    this[`onChange${capitalize(camelLabel)}`] = function (label) {
      element.textContent = label || defaultLabel
    }
    const onClick = onClickFunction.bind(this)
    this.buttons.set(labelAttribute, {
      labelAttribute, defaultLabel, onClick, element
    })
  }

  connectedCallback () {
    this.originalParent = this.parentNode
    this.originalSibling = this.nextElementSibling
    window.addEventListener('keydown', this)
    for (const { element } of this.buttons.values()) {
      element.addEventListener('click', this)
    }
  }

  disconnectedCallback () {
    this.originalParent = null
    this.originalSibling = null
    window.removeEventListener('keydown', this)
    for (const { element } of this.buttons.values()) {
      element.addEventListener('click', this)
    }
  }

  get show () {
    return this.hasAttribute('show')
  }

  set show (value) {
    syncAttribute(this, 'show', value ? '' : null)
  }

  get heading () {
    return this.getAttribute('heading')
  }

  set heading (heading) {
    syncAttribute(this, 'heading', heading)
  }

  static get observedAttributes () {
    return ['show', 'heading']
  }

  attributeChangedCallback () {
    invokeOnChangeAttribute(this, ...arguments)
  }

  onChangeShow (show, wasShowing) {
    if ((show !== null) === (wasShowing !== null)) {
      // Old and new values haven't effectively changed
      return
    }
    if (show !== null) {
      this.trapFocus()
      showElement(this.modalMask)
    } else {
      this.freeFocus()
      hideElement(this.modalMask)
    }
  }

  onChangeHeading (heading) {
    if (heading) {
      this.headingElement.innerHTML = heading
      showElement(this.headingElement)
    } else {
      this.headingElement.innerHTML = ''
      hideElement(this.headingElement)
    }
  }

  initializeLayout () {
    this.attachShadow({ mode: 'open' })
    this.trap = createElement('div', {
      class: 'focus-trap',
      tabindex: '-1',
      'aria-hidden': 'true'
    })
    this.shadowRoot.innerHTML = modalHtml
    this.modalMask = this.shadowRoot.getElementById('modal-mask')
    this.headingElement = this.shadowRoot.getElementById('heading')
    this.content = this.shadowRoot.getElementById('content')
    const buttonContainer = this.shadowRoot.getElementById('button-container')
    for (const { element } of this.buttons.values()) {
      buttonContainer.append(element)
    }
  }

  handleEvent (event) {
    if (event.type === 'keydown') {
      this.handleKeyDown(event)
    } else if (event.type === 'click') {
      for (const button of this.buttons.values()) {
        if (button.element === event.target) {
          button.onClick()
        }
      }
    }
  }

  handleKeyDown (event) {
    if (event.code === 'Escape') {
      this.escape()
    }
  }

  // Focus traps are hard and these modal's attempt to implememnt the "best"
  // solution according to the following article on the subject:
  // https://medium.com/@antonkorzunov/its-a-focus-trap-699a04d66fb5
  trapFocus () {
    // Pause other events
    state.paused = true
    // Prevent scrolling
    document.body.classList.add('scroll-lock')
    // Save the focused element
    this.lastFocusedElement = getActiveBuiltinElement()
    // Wrap body elements in trap element and move the modal out
    changeParentElement(document.body, this.trap)
    this.remove()
    document.body.append(this, this.trap)
    // Make focusable elements unfocusable and focus the modal
    preventFocusWithin(this.trap)
    this.focus()
  }

  freeFocus () {
    // Resume scrolling
    document.body.classList.remove('scroll-lock')
    // Make unfocusable elements focusable
    allowFocusWithin(this.trap)
    // Move contents of trap back into body and put modal back
    changeParentElement(this.trap, document.body)
    this.trap.remove()
    this.remove()
    this.originalParent?.insertBefore(this, this.originalSibling)
    // Restore focus
    this.lastFocusedElement?.focus()
    // Resume other events
    state.paused = false
  }

  hide () {
    this.show = false
  }

  escape () {
    this.hide()
    this.dispatchEvent(new ModalActionEvent('escape'))
  }
}

export class InfoModal extends Modal {
  constructor () {
    super()
    this.addButton('close-label', 'Close', this.close)
    super.initializeLayout()
  }

  static get observedAttributes () {
    return ['close-label', ...Modal.observedAttributes]
  }

  escape () {
    this.close()
  }

  close () {
    this.hide()
    this.dispatchEvent(new ModalActionEvent('close'))
  }
}

export class ConfirmModal extends Modal {
  constructor () {
    super()
    this.addButton('confirm-label', 'Confirm', this.confirm)
    this.addButton('close-label', 'Close', this.close)
    super.initializeLayout()
  }

  static get observedAttributes () {
    return ['confirm-label', 'close-label', ...Modal.observedAttributes]
  }

  escape () {
    this.close()
  }

  close () {
    this.hide()
    this.dispatchEvent(new ModalActionEvent('close'))
  }

  confirm () {
    this.hide()
    this.dispatchEvent(new ModalActionEvent('confirm'))
  }
}

export class KeyCaptureModal extends Modal {
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
    return ['cancel-label', ...Modal.observedAttributes]
  }

  static get allowedKeyCodes () {
    return [
      /^Digit[0-9]$/,
      /^Key[A-Z]$/,
      /^Arrow(Left|Right|Up|Down)$/,
      /^Space$/
    ]
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
    if (KeyCaptureModal.allowedKeyCodes.some(regex => regex.test(event.code))) {
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

customElements.define('info-modal', InfoModal)
customElements.define('confirm-modal', ConfirmModal)
customElements.define('key-capture-modal', KeyCaptureModal)
