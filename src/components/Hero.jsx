import { motion } from 'framer-motion';

export default function Hero() {
  const categories = [
    { name: 'Vợt cầu lông', image: 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSChwhdGJtK5beua0ipm4zmX0zMIW8ITYTIpk4uA4Z2RlaKi0WI1-q3aYwxuSEybQv5kb33tlESc3R4g1W2NMQg0rVbfThnVJ7LAggIeFG7Ym8DRz3hMI2j', badge: 'Hot' },
    { name: 'Giày thể thao', image: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQgsI2ffT8Wob2ApWHUtzgOMve7upmXW9iLOqW32vblZfaTN4-TrSvpzTkx9StRqajxNP1YDopiI2sq9AxFNnwKTu-GLyhpDNfBmLIJCbpa60KIdQIrOf1-', badge: 'New' },
    { name: 'Áo thể thao', image: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSPxyl6iW5rL-yAavt6r5mhkCwqOH8zpH9btaWqDl3CxGwOg1l6khRTQ3C8NdMLYPZPCN_hzxwQ8MrFB4hKFgltg3ufMwAonwSTl5x75Wc0p8gozS2fP026ZpoaKD0aUwe94tsju5Ny_K8&usqp=CAc', badge: '' },
    { name: 'Túi xách', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop', badge: 'Sale' },
    { name: 'Tất thể thao', image: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTiQbBKzIxIhWEV3oA0E3QC7xSAgpXuqxkckpGrsfO2tGqMZzIRL_xTHi0ab2k_wDSXn-hDKTuPhm918N1uFXexDDTBZmK3m-V_qT9wiKH7QPETnJJ0p2IUMA', badge: '' },
    { name: 'Phụ kiện', image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=300&h=300&fit=crop', badge: '' },
    { name: 'Giá đỡ vợt', image: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcT3cn2oRBYwRnCwXKBg8iAxu2w-Zq6HGIzC8mZbYsWYu0AKxAw4uRFR51tibWrRsiEKP8Q8-IJjJ-tX7z5rK6ilvIZVciIr4g0aJmTRBF20', badge: '' },
    { name: 'Khác', image: 'https://static.fbshop.vn/wp-content/uploads/2024/01/39b6f16831d1f68fafc0-1536x2048-2-150x150.webp', badge: '' },
  ];

  return (
    <>
      {/* Full Width Banner Section */}
      <section className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] mt-16 sm:mt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative h-64 sm:h-80 lg:h-96 overflow-hidden"
        >
          <img
            src="https://static.fbshop.vn/wp-content/uploads/2024/12/Banner-Fbshop-1.png"
            alt="Hero Banner"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/70 to-slate-900/30"></div>
          
          {/* Hero Content */}
          <div className="absolute inset-0 flex items-center justify-start p-4 sm:p-8 lg:p-12">
            <div className="max-w-xl">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <p className="text-orange-500 font-bold text-sm sm:text-base lg:text-lg mb-2">Vợt cầu lông chính hãng</p>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 leading-tight">
                  Nâng cấp game của bạn<br className="hidden sm:block" />
                  <span className="sm:hidden"> </span>với vợt chuyên nghiệp
                </h1>
                <p className="text-sm sm:text-base lg:text-lg text-gray-200 mb-4 sm:mb-6">
                  Giảm giá đến 50% cho sản phẩm chính hãng
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Category & Content Section */}
      <section className="px-4 sm:px-6 lg:px-8 bg-white py-12">
        <div className="max-w-7xl mx-auto">
          {/* Category Grid */}
          <div className="mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 sm:mb-6">Danh mục sản phẩm</h2>
            <motion.div
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ staggerChildren: 0.1, delayChildren: 0.3 }}
            >
              {categories.map((category, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="group cursor-pointer"
                >
                  <div className="relative rounded-lg sm:rounded-xl overflow-hidden bg-gray-100 aspect-square mb-2 sm:mb-3 hover:shadow-lg transition-all duration-300">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    {category.badge && (
                      <div className="absolute top-1 sm:top-2 right-1 sm:right-2 bg-orange-600 text-white px-1 sm:px-2 py-0.5 sm:py-1 rounded text-xs font-bold">
                        {category.badge}
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-center text-slate-800 group-hover:text-orange-600 transition-colors">
                    {category.name}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Flash Sale Banner */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          >
            <div className="flex-1">
              <p className="text-xs sm:text-sm font-bold uppercase tracking-wider mb-1 sm:mb-2">⚡ Flash Sale</p>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-1 sm:mb-2">Giảm giá lên đến 50%</h3>
              <p className="text-orange-100 text-sm sm:text-base">Hôm nay chỉ - Kết thúc lúc 23:59</p>
            </div>
            <button className="px-4 sm:px-6 lg:px-8 py-2 sm:py-3 bg-white text-orange-600 font-bold rounded-lg hover:bg-gray-100 transition-all duration-300 whitespace-nowrap text-sm sm:text-base w-full sm:w-auto">
              Xem ngay
            </button>
          </motion.div>
        </div>
      </section>
    </>
  );
}