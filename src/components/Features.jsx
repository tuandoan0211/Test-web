import { motion } from 'framer-motion';
import { Truck, RefreshCw, Lock, Headphones } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: Truck,
      title: 'Giao hàng nhanh',
      description: '24h giao hàng toàn Hà Nội, ngoại tỉnh 1-3 ngày',
    },
    {
      icon: RefreshCw,
      title: 'Đổi trả dễ dàng',
      description: 'Đổi trả trong 30 ngày không cần lý do',
    },
    {
      icon: Lock,
      title: 'Hàng chính hãng',
      description: '100% hàng chính hãng từ các thương hiệu hàng đầu',
    },
    {
      icon: Headphones,
      title: 'Hỗ trợ 24/7',
      description: 'Đội ngũ chuyên viên sẵn sàng giúp đỡ bạn',
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
      transition: { duration: 0.6 },
    },
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Features Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group"
              >
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="h-full p-5 sm:p-7 text-center bg-gradient-to-br from-white to-gray-50/50 border-2 border-gray-100 rounded-2xl hover:border-orange-300 hover:shadow-xl transition-all duration-300 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 to-orange-500/0 group-hover:from-orange-500/5 group-hover:to-transparent transition-all duration-300"></div>
                  
                  {/* Icon Container */}
                  <motion.div 
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                    className="relative z-10 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center mb-4 sm:mb-5 group-hover:from-orange-100 group-hover:to-orange-200 transition-all duration-300 mx-auto shadow-md group-hover:shadow-lg"
                  >
                    <Icon size={24} className="sm:w-7 sm:h-7 text-orange-600 group-hover:scale-110 transition-transform duration-300" />
                  </motion.div>

                  {/* Title */}
                  <h3 className="relative z-10 text-base sm:text-lg font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="relative z-10 text-gray-600 text-xs sm:text-sm leading-relaxed font-medium">
                    {feature.description}
                  </p>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}