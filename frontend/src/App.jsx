import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ProductList from './ProductList'
import ProductDetails from './ProductDetails'
import './index.css'

function App() {
  return (
    <Router>
      <div className="app-container">
        <header className="header">
          <h1>DevOps <span className="highlight">Threads</span></h1>
          <p>Premium Collection</p>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/product/:id" element={<ProductDetails />} />
          </Routes>
        </main>

        <footer>
          <p>&copy; 2024 DevOps Threads. Built for Graduation Project.</p>
        </footer>
      </div>
    </Router>
  )
}

export default App
