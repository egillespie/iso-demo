const createElement = require('./util/create-element')
const createStyleElement = require('./util/create-style-element')
const showElement = require('./util/show-element')
const hideElement = require('./util/hide-element')
const css = require('bundle-text:../../styles/components/modal.css')

class ModalInfo extends HTMLElement {
  constructor () {
    super()
    this._handleKeyDown = this.handleKeyDown.bind(this)
    this._hide = this.hide.bind(this)
    this.modalMask = createElement('div', { class: 'modal-mask' })
    this.titleElement = createElement('h2', {
      id: 'title',
      class: 'hidden',
      'aria-hidden': true
    })
    this.okButton = createElement('button', { type: 'button' })
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
    if (value) {
      this.setAttribute('show', '')
    } else {
      this.removeAttribute('show')
    }
  }

  hide () {
    this.show = false
  }

  get title () {
    return this.getAttribute('title')
  }

  set title (title) {
    if (title) {
      this.setAttribute('title', title)
    } else {
      this.removeAttribute('title')
    }
  }

  static get observedAttributes () {
    return ['show', 'title']
  }

  attributeChangedCallback (name, _oldValue, newValue) {
    if (name === 'show') {
      if (newValue === null) {
        hideElement(this.modalMask)
      } else {
        showElement(this.modalMask)
      }
    } else if (name === 'title') {
      if (newValue) {
        this.titleElement.innerHTML = newValue
        showElement(this.titleElement)
      } else {
        this.titleElement.innerHTML = ''
        hideElement(this.titleElement)
      }
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
    this.okButton.textContent = 'Close'
    footer.append(this.okButton)
    modalContainer.append(contentContainer, footer)
    this.modalMask.append(modalContainer)
    this.shadowRoot.append(createStyleElement(css), this.modalMask)
  }

  addEventListeners () {
    window.addEventListener('keydown', this._handleKeyDown)
    this.okButton.addEventListener('click', this._hide)
  }

  removeEventListeners () {
    window.removeEventListener('keydown', this._handleKeyDown)
    this.okButton.removeEventListener('click', this._hide)
  }

  handleKeyDown (event) {
    if (event.code === 'Escape') {
      this.hide()
    }
  }
}

customElements.define('modal-info', ModalInfo)

module.exports = ModalInfo
