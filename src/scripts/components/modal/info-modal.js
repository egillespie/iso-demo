const CommonModal = require('./common-modal')
const ModalActionEvent = require('./modal-action-event')

class InfoModal extends CommonModal {
  constructor () {
    super()
    this.addButton('close-label', 'Close', this.close)
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
    this.dispatchEvent(new ModalActionEvent('close'))
  }
}

customElements.define('info-modal', InfoModal)

module.exports = InfoModal
