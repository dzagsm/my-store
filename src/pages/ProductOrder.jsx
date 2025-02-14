import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../config/supabase'

function ProductOrder() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    wilaya: '',
    quantity: 1
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Define delivery fees based on wilaya
  const getDeliveryFee = (wilaya) => {
    const deliveryFees = {
      'أدرار': 1000,
      'الشلف': 800,
      'الأغواط': 800,
      'أم البواقي': 800,
      'باتنة': 800,
      'بجاية': 800,
      'بسكرة': 800,
      'بشار': 1000,
      'البليدة': 600,
      'البويرة': 700,
      'تمنراست': 1200,
      'تبسة': 800,
      'تلمسان': 800,
      'تيارت': 800,
      'تيزي وزو': 700,
      'الجزائر': 500,
      'الجلفة': 800,
      'جيجل': 800,
      'سطيف': 800,
      'سعيدة': 800,
      'سكيكدة': 800,
      'سيدي بلعباس': 800,
      'عنابة': 800,
      'قالمة': 800,
      'قسنطينة': 800,
      'المدية': 700,
      'مستغانم': 800,
      'المسيلة': 800,
      'معسكر': 800,
      'ورقلة': 1000,
      'وهران': 600,
      'البيض': 1000,
      'إليزي': 1200,
      'برج بوعريريج': 800,
      'بومرداس': 600,
      'الطارف': 800,
      'تندوف': 1200,
      'تيسمسيلت': 800,
      'الوادي': 1000,
      'خنشلة': 800,
      'سوق أهراس': 800,
      'تيبازة': 600,
      'ميلة': 800,
      'عين الدفلى': 700,
      'النعامة': 1000,
      'عين تموشنت': 800,
      'غرداية': 1000,
      'غليزان': 800,
      'تيميمون': 1000,
      'برج باجي مختار': 1200,
      'أولاد جلال': 800,
      'بني عباس': 1000,
      'عين صالح': 1200,
      'عين قزام': 1200,
      'تقرت': 1000,
      'جانت': 1200,
      'المغير': 1000,
      'المنيعة': 1000
    }
    return deliveryFees[wilaya] || 1000 // Default delivery fee if wilaya not found
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const productPrice = 2500
      const deliveryFee = getDeliveryFee(formData.wilaya)
      const subtotal = formData.quantity * productPrice
      const totalAmount = subtotal + deliveryFee

      // First, create the order
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert([
          {
            customer_name: formData.customerName,
            customer_phone: formData.phone,
            wilaya: formData.wilaya,
            delivery_fee: deliveryFee,
            total_amount: totalAmount,
            status: 'pending'
          }
        ])
        .select()

      if (orderError) {
        console.error('Order Error:', orderError)
        throw orderError
      }

      console.log('Order created:', orderData)

      // If successful, create order items
      if (orderData && orderData[0]) {
        const { error: itemError } = await supabase
          .from('order_items')
          .insert([
            {
              order_id: orderData[0].id,
              quantity: formData.quantity,
              price_at_time: productPrice
            }
          ])

        if (itemError) {
          console.error('Item Error:', itemError)
          throw itemError
        }
      }

      // Navigate to success page
      navigate('/success')
    } catch (error) {
      console.error('Full error details:', error)
      setError(`حدث خطأ أثناء إرسال الطلب: ${error.message || 'خطأ غير معروف'}`)
    } finally {
      setLoading(false)
    }
  }

  // Calculate the current total to display
  const productPrice = 2500
  const deliveryFee = getDeliveryFee(formData.wilaya)
  const subtotal = formData.quantity * productPrice
  const totalAmount = subtotal + deliveryFee

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-center mb-8 text-purple-800">اطلب المنتج الآن</h1>
          
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">الاسم الكامل</label>
              <input
                type="text"
                required
                className="w-full rounded-lg border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                value={formData.customerName}
                onChange={(e) => setFormData({...formData, customerName: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">رقم الهاتف</label>
              <input
                type="tel"
                required
                className="w-full rounded-lg border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">الولاية</label>
              <select
                required
                className="w-full rounded-lg border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                value={formData.wilaya}
                onChange={(e) => setFormData({...formData, wilaya: e.target.value})}
              >
                <option value="">اختر الولاية</option>
                <option value="أدرار">أدرار</option>
                <option value="الشلف">الشلف</option>
                <option value="الأغواط">الأغواط</option>
                <option value="أم البواقي">أم البواقي</option>
                <option value="باتنة">باتنة</option>
                <option value="بجاية">بجاية</option>
                <option value="بسكرة">بسكرة</option>
                <option value="بشار">بشار</option>
                <option value="البليدة">البليدة</option>
                <option value="البويرة">البويرة</option>
                <option value="تمنراست">تمنراست</option>
                <option value="تبسة">تبسة</option>
                <option value="تلمسان">تلمسان</option>
                <option value="تيارت">تيارت</option>
                <option value="تيزي وزو">تيزي وزو</option>
                <option value="الجزائر">الجزائر</option>
                <option value="الجلفة">الجلفة</option>
                <option value="جيجل">جيجل</option>
                <option value="سطيف">سطيف</option>
                <option value="سعيدة">سعيدة</option>
                <option value="سكيكدة">سكيكدة</option>
                <option value="سيدي بلعباس">سيدي بلعباس</option>
                <option value="عنابة">عنابة</option>
                <option value="قالمة">قالمة</option>
                <option value="قسنطينة">قسنطينة</option>
                <option value="المدية">المدية</option>
                <option value="مستغانم">مستغانم</option>
                <option value="المسيلة">المسيلة</option>
                <option value="معسكر">معسكر</option>
                <option value="ورقلة">ورقلة</option>
                <option value="وهران">وهران</option>
                <option value="البيض">البيض</option>
                <option value="إليزي">إليزي</option>
                <option value="برج بوعريريج">برج بوعريريج</option>
                <option value="بومرداس">بومرداس</option>
                <option value="الطارف">الطارف</option>
                <option value="تندوف">تندوف</option>
                <option value="تيسمسيلت">تيسمسيلت</option>
                <option value="الوادي">الوادي</option>
                <option value="خنشلة">خنشلة</option>
                <option value="سوق أهراس">سوق أهراس</option>
                <option value="تيبازة">تيبازة</option>
                <option value="ميلة">ميلة</option>
                <option value="عين الدفلى">عين الدفلى</option>
                <option value="النعامة">النعامة</option>
                <option value="عين تموشنت">عين تموشنت</option>
                <option value="غرداية">غرداية</option>
                <option value="غليزان">غليزان</option>
                <option value="تيميمون">تيميمون</option>
                <option value="برج باجي مختار">برج باجي مختار</option>
                <option value="أولاد جلال">أولاد جلال</option>
                <option value="بني عباس">بني عباس</option>
                <option value="عين صالح">عين صالح</option>
                <option value="عين قزام">عين قزام</option>
                <option value="تقرت">تقرت</option>
                <option value="جانت">جانت</option>
                <option value="المغير">المغير</option>
                <option value="المنيعة">المنيعة</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">الكمية</label>
              <input
                type="number"
                min="1"
                required
                className="w-full rounded-lg border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                value={formData.quantity}
                onChange={(e) => setFormData({...formData, quantity: parseInt(e.target.value) || 1})}
              />
            </div>

            <div className="border-t border-gray-100 pt-6 space-y-3">
              <div className="flex justify-between text-sm text-gray-600">
                <span>سعر المنتج:</span>
                <span className="font-medium">{productPrice} دج</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>رسوم التوصيل:</span>
                <span className="font-medium">{deliveryFee} دج</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-purple-800 pt-2">
                <span>المجموع:</span>
                <span>{totalAmount} دج</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-purple-600 text-white rounded-lg py-3 px-4 font-medium
                hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2
                transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? 'جاري الإرسال...' : 'إرسال الطلب'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ProductOrder