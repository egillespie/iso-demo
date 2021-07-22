const ModalCloseEvent = require('./modal-close-event')
const createElement = require('./util/create-element')
const createStyleElement = require('./util/create-style-element')
const syncAttribute = require('./util/sync-attribute')
const showElement = require('./util/show-element')
const hideElement = require('./util/hide-element')
const changeParentElement = require('./util/change-parent-element')
const allowFocusWithin = require('./util/allow-focus-within')
const preventFocusWithin = require('./util/prevent-focus-within')
const getActiveBuiltinElement = require('./util/get-active-builtin-element')
const invokeOnChangeAttribute = require('./util/invoke-on-change-attribute')
const css = require('bundle-text:../../styles/components/modal.css')

class ModalInfo extends HTMLElement {
  constructor () {
    super()
    this.originalParentNode = this.parentNode
    this.originalNextElementSibling = this.nextElementSibling
    this.attachShadow({ mode: 'open' })
    this.initializeLayout()
  }

  connectedCallback () {
    window.addEventListener('keydown', this)
    this.closeButton.addEventListener('click', this)
  }

  disconnectedCallback () {
    window.removeEventListener('keydown', this)
    this.closeButton.removeEventListener('click', this)
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

  get closeLabel () {
    return this.getAttribute('close-label') || 'Close'
  }

  set closeLabel (text) {
    syncAttribute(this, 'close-label', text)
  }

  static get observedAttributes () {
    return ['show', 'heading', 'close-label']
  }

  attributeChangedCallback () {
    invokeOnChangeAttribute(this, ...arguments)
  }

  onChangeShow (show, wasShowing) {
    const actuallyChanged = (show !== null) !== (wasShowing !== null)
    if (!actuallyChanged) return
    if (show !== null) {
      this.trapFocus()
      showElement(this.modalMask)
    } else {
      this.freeFocus()
      hideElement(this.modalMask)
      this.dispatchEvent(new ModalCloseEvent('close'))
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

  onChangeCloseLabel (label) {
    this.closeButton.textContent = label || 'Close'
  }

  initializeLayout () {
    this.modalMask = createElement('div', { class: 'modal-mask' })
    this.headingElement = createElement('h2', {
      id: 'heading',
      class: 'hidden',
      'aria-hidden': 'true'
    })
    this.closeButton = createElement('button', { type: 'button' })
    this.trap = createElement('div', {
      class: 'focus-trap',
      tabindex: '-1',
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
    const content = createElement('div', { id: 'content' })
    content.innerHTML = this.innerHTML
    contentContainer.append(this.headingElement, content)
    const footer = createElement('footer')
    this.closeButton.textContent = this.closeLabel
    footer.append(this.closeButton)
    modalContainer.append(contentContainer, footer)
    this.modalMask.append(modalContainer)
    this.shadowRoot.append(createStyleElement(css), this.modalMask)
  }

  handleEvent (event) {
    if (event.type === 'keydown') {
      this.handleKeyDown(event)
    } else if (event.type === 'click') {
      this.hide()
    }
  }

  handleKeyDown (event) {
    if (event.code === 'Escape') {
      this.hide()
    }
  }

  trapFocus () {
    // Prevent scrolling
    document.body.classList.add('scroll-lock')
    // Save the focused element
    this.lastFocusedElement = getActiveBuiltinElement()
    // Wrap body elements in trap element and move the modal out
    changeParentElement(document.body, this.trap)
    this.remove()
    document.body.append(this.trap, this)
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
    this.originalParentNode.insertBefore(this, this.originalNextElementSibling)
    // Restore focus
    this.lastFocusedElement?.focus()
  }

  hide () {
    this.show = false
  }
}

customElements.define('modal-info', ModalInfo)

module.exports = ModalInfo
