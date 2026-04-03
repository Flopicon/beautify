import { Link } from 'react-router-dom'
import { footerLinks } from '../data/footerLinks'
import { socialLinks } from '../data/socialLinks'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="bg-light border-top mt-5">
      <div className="container py-5">
        <div className="row">
          <div className="col-md-4 mb-4">
            <h6 className="text-success fw-bold">About Beautify</h6>
            <p className="text-muted small">
              Your trusted source for premium skincare products that nourish and
              protect your skin naturally.
            </p>
          </div>
          <div className="col-md-4 mb-4">
            <h6 className="text-success fw-bold">Quick Links</h6>
            <ul className="list-unstyled small">
              {footerLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-muted text-decoration-none footer-link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-md-4 mb-4">
            <h6 className="text-success fw-bold">Follow Us</h6>
            <div className="social-icons">
              {socialLinks.map((social) => (
                <a key={social.label} href={social.url} className="footer-icon" target="_blank" rel="noopener noreferrer">
                  <i className={social.icon}></i>
                </a>
              ))}
            </div>
          </div>
        </div>
        <hr className="my-4" />
        <div className="text-center text-muted small">
          <p>&copy; 2026 Beautify Skincare. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
