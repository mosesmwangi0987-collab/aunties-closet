'use client'

import React, { useState, useEffect } from "react";



export default function Home() {
  const [products,setProducts] = useState([])
const [loading,setLoading] = useState(true)

useEffect(() => {
  fetchProducts()
}, [])


const fetchProducts = async () => {
  try {
    const response = await fetch('http://localhost:8000/api/products/', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    })
    const data = await response.json()
    setProducts(data.results || data)
    setLoading(false)
  } catch (error) {
    console.error('Error fetching products:', error)
    setLoading(false)
  }
}

return (
  <div>
    {/*navbar*/}
    <nav className="navbar">
      <div className="navbar-content">
        <h1>Aunty's Closet</h1>
        <div className="nav-links">
          <a href="/">Home</a>
          <a href="/shop">Shop</a>
          <a href="/cart">Cart</a>
        </div>
  </div>
  </nav>


  {/* Hero Section */}
  <div className="hero">
    <h2>Welcome to </h2>
    <p>Discover the latest fashion for every occasion.</p>
    <button className="btn-primary">Shop Now</button>
  </div>

  {/*Featured Products Section */}
  <div className="products-section">
    <h3>Featured Products</h3>


    {loading ? (
      <div className="loading">Loading products...</div>
    ) : products.length > 0 ? (
      <div className="products-grid">
        {products .map((product) => (
          <div key={product.id} className="product-card">
          {product.image && (
            <img
            src={ 'http://localhost:8000${product.image}'}
            alt={product.name}
            className="product-image"
            />
          )}
          <div className="product-info">
            <h4 className="product-name">{product.name}</h4>
            <p className="product-description">
              {product.description || 'Premium quality clothing'}
            </p>
            <div className="product-footer">
              <span className="product-price">{product.price}KES</span>
              <button className="btn-add">Add to Cart</button>
              </div>
          </div>
          </div>
        ))}

    
  </div>
    ):(
      <div className="empty-state">
        No products available yet. Check back soon!
        </div>
    )}
      </div>

      {/* Foooter */}
      <footer className="foooter">
        <p>&copy; 2026 Closet. All rights reserved.</p>
      </footer>
</div>
)}
