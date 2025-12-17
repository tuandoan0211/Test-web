import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Star, Heart, CheckCircle } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

export default function ProductGrid({ isLoggedIn, onLoginClick }) {
  const [cartNotification, setCartNotification] = useState(null);
  const { addToCart } = useCart();
  const productCategories = [
    {
      title: 'Vợt cầu lông',
      image: 'https://images.unsplash.com/photo-1599652614694-99b5e82a9f4e?w=400&q=80',
      products: [
        { 
          name: 'Vợt Cầu Lông Lining Halbertec Motor | Phiên Bản Độc Biệt', 
          price: 1150000, 
          originalPrice: null, 
          rating: 5, 
          reviews: 1,
          badge: 'FBSHOP',
          image: 'https://cdn.shopvnb.com/uploads/images/bai_viet/vot-cau-long-lining-halbertec-motor-2-1727895449.jpg'
        },
        { 
          name: 'Vợt Cầu Lông Kumpoo K520 Pro 2024 | Phiên bản mới nâng cấp', 
          price: 500000, 
          originalPrice: null, 
          rating: 5, 
          reviews: 4,
          badge: '',
          image: 'https://shopvnb.com//uploads/san_pham/vot-cau-long-kumpoo-power-control-k520-pro-den-chinh-hang-1.webp'
        },
        { 
          name: 'Vợt Cầu Lông Lining Halbertec 9000 | Phiên Bản Nâng Cấp', 
          price: 4050000, 
          originalPrice: 5200000, 
          rating: 5, 
          reviews: 0,
          badge: '',
          image: 'https://shopvnb.com//uploads/gallery/vot-cau-long-lining-halbertec-9000-chinh-hang_1713475947.webp'
        },
        { 
          name: 'Vợt Cầu Lông Yonex Astrox 77 Pro | Bản Nâng Cấp Mới Nhất', 
          price: 4139000, 
          originalPrice: null, 
          rating: 5, 
          reviews: 3,
          badge: '',
          image: 'https://shopvnb.com//uploads/san_pham/vot-cau-long-yonex-astrox-77-pro-chinh-hang-1.webp'
        },
        { 
          name: 'Vợt Cầu Lông Yonex Astrox 100ZZ Kurenai | Bảo Kiếm Của Viktor...', 
          price: 4350000, 
          originalPrice: 5169000, 
          rating: 5, 
          reviews: 7,
          badge: '',
          image: 'https://shopvnb.com//uploads/san_pham/vot-cau-long-yonex-astrox-100zz-kurenai-do-new-2021-5.webp'
        },
        { 
          name: 'Vợt Cầu Lông Victor TK-RYUGA METALLIC | Diễn Mạo Hoàn Toàn...', 
          price: 3280000, 
          originalPrice: 3790000, 
          rating: 5, 
          reviews: 3,
          badge: '',
          image: 'https://shopvnb.com//uploads/gallery/vot-cau-long-victor-tk-ryuga-metallic-chinh-hang_1702259879.webp'
        },
      ]
    },
    {
      title: 'Túi xách',
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80',
      products: [
        { name: 'Túi Yonex Pro Racquet 12 | Chứa 12 Cây Vợt - Cao Cấp', price: 1890000, originalPrice: 2390000, rating: 5, reviews: 58, badge: 'PREMIUM', image: 'https://cdn.shopvnb.com/uploads/images/tin_tuc/tui-cau-long-yonex-bag9826lx-xanh-duong-gia-cong-1.webp' },
        { name: 'Túi Li-Ning Tournament 9 | Ngăn Giày Riêng Biệt', price: 1590000, originalPrice: 1990000, rating: 5, reviews: 47, badge: '', image: 'https://cdn.shopvnb.com/uploads/gallery/tui-cau-long-lining-abjt059-2-chinh-hang-2_1696794567.webp' },
        { name: 'Túi Victor Supreme 6 | Chống Nước Cao Cấp', price: 1390000, originalPrice: 1790000, rating: 5, reviews: 52, badge: '', image: 'https://cdn.shopvnb.com/img/300x300/uploads/gallery/tui-cau-long-victor-br9215-hb-chinh-hang_1744069724.webp' },
        { name: 'Túi Mizuno Tour 3 | Thiết Kế Thể Thao', price: 990000, originalPrice: 1290000, rating: 5, reviews: 38, badge: '', image: 'https://shopvnb.com//uploads/san_pham/tui-cau-long-mizuno-3comp-bag-xanh-duong-chinh-hang-1.webp' },
        { name: 'Túi Lining Mega Power 6 | Siêu Rộng Rãi', price: 1290000, originalPrice: 1590000, rating: 5, reviews: 44, badge: '', image: 'https://cdn.shopvnb.com/img/300x300/uploads/gallery/tui-cau-long-lining-abju013-1-chinh-hang_1710529668.webp' },
        { name: 'Túi Yonex Club Series | Phù Hợp Đi Tập', price: 890000, originalPrice: 1190000, rating: 5, reviews: 41, badge: '', image: 'https://votcaulongshop.vn/wp-content/uploads/2024/04/z5119597240726-7333d26112f8d82222d3f318cf50e990.jpg' },
        { name: 'Túi Victor Pro 9 Pack | Nhiều Ngăn Tiện Lợi', price: 1690000, originalPrice: 2090000, rating: 5, reviews: 63, badge: '', image: 'https://shopvnb.com//uploads/gallery/tui-cau-long-victor-br5621d-do-chinh-hang_1725064335.webp' },
      ]
    },
    {
      title: 'Áo thể thao',
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80',
      products: [
        { name: 'Áo Yonex Tournament 2024 | Vải Cooling Touch Mát Lạnh', price: 450000, originalPrice: 590000, rating: 5, reviews: 67, badge: 'BEST SELLER', image: 'https://gw.alicdn.com/imgextra/O1CN01A34mbD1miYUz1Uh5w_!!6000000004988-0-yinhe.jpg_540x540.jpg' },
        { name: 'Áo Li-Ning Championship | Thiết Kế Trẻ Trung', price: 390000, originalPrice: 490000, rating: 5, reviews: 54, badge: '', image: 'https://product.hstatic.net/200000099191/product/dsc08211_b51d16e424264ba5ba722b0314d3cd87_grande.jpg' },
        { name: 'Áo Victor Pro Series | Công Nghệ Dry-Fast', price: 420000, originalPrice: 550000, rating: 5, reviews: 61, badge: '', image: 'https://cdn.shopvnb.com/uploads/images/tin_tuc/mau-ao-cau-long-victor-hang-moi-ve-chinh-hang-nhe--5.webp' },
        { name: 'Áo Mizuno Performance | Vải Co Giãn 4 Chiều', price: 380000, originalPrice: 480000, rating: 5, reviews: 48, badge: '', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8cNT5haPLw7CGhyYKWQ3rUxXlSd5xlfPk8Q&s' },
        { name: 'Áo Lining Nationnal Team | Phiên Bản Đội Tuyển', price: 520000, originalPrice: 650000, rating: 5, reviews: 72, badge: '', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTc2W388hh4bDjGlhKD8K0c5fEpHEKmUnJ4A&s' },
        { name: 'Áo Yonex All England | Phiên Bản Giới Hạn', price: 580000, originalPrice: 720000, rating: 5, reviews: 85, badge: '', image: 'https://gw.alicdn.com/imgextra/i4/2248091262/O1CN01fwLbZC1LC2hcpRh3j_!!2248091262.jpg_540x540.jpg' },
        { name: 'Áo Victor Supreme | Siêu Thoáng Khí', price: 410000, originalPrice: 530000, rating: 5, reviews: 56, badge: '', image: 'https://shopvnb.com//uploads/gallery/ao-cau-long-victor-t-40043-den-chinh-hang_1731089336.webp' },
      ]
    },
    {
      title: 'Giày thể thao',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80',
      products: [
        { name: 'Giày Yonex Eclipsion Z3 | Công Nghệ Power Cushion Mới', price: 3890000, originalPrice: 4590000, rating: 5, reviews: 45, badge: 'HOT', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_gf-5MwmNF-6GHa1ZOHvbUs8hzgJ7e8bHww&s' },
        { name: 'Giày Li-Ning Hero TD | Chuyên Dụng Cầu Lông', price: 2590000, originalPrice: 3190000, rating: 5, reviews: 38, badge: '', image: 'https://cdn.shopvnb.com/uploads/images/tin_tuc/giay-cau-long-lining-hero-1.webp' },
        { name: 'Giày Mizuno Thunder Blade Z | Đế Chống Trượt Cao Cấp', price: 2890000, originalPrice: 3490000, rating: 5, reviews: 52, badge: '', image: 'https://cdn.shopvnb.com/uploads/gallery/giay-cau-long-mizuno-thunder-blade-z-xanh-than-chinh-hang-v1ga237011.webp' },
        { name: 'Giày Victor P9200 II | Siêu Nhẹ Và Êm Ái', price: 2190000, originalPrice: 2790000, rating: 5, reviews: 31, badge: '', image: 'https://shopvnb.com//uploads/san_pham/giay-cau-long-victor-p9200-ll-den-chinh-hang-2.webp' },
        { name: 'Giày Lining Ranger TD3 | Công Nghệ Cushion Pro', price: 1890000, originalPrice: 2390000, rating: 5, reviews: 28, badge: '', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1DZBFH4JZeQC-Mu69BQiOaO4mwG90hYE_xw&s' },
        { name: 'Giày Yonex 65Z3 Men | Wide Fit Thoải Mái', price: 3290000, originalPrice: 3890000, rating: 5, reviews: 42, badge: '', image: 'https://shopvnb.com//uploads/gallery/giay-cau-long-yonex-shb-65z3-wide-trang-cam-new-2023-2.webp' },
        { name: 'Giày Victor A960 ACE | Đế Kép Chống Sốc', price: 2490000, originalPrice: 2990000, rating: 5, reviews: 35, badge: '', image: 'https://shopvnb.com//uploads/san_pham/giay-cau-long-victor-a960-gc-chinh-hang-1.webp' },
      ]
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const handleAddToCart = (product) => {
    if (!isLoggedIn) {
      // Nếu chưa đăng nhập, mở modal đăng nhập
      if (onLoginClick) {
        onLoginClick();
      }
    } else {
      // Tạo id duy nhất cho sản phẩm nếu chưa có
      const productWithId = {
        ...product,
        id: product.id || `${product.name}-${product.price}`.replace(/\s+/g, '-').toLowerCase(),
      };
      
      // Thêm vào giỏ hàng
      addToCart(productWithId);
      
      // Hiển thị thông báo thành công
      setCartNotification({
        message: 'Thêm vào giỏ hàng thành công!',
      });
      setTimeout(() => {
        setCartNotification(null);
      }, 3000);
    }
  };

  return (
    <section className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Vợt cầu lông Section - Flashop Style */}
        <motion.div
          id="vot-cau-long"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-24 scroll-mt-24"
        >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-1 h-6 sm:h-8 bg-orange-600"></div>
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900">Vợt cầu lông</h2>
                </div>
              </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {/* Featured Product - Large Left Card (spans 2 rows) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="lg:row-span-2 group cursor-pointer"
            >
              <div className="relative rounded-xl sm:rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-lg transition-all duration-300 h-full border border-gray-100 group-hover:border-orange-300 flex flex-col">
                <div className="flex items-center justify-center bg-white py-6 sm:py-8 lg:py-10 flex-1">
                  <img
                    src={productCategories[0].products[0].image}
                    alt={productCategories[0].products[0].name}
                    className="w-full h-48 sm:h-64 lg:h-96 object-contain group-hover:scale-110 transition-transform duration-300 px-2 sm:px-4"
                    onError={(e) => e.target.src = 'https://shopvnb.com//uploads/gallery/vot-cau-long-lining-halbertec-motor-pro-chinh-hang_1759353102.webp'}
                  />
                </div>
                {productCategories[0].products[0].badge && (
                  <div className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-orange-600 text-white px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-bold z-10">
                    {productCategories[0].products[0].badge}
                  </div>
                )}
                
                <div className="p-3 sm:p-4 lg:p-5 bg-white border-t border-gray-100">
                  <p className="text-sm sm:text-base font-semibold text-slate-900 line-clamp-2 mb-2 sm:mb-3 min-h-10 sm:min-h-12 leading-5 sm:leading-6">
                    {productCategories[0].products[0].name}
                  </p>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-2 sm:mb-3">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className="sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                    <span className="text-xs sm:text-sm text-gray-600 ml-1">({productCategories[0].products[0].reviews})</span>
                  </div>
                  
                  {/* Price */}
                  <div className="flex items-center gap-2 mb-3 sm:mb-4">
                    <span className="text-lg sm:text-xl font-bold text-orange-600">
                      {productCategories[0].products[0].price.toLocaleString('vi-VN')}₫
                    </span>
                    {productCategories[0].products[0].originalPrice && (
                      <span className="text-xs sm:text-sm line-through text-gray-400">
                        {productCategories[0].products[0].originalPrice.toLocaleString('vi-VN')}₫
                      </span>
                    )}
                  </div>

                  {/* Add to Cart Button */}
                  <button 
                    onClick={() => handleAddToCart(productCategories[0].products[0])}
                    className="w-full bg-orange-600 text-white py-2 sm:py-3 rounded-lg font-bold hover:bg-orange-700 transition-colors duration-300 flex items-center justify-center gap-2 text-sm sm:text-base"
                  >
                    <ShoppingCart size={16} className="sm:w-5 sm:h-5" />
                    Thêm vào giỏ
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Product Grid - Right Side (6 products in 2 rows x 3 columns) */}
            <motion.div
              className="lg:col-span-3 grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {productCategories[0].products.slice(1, 7).map((product, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="group flex flex-col"
                >
                  <div className="relative bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 aspect-square mb-2 border border-gray-100 group-hover:border-orange-300">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => e.target.src = 'https://images.unsplash.com/photo-1599652614694-99b5e82a9f4e?w=300&h=300&fit=crop'}
                    />
                    {product.badge && (
                      <div className="absolute top-1 sm:top-2 right-1 sm:right-2 bg-orange-600 text-white px-1 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs font-bold">
                        {product.badge}
                      </div>
                    )}
                        <button 
                          onClick={() => handleAddToCart(product)}
                          className="absolute bottom-1 sm:bottom-2 right-1 sm:right-2 bg-orange-600 text-white p-1 sm:p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        >
                      <ShoppingCart size={12} className="sm:w-4 sm:h-4" />
                    </button>
                  </div>
                  
                  {/* Product Info */}
                  <p className="text-xs font-semibold text-slate-900 line-clamp-2 mb-1 sm:mb-2 h-6 sm:h-8 leading-3 sm:leading-4">{product.name}</p>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-1 sm:mb-2">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={10}
                          className="sm:w-3 sm:h-3 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-600 ml-1">({product.reviews})</span>
                  </div>
                  
                  {/* Price */}
                  <div className="flex flex-col gap-0.5 sm:gap-1">
                    <span className="text-xs sm:text-sm font-bold text-orange-600">{product.price.toLocaleString('vi-VN')}₫</span>
                    {product.originalPrice && (
                      <span className="text-xs line-through text-gray-400">{product.originalPrice.toLocaleString('vi-VN')}₫</span>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Other Categories - Alternating Layout */}
        {productCategories.slice(1).map((category, catIdx) => {
          // Determine if featured card should be on right (catIdx: 0=Túi xách, 2=Giày) or left (catIdx: 1=Áo)
          const isFeaturedRight = catIdx % 2 === 0;
          
          // Map category titles to IDs
          const categoryIds = {
            'Túi xách': 'tui-xach',
            'Áo thể thao': 'ao-the-thao',
            'Giày thể thao': 'giay-the-thao',
          };
          
          const categoryId = categoryIds[category.title] || `category-${catIdx}`;
          
          return (
            <motion.div
              key={catIdx}
              id={categoryId}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mb-24 scroll-mt-24"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-1 h-6 sm:h-8 bg-orange-600"></div>
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900">{category.title}</h2>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                {/* Left Side - Featured or Grid */}
                {!isFeaturedRight && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="lg:row-span-2 group cursor-pointer"
                  >
                    <div className="relative rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-lg transition-all duration-300 h-full border border-gray-100 group-hover:border-orange-300 flex flex-col">
                      <div className="flex items-center justify-center bg-white py-10 flex-1">
                        <img
                          src={category.products[0].image}
                          alt={category.products[0].name}
                          className="w-full h-96 object-contain group-hover:scale-110 transition-transform duration-300 px-4"
                          onError={(e) => e.target.src = 'https://images.unsplash.com/photo-1599652614694-99b5e82a9f4e?w=300&h=300&fit=crop'}
                        />
                      </div>
                      {category.products[0].badge && (
                        <div className="absolute top-3 right-3 bg-orange-600 text-white px-3 py-1 rounded-full text-xs font-bold z-10">
                          {category.products[0].badge}
                        </div>
                      )}
                      
                      <div className="p-5 bg-white border-t border-gray-100">
                        <p className="text-base font-semibold text-slate-900 line-clamp-2 mb-3 min-h-12 leading-6">
                          {category.products[0].name}
                        </p>
                        
                        <div className="flex items-center gap-1 mb-3">
                          <div className="flex gap-0.5">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={16}
                                className="fill-yellow-400 text-yellow-400"
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-600 ml-1">({category.products[0].reviews})</span>
                        </div>
                        
                        <div className="flex items-center gap-2 mb-4">
                          <span className="text-xl font-bold text-orange-600">
                            {category.products[0].price.toLocaleString('vi-VN')}₫
                          </span>
                          {category.products[0].originalPrice && (
                            <span className="text-sm line-through text-gray-400">
                              {category.products[0].originalPrice.toLocaleString('vi-VN')}₫
                            </span>
                          )}
                        </div>

                        <button 
                          onClick={() => handleAddToCart(category.products[0])}
                          className="w-full bg-orange-600 text-white py-3 rounded-lg font-bold hover:bg-orange-700 transition-colors duration-300 flex items-center justify-center gap-2"
                        >
                          <ShoppingCart size={18} />
                          Thêm vào giỏ
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Product Grid - 6 products */}
                <motion.div
                  className={`${isFeaturedRight ? 'lg:col-span-3' : 'lg:col-span-3'} grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4`}
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {category.products.slice(1, 7).map((product, idx) => (
                    <motion.div
                      key={idx}
                      variants={itemVariants}
                      className="group flex flex-col"
                    >
                      <div className="relative bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 aspect-square mb-2 border border-gray-100 group-hover:border-orange-300">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          onError={(e) => e.target.src = 'https://images.unsplash.com/photo-1599652614694-99b5e82a9f4e?w=300&h=300&fit=crop'}
                        />
                        {product.badge && (
                          <div className="absolute top-2 right-2 bg-orange-600 text-white px-2 py-1 rounded-full text-xs font-bold">
                            {product.badge}
                          </div>
                        )}
                        <button 
                          onClick={() => handleAddToCart(product)}
                          className="absolute bottom-2 right-2 bg-orange-600 text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        >
                          <ShoppingCart size={16} />
                        </button>
                      </div>
                      
                      <p className="text-xs font-semibold text-slate-900 line-clamp-2 mb-2 h-8 leading-4">{product.name}</p>
                      
                      <div className="flex items-center gap-1 mb-2">
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={12}
                              className="fill-yellow-400 text-yellow-400"
                            />
                          ))}
                        </div>
                        <span className="text-xs text-gray-600 ml-1">({product.reviews})</span>
                      </div>
                      
                      <div className="flex flex-col gap-1">
                        <span className="text-sm font-bold text-orange-600">{product.price.toLocaleString('vi-VN')}₫</span>
                        {product.originalPrice && (
                          <span className="text-xs line-through text-gray-400">{product.originalPrice.toLocaleString('vi-VN')}₫</span>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Right Side - Featured or Grid */}
                {isFeaturedRight && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="lg:row-span-2 group cursor-pointer"
                  >
                    <div className="relative rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-lg transition-all duration-300 h-full border border-gray-100 group-hover:border-orange-300 flex flex-col">
                      <div className="flex items-center justify-center bg-white py-10 flex-1">
                        <img
                          src={category.products[0].image}
                          alt={category.products[0].name}
                          className="w-full h-96 object-contain group-hover:scale-110 transition-transform duration-300 px-4"
                          onError={(e) => e.target.src = 'https://images.unsplash.com/photo-1599652614694-99b5e82a9f4e?w=300&h=300&fit=crop'}
                        />
                      </div>
                      {category.products[0].badge && (
                        <div className="absolute top-3 right-3 bg-orange-600 text-white px-3 py-1 rounded-full text-xs font-bold z-10">
                          {category.products[0].badge}
                        </div>
                      )}
                      
                      <div className="p-5 bg-white border-t border-gray-100">
                        <p className="text-base font-semibold text-slate-900 line-clamp-2 mb-3 min-h-12 leading-6">
                          {category.products[0].name}
                        </p>
                        
                        <div className="flex items-center gap-1 mb-3">
                          <div className="flex gap-0.5">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={16}
                                className="fill-yellow-400 text-yellow-400"
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-600 ml-1">({category.products[0].reviews})</span>
                        </div>
                        
                        <div className="flex items-center gap-2 mb-4">
                          <span className="text-xl font-bold text-orange-600">
                            {category.products[0].price.toLocaleString('vi-VN')}₫
                          </span>
                          {category.products[0].originalPrice && (
                            <span className="text-sm line-through text-gray-400">
                              {category.products[0].originalPrice.toLocaleString('vi-VN')}₫
                            </span>
                          )}
                        </div>

                        <button 
                          onClick={() => handleAddToCart(category.products[0])}
                          className="w-full bg-orange-600 text-white py-3 rounded-lg font-bold hover:bg-orange-700 transition-colors duration-300 flex items-center justify-center gap-2"
                        >
                          <ShoppingCart size={18} />
                          Thêm vào giỏ
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Cart Notification */}
      <AnimatePresence>
        {cartNotification && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-4 rounded-lg shadow-2xl flex items-center gap-3 min-w-[300px] max-w-md"
          >
            <CheckCircle size={24} className="flex-shrink-0" />
            <p className="font-semibold">{cartNotification.message}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}