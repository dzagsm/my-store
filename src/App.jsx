import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ProductOrder from './pages/ProductOrder'
import OrderSuccess from './pages/OrderSuccess'
import AdminDashboard from './pages/AdminDashboard'
import ProductManagement from './pages/ProductManagement'
import Navbar from './components/Navbar'

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/order" element={<ProductOrder />} />
        <Route path="/order/:productId" element={<ProductOrder />} />
        <Route path="/success" element={<OrderSuccess />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/products/manage" element={<ProductManagement />} />
      </Routes>
    </Router>
  )
}

export default App