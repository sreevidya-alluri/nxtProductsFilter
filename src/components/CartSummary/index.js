import {useState} from 'react'
import {useHistory} from 'react-router-dom'
import Popup from 'reactjs-popup'
import CartContext from '../../context/CartContext'
import './index.css'

const CartSummary = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('')
  const [orderConfirmed, setOrderConfirmed] = useState(false)
  const history = useHistory()

  const handleConfirmOrder = close => {
    setOrderConfirmed(true)
    setTimeout(() => {
      setOrderConfirmed(false)
      setSelectedPaymentMethod('')
      close() // Close the popup
    }, 2000)
    setTimeout(() => {
      history.push('/')
    }, 5000)
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
              <Popup
                trigger={
                  <button type="button" className="checkout-button d-sm-none">
                    Checkout
                  </button>
                }
                modal
                nested
              >
                {close => (
                  <div className="modal">
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
                            disabled
                          />
                          <label htmlFor="card">Card</label>
                        </div>
                        <div className="payment-options">
                          <input
                            type="radio"
                            id="net-banking"
                            name="payment-method"
                            value="Net Banking"
                            disabled
                          />
                          <label htmlFor="net-banking">Net Banking</label>
                        </div>
                        <div className="payment-options">
                          <input
                            type="radio"
                            id="upi"
                            name="payment-method"
                            value="UPI"
                            disabled
                          />
                          <label htmlFor="upi">UPI</label>
                        </div>
                        <div className="payment-options">
                          <input
                            type="radio"
                            id="wallet"
                            name="payment-method"
                            value="Wallet"
                            disabled
                          />
                          <label htmlFor="wallet">Wallet</label>
                        </div>
                        <div className="payment-options">
                          <input
                            type="radio"
                            id="cod"
                            name="payment-method"
                            value="Cash on Delivery"
                            checked={
                              selectedPaymentMethod === 'Cash on Delivery'
                            }
                            onChange={handlePaymentMethodChange}
                          />
                          <label htmlFor="cod">Cash on Delivery</label>
                        </div>

                        <h2>Order Summary</h2>
                        <p>Items: {cartList.length}</p>
                        <p>Total: Rs {total}</p>

                        <button
                          className="confirm-order-button"
                          type="button"
                          onClick={() => handleConfirmOrder(close)}
                          disabled={
                            selectedPaymentMethod !== 'Cash on Delivery'
                          }
                        >
                          Confirm Order
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </Popup>
            </div>
          </>
        )
      }}
    </CartContext.Consumer>
  )
}

export default CartSummary
