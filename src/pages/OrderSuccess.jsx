import { Link } from 'react-router-dom'

function OrderSuccess() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 py-20">
      <div className="max-w-xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h1 className="text-3xl font-bold text-purple-800 mb-4">
            تم إرسال طلبك بنجاح
          </h1>
          
          <p className="text-gray-600 mb-8">
            شكراً لك على طلبك. سنقوم بالاتصال بك قريباً لتأكيد الطلب.
          </p>

          <div className="space-y-4">
            <Link
              to="/"
              className="block w-full bg-purple-600 text-white rounded-lg py-3 px-4 font-medium
                hover:bg-purple-700 transition-colors"
            >
              العودة للرئيسية
            </Link>
            
            <Link
              to="/products"
              className="block w-full bg-white text-purple-600 rounded-lg py-3 px-4 font-medium
                border-2 border-purple-600 hover:bg-purple-50 transition-colors"
            >
              تصفح المزيد من المنتجات
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderSuccess