const CommonModal = require('./common-modal')
const ModalActionEvent = require('./modal-action-event')

class ConfirmModal extends CommonModal {
  constructor () {
    super()
    this.addButton('confirm-label', 'Confirm', this.confirm)
    this.addButton('close-label', 'Close', this.close)
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
    this.dispatchEvent(new ModalActionEvent('close'))
  }

  confirm () {
    this.hide()
    this.dispatchEvent(new ModalActionEvent('confirm'))
  }
}

customElements.define('confirm-modal', ConfirmModal)

module.exports = ConfirmModal
