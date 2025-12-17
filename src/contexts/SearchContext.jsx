import { createContext, useContext, useState, useMemo } from 'react';

const SearchContext = createContext();

// Tất cả sản phẩm từ ProductGrid
const allProducts = [
  // Vợt cầu lông
  { name: 'Vợt Cầu Lông Lining Halbertec Motor | Phiên Bản Độc Biệt', price: 1150000, originalPrice: null, rating: 5, reviews: 1, badge: 'FBSHOP', image: 'https://cdn.shopvnb.com/uploads/images/bai_viet/vot-cau-long-lining-halbertec-motor-2-1727895449.jpg', category: 'Vợt cầu lông' },
  { name: 'Vợt Cầu Lông Kumpoo K520 Pro 2024 | Phiên bản mới nâng cấp', price: 500000, originalPrice: null, rating: 5, reviews: 4, badge: '', image: 'https://shopvnb.com//uploads/san_pham/vot-cau-long-kumpoo-power-control-k520-pro-den-chinh-hang-1.webp', category: 'Vợt cầu lông' },
  { name: 'Vợt Cầu Lông Lining Halbertec 9000 | Phiên Bản Nâng Cấp', price: 4050000, originalPrice: 5200000, rating: 5, reviews: 0, badge: '', image: 'https://shopvnb.com//uploads/gallery/vot-cau-long-lining-halbertec-9000-chinh-hang_1713475947.webp', category: 'Vợt cầu lông' },
  { name: 'Vợt Cầu Lông Yonex Astrox 77 Pro | Bản Nâng Cấp Mới Nhất', price: 4139000, originalPrice: null, rating: 5, reviews: 3, badge: '', image: 'https://shopvnb.com//uploads/san_pham/vot-cau-long-yonex-astrox-77-pro-chinh-hang-1.webp', category: 'Vợt cầu lông' },
  { name: 'Vợt Cầu Lông Yonex Astrox 100ZZ Kurenai | Bảo Kiếm Của Viktor...', price: 4350000, originalPrice: 5169000, rating: 5, reviews: 7, badge: '', image: 'https://shopvnb.com//uploads/san_pham/vot-cau-long-yonex-astrox-100zz-kurenai-do-new-2021-5.webp', category: 'Vợt cầu lông' },
  { name: 'Vợt Cầu Lông Victor TK-RYUGA METALLIC | Diễn Mạo Hoàn Toàn...', price: 3280000, originalPrice: 3790000, rating: 5, reviews: 3, badge: '', image: 'https://shopvnb.com//uploads/gallery/vot-cau-long-victor-tk-ryuga-metallic-chinh-hang_1702259879.webp', category: 'Vợt cầu lông' },
  // Túi xách
  { name: 'Túi Yonex Pro Racquet 12 | Chứa 12 Cây Vợt - Cao Cấp', price: 1890000, originalPrice: 2390000, rating: 5, reviews: 58, badge: 'PREMIUM', image: 'https://cdn.shopvnb.com/uploads/images/tin_tuc/tui-cau-long-yonex-bag9826lx-xanh-duong-gia-cong-1.webp', category: 'Túi xách' },
  { name: 'Túi Li-Ning Tournament 9 | Ngăn Giày Riêng Biệt', price: 1590000, originalPrice: 1990000, rating: 5, reviews: 47, badge: '', image: 'https://cdn.shopvnb.com/uploads/gallery/tui-cau-long-lining-abjt059-2-chinh-hang-2_1696794567.webp', category: 'Túi xách' },
  { name: 'Túi Victor Supreme 6 | Chống Nước Cao Cấp', price: 1390000, originalPrice: 1790000, rating: 5, reviews: 52, badge: '', image: 'https://cdn.shopvnb.com/img/300x300/uploads/gallery/tui-cau-long-victor-br9215-hb-chinh-hang_1744069724.webp', category: 'Túi xách' },
  { name: 'Túi Mizuno Tour 3 | Thiết Kế Thể Thao', price: 990000, originalPrice: 1290000, rating: 5, reviews: 38, badge: '', image: 'https://shopvnb.com//uploads/san_pham/tui-cau-long-mizuno-3comp-bag-xanh-duong-chinh-hang-1.webp', category: 'Túi xách' },
  { name: 'Túi Lining Mega Power 6 | Siêu Rộng Rãi', price: 1290000, originalPrice: 1590000, rating: 5, reviews: 44, badge: '', image: 'https://cdn.shopvnb.com/img/300x300/uploads/gallery/tui-cau-long-lining-abju013-1-chinh-hang_1710529668.webp', category: 'Túi xách' },
  { name: 'Túi Yonex Club Series | Phù Hợp Đi Tập', price: 890000, originalPrice: 1190000, rating: 5, reviews: 41, badge: '', image: 'https://votcaulongshop.vn/wp-content/uploads/2024/04/z5119597240726-7333d26112f8d82222d3f318cf50e990.jpg', category: 'Túi xách' },
  { name: 'Túi Victor Pro 9 Pack | Nhiều Ngăn Tiện Lợi', price: 1690000, originalPrice: 2090000, rating: 5, reviews: 63, badge: '', image: 'https://shopvnb.com//uploads/gallery/tui-cau-long-victor-br5621d-do-chinh-hang_1725064335.webp', category: 'Túi xách' },
  // Áo thể thao
  { name: 'Áo Yonex Tournament 2024 | Vải Cooling Touch Mát Lạnh', price: 450000, originalPrice: 590000, rating: 5, reviews: 67, badge: 'BEST SELLER', image: 'https://gw.alicdn.com/imgextra/O1CN01A34mbD1miYUz1Uh5w_!!6000000004988-0-yinhe.jpg_540x540.jpg', category: 'Áo thể thao' },
  { name: 'Áo Li-Ning Championship | Thiết Kế Trẻ Trung', price: 390000, originalPrice: 490000, rating: 5, reviews: 54, badge: '', image: 'https://product.hstatic.net/200000099191/product/dsc08211_b51d16e424264ba5ba722b0314d3cd87_grande.jpg', category: 'Áo thể thao' },
  { name: 'Áo Victor Pro Series | Công Nghệ Dry-Fast', price: 420000, originalPrice: 550000, rating: 5, reviews: 61, badge: '', image: 'https://cdn.shopvnb.com/uploads/images/tin_tuc/mau-ao-cau-long-victor-hang-moi-ve-chinh-hang-nhe--5.webp', category: 'Áo thể thao' },
  { name: 'Áo Mizuno Performance | Vải Co Giãn 4 Chiều', price: 380000, originalPrice: 480000, rating: 5, reviews: 48, badge: '', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8cNT5haPLw7CGhyYKWQ3rUxXlSd5xlfPk8Q&s', category: 'Áo thể thao' },
  { name: 'Áo Lining Nationnal Team | Phiên Bản Đội Tuyển', price: 520000, originalPrice: 650000, rating: 5, reviews: 72, badge: '', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTc2W388hh4bDjGlhKD8K0c5fEpHEKmUnJ4A&s', category: 'Áo thể thao' },
  { name: 'Áo Yonex All England | Phiên Bản Giới Hạn', price: 580000, originalPrice: 720000, rating: 5, reviews: 85, badge: '', image: 'https://gw.alicdn.com/imgextra/i4/2248091262/O1CN01fwLbZC1LC2hcpRh3j_!!2248091262.jpg_540x540.jpg', category: 'Áo thể thao' },
  { name: 'Áo Victor Supreme | Siêu Thoáng Khí', price: 410000, originalPrice: 530000, rating: 5, reviews: 56, badge: '', image: 'https://shopvnb.com//uploads/gallery/ao-cau-long-victor-t-40043-den-chinh-hang_1731089336.webp', category: 'Áo thể thao' },
  // Giày thể thao
  { name: 'Giày Yonex Eclipsion Z3 | Công Nghệ Power Cushion Mới', price: 3890000, originalPrice: 4590000, rating: 5, reviews: 45, badge: 'HOT', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_gf-5MwmNF-6GHa1ZOHvbUs8hzgJ7e8bHww&s', category: 'Giày thể thao' },
  { name: 'Giày Li-Ning Hero TD | Chuyên Dụng Cầu Lông', price: 2590000, originalPrice: 3190000, rating: 5, reviews: 38, badge: '', image: 'https://cdn.shopvnb.com/uploads/images/tin_tuc/giay-cau-long-lining-hero-1.webp', category: 'Giày thể thao' },
  { name: 'Giày Mizuno Thunder Blade Z | Đế Chống Trượt Cao Cấp', price: 2890000, originalPrice: 3490000, rating: 5, reviews: 52, badge: '', image: 'https://cdn.shopvnb.com/uploads/gallery/giay-cau-long-mizuno-thunder-blade-z-xanh-than-chinh-hang-v1ga237011.webp', category: 'Giày thể thao' },
  { name: 'Giày Victor P9200 II | Siêu Nhẹ Và Êm Ái', price: 2190000, originalPrice: 2790000, rating: 5, reviews: 31, badge: '', image: 'https://shopvnb.com//uploads/san_pham/giay-cau-long-victor-p9200-ll-den-chinh-hang-2.webp', category: 'Giày thể thao' },
  { name: 'Giày Lining Ranger TD3 | Công Nghệ Cushion Pro', price: 1890000, originalPrice: 2390000, rating: 5, reviews: 28, badge: '', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1DZBFH4JZeQC-Mu69BQiOaO4mwG90hYE_xw&s', category: 'Giày thể thao' },
  { name: 'Giày Yonex 65Z3 Men | Wide Fit Thoải Mái', price: 3290000, originalPrice: 3890000, rating: 5, reviews: 42, badge: '', image: 'https://shopvnb.com//uploads/gallery/giay-cau-long-yonex-shb-65z3-wide-trang-cam-new-2023-2.webp', category: 'Giày thể thao' },
  { name: 'Giày Victor A960 ACE | Đế Kép Chống Sốc', price: 2490000, originalPrice: 2990000, rating: 5, reviews: 35, badge: '', image: 'https://shopvnb.com//uploads/san_pham/giay-cau-long-victor-a960-gc-chinh-hang-1.webp', category: 'Giày thể thao' },
];

export function SearchProvider({ children }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) {
      return [];
    }

    const query = searchQuery.toLowerCase().trim();
    return allProducts.filter(product => {
      const nameMatch = product.name.toLowerCase().includes(query);
      const categoryMatch = product.category.toLowerCase().includes(query);
      return nameMatch || categoryMatch;
    });
  }, [searchQuery]);

  const openSearch = () => setIsSearchOpen(true);
  const closeSearch = () => {
    setIsSearchOpen(false);
    setSearchQuery('');
  };

  return (
    <SearchContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        searchResults,
        isSearchOpen,
        openSearch,
        closeSearch,
        allProducts,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
}

