import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useCart } from '../context/CartContext'
import { products } from '../data/products'
import { formatPrice } from '../utils/formatPrice'
import './HomePage.css'

export default function HomePage() {
  const { addToCart } = useCart()
  const featuredProducts = products.slice(0, 6)
  const newArrivals = products.filter((p) => p.isNew).slice(0, 6)
  const beplainProducts = products.filter((p) => p.brand === 'Beplain').slice(0, 4)
  const threeceProducts = products.filter((p) => p.brand === '3CE').slice(0, 4)
  const [currentSlide, setCurrentSlide] = useState(0)

  const bannerImages = [
    { type: 'welcome' },
    { type: 'image', src: 'https://i.pinimg.com/1200x/fc/c0/16/fcc0160496c8465947d0fc55f97751c3.jpg' },
    { type: 'image', src: 'https://i.pinimg.com/1200x/9d/4f/d8/9d4fd87b448652c1fd1a05cc2a3521a8.jpg' },
    { type: 'image', src: 'https://i.pinimg.com/1200x/a0/a0/54/a0a05411b174ee4c7a0aad67f350a604.jpg' },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerImages.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const handleAddToCart = (product) => {
    addToCart(product)
  }

  return (
    <div className="homepage">
      {/* Carousel Banner Section */}
      <section className="carousel-section">
        <div className="carousel-container">
          {bannerImages.map((banner, index) => (
            <div
              key={index}
              className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
            >
              {banner.type === 'welcome' ? (
                <div className="hero-section-slide">
                  <div className="hero-content">
                    <h1 className="hero-title">Welcome to Beautify</h1>
                    <p className="hero-subtitle">
                      Discover premium skincare products for your natural glow
                    </p>
                    <Link to="/products" className="btn btn-success btn-lg hero-btn">
                      Shop Now
                    </Link>
                  </div>
                </div>
              ) : (
                <img src={banner.src} alt="Skincare promotion" className="carousel-image" />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="featured-section container py-5">
        <div className="text-center mb-5">
          <h2 className="text-dark fw-bold">Featured Products</h2>
          <p className="text-muted">Handpicked bestsellers for your skincare routine</p>
        </div>

        <div className="row g-4">
          {featuredProducts.map((product) => (
            <div key={product.id} className="col-md-6 col-lg-4">
              <div className="product-card h-100">
                <div className="product-image-container">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="product-image"
                  />
                  <div className="product-overlay">
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>

                <div className="product-info p-3">
                  <span className="badge bg-light text-success mb-2">
                    {product.category}
                  </span>
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text text-muted small">{product.description}</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="fs-5 fw-bold text-success">
                      {formatPrice(product.price)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="featured-section container py-5">
        <div className="text-center mb-5">
          <h2 className="text-dark fw-bold">New Arrivals</h2>
          <p className="text-muted">Discover our latest skincare innovations</p>
        </div>

        <div className="row g-4">
          {newArrivals.map((product) => (
            <div key={product.id} className="col-md-6 col-lg-4">
              <div className="product-card h-100">
                <div className="product-image-container">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="product-image"
                  />
                  <div className="product-overlay">
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>

                <div className="product-info p-3">
                  <span className="badge bg-light text-success mb-2">
                    {product.category}
                  </span>
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text text-muted small">{product.description}</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="fs-5 fw-bold text-success">
                      {formatPrice(product.price)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Beplain Brand Section */}
      <section className="featured-section container py-5 bg-light rounded-3">
        <div className="text-center mb-5">
          <h2 className="text-dark fw-bold">Beplain Collection</h2>
          <p className="text-muted">Premium skincare from Korea's trusted brand</p>
        </div>

        <div className="row g-4">
          {beplainProducts.map((product) => (
            <div key={product.id} className="col-md-6 col-lg-3">
              <div className="product-card h-100">
                <div className="product-image-container">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="product-image"
                  />
                  <div className="product-overlay">
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>

                <div className="product-info p-3">
                  <span className="badge bg-light text-success mb-2">
                    {product.category}
                  </span>
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text text-muted small">{product.description}</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="fs-5 fw-bold text-success">
                      {formatPrice(product.price)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3CE Brand Section */}
      <section className="featured-section container py-5">
        <div className="text-center mb-5">
          <h2 className="text-dark fw-bold">3CE Essentials</h2>
          <p className="text-muted">Affordable luxury skincare from Korea</p>
        </div>

        <div className="row g-4">
          {threeceProducts.map((product) => (
            <div key={product.id} className="col-md-6 col-lg-3">
              <div className="product-card h-100">
                <div className="product-image-container">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="product-image"
                  />
                  <div className="product-overlay">
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>

                <div className="product-info p-3">
                  <span className="badge bg-light text-success mb-2">
                    {product.category}
                  </span>
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text text-muted small">{product.description}</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="fs-5 fw-bold text-success">
                      {formatPrice(product.price)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="why-beautify py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="text-dark fw-bold">Why Choose Beautify?</h2>
          </div>

          <div className="row text-center g-4">
            <div className="col-md-4">
              <div className="benefit-card">
                <div className="benefit-icon">
                  <i className="fa-solid fa-leaf"></i>
                </div>
                <h5>Natural Ingredients</h5>
                <p className="text-muted">
                  All products made with pure, natural ingredients for your skin
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="benefit-card">
                <div className="benefit-icon">
                  <i className="fa-regular fa-star"></i>
                </div>
                <h5>Dermatologist Tested</h5>
                <p className="text-muted">
                  Proven safe and effective for all skin types
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="benefit-card">
                <div className="benefit-icon">
                  <i className="fa-regular fa-truck"></i>
                </div>
                <h5>Fast Delivery</h5>
                <p className="text-muted">
                  Quick and secure delivery to your doorstep
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section py-5">
        <div className="container text-center">
          <h3 className="mb-4">Ready to transform your skincare routine?</h3>
          <p className="text-muted mb-4">Explore our full collection of premium products</p>
          <Link to="/products" className="btn btn-success btn-lg">
            View All Products
          </Link>
        </div>
      </section>
    </div>
  )
}
