import { useState } from 'react'
import { useCart } from '../context/CartContext'
import { products } from '../data/products'
import { formatPrice } from '../utils/formatPrice'
import './ProductPage.css'

export default function ProductPage() {
  const { addToCart } = useCart()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [priceSort, setPriceSort] = useState('none') // 'none', 'low-high', 'high-low'

  // Get unique categories
  const categories = ['All', 'Popular', ...new Set(products.map((p) => p.category))]

  // Filter products
  let filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory =
      selectedCategory === 'All' ||
      (selectedCategory === 'Popular' ? true : product.category === selectedCategory)
    return matchesSearch && matchesCategory
  })

  // Sort by popularity (sales) when Popular is selected
  if (selectedCategory === 'Popular') {
    filteredProducts = [...filteredProducts].sort((a, b) => b.sales - a.sales)
  }

  // Sort products by price
  if (priceSort === 'low-high') {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price)
  } else if (priceSort === 'high-low') {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price)
  }

  const handleAddToCart = (product) => {
    addToCart(product)
  }

  return (
    <>
      {/* Sidebar Filters - Fixed to left */}
      <div className="filter-section">
        {/* Search */}
        <div className="filter-group mb-4">
          <label className="fw-bold mb-2">Search</label>
          <input
            type="text"
            className="form-control"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Category Filter */}
        <div className="filter-group">
          <label className="fw-bold mb-2 d-block">Category</label>
          <div className="category-filters">
            {categories.map((category) => (
              <label key={category} className="filter-label">
                <input
                  type="radio"
                  name="category"
                  value={category}
                  checked={selectedCategory === category}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                />
                <span>{category}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Sort Filter */}
        <div className="filter-group">
          <label className="fw-bold mb-2 d-block">Sort by Price</label>
          <select
            className="form-select form-select-sm"
            value={priceSort}
            onChange={(e) => setPriceSort(e.target.value)}
          >
            <option value="none">No sorting</option>
            <option value="low-high">Least to Most Expensive</option>
            <option value="high-low">Most to Least Expensive</option>
          </select>
        </div>

        {/* Clear Filters */}
        {(searchTerm || selectedCategory !== 'All' || priceSort !== 'none') && (
          <button
            className="btn btn-outline-success btn-sm w-100 mt-3"
            onClick={() => {
              setSearchTerm('')
              setSelectedCategory('All')
              setPriceSort('none')
            }}
          >
            Clear Filters
          </button>
        )}
      </div>

      <div className="product-page">
        <div className="container py-5">
          {/* Page Header */}
          <div className="page-header mb-5">
            <h1 className="text-dark fw-bold">Our Products</h1>
            <p className="text-muted">
              Explore our full range of premium skincare products
            </p>
          </div>

          {/* Products Grid */}
          <div className="w-100">
            {filteredProducts.length > 0 ? (
              <div className="row g-4">
                {filteredProducts.map((product) => (
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
                        <p className="card-text text-muted small">
                          {product.description}
                        </p>

                        {/* Benefits */}
                        <div className="benefits mb-3">
                          {product.benefits.map((benefit, idx) => (
                            <small key={idx} className="badge bg-light text-success me-1 mb-1">
                              {benefit}
                            </small>
                          ))}
                        </div>

                        <div className="d-flex justify-content-between align-items-center">
                          <span className="fs-5 fw-bold text-success">
                            {formatPrice(product.price)}
                          </span>
                          <button
                            className="btn btn-outline-success btn-sm"
                            onClick={() => handleAddToCart(product)}
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-5">
                <p className="text-muted fs-5">No products found</p>
                <button
                  className="btn btn-success btn-sm"
                  onClick={() => {
                    setSearchTerm('')
                    setSelectedCategory('All')
                  }}
                >
                  View All Products
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

