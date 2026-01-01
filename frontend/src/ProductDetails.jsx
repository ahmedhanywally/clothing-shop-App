import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

function ProductDetails() {
    const { id } = useParams()
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetch(`http://localhost:5000/api/products/${id}`)
            .then(res => {
                if (!res.ok) throw new Error('Failed to fetch product')
                return res.json()
            })
            .then(data => {
                setProduct(data)
                setLoading(false)
            })
            .catch(err => {
                console.error(err)
                setError('Could not load product details.')
                setLoading(false)
            })
    }, [id])

    if (loading) return <div className="loading">Loading details...</div>
    if (error) return <div className="error">{error}</div>
    if (!product) return <div className="error">Product not found</div>

    return (
        <div className="details-container">
            <Link to="/" className="back-link">&larr; Back to Collection</Link>

            <div className="details-content">
                <div className="details-image">
                    <img src={product.image_url} alt={product.name} />
                </div>

                <div className="details-info">
                    <h2>{product.name}</h2>
                    <div className="price-tag large">${product.price}</div>
                    <p className="details-description">{product.description}</p>

                    <div className="features">
                        <h3>Features</h3>
                        <ul>
                            <li>Premium Quality Material</li>
                            <li>Modern Fit</li>
                            <li>Durable Construction</li>
                        </ul>
                    </div>

                    <button
                        className="buy-btn large-btn"
                        onClick={() => alert(`Added ${product.name} to cart!`)}
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails
