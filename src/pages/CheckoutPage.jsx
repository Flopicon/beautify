import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { formatPrice, calculateTax, calculateTotal } from '../utils/formatPrice'
import './CheckoutPage.css'

export default function CheckoutPage() {
  const navigate = useNavigate()
  const { cartItems, getCartTotal, clearCart } = useCart()
  const { user, addOrder } = useAuth()

  const [formData, setFormData] = useState({
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  })

  const [errors, setErrors] = useState({})
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)
  const [orderId, setOrderId] = useState('')

  const subtotal = getCartTotal()
  const tax = calculateTax(subtotal)
  const total = calculateTotal(subtotal)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    setErrors((prev) => ({
      ...prev,
      [name]: '',
    }))
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.address.trim()) newErrors.address = 'Address is required'
    if (!formData.city.trim()) newErrors.city = 'City is required'
    if (!formData.zipCode.trim()) newErrors.zipCode = 'ZIP code is required'
    if (formData.cardNumber.length !== 16) newErrors.cardNumber = 'Card number must be 16 digits'
    if (!formData.expiryDate.match(/^\d{2}\/\d{2}$/))
      newErrors.expiryDate = 'Format: MM/YY'
    if (formData.cvv.length !== 3) newErrors.cvv = 'CVV must be 3 digits'
    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = validateForm()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsProcessing(true)
    // Simulate payment processing
    setTimeout(() => {
      const newOrderId = addOrder({
        items: cartItems,
        total,
        address: formData.address,
        city: formData.city,
      })
      setOrderId(newOrderId)
      setOrderComplete(true)
      clearCart()
    }, 2000)
  }

  if (orderComplete) {
    return (
      <div className="checkout-page">
        <div className="container py-5">
          <div className="order-success text-center">
            <div className="success-animation">✓</div>
            <h2 className="text-success fw-bold mb-3">Order Confirmed!</h2>
            <p className="text-muted mb-4">
              Thank you for your purchase. Your order has been placed successfully.
            </p>

            <div className="order-details bg-light p-4 rounded mb-4" style={{ maxWidth: '500px', margin: '0 auto' }}>
              <p className="mb-2">
                <strong>Order Number:</strong> <span className="text-success">{orderId}</span>
              </p>
              <p className="mb-2">
                <strong>Order Total:</strong> <span className="text-success">{formatPrice(total)}</span>
              </p>
              <p className="mb-0">
                <strong>Shipping To:</strong> {formData.city}
              </p>
            </div>

            <p className="text-muted mb-4">
              A confirmation email has been sent to <strong>{user.email}</strong>
            </p>

            <button
              className="btn btn-success btn-lg"
              onClick={() => navigate('/profile')}
            >
              View My Profile
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="checkout-page">
      <div className="container py-5">
        <h1 className="text-success fw-bold mb-4">Checkout</h1>

        <div className="row g-4">
          {/* Checkout Form */}
          <div className="col-lg-8">
            <form onSubmit={handleSubmit}>
              {/* Shipping Address */}
              <div className="form-section mb-4">
                <h5 className="text-success fw-bold mb-3">📍 Shipping Address</h5>
                <div className="mb-3">
                  <label htmlFor="address" className="form-label fw-bold">
                    Street Address
                  </label>
                  <input
                    type="text"
                    className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="123 Main Street"
                  />
                  {errors.address && (
                    <div className="invalid-feedback">{errors.address}</div>
                  )}
                </div>

                <div className="row">
                  <div className="col-md-8 mb-3">
                    <label htmlFor="city" className="form-label fw-bold">
                      City
                    </label>
                    <input
                      type="text"
                      className={`form-control ${errors.city ? 'is-invalid' : ''}`}
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="New York"
                    />
                    {errors.city && (
                      <div className="invalid-feedback">{errors.city}</div>
                    )}
                  </div>

                  <div className="col-md-4 mb-3">
                    <label htmlFor="zipCode" className="form-label fw-bold">
                      ZIP Code
                    </label>
                    <input
                      type="text"
                      className={`form-control ${errors.zipCode ? 'is-invalid' : ''}`}
                      id="zipCode"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      placeholder="10001"
                    />
                    {errors.zipCode && (
                      <div className="invalid-feedback">{errors.zipCode}</div>
                    )}
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div className="form-section mb-4">
                <h5 className="text-success fw-bold mb-3">💳 Payment Information</h5>
                <div className="mb-3">
                  <label htmlFor="cardNumber" className="form-label fw-bold">
                    Card Number
                  </label>
                  <input
                    type="text"
                    className={`form-control ${errors.cardNumber ? 'is-invalid' : ''}`}
                    id="cardNumber"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={(e) =>
                      handleChange({
                        target: {
                          name: 'cardNumber',
                          value: e.target.value.replace(/\D/g, '').slice(0, 16),
                        },
                      })
                    }
                    placeholder="1234567890123456"
                  />
                  {errors.cardNumber && (
                    <div className="invalid-feedback">{errors.cardNumber}</div>
                  )}
                  <small className="text-muted">16-digit card number</small>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="expiryDate" className="form-label fw-bold">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      className={`form-control ${errors.expiryDate ? 'is-invalid' : ''}`}
                      id="expiryDate"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, '').slice(0, 4)
                        const formatted = val.length >= 2
                          ? `${val.slice(0, 2)}/${val.slice(2)}`
                          : val
                        handleChange({
                          target: {
                            name: 'expiryDate',
                            value: formatted,
                          },
                        })
                      }}
                      placeholder="MM/YY"
                    />
                    {errors.expiryDate && (
                      <div className="invalid-feedback">{errors.expiryDate}</div>
                    )}
                  </div>

                  <div className="col-md-6 mb-3">
                    <label htmlFor="cvv" className="form-label fw-bold">
                      CVV
                    </label>
                    <input
                      type="text"
                      className={`form-control ${errors.cvv ? 'is-invalid' : ''}`}
                      id="cvv"
                      name="cvv"
                      value={formData.cvv}
                      onChange={(e) =>
                        handleChange({
                          target: {
                            name: 'cvv',
                            value: e.target.value.replace(/\D/g, '').slice(0, 3),
                          },
                        })
                      }
                      placeholder="123"
                    />
                    {errors.cvv && (
                      <div className="invalid-feedback">{errors.cvv}</div>
                    )}
                    <small className="text-muted">3-digit security code</small>
                  </div>
                </div>

                <div className="alert alert-warning small">
                  🔒 <strong>Note:</strong> This is a demo checkout. No real payment is processed.
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-success btn-lg w-100 fw-bold"
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Processing...
                  </>
                ) : (
                  `Complete Purchase - ${formatPrice(total)}`
                )}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="col-lg-4">
            <div className="order-summary sticky-top">
              <h5 className="text-success fw-bold mb-4">Order Summary</h5>

              <div className="order-items">
                {cartItems.map((item) => (
                  <div key={item.id} className="order-item mb-3">
                    <div className="d-flex justify-content-between">
                      <div>
                        <p className="mb-1">{item.name}</p>
                        <small className="text-muted">Qty: {item.quantity}</small>
                      </div>
                      <span className="fw-bold">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <hr className="my-3" />

              <div className="summary-row mb-2">
                <span>Subtotal:</span>
                <span>{formatPrice(subtotal)}</span>
              </div>

              <div className="summary-row mb-3">
                <span>Tax (8%):</span>
                <span className="text-success fw-bold">{formatPrice(tax)}</span>
              </div>

              <hr className="my-3" />

              <div className="summary-row total mb-4">
                <span>Total:</span>
                <span className="fs-5 fw-bold text-success">{formatPrice(total)}</span>
              </div>

              <div className="alert alert-info small">
                Shipping: <strong>Free</strong> on all orders
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
