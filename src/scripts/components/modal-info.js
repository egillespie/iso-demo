const createElement = require('./util/create-element')
const createStyleElement = require('./util/create-style-element')
const syncAttribute = require('./util/sync-attribute')
const showElement = require('./util/show-element')
const hideElement = require('./util/hide-element')
const css = require('bundle-text:../../styles/components/modal.css')

const ATTRIBUTE_HANDLERS = {
  show: 'handleShowChanged',
  title: 'handleTitleChanged',
  'close-label': 'handleCloseLabelChanged'
}

class ModalInfo extends HTMLElement {
  constructor () {
    super()
    this._handleKeyDown = this.handleKeyDown.bind(this)
    this._hide = this.hide.bind(this)
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

  get title () {
    return this.getAttribute('title')
  }

  set title (title) {
    syncAttribute(this, 'title', title)
  }

  get closeLabel () {
    return this.getAttribute('close-label') || 'Close'
  }

  set closeLabel (text) {
    syncAttribute(this, 'close-label', text)
  }

  static get observedAttributes () {
    return Object.keys(ATTRIBUTE_HANDLERS)
  }

  attributeChangedCallback (name, oldValue, newValue) {
    const attributeHandler = ATTRIBUTE_HANDLERS[name]
    const handleChange = this[attributeHandler]?.bind(this)
    if (handleChange) {
      handleChange(newValue, oldValue)
    }
  }

  handleShowChanged (show) {
    if (show !== null) {
      // this.trapFocus()
      showElement(this.modalMask)
    } else {
      hideElement(this.modalMask)
    }
  }

  handleTitleChanged (title) {
    if (title) {
      this.titleElement.innerHTML = title
      showElement(this.titleElement)
    } else {
      this.titleElement.innerHTML = ''
      hideElement(this.titleElement)
    }
  }

  handleCloseLabelChanged (label) {
    this.closeButton.textContent = label || 'Close'
  }

  initializeLayout () {
    this.modalMask = createElement('div', { class: 'modal-mask' })
    this.titleElement = createElement('h2', {
      id: 'title',
      class: 'hidden',
      'aria-hidden': true
    })
    this.closeButton = createElement('button', { type: 'button' })
    this.trap = createElement('div', {
      class: 'focus-trap',
      tabindex: -1,
      'aria-hidden': true
    })
    const modalContainer = createElement('aside', {
      class: 'modal-container',
      role: 'dialog',
      'aria-modal': true,
      'aria-labelledby': 'title',
      'aria-describedby': 'content'
    })
    const contentContainer = createElement('section')
    const content = createElement('div', { id: 'content' })
    content.innerHTML = this.innerHTML
    contentContainer.append(this.titleElement, content)
    const footer = createElement('footer')
    this.closeButton.textContent = this.closeLabel
    footer.append(this.closeButton)
    modalContainer.append(contentContainer, footer)
    this.modalMask.append(modalContainer)
    this.shadowRoot.append(createStyleElement(css), this.modalMask)
  }

  handleKeyDown (event) {
    if (event.code === 'Escape') {
      this.hide()
    }
  }

  trapFocus () {
    const nodes = document.body.children
    const previousSibling = nodes[0].previousSibling
    for (let i = 0; nodes.length - i; this.trap.firstChild === nodes[0] && i++) {
      this.trap.appendChild(nodes[i])
    }
    const nextSibling = previousSibling
      ? previousSibling.nextSibling
      : document.body.firstChild
    document.body.insertBefore(this.trap, nextSibling)
  }

  hide () {
    this.show = false
  }

  handleEvent (event) {
    if (event.type === 'keydown') {
      this.handleKeyDown(event)
    } else if (event.type === 'click') {
      this.hide()
    }
  }
}

customElements.define('modal-info', ModalInfo)

module.exports = ModalInfo
