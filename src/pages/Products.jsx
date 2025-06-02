import { useEffect, useState } from 'react'
import ConfirmModal from './ConfirmModal'
import { useNavigate } from 'react-router-dom'

export default function ProductsPage() {
  const [products, setProducts] = useState([])
  const [deleteId, setDeleteId] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const navigate = useNavigate()

  // Define fetchProducts inside the component
  const fetchProducts = () => {
    fetch('http://localhost:3000/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error('Error fetching products:', err))
  }

  // Load products on first render
  useEffect(() => {
    fetchProducts()
  }, [])

  const confirmDelete = (id) => {
    setDeleteId(id)
    setShowModal(true)
  }

  const handleDelete = () => {
    fetch(`http://localhost:3000/products/${deleteId}`, {
      method: 'DELETE',
    })
      .then(res => {
        if (!res.ok) throw new Error('Delete failed')
        return
      })
      .then(() => {
        setShowModal(false)
        setDeleteId(null)
        fetchProducts() // ✅ This is defined now
      })
      .catch(err => {
        alert(err.message)
        setShowModal(false)
      })
  }

  return (
    <>
     <div className="products-header">
        <h2>Products</h2>
        <button onClick={() => navigate('/products/create')}>Create Product</button>
      </div>
      <div className="products-grid">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <h3>{product.name}</h3>
            <p>Price: ${product.price}</p>
            <p>Status: {product.inStock ? 'In Stock' : 'Out of Stock'}</p>
            <button className='edit-btn' onClick={() => navigate(`/products/edit/${product.id}`)}>Edit</button>
            <button className='delete-btn' onClick={() => confirmDelete(product.id)}>Delete</button>
          </div>
        ))}
      </div>

      {showModal && (
        <ConfirmModal
          message="Are you sure you want to delete this product?"
          onConfirm={handleDelete}
          onCancel={() => setShowModal(false)}
        />
      )}
    </>
  )
}
