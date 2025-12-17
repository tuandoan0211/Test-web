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
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/60 to-slate-900/40"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,140,0,0.1),transparent_50%)]"></div>
          
          {/* Hero Content */}
          <div className="absolute inset-0 flex items-center justify-start p-4 sm:p-8 lg:p-12">
            <div className="max-w-xl relative z-10">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                <motion.p 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="inline-block px-4 py-1.5 bg-orange-500/20 backdrop-blur-sm border border-orange-400/30 text-orange-300 font-bold text-xs sm:text-sm lg:text-base mb-3 rounded-full"
                >
                  🏸 Vợt cầu lông chính hãng
                </motion.p>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 leading-tight drop-shadow-2xl">
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="block"
                  >
                    Nâng cấp game của bạn
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="block bg-gradient-to-r from-orange-400 to-orange-300 bg-clip-text text-transparent"
                  >
                    với vợt chuyên nghiệp
                  </motion.span>
                </h1>
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="text-sm sm:text-base lg:text-lg text-gray-100 mb-4 sm:mb-6 font-medium drop-shadow-lg"
                >
                  Giảm giá đến <span className="text-orange-400 font-bold">50%</span> cho sản phẩm chính hãng
                </motion.p>
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
                  <div className="relative rounded-xl sm:rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-50 aspect-square mb-2 sm:mb-3 hover:shadow-xl transition-all duration-300 border-2 border-transparent group-hover:border-orange-300">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {category.badge && (
                      <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.1 * index }}
                        className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-2 sm:px-3 py-1 rounded-full text-xs font-bold shadow-lg z-10"
                      >
                        {category.badge}
                      </motion.div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute inset-0 bg-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <p className="text-xs sm:text-sm font-bold text-center text-slate-800 group-hover:text-orange-600 transition-colors duration-300">
                    {category.name}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Flash Sale Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="relative bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 rounded-2xl sm:rounded-3xl p-5 sm:p-7 lg:p-9 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 overflow-hidden shadow-2xl"
          >
            <div 
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                backgroundSize: '60px 60px'
              }}
            ></div>
            <div className="relative z-10 flex-1">
              <motion.p 
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-block text-xs sm:text-sm font-bold uppercase tracking-wider mb-2 sm:mb-3 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full"
              >
                ⚡ Flash Sale
              </motion.p>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 drop-shadow-lg">Giảm giá lên đến <span className="text-yellow-300">50%</span></h3>
              <p className="text-orange-50 text-sm sm:text-base font-medium">Hôm nay chỉ - Kết thúc lúc 23:59</p>
            </div>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative z-10 px-5 sm:px-7 lg:px-9 py-3 sm:py-4 bg-white text-orange-600 font-bold rounded-xl hover:bg-gray-50 transition-all duration-300 whitespace-nowrap text-sm sm:text-base w-full sm:w-auto shadow-xl hover:shadow-2xl"
            >
              Xem ngay →
            </motion.button>
          </motion.div>
        </div>
      </section>
    </>
  );
}