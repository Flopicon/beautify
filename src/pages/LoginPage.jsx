import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { validateForm } from '../utils/validation'
import './AuthPages.css'

export default function LoginPage() {
  const navigate = useNavigate()
  const { login, user } = useAuth()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [errors, setErrors] = useState({})
  const [loginError, setLoginError] = useState('')

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
    setLoginError('')

    // Validate
    const validationErrors = validateForm(formData, 'login')
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    // Try login
    const success = login(formData.email, formData.password)
    if (success) {
      // Redirect to profile or home
      navigate('/profile')
    } else {
      setLoginError('Invalid email or password. Check if you have an account or sign up.')
    }
  }

  return (
    <div className="auth-page">
      <div className="container">
        <div className="auth-card">
          <div className="auth-header">
            <h1 className="text-dark fw-bold">Welcome Back</h1>
            <p className="text-muted">Sign in to your Beautify account</p>
          </div>

          {loginError && (
            <div className="alert alert-danger alert-dismissible fade show">
              {loginError}
              <button
                type="button"
                className="btn-close"
                onClick={() => setLoginError('')}
              ></button>
            </div>
          )}

          <form onSubmit={handleSubmit}>
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
            </div>

            {/* Demo Info */}
            <div className="alert alert-info small mb-4">
              <strong>Demo:</strong> Since this is a mock app, just enter any valid email and
              password to log in (then log out and sign up to create a new account).
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn btn-success w-100 btn-lg fw-bold mb-3">
              Sign In
            </button>
          </form>

          {/* Signup Link */}
          <div className="text-center">
            <p className="text-muted">
              Don't have an account?{' '}
              <Link to="/signup" className="text-success fw-bold">
                Sign up here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
