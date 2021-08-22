import state from '../../state/index.mjs'
const ModalActionEvent = require('./modal-action-event')
const capitalize = require('../../util/capitalize')
const createElement = require('../util/create-element')
const syncAttribute = require('../util/sync-attribute')
const showElement = require('../util/show-element')
const hideElement = require('../util/hide-element')
const changeParentElement = require('../util/change-parent-element')
const allowFocusWithin = require('../util/allow-focus-within')
const preventFocusWithin = require('../util/prevent-focus-within')
const getActiveBuiltinElement = require('../util/get-active-builtin-element')
const invokeOnChangeAttribute = require('../util/invoke-on-change-attribute')
const kebabToCamelCase = require('../../util/kebab-to-camel-case')

const html = /* html */`
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

class Modal extends HTMLElement {
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
    this.shadowRoot.innerHTML = html
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

module.exports = Modal
