import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: 'Phạm Xuân Duy ',
      role: 'VĐV cầu lông chuyên nghiệp',
      quote: 'Sản phẩm chất lượng tuyệt vời, dịch vụ nhanh chóng. Sẽ tiếp tục ủng hộ!',
      avatar: '👨‍🦰',
      rating: 5,
    },
    {
      id: 2,
      name: 'Đoàn Văn Tuân',
      role: 'Tuyển thủ quốc gia',
      quote: 'Vợt rất tốt, cảm thấy thoải mái khi sử dụng. Giá cả phải chăng!',
      avatar: '👩‍🦱',
      rating: 5,
    },  
    {
      id: 3,
      name: 'Lê Văn Thắng ',
      role: 'Người chơi thường xuyên',
      quote: 'Lần đầu mua ở đây, vô cùng hài lòng với mọi thứ. Sẽ giới thiệu bạn bè!',
      avatar: '👨‍💼',
      rating: 5,
    },
    {
      id: 4,
      name: 'Đỗ Tiến Dũng ',
      role: 'HLV cầu lông',
      quote: 'Hàng chính hãng, chất lượng tốt. Hỗ trợ khách hàng rất tận tình!',
      avatar: '👩‍🏫',
      rating: 5,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">Đánh giá từ khách hàng</h2>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
            Cảm nhận thực từ những khách hàng đã tin tưởng SmashPro
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={itemVariants}
              className="group h-full"
            >
              <div className="bg-white rounded-lg sm:rounded-xl border border-gray-200 p-4 sm:p-6 hover:border-orange-200 hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                {/* Rating */}
                <div className="flex gap-1 mb-3 sm:mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={14} className="sm:w-4 sm:h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-gray-700 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6 flex-1">
                  "{testimonial.quote}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-2 sm:gap-3 pt-3 sm:pt-4 border-t border-gray-100">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center text-lg sm:text-xl shadow-sm">
                    {testimonial.avatar}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 text-xs sm:text-sm">{testimonial.name}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}