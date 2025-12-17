import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, CheckCircle, Clock, CreditCard, Building2, User, Phone, Mail, AlertCircle, Loader } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useOrder } from '../contexts/OrderContext';

// Bank account information
const BANK_INFO = {
  bankName: 'Vietcombank',
  accountNumber: '0342389686',
  accountHolder: 'DOAN VAN TUAN',
  bankCode: 'VCB',
};

export default function Payment({ isOpen, onClose, onPaymentSuccess }) {
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const { createOrder, currentOrder, updateOrderStatus } = useOrder();
  const [order, setOrder] = useState(null);
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes in seconds
  const [copiedField, setCopiedField] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const paymentRef = useRef(null);

  const totalPrice = getTotalPrice();

  useEffect(() => {
    if (isOpen && cartItems.length > 0 && !order) {
      const newOrder = createOrder(cartItems, totalPrice);
      setOrder(newOrder);
      setTimeLeft(15 * 60);
      setShowSuccess(false);
    }
    // Reset order when closing
    if (!isOpen) {
      setOrder(null);
      setShowSuccess(false);
    }
  }, [isOpen, cartItems, totalPrice, createOrder, order]);

  useEffect(() => {
    if (!isOpen || !order) return;

    const timer = setInterval(() => {
      const now = new Date();
      const expiresAt = new Date(order.expiresAt);
      const diff = Math.max(0, Math.floor((expiresAt - now) / 1000));
      
      setTimeLeft(diff);

      if (diff === 0) {
        updateOrderStatus(order.id, 'cancelled');
        handleClose();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, order, updateOrderStatus]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleClose = () => {
    if (order && order.status === 'pending') {
      updateOrderStatus(order.id, 'cancelled');
    }
    setOrder(null);
    setShowSuccess(false);
    onClose();
  };

  const copyToClipboard = async (text, fieldName) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(fieldName);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleConfirmPayment = async () => {
    setIsSubmitting(true);
    
    // Simulate payment processing
    setTimeout(() => {
      if (order) {
        updateOrderStatus(order.id, 'paid');
        clearCart();
        setIsSubmitting(false);
        setShowSuccess(true);
        
        if (onPaymentSuccess) {
          onPaymentSuccess(order);
        }
        
        setTimeout(() => {
          handleClose();
        }, 3000);
      }
    }, 1500);
  };

  // Generate QR code URL using API
  const generateQRCodeUrl = () => {
    // Format: bank://transfer?account=ACCOUNT&amount=AMOUNT&content=MESSAGE
    const qrContent = `bank://transfer?account=${BANK_INFO.accountNumber}&amount=${totalPrice}&content=Thanh toan don hang ${order?.id || ''}`;
    return `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(qrContent)}`;
  };

  if (!isOpen || !order) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-gradient-to-br from-black/80 via-black/70 to-black/80 backdrop-blur-md"
        onClick={handleClose}
      >
        <motion.div
          ref={paymentRef}
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 30 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col border border-white/20 backdrop-blur-xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="relative bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 p-6 text-white flex items-center justify-between shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-transparent"></div>
            <div className="relative z-10">
              <h2 className="text-2xl font-bold">Thanh toán đơn hàng</h2>
              <p className="text-orange-100 text-sm mt-1">Mã đơn: {order.id}</p>
            </div>
            <button
              onClick={handleClose}
              className="relative z-10 p-2 hover:bg-white/20 rounded-full transition-all duration-300 hover:scale-110 hover:rotate-90"
            >
              <X size={24} />
            </button>
          </div>

          {/* Success Notification */}
          <AnimatePresence>
            {showSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mx-6 mt-4 p-6 bg-gradient-to-r from-green-500 to-green-600 rounded-xl shadow-lg border-2 border-green-400"
              >
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                      className="w-16 h-16 bg-white rounded-full flex items-center justify-center"
                    >
                      <CheckCircle className="text-green-600" size={40} />
                    </motion.div>
                  </div>
                  <div className="flex-1 text-white">
                    <h3 className="text-xl font-bold mb-1">Thanh toán thành công!</h3>
                    <p className="text-green-50 text-sm">
                      Đơn hàng của bạn đã được xác nhận. Chúng tôi sẽ xử lý đơn hàng trong vòng 24h.
                    </p>
                    <p className="text-green-100 text-xs mt-2 font-semibold">
                      Mã đơn hàng: {order.id}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
            {/* Timer */}
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-5 bg-gradient-to-r from-orange-50 via-orange-50/80 to-orange-50 border-2 border-orange-200/50 rounded-xl flex items-center justify-between shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                  <Clock className="text-orange-600" size={28} />
                </motion.div>
                <div>
                  <p className="text-xs text-gray-600 font-medium uppercase tracking-wide">Thời gian còn lại</p>
                  <p className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
                    {formatTime(timeLeft)}
                  </p>
                </div>
              </div>
              {timeLeft < 300 && (
                <motion.div 
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="px-4 py-2 bg-red-100 text-red-600 text-sm font-bold rounded-lg border-2 border-red-300"
                >
                  ⚠️ Sắp hết hạn!
                </motion.div>
              )}
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Left Column - QR Code & Bank Info */}
              <div className="space-y-4">
                {/* QR Code */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 }}
                  className="bg-gradient-to-br from-white to-gray-50 border-2 border-gray-200/50 rounded-2xl p-6 flex flex-col items-center shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="mb-4 flex items-center gap-2">
                    <div className="p-2 bg-orange-100 rounded-lg">
                      <CreditCard className="text-orange-600" size={20} />
                    </div>
                    <span className="font-bold text-gray-800">Quét mã QR để thanh toán</span>
                  </div>
                  <div className="bg-white p-5 rounded-xl border-2 border-gray-100 mb-4 shadow-inner hover:scale-105 transition-transform duration-300">
                    <img
                      src={generateQRCodeUrl()}
                      alt="QR Code"
                      className="w-64 h-64 mx-auto rounded-lg"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/300x300?text=QR+Code';
                      }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 text-center font-medium">
                    Mở ứng dụng ngân hàng và quét mã QR để thanh toán
                  </p>
                </motion.div>

                {/* Bank Information */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 border-2 border-blue-200/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-5">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Building2 className="text-blue-600" size={22} />
                    </div>
                    <h3 className="font-bold text-gray-800 text-lg">Thông tin tài khoản</h3>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs text-gray-600 mb-1 block">Ngân hàng</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={BANK_INFO.bankName}
                          readOnly
                          className="flex-1 px-4 py-2.5 bg-white border-2 border-gray-200 rounded-xl text-sm font-bold text-gray-800 focus:outline-none focus:border-orange-400 transition-colors shadow-sm"
                        />
                        <button
                          onClick={() => copyToClipboard(BANK_INFO.bankName, 'bank')}
                          className="p-2.5 bg-white border-2 border-gray-200 rounded-xl hover:bg-orange-50 hover:border-orange-400 transition-all duration-300 hover:scale-110 shadow-sm"
                          title="Sao chép"
                        >
                          {copiedField === 'bank' ? (
                            <CheckCircle className="text-green-600" size={18} />
                          ) : (
                            <Copy className="text-gray-600" size={18} />
                          )}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs text-gray-600 mb-1 block">Số tài khoản</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={BANK_INFO.accountNumber}
                          readOnly
                          className="flex-1 px-4 py-2.5 bg-white border-2 border-gray-200 rounded-xl text-sm font-bold text-gray-800 focus:outline-none focus:border-orange-400 transition-colors shadow-sm"
                        />
                        <button
                          onClick={() => copyToClipboard(BANK_INFO.accountNumber, 'account')}
                          className="p-2.5 bg-white border-2 border-gray-200 rounded-xl hover:bg-orange-50 hover:border-orange-400 transition-all duration-300 hover:scale-110 shadow-sm"
                          title="Sao chép"
                        >
                          {copiedField === 'account' ? (
                            <CheckCircle className="text-green-600" size={18} />
                          ) : (
                            <Copy className="text-gray-600" size={18} />
                          )}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs text-gray-600 mb-1 block">Chủ tài khoản</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={BANK_INFO.accountHolder}
                          readOnly
                          className="flex-1 px-4 py-2.5 bg-white border-2 border-gray-200 rounded-xl text-sm font-bold text-gray-800 focus:outline-none focus:border-orange-400 transition-colors shadow-sm"
                        />
                        <button
                          onClick={() => copyToClipboard(BANK_INFO.accountHolder, 'holder')}
                          className="p-2.5 bg-white border-2 border-gray-200 rounded-xl hover:bg-orange-50 hover:border-orange-400 transition-all duration-300 hover:scale-110 shadow-sm"
                          title="Sao chép"
                        >
                          {copiedField === 'holder' ? (
                            <CheckCircle className="text-green-600" size={18} />
                          ) : (
                            <Copy className="text-gray-600" size={18} />
                          )}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs text-gray-600 mb-2 block font-semibold uppercase tracking-wide">Số tiền</label>
                      <div className="px-4 py-3 bg-gradient-to-r from-orange-100 to-orange-50 border-2 border-orange-300 rounded-xl shadow-sm">
                        <p className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
                          {totalPrice.toLocaleString('vi-VN')}₫
                        </p>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs text-gray-600 mb-1 block">Nội dung chuyển khoản</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={`Thanh toan don hang ${order.id}`}
                          readOnly
                          className="flex-1 px-4 py-2.5 bg-white border-2 border-gray-200 rounded-xl text-xs font-medium text-gray-700 focus:outline-none focus:border-orange-400 transition-colors shadow-sm"
                        />
                        <button
                          onClick={() => copyToClipboard(`Thanh toan don hang ${order.id}`, 'content')}
                          className="p-2.5 bg-white border-2 border-gray-200 rounded-xl hover:bg-orange-50 hover:border-orange-400 transition-all duration-300 hover:scale-110 shadow-sm"
                          title="Sao chép"
                        >
                          {copiedField === 'content' ? (
                            <CheckCircle className="text-green-600" size={18} />
                          ) : (
                            <Copy className="text-gray-600" size={18} />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Right Column - Order Summary */}
              <div className="space-y-4">
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-2xl p-6 shadow-lg border border-gray-200/50"
                >
                  <h3 className="font-bold text-gray-800 mb-5 flex items-center gap-3 text-lg">
                    <div className="p-2 bg-orange-100 rounded-lg">
                      <CheckCircle className="text-orange-600" size={22} />
                    </div>
                    Tóm tắt đơn hàng
                  </h3>
                  
                  <div className="space-y-3 mb-5 max-h-64 overflow-y-auto scrollbar-hide">
                    {order.items.map((item, idx) => (
                      <motion.div 
                        key={item.id}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + idx * 0.05 }}
                        className="flex gap-3 bg-white p-4 rounded-xl border border-gray-200/50 hover:shadow-md hover:border-orange-200 transition-all duration-300"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg border-2 border-gray-200 shadow-sm"
                          onError={(e) => {
                            e.target.src = 'https://images.unsplash.com/photo-1599652614694-99b5e82a9f4e?w=100&h=100&fit=crop';
                          }}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-gray-900 line-clamp-2">
                            {item.name}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs text-gray-500 font-medium">
                              Số lượng: {item.quantity}
                            </span>
                            <span className="text-sm font-bold text-orange-600">
                              {(item.price * item.quantity).toLocaleString('vi-VN')}₫
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="border-t-2 border-gray-200 pt-5 space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 font-medium">Tạm tính:</span>
                      <span className="font-bold text-gray-800">{totalPrice.toLocaleString('vi-VN')}₫</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 font-medium">Phí vận chuyển:</span>
                      <span className="font-bold text-green-600">Miễn phí</span>
                    </div>
                    <div className="border-t-2 border-orange-200 pt-3 flex justify-between items-center bg-orange-50/50 -mx-2 px-2 py-2 rounded-lg">
                      <span className="text-lg font-bold text-gray-800">Tổng cộng:</span>
                      <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
                        {totalPrice.toLocaleString('vi-VN')}₫
                      </span>
                    </div>
                  </div>
                </motion.div>

                {/* Instructions */}
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200/50 rounded-2xl p-5 shadow-lg"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="p-1.5 bg-blue-100 rounded-lg">
                      <AlertCircle className="text-blue-600" size={18} />
                    </div>
                    <h4 className="font-bold text-blue-900 text-sm">Hướng dẫn thanh toán</h4>
                  </div>
                  <ol className="text-xs text-blue-800 space-y-2 list-decimal list-inside font-medium">
                    <li className="leading-relaxed">Quét mã QR hoặc chuyển khoản theo thông tin bên trái</li>
                    <li className="leading-relaxed">Sao chép đúng nội dung chuyển khoản</li>
                    <li className="leading-relaxed">Nhấn "Xác nhận đã thanh toán" sau khi chuyển khoản</li>
                    <li className="leading-relaxed">Đơn hàng sẽ được xử lý trong vòng 24h</li>
                  </ol>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t-2 border-gray-200 p-5 bg-gradient-to-r from-gray-50 to-white">
            <div className="flex gap-4">
              <button
                onClick={handleClose}
                className="flex-1 px-4 py-3.5 text-gray-700 font-bold border-2 border-gray-300 rounded-xl hover:bg-gray-100 hover:border-gray-400 transition-all duration-300 hover:scale-105 shadow-sm"
              >
                Hủy đơn hàng
              </button>
              <button
                onClick={handleConfirmPayment}
                disabled={isSubmitting || order.status !== 'pending'}
                className="flex-1 px-4 py-3.5 bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 text-white font-bold rounded-xl hover:from-orange-600 hover:via-orange-700 hover:to-orange-600 transition-all shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 hover:scale-105 active:scale-95"
              >
                {isSubmitting ? (
                  <>
                    <Loader className="animate-spin" size={20} />
                    <span>Đang xử lý...</span>
                  </>
                ) : order.status === 'paid' ? (
                  <>
                    <CheckCircle size={20} />
                    <span>Đã thanh toán</span>
                  </>
                ) : (
                  'Xác nhận đã thanh toán'
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

