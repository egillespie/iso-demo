const ModalActionEvent = require('./modal-action-event')
const state = require('../../state')
const capitalize = require('../../util/capitalize')
const createElement = require('../util/create-element')
const createStyleElement = require('../util/create-style-element')
const syncAttribute = require('../util/sync-attribute')
const showElement = require('../util/show-element')
const hideElement = require('../util/hide-element')
const changeParentElement = require('../util/change-parent-element')
const allowFocusWithin = require('../util/allow-focus-within')
const preventFocusWithin = require('../util/prevent-focus-within')
const getActiveBuiltinElement = require('../util/get-active-builtin-element')
const invokeOnChangeAttribute = require('../util/invoke-on-change-attribute')
const css = require('bundle-text:~/src/styles/components/modal.css')

class Modal extends HTMLElement {
  constructor () {
    super()
    this.buttons = new Map()
  }

  addButton (name, defaultLabel, onClick) {
    const self = this
    const camelLabel = `${name}Label`
    const kebabLabel = `${name}-label`
    Object.defineProperty(this, camelLabel, {
      enumerable: true,
      get () {
        return self.getAttribute(kebabLabel) || defaultLabel
      },
      set (text) {
        syncAttribute(self, kebabLabel, text)
      }
    })
    const element = createElement('button', { type: 'button' })
    element.textContent = this[camelLabel]
    this[`onChange${capitalize(camelLabel)}`] = function (label) {
      element.textContent = label || defaultLabel
    }
    this.buttons.set(name, {
      defaultLabel, onClick, element, camelLabel, kebabLabel
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
    this.modalMask = createElement('div', { class: 'modal-mask' })
    this.headingElement = createElement('h2', {
      id: 'heading',
      class: 'hidden',
      'aria-hidden': 'true'
    })
    const modalContainer = createElement('aside', {
      class: 'modal-container',
      role: 'dialog',
      'aria-modal': 'true',
      'aria-labelledby': 'heading',
      'aria-describedby': 'content'
    })
    const contentContainer = createElement('section')
    this.content = createElement('div', { id: 'content' })
    contentContainer.append(this.headingElement, this.content)
    const footer = createElement('footer')
    for (const { element } of this.buttons.values()) {
      footer.append(element)
    }
    modalContainer.append(contentContainer, footer)
    this.modalMask.append(modalContainer)
    this.shadowRoot.append(createStyleElement(css), this.modalMask)
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
