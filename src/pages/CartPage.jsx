import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { formatPrice, calculateTax, calculateTotal } from '../utils/formatPrice'
import './CartPage.css'

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart()

  const subtotal = getCartTotal()
  const tax = calculateTax(subtotal)
  const total = calculateTotal(subtotal)

  if (cartItems.length === 0) {
    return (
      <div className="cart-page empty-cart">
        <div className="container py-5">
          <div className="text-center">
            <div className="empty-icon">
              <i className="fa-solid fa-cart-shopping"></i>
            </div>
            <h2 className="text-dark fw-bold mb-3">Your Cart is Empty</h2>
            <p className="text-muted mb-4">
              Add some beautiful skincare products to get started
            </p>
            <Link to="/products" className="btn btn-success btn-lg">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="cart-page">
      <div className="container py-5">
        <h1 className="text-dark fw-bold mb-4">Shopping Cart</h1>

        <div className="row g-4">
          {/* Cart Items */}
          <div className="col-lg-8">
            <div className="cart-items-section">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <div className="item-image">
                    <img src={item.image} alt={item.name} />
                  </div>

                  <div className="item-details">
                    <h5 className="fw-bold">{item.name}</h5>
                    <p className="text-muted small mb-2">{item.description}</p>
                    <span className="badge bg-light text-success">{item.category}</span>
                  </div>

                  <div className="item-price">
                    <span className="fw-bold">{formatPrice(item.price)}</span>
                  </div>

                  <div className="item-quantity">
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      −
                    </button>
                    <span className="quantity-display">{item.quantity}</span>
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>

                  <div className="item-total">
                    <span className="fw-bold">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>

                  <button
                    className="btn btn-sm btn-danger remove-btn"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-4">
              <Link to="/products" className="btn btn-outline-success">
                Continue Shopping
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className="col-lg-4">
            <div className="order-summary">
              <h4 className="text-success fw-bold mb-4">Order Summary</h4>

              <div className="summary-row">
                <span>Subtotal:</span>
                <span className="fw-bold">{formatPrice(subtotal)}</span>
              </div>

              <div className="summary-row">
                <span>Tax (8%):</span>
                <span className="fw-bold text-success">{formatPrice(tax)}</span>
              </div>

              <hr className="my-3" />

              <div className="summary-row total">
                <span>Total:</span>
                <span className="fs-5 fw-bold text-success">{formatPrice(total)}</span>
              </div>

              <div className="alert alert-info small mt-3">
                <span>ℹ️</span> Tax calculated at 8% of subtotal
              </div>

              <Link
                to="/checkout"
                className="btn btn-success w-100 btn-lg mt-4 checkout-btn"
              >
                Proceed to Checkout
              </Link>

              <p className="text-center text-muted small mt-3">
                Secure checkout • Free shipping on orders over $50
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
