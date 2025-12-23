// API base URL - change this when you deploy
const API_BASE_URL = 'http://localhost:8000/api'

// Fetch all products
export const fetchProducts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/`)
    if (!response.ok) throw new Error('Failed to fetch products')
    const data = await response.json()
    return data.results || data
  } catch (error) {
    console.error('Error fetching products:', error)
    return []
  }
}

// Fetch a single product by ID
export const fetchProductById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}/`)
    if (!response.ok) throw new Error('Failed to fetch product')
    return await response.json()
  } catch (error) {
    console.error('Error fetching product:', error)
    return null
  }
}

// Fetch all categories
export const fetchCategories = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/categories/`)
    if (!response.ok) throw new Error('Failed to fetch categories')
    const data = await response.json()
    return data.results || data
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}

// Fetch products by category
export const fetchProductsByCategory = async (categorySlug) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/products/by_category/?category_slug=${categorySlug}`
    )
    if (!response.ok) throw new Error('Failed to fetch products')
    return await response.json()
  } catch (error) {
    console.error('Error fetching products by category:', error)
    return []
  }
}

// Check if a product variant is in stock
export const checkVariantStock = async (productId, size, color) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/products/${productId}/check_variant_stock/?size=${size}&color=${color}`
    )
    if (!response.ok) throw new Error('Failed to check stock')
    return await response.json()
  } catch (error) {
    console.error('Error checking stock:', error)
    return null
  }
}

// Create an order (for checkout)
export const createOrder = async (orderData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/orders/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    })
    if (!response.ok) throw new Error('Failed to create order')
    return await response.json()
  } catch (error) {
    console.error('Error creating order:', error)
    return null
  }
}