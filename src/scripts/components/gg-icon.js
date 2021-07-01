const iconUrl = require('url:../../img/gg-icons.svg')
const cssUrl = require('url:../../styles/components/gg-icon.css')

class GGIcon extends HTMLElement {
  connectedCallback () {
    this.attachShadow({ mode: 'open' })
    // Can't figure out how to use createElementNS and using a string
    // template is much simpler so using that.
    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="${cssUrl}"/>
      <svg xmlns="http://www.w3.org/2000/svg">
        <use id="use" xlink:href=""/>
      </svg>
    `
    this.setIcon(this.getAttribute('name'))
  }

  setIcon (name) {
    const use = this.shadowRoot.getElementById('use')
    use.setAttribute('xlink:href', `${iconUrl}#icon-${name}`)
  }

  // Call `attributeChangedCallback` when the 'name' attribute changes.
  static get observedAttributes () {
    return ['name']
  }

  // Called when the 'name' attribute is changed to allow the icon to change.
  attributeChangedCallback (_name, _oldValue, newValue) {
    this.setIcon(newValue)
  }
}

customElements.define('gg-icon', GGIcon)

module.exports = GGIcon
