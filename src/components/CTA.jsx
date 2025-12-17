import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

export default function CTA() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center">
          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight"
          >
            Sẵn sàng nâng cấp game của bạn?
          </motion.h2>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-300 mb-8 max-w-2xl mx-auto"
          >
            Khám phá bộ sưu tập vợt cầu lông chuyên nghiệp với giá tốt nhất. Hàng chính hãng, giao hàng nhanh.
          </motion.p>


          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-6 text-gray-300 text-sm"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 size={18} className="text-green-400" />
              <span>Hàng chính hãng 100%</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={18} className="text-green-400" />
              <span>Giao hàng 24h Hà Nội</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={18} className="text-green-400" />
              <span>Đổi trả 30 ngày</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}