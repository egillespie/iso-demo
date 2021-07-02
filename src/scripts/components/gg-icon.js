const iconUrl = require('url:../../img/gg-icons.svg')
const css = require('bundle-text:../../styles/components/gg-icon.css')

class GGIcon extends HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    // Can't figure out how to use createElementNS and using a string
    // template is much simpler so using that.
    this.shadowRoot.innerHTML = `
      <style>${css}</style>
      <svg xmlns="http://www.w3.org/2000/svg">
        <use id="use" xlink:href="${this.iconUrl}"/>
      </svg>
    `
  }

  get icon () {
    return this.getAttribute('icon')
  }

  set icon (name) {
    this.setAttribute('icon', name)
  }

  get iconUrl () {
    return `${iconUrl}#icon-${this.icon}`
  }

  static get observedAttributes () {
    return ['icon']
  }

  attributeChangedCallback (_name, _oldValue, newValue) {
    const use = this.shadowRoot.getElementById('use')
    use.setAttribute('xlink:href', this.iconUrl)
  }
}

customElements.define('gg-icon', GGIcon)

module.exports = GGIcon
