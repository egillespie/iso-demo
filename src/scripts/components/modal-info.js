const createElement = require('./util/create-element')
const cssUrl = require('url:../../styles/components/modal.css')

class ModalInfo extends HTMLElement {
  constructor () {
    super()
    this.modalMask = createElement('div', { class: 'modal-mask' })
  }

  connectedCallback () {
    this.attachShadow({ mode: 'open' })
    this.initializeLayout()
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

  static get observedAttributes () {
    return ['show']
  }

  attributeChangedCallback (name, _oldValue, newValue) {
    if (name === 'show') {
      if (newValue === null) {
        this.modalMask.classList.add('hidden')
      } else {
        this.modalMask.classList.remove('hidden')
      }
    }
  }

  initializeLayout () {
    const styleLink = createElement('link', {
      rel: 'stylesheet',
      href: cssUrl
    })
    const modalContainer = createElement('div', { class: 'modal-container' })
    modalContainer.innerHTML = this.innerHTML
    this.modalMask.append(modalContainer)
    this.shadowRoot.append(styleLink, this.modalMask)
  }
}

customElements.define('modal-info', ModalInfo)

module.exports = ModalInfo
