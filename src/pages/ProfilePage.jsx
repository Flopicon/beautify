import { useAuth } from '../context/AuthContext'
import { formatPrice } from '../utils/formatPrice'
import './ProfilePage.css'

export default function ProfilePage() {
  const { user, orderHistory } = useAuth()

  return (
    <div className="profile-page">
      <div className="container py-5">
        <h1 className="text-success fw-bold mb-5">My Profile</h1>

        <div className="row g-4">
          {/* User Info Card */}
          <div className="col-lg-4">
            <div className="profile-card">
              <div className="profile-header">
                <div className="profile-avatar"><i className="fa-solid fa-user"></i></div>
                <h3 className="fw-bold mt-3">{user.name}</h3>
              </div>

              <div className="profile-info">
                <div className="info-item">
                  <label>Email</label>
                  <p>{user.email}</p>
                </div>

                <div className="info-item">
                  <label>Account Status</label>
                  <p>
                    <span className="badge bg-success">Active</span>
                  </p>
                </div>

                <div className="info-item">
                  <label>Member Since</label>
                  <p>{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</p>
                </div>

                <div className="info-item">
                  <label>Total Orders</label>
                  <p className="fs-5 fw-bold text-success">{orderHistory.length}</p>
                </div>
              </div>

              <button className="btn btn-outline-success w-100">Edit Profile</button>
            </div>
          </div>

          {/* Order History */}
          <div className="col-lg-8">
            <div className="orders-section">
              <h4 className="text-success fw-bold mb-4">
                <i className="fa-solid fa-clipboard"></i> Order History {orderHistory.length > 0 && `(${orderHistory.length})`}
              </h4>

              {orderHistory.length > 0 ? (
                <div className="orders-table">
                  {orderHistory.map((order) => (
                    <div key={order.id} className="order-card">
                      <div className="order-header">
                        <div>
                          <h6 className="fw-bold mb-2">Order {order.id}</h6>
                          <p className="text-muted small mb-0">Placed on {order.date}</p>
                        </div>
                        <div className="text-end">
                          <p className="fs-5 fw-bold text-success mb-0">{formatPrice(order.total)}</p>
                          <span className="badge bg-success">{order.status}</span>
                        </div>
                      </div>

                      <div className="order-items">
                        <h6 className="text-muted small fw-bold mt-3 mb-2">Items:</h6>
                        {order.items.map((item) => (
                          <div key={item.id} className="order-item-row">
                            <span>{item.name}</span>
                            <span className="text-muted small">
                              x{item.quantity} @ {formatPrice(item.price)}
                            </span>
                            <span className="fw-bold">
                              {formatPrice(item.price * item.quantity)}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="order-footer">
                        <button className="btn btn-sm btn-outline-success">View Details</button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-orders text-center py-5">
                  <div className="empty-icon"><i className="fa-solid fa-inbox"></i></div>
                  <h5 className="text-muted">No Orders Yet</h5>
                  <p className="text-muted small mb-4">
                    Start shopping and your orders will appear here
                  </p>
                  <a href="/products" className="btn btn-success">
                    Shop Now
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
