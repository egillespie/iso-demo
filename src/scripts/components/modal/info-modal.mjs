import CommonModal from './common-modal.mjs'
import ModalActionEvent from './modal-action-event.mjs'

export default class InfoModal extends CommonModal {
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
