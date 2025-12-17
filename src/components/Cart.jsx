import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart, Plus, Minus, Trash2, AlertCircle } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

export default function Cart({ isOpen, onClose, onCheckout }) {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();
  const [removingItemId, setRemovingItemId] = useState(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const cartRef = useRef(null);

  // Close cart when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleRemoveItem = (itemId) => {
    setRemovingItemId(itemId);
    setTimeout(() => {
      removeFromCart(itemId);
      setRemovingItemId(null);
    }, 300);
  };

  const handleClearCart = () => {
    setShowClearConfirm(true);
  };

  const confirmClearCart = () => {
    clearCart();
    setShowClearConfirm(false);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-start justify-end p-4 bg-black/60 backdrop-blur-sm pt-20"
        onClick={onClose}
      >
        <motion.div
          ref={cartRef}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ type: 'spring', duration: 0.5 }}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-md h-[calc(100vh-120px)] flex flex-col overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="relative bg-gradient-to-r from-orange-500 to-orange-600 p-6 text-white flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Giỏ hàng</h2>
              <p className="text-orange-100 text-sm mt-1">
                {cartItems.length} {cartItems.length === 1 ? 'sản phẩm' : 'sản phẩm'}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-400">
                <ShoppingCart size={64} className="mb-4 opacity-50" />
                <p className="text-lg font-semibold">Giỏ hàng trống</p>
                <p className="text-sm mt-2">Hãy thêm sản phẩm vào giỏ hàng</p>
              </div>
            ) : (
              <div className="space-y-4">
                <AnimatePresence>
                  {cartItems.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ 
                        opacity: removingItemId === item.id ? 0 : 1, 
                        y: removingItemId === item.id ? -20 : 0,
                        scale: removingItemId === item.id ? 0.9 : 1
                      }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ duration: 0.3 }}
                      className={`bg-gray-50 rounded-lg p-4 flex gap-4 transition-all ${
                        removingItemId === item.id ? 'opacity-50' : ''
                      }`}
                    >
                    {/* Product Image */}
                    <div className="w-20 h-20 flex-shrink-0 bg-white rounded-lg overflow-hidden border border-gray-200">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1599652614694-99b5e82a9f4e?w=100&h=100&fit=crop';
                        }}
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900 text-sm line-clamp-2">
                          {item.name}
                        </h3>
                        <p className="text-orange-600 font-bold text-sm mt-1">
                          {item.price.toLocaleString('vi-VN')}₫
                        </p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-2 bg-white rounded-lg border border-gray-200">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:bg-gray-100 rounded transition-colors"
                          >
                            <Minus size={16} className="text-gray-600" />
                          </button>
                          <span className="px-3 py-1 text-sm font-semibold min-w-[2rem] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:bg-gray-100 rounded transition-colors"
                          >
                            <Plus size={16} className="text-gray-600" />
                          </button>
                        </div>

                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          disabled={removingItemId === item.id}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          title="Xóa sản phẩm"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* Footer - Total and Checkout */}
          {cartItems.length > 0 && (
            <div className="border-t border-gray-200 p-4 bg-white">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold text-gray-700">Tổng cộng:</span>
                <span className="text-2xl font-bold text-orange-600">
                  {getTotalPrice().toLocaleString('vi-VN')}₫
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleClearCart}
                  className="flex-1 px-4 py-2 text-gray-700 font-semibold border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Xóa tất cả
                </button>
                <button
                  onClick={onCheckout}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg"
                >
                  Thanh toán
                </button>
              </div>
            </div>
          )}
        </motion.div>

        {/* Clear Cart Confirmation Modal */}
        <AnimatePresence>
          {showClearConfirm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm"
              onClick={() => setShowClearConfirm(false)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white rounded-2xl shadow-2xl p-6 max-w-md mx-4"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-red-100 rounded-full">
                    <AlertCircle className="text-red-600" size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">Xóa tất cả sản phẩm?</h3>
                    <p className="text-sm text-gray-600">Bạn có chắc chắn muốn xóa tất cả sản phẩm khỏi giỏ hàng?</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowClearConfirm(false)}
                    className="flex-1 px-4 py-2 text-gray-700 font-semibold border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Hủy
                  </button>
                  <button
                    onClick={confirmClearCart}
                    className="flex-1 px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Xóa tất cả
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}

