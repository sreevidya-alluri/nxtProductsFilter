import {Component} from 'react'
import './index.css'

class Modal extends Component {
  render() {
    const {onClose, children} = this.props

    return (
      <div className="modal-overlay">
        <div className="modal-content">
          {children}
          <button
            className="modal-close-button"
            onClick={onClose}
            type="button"
          >
            Close
          </button>
        </div>
      </div>
    )
  }
}

export default Modal
