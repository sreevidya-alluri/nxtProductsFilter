import {useState} from 'react'
import {useHistory} from 'react-router-dom'
import Modal from '../Modal'
import CartContext from '../../context/CartContext'
import './index.css'

const CartSummary = () => {
  const [showModal, setShowModal] = useState(false)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('')
  const [orderConfirmed, setOrderConfirmed] = useState(false)
  const history = useHistory()

  const handleCheckoutClick = () => {
    setShowModal(true)
  }

  const handleConfirmOrder = () => {
    setOrderConfirmed(true)
    setTimeout(() => {
      setShowModal(false)
    }, 2000)
    setTimeout(() => {
      history.push('/')
    }, 5000)
  }

  const handleModalClose = () => {
    setShowModal(false)
    setOrderConfirmed(false)
    setSelectedPaymentMethod('')
  }

  const handlePaymentMethodChange = event => {
    setSelectedPaymentMethod(event.target.value)
  }

  return (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value
        let total = 0
        cartList.forEach(eachCartItem => {
          total += eachCartItem.price * eachCartItem.quantity
        })

        return (
          <>
            <div className="cart-summary-container">
              <h1 className="order-total-value">
                <span className="order-total-label">Order Total:</span> Rs{' '}
                {total}/-
              </h1>
              <p className="total-items">{cartList.length} items</p>
              <button
                type="button"
                className="checkout-button d-sm-none"
                onClick={handleCheckoutClick}
              >
                Checkout
              </button>
            </div>
            <button
              type="button"
              className="checkout-button d-lg-none"
              onClick={handleCheckoutClick}
            >
              Checkout
            </button>
            {showModal && (
              <Modal onClose={handleModalClose}>
                {orderConfirmed ? (
                  <div className="order-confirmation">
                    <h2>Your order has been placed successfully!</h2>
                  </div>
                ) : (
                  <div className="checkout-container">
                    <h2>Payment Method</h2>
                    <div className="payment-options">
                      <input
                        type="radio"
                        id="card"
                        name="payment-method"
                        value="Card"
                        checked={selectedPaymentMethod === 'Card'}
                        onChange={handlePaymentMethodChange}
                      />
                      <label htmlFor="card">Card</label>
                    </div>
                    <div className="payment-options">
                      <input
                        type="radio"
                        id="net-banking"
                        name="payment-method"
                        value="Net Banking"
                        checked={selectedPaymentMethod === 'Net Banking'}
                        onChange={handlePaymentMethodChange}
                      />
                      <label htmlFor="net-banking">Net Banking</label>
                    </div>
                    <div className="payment-options">
                      <input
                        type="radio"
                        id="upi"
                        name="payment-method"
                        value="UPI"
                        checked={selectedPaymentMethod === 'UPI'}
                        onChange={handlePaymentMethodChange}
                      />
                      <label htmlFor="upi">UPI</label>
                    </div>
                    <div className="payment-options">
                      <input
                        type="radio"
                        id="wallet"
                        name="payment-method"
                        value="Wallet"
                        checked={selectedPaymentMethod === 'Wallet'}
                        onChange={handlePaymentMethodChange}
                      />
                      <label htmlFor="wallet">Wallet</label>
                    </div>
                    <div className="payment-options">
                      <input
                        type="radio"
                        id="cod"
                        name="payment-method"
                        value="Cash on Delivery"
                        checked={selectedPaymentMethod === 'Cash on Delivery'}
                        onChange={handlePaymentMethodChange}
                      />
                      <label htmlFor="cod">Cash on Delivery</label>
                    </div>

                    {selectedPaymentMethod === 'Cash on Delivery' && (
                      <>
                        <h2>Order Summary</h2>
                        <p>Items: {cartList.length}</p>
                        <p>Total: Rs {total}</p>

                        <button
                          className="confirm-order-button"
                          type="button"
                          onClick={handleConfirmOrder}
                        >
                          Confirm Order
                        </button>
                      </>
                    )}
                  </div>
                )}
              </Modal>
            )}
          </>
        )
      }}
    </CartContext.Consumer>
  )
}

export default CartSummary
