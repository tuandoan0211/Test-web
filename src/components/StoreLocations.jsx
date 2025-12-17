import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

export default function StoreLocations() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const stores = [
    {
      id: 1,
      name: 'CS1: SmashPro Long Biên',
      image: 'https://down-vn.img.susercontent.com/file/vn-11134207-7ras8-mbm3auvbkwl0cc_tn.webp',
    },
    {
      id: 2,
      name: 'CS2: SmashPro Hồ Tùng Mậu',
      image: 'https://down-vn.img.susercontent.com/file/vn-11134207-7ras8-md7qlld3im9rad_tn.webp',
    },
    {
      id: 3,
      name: 'CS3: SmashPro Tây Hồ',
      image: 'https://down-vn.img.susercontent.com/file/vn-11134207-7ra0g-maiet19o9ll88b_tn.webp',
    },
    {
      id: 4,
      name: 'CS4: SmashPro Tân Bình',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQt1BaJ7J926HE6LS58MGDBPhzGglE74A1oKg&s',
    },
    {
      id: 5,
      name: 'CS5: SmashPro Lê Văn Lương',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIR4Enb4LOyB3tsx65RgjqsLnd-d1os0Wq2w&s',
    },
  ];

  const itemsPerPage = 4;
  const maxIndex = Math.max(0, stores.length - itemsPerPage);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  const visibleStores = stores.slice(currentIndex, currentIndex + itemsPerPage);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Hệ thống cửa hàng</h2>
            <p className="text-gray-600">
              SmashPro với hệ thống cửa hàng toàn quốc giúp quý khách có thể trực tiếp qua thăm
              quan và chọn sản phẩm, trải nghiệm sản phẩm thực tế.
            </p>
          </div>

          {/* View All Button */}
          <button className="hidden md:block px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors duration-300 whitespace-nowrap font-medium">
            Xem tất cả
          </button>
        </div>

        {/* Navigation Arrows */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={`p-2 rounded-lg border-2 transition-colors duration-300 ${
              currentIndex === 0
                ? 'border-gray-200 text-gray-300 cursor-not-allowed'
                : 'border-orange-600 text-orange-600 hover:bg-orange-50'
            }`}
            aria-label="Previous stores"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={handleNext}
            disabled={currentIndex >= maxIndex}
            className={`p-2 rounded-lg border-2 transition-colors duration-300 ${
              currentIndex >= maxIndex
                ? 'border-gray-200 text-gray-300 cursor-not-allowed'
                : 'border-orange-600 text-orange-600 hover:bg-orange-50'
            }`}
            aria-label="Next stores"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Stores Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {visibleStores.map((store, index) => (
            <motion.div
              key={store.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300">
                {/* Store Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={store.image}
                    alt={store.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                </div>

                {/* Store Name */}
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-900">{store.name}</h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button - Mobile */}
        <div className="mt-8 md:hidden text-center">
          <button className="w-full px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors duration-300 font-medium">
            Xem tất cả
          </button>
        </div>
      </div>
    </section>
  );
}
