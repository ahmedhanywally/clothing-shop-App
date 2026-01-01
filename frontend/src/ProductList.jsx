import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function ProductList() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetch('http://localhost:5000/api/products')
            .then(res => {
                if (!res.ok) throw new Error('Failed to fetch products')
                return res.json()
            })
            .then(data => {
                setProducts(data)
                setLoading(false)
            })
            .catch(err => {
                console.error(err)
                setError('Could not load products. Ensure backend is running.')
                setLoading(false)
            })
    }, [])

    if (loading) return <div className="loading">Loading collection...</div>
    if (error) return <div className="error">{error}</div>

    return (
        <div className="product-grid">
            {products.map(product => (
                <Link key={product._id || product.name} to={`/product/${product._id}`} className="product-card-link">
                    <div className="product-card">
                        <div className="image-container">
                            <img src={product.image_url} alt={product.name} />
                        </div>
                        <div className="card-content">
                            <h3>{product.name}</h3>
                            <p className="description">{product.description}</p>
                            <div className="price-tag">${product.price}</div>
                            <button className="buy-btn">View Details</button>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default ProductList
