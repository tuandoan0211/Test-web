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
  const paymentRef = useRef(null);

  const totalPrice = getTotalPrice();

  useEffect(() => {
    if (isOpen && cartItems.length > 0 && !order) {
      const newOrder = createOrder(cartItems, totalPrice);
      setOrder(newOrder);
      setTimeLeft(15 * 60);
    }
    // Reset order when closing
    if (!isOpen) {
      setOrder(null);
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
        
        if (onPaymentSuccess) {
          onPaymentSuccess(order);
        }
        
        setTimeout(() => {
          handleClose();
        }, 2000);
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
        className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
        onClick={handleClose}
      >
        <motion.div
          ref={paymentRef}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', duration: 0.5 }}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="relative bg-gradient-to-r from-orange-500 to-orange-600 p-6 text-white flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Thanh toán đơn hàng</h2>
              <p className="text-orange-100 text-sm mt-1">Mã đơn: {order.id}</p>
            </div>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
            {/* Timer */}
            <div className="mb-6 p-4 bg-orange-50 border border-orange-200 rounded-lg flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Clock className="text-orange-600" size={24} />
                <div>
                  <p className="text-sm text-gray-600">Thời gian còn lại</p>
                  <p className="text-2xl font-bold text-orange-600">{formatTime(timeLeft)}</p>
                </div>
              </div>
              {timeLeft < 300 && (
                <div className="text-red-600 text-sm font-semibold animate-pulse">
                  Sắp hết hạn!
                </div>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Left Column - QR Code & Bank Info */}
              <div className="space-y-4">
                {/* QR Code */}
                <div className="bg-white border-2 border-gray-200 rounded-xl p-6 flex flex-col items-center">
                  <div className="mb-4 flex items-center gap-2">
                    <CreditCard className="text-orange-600" size={20} />
                    <span className="font-semibold text-gray-700">Quét mã QR để thanh toán</span>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-gray-200 mb-4">
                    <img
                      src={generateQRCodeUrl()}
                      alt="QR Code"
                      className="w-64 h-64 mx-auto"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/300x300?text=QR+Code';
                      }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 text-center">
                    Mở ứng dụng ngân hàng và quét mã QR để thanh toán
                  </p>
                </div>

                {/* Bank Information */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <Building2 className="text-blue-600" size={20} />
                    <h3 className="font-bold text-gray-800">Thông tin tài khoản</h3>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs text-gray-600 mb-1 block">Ngân hàng</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={BANK_INFO.bankName}
                          readOnly
                          className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm font-semibold"
                        />
                        <button
                          onClick={() => copyToClipboard(BANK_INFO.bankName, 'bank')}
                          className="p-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
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
                          className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm font-semibold"
                        />
                        <button
                          onClick={() => copyToClipboard(BANK_INFO.accountNumber, 'account')}
                          className="p-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
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
                          className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm font-semibold"
                        />
                        <button
                          onClick={() => copyToClipboard(BANK_INFO.accountHolder, 'holder')}
                          className="p-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
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
                      <label className="text-xs text-gray-600 mb-1 block">Số tiền</label>
                      <div className="px-3 py-2 bg-orange-100 border border-orange-300 rounded-lg">
                        <p className="text-lg font-bold text-orange-600">
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
                          className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded-lg text-xs"
                        />
                        <button
                          onClick={() => copyToClipboard(`Thanh toan don hang ${order.id}`, 'content')}
                          className="p-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
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
                </div>
              </div>

              {/* Right Column - Order Summary */}
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-xl p-5">
                  <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <CheckCircle className="text-orange-600" size={20} />
                    Tóm tắt đơn hàng
                  </h3>
                  
                  <div className="space-y-3 mb-4 max-h-64 overflow-y-auto scrollbar-hide">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex gap-3 bg-white p-3 rounded-lg">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded border border-gray-200"
                          onError={(e) => {
                            e.target.src = 'https://images.unsplash.com/photo-1599652614694-99b5e82a9f4e?w=100&h=100&fit=crop';
                          }}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-900 line-clamp-2">
                            {item.name}
                          </p>
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-xs text-gray-500">
                              Số lượng: {item.quantity}
                            </span>
                            <span className="text-sm font-bold text-orange-600">
                              {(item.price * item.quantity).toLocaleString('vi-VN')}₫
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-gray-300 pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Tạm tính:</span>
                      <span className="font-semibold">{totalPrice.toLocaleString('vi-VN')}₫</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Phí vận chuyển:</span>
                      <span className="font-semibold text-green-600">Miễn phí</span>
                    </div>
                    <div className="border-t border-gray-300 pt-2 flex justify-between">
                      <span className="text-lg font-bold text-gray-800">Tổng cộng:</span>
                      <span className="text-2xl font-bold text-orange-600">
                        {totalPrice.toLocaleString('vi-VN')}₫
                      </span>
                    </div>
                  </div>
                </div>

                {/* Instructions */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <div className="flex items-start gap-2 mb-2">
                    <AlertCircle className="text-blue-600 mt-0.5" size={18} />
                    <h4 className="font-semibold text-blue-900 text-sm">Hướng dẫn thanh toán</h4>
                  </div>
                  <ol className="text-xs text-blue-800 space-y-1 list-decimal list-inside">
                    <li>Quét mã QR hoặc chuyển khoản theo thông tin bên trái</li>
                    <li>Sao chép đúng nội dung chuyển khoản</li>
                    <li>Nhấn "Xác nhận đã thanh toán" sau khi chuyển khoản</li>
                    <li>Đơn hàng sẽ được xử lý trong vòng 24h</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 p-4 bg-gray-50">
            <div className="flex gap-3">
              <button
                onClick={handleClose}
                className="flex-1 px-4 py-3 text-gray-700 font-semibold border-2 border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Hủy đơn hàng
              </button>
              <button
                onClick={handleConfirmPayment}
                disabled={isSubmitting || order.status !== 'pending'}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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

