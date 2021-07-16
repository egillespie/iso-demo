const createElement = require('./util/create-element')
const createStyleElement = require('./util/create-style-element')
const syncAttribute = require('./util/sync-attribute')
const showElement = require('./util/show-element')
const hideElement = require('./util/hide-element')
const css = require('bundle-text:../../styles/components/modal.css')

class ModalInfo extends HTMLElement {
  constructor () {
    super()
    this.modalMask = createElement('div', { class: 'modal-mask' })
    this.titleElement = createElement('h2', {
      id: 'title',
      class: 'hidden',
      'aria-hidden': true
    })
    this.closeButton = createElement('button', { type: 'button' })
  }

  connectedCallback () {
    this.attachShadow({ mode: 'open' })
    this.initializeLayout()
    this.addEventListeners()
  }

  get show () {
    return this.hasAttribute('show')
  }

  set show (value) {
    syncAttribute(this, 'show', value ? '' : null)
  }

  hide () {
    this.show = false
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

  static get attributeHandlers () {
    return {
      show: 'handleShowChanged',
      title: 'handleTitleChanged',
      'close-label': 'handleCloseLabelChanged'
    }
  }

  static get observedAttributes () {
    return Object.keys(ModalInfo.attributeHandlers)
  }

  handleShowChanged (show) {
    if (show !== null) {
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

  attributeChangedCallback (name, oldValue, newValue) {
    const attributeHandler = ModalInfo.attributeHandlers[name]
    const handleChange = this[attributeHandler]?.bind(this)
    if (handleChange) {
      handleChange(newValue, oldValue)
    }
  }

  initializeLayout () {
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

  addEventListeners () {
    window.addEventListener('keydown', this.handleKeyDown.bind(this))
    this.closeButton.addEventListener('click', this.hide.bind(this))
  }

  handleKeyDown (event) {
    if (event.code === 'Escape') {
      this.hide()
    }
  }
}

customElements.define('modal-info', ModalInfo)

module.exports = ModalInfo
