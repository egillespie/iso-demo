const CommonModal = require('./common-modal')
const ModalCloseEvent = require('./modal-close-event')

class ConfirmModal extends CommonModal {
  constructor () {
    super()
    this.addButton('confirm', 'Confirm', this.confirm.bind(this))
    this.addButton('close', 'Close', this.close.bind(this))
    super.initializeLayout()
  }

  static get observedAttributes () {
    return ['confirm-label', 'close-label', ...CommonModal.observedAttributes]
  }

  escape () {
    this.close()
  }

  close () {
    this.hide()
    this.dispatchEvent(new ModalCloseEvent('close'))
  }

  confirm () {
    this.hide()
    this.dispatchEvent(new ModalCloseEvent('confirm'))
  }
}

customElements.define('confirm-modal', ConfirmModal)

module.exports = ConfirmModal
