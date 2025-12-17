import { motion } from 'framer-motion';
import { ShoppingCart, Star } from 'lucide-react';
import { useSearch } from '../contexts/SearchContext';
import { useCart } from '../contexts/CartContext';

export default function SearchResults({ onClose }) {
  const { searchQuery, searchResults } = useSearch();
  const { addToCart } = useCart();

  const handleAddToCart = (product) => {
    const productWithId = {
      ...product,
      id: product.id || `${product.name}-${product.price}`.replace(/\s+/g, '-').toLowerCase(),
    };
    addToCart(productWithId);
    // Có thể thêm thông báo thành công ở đây
  };

  if (!searchQuery.trim()) {
    return (
      <div className="p-8 text-center text-gray-400">
        <p className="text-lg">Nhập từ khóa để tìm kiếm sản phẩm</p>
      </div>
    );
  }

  if (searchResults.length === 0) {
    return (
      <div className="p-8 text-center text-gray-400">
        <p className="text-lg font-semibold">Không tìm thấy sản phẩm</p>
        <p className="text-sm mt-2">Thử tìm kiếm với từ khóa khác</p>
      </div>
    );
  }

  return (
    <div className="max-h-[60vh] overflow-y-auto p-4">
      <div className="mb-4 text-sm text-gray-600">
        Tìm thấy <span className="font-semibold text-orange-600">{searchResults.length}</span> sản phẩm
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {searchResults.map((product, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow border border-gray-200"
          >
            <div className="flex gap-4">
              {/* Product Image */}
              <div className="w-20 h-20 flex-shrink-0 bg-white rounded-lg overflow-hidden border border-gray-200">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1599652614694-99b5e82a9f4e?w=100&h=100&fit=crop';
                  }}
                />
              </div>

              {/* Product Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 mb-1">
                      {product.name}
                    </h3>
                    <p className="text-xs text-gray-500 mb-2">{product.category}</p>
                    
                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-2">
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={10}
                            className="fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-600">({product.reviews})</span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-orange-600 font-bold text-sm">
                        {product.price.toLocaleString('vi-VN')}₫
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs line-through text-gray-400">
                          {product.originalPrice.toLocaleString('vi-VN')}₫
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={() => handleAddToCart(product)}
                  className="w-full mt-2 bg-orange-600 text-white py-2 rounded-lg font-semibold hover:bg-orange-700 transition-colors flex items-center justify-center gap-2 text-xs"
                >
                  <ShoppingCart size={14} />
                  Thêm vào giỏ
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

