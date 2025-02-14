import { Link, useLocation } from 'react-router-dom'

function Navbar() {
  const location = useLocation()

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src="/logo.png" alt="Logo" className="h-10" />
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-8 space-x-reverse">
            <Link 
              to="/" 
              className="text-gray-600 hover:text-purple-600 transition-colors"
            >
              الرئيسية
            </Link>
            <Link 
              to="/products" 
              className="text-gray-600 hover:text-purple-600 transition-colors"
            >
              المنتجات
            </Link>
            <Link 
              to="/about" 
              className="text-gray-600 hover:text-purple-600 transition-colors"
            >
              من نحن
            </Link>
          </div>

          {/* CTA Buttons */}
          <div className="flex items-center space-x-4 space-x-reverse">
            <Link 
              to="/login" 
              className="text-purple-600 hover:text-purple-700 transition-colors"
            >
              تسجيل الدخول
            </Link>
            <Link 
              to="/register" 
              className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
              ابدأ الآن
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar 