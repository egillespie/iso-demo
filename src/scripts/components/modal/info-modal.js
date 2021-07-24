const CommonModal = require('./common-modal')
const ModalCloseEvent = require('./modal-close-event')

class InfoModal extends CommonModal {
  constructor () {
    super()
    this.addButton('close', 'Close', this.close.bind(this))
    super.initializeLayout()
  }

  static get observedAttributes () {
    return ['close-label', ...CommonModal.observedAttributes]
  }

  escape () {
    this.close()
  }

  close () {
    this.hide()
    this.dispatchEvent(new ModalCloseEvent('close'))
  }
}

customElements.define('info-modal', InfoModal)

module.exports = InfoModal
