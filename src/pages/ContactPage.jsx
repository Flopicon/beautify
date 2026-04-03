import { useState } from 'react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would send the form data to your backend
    console.log('Form submitted:', formData)
    setSubmitted(true)
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' })
      setSubmitted(false)
    }, 3000)
  }

  return (
    <div className="contact-page">
      <div className="container py-5">
        <h1 className="text-dark fw-bold mb-5 text-center">Contact Us</h1>
        
        <div className="row g-4">
          <div className="col-lg-6">
            <div className="card border-0 shadow-sm">
              <div className="card-body p-4">
                <h5 className="text-dark fw-bold mb-3">Get in Touch</h5>
                <p className="text-muted mb-4">
                  Have questions about our products or services? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                </p>
                
                <div className="mb-4">
                  <h6 className="text-dark fw-bold">Email</h6>
                  <p className="text-muted">hello@beautify.com</p>
                </div>
                
                <div className="mb-4">
                  <h6 className="text-dark fw-bold">Phone</h6>
                  <p className="text-muted">+1 (555) 123-4567</p>
                </div>
                
                <div className="mb-4">
                  <h6 className="text-dark fw-bold">Address</h6>
                  <p className="text-muted">123 Skincare Lane, Beauty City, BC 12345</p>
                </div>

                <div>
                  <h6 className="text-dark fw-bold">Hours</h6>
                  <p className="text-muted">Monday - Friday: 9AM - 6PM</p>
                  <p className="text-muted">Saturday - Sunday: 10AM - 4PM</p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="card border-0 shadow-sm">
              <div className="card-body p-4">
                {submitted ? (
                  <div className="alert alert-success text-center">
                    Thank you! Your message has been sent successfully.
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label fw-bold">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="email" className="form-label fw-bold">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="subject" className="form-label fw-bold">Subject</label>
                      <input
                        type="text"
                        className="form-control"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="message" className="form-label fw-bold">Message</label>
                      <textarea
                        className="form-control"
                        id="message"
                        name="message"
                        rows="5"
                        value={formData.message}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <button type="submit" className="btn btn-success w-100">
                      Send Message
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
