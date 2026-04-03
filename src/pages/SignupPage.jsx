import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { validateForm } from '../utils/validation'
import './AuthPages.css'

export default function SignupPage() {
  const navigate = useNavigate()
  const { signup } = useAuth()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState({})
  const [signupSuccess, setSignupSuccess] = useState(false)

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

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = {}

    // Validate
    const validationErrors = validateForm(formData, 'signup')
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    // Check passwords match
    if (formData.password !== formData.confirmPassword) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: 'Passwords do not match',
      }))
      return
    }

    // Signup
    const success = signup(formData.email, formData.password, formData.name)
    if (success) {
      setSignupSuccess(true)
      setTimeout(() => {
        navigate('/profile')
      }, 1500)
    }
  }

  if (signupSuccess) {
    return (
      <div className="auth-page">
        <div className="container">
          <div className="auth-card text-center">
            <div className="success-icon"><i className="fa-solid fa-star"></i></div>
            <h2 className="text-dark fw-bold">Welcome, {formData.name}!</h2>
            <p className="text-muted mb-4">Your account has been created successfully.</p>
            <p className="text-muted small">Redirecting to your profile...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="auth-page">
      <div className="container">
        <div className="auth-card">
          <div className="auth-header">
            <h1 className="text-dark fw-bold">Create Account</h1>
            <p className="text-muted">Join Beautify and start shopping</p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Full Name */}
            <div className="mb-3">
              <label htmlFor="name" className="form-label fw-bold">
                Full Name
              </label>
              <input
                type="text"
                className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your full name"
              />
              {errors.name && (
                <div className="invalid-feedback d-block">{errors.name}</div>
              )}
            </div>

            {/* Email */}
            <div className="mb-3">
              <label htmlFor="email" className="form-label fw-bold">
                Email Address
              </label>
              <input
                type="email"
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
              />
              {errors.email && (
                <div className="invalid-feedback d-block">{errors.email}</div>
              )}
            </div>

            {/* Password */}
            <div className="mb-3">
              <label htmlFor="password" className="form-label fw-bold">
                Password
              </label>
              <input
                type="password"
                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••"
              />
              {errors.password && (
                <div className="invalid-feedback d-block">{errors.password}</div>
              )}
              <small className="text-muted d-block mt-2">Minimum 6 characters</small>
            </div>

            {/* Confirm Password */}
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label fw-bold">
                Confirm Password
              </label>
              <input
                type="password"
                className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••"
              />
              {errors.confirmPassword && (
                <div className="invalid-feedback d-block">{errors.confirmPassword}</div>
              )}
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn btn-success w-100 btn-lg fw-bold mb-3">
              Create Account
            </button>
          </form>

          {/* Login Link */}
          <div className="text-center">
            <p className="text-muted">
              Already have an account?{' '}
              <Link to="/login" className="text-success fw-bold">
                Log in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
