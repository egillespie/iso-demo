import iconUrl from 'url:../../img/gg-icons.svg'

const html = /* html */`
  <style>
    :host {
      display: inline-block;
      width: 1em;
      height: 1em;
    }

    svg {
      width: 1em;
      height: 1em;
      fill: currentColor;
    }
  </style>
  <svg xmlns="http://www.w3.org/2000/svg">
    <use id="use" xlink:href=""/>
  </svg>
`

export default class GGIcon extends HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    // Can't figure out how to use createElementNS and using a string
    // template is much simpler so using that.
    this.shadowRoot.innerHTML = html
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

  attributeChangedCallback () {
    const use = this.shadowRoot.getElementById('use')
    use.setAttribute('xlink:href', this.iconUrl)
  }
}

customElements.define('gg-icon', GGIcon)
