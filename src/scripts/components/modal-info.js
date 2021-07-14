const createElement = require('./util/create-element')
const createStyleElement = require('./util/create-style-element')
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
    this.okButton = createElement('button', { type: 'button' })
  }

  connectedCallback () {
    this.attachShadow({ mode: 'open' })
    this.initializeLayout()
    if (this.hasAttribute('show')) {
      this.okButton.blur()
    }
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
        this.modalMask.classList.add('hidden')
        this.modalMask.setAttribute('aria-hidden', 'true')
      } else {
        this.modalMask.classList.remove('hidden')
        this.modalMask.setAttribute('aria-hidden', 'false')
      }
    } else if (name === 'title') {
      if (newValue) {
        this.titleElement.innerHTML = newValue
        this.titleElement.classList.remove('hidden')
        this.titleElement.setAttribute('aria-hidden', 'false')
      } else {
        this.titleElement.innerHTML = ''
        this.titleElement.classList.add('hidden')
        this.titleElement.setAttribute('aria-hidden', 'true')
      }
    }
  }

  initializeLayout () {
    const modalContainer = createElement('aside', {
      class: 'modal-container',
      role: 'dialog',
      'aria-modal': 'true',
      'aria-labelledby': 'title',
      'aria-describedby': 'content'
    })
    const fieldset = createElement('fieldset')
    const content = createElement('div', { id: 'content' })
    content.innerHTML = this.innerHTML
    fieldset.append(this.titleElement, content)
    const footer = createElement('footer')
    this.okButton.textContent = 'Close'
    footer.append(this.okButton)
    modalContainer.append(fieldset, footer)
    this.modalMask.append(modalContainer)
    this.shadowRoot.append(createStyleElement(css), this.modalMask)
  }
}

customElements.define('modal-info', ModalInfo)

module.exports = ModalInfo
