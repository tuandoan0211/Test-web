import { Heart, Facebook, Instagram, Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Về chúng tôi', href: '#' },
    { name: 'Chính sách bảo hành', href: '#' },
    { name: 'Hướng dẫn chọn vợt', href: '#' },
    { name: 'Thông tin giao hàng', href: '#' },
  ];

  const categories = [
    { name: 'Vợt cầu lông', href: '#vot-cau-long', id: 'vot-cau-long' },
    { name: 'Túi xách', href: '#tui-xach', id: 'tui-xach' },
    { name: 'Áo thể thao', href: '#ao-the-thao', id: 'ao-the-thao' },
    { name: 'Giày thể thao', href: '#giay-the-thao', id: 'giay-the-thao' },
  ];

  const handleCategoryClick = (e, categoryId) => {
    e.preventDefault();
    const element = document.getElementById(categoryId);
    if (element) {
      const offset = 100; // Offset for fixed navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const socialLinks = [
    { icon: Facebook, href: '', label: 'Facebook' },
    { icon: Instagram, href: '', label: 'Instagram' },
    { icon: Phone, href: '', label: 'Hotline' },
  ];

  return (
    <footer className="bg-slate-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-8 sm:py-12 lg:py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Left - Logo & Slogan */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center mb-3 sm:mb-4">
              <img 
                src="/logo.png" 
                alt="SmashPro Logo" 
                className="h-12 sm:h-16 lg:h-18 w-auto brightness-0 invert"
              />
            </div>
            <p className="text-gray-400 leading-relaxed text-xs sm:text-sm mb-4 sm:mb-6">
              Cung cấp vợt cầu lông chính hãng, chất lượng cao với giá tốt nhất. Hỗ trợ khách hàng 24/7.
            </p>
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center gap-2 sm:gap-3 text-gray-400">
                <MapPin size={16} className="sm:w-5 sm:h-5 text-orange-600 flex-shrink-0" />
                <span className="text-xs sm:text-sm">Hà Nội, Việt Nam</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 text-gray-400">
                <Phone size={16} className="sm:w-5 sm:h-5 text-orange-600 flex-shrink-0" />
                <span className="text-xs sm:text-sm">+84 3322029410</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 text-gray-400">
                <Mail size={16} className="sm:w-5 sm:h-5 text-orange-600 flex-shrink-0" />
                <span className="text-xs sm:text-sm">xuanduy2006@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Middle Left - Categories */}
          <div>
            <h4 className="text-base sm:text-lg font-bold text-white mb-4 sm:mb-6">Danh mục</h4>
            <ul className="space-y-2 sm:space-y-3">
              {categories.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => handleCategoryClick(e, link.id)}
                    className="text-gray-400 hover:text-orange-600 transition-colors duration-300 text-xs sm:text-sm cursor-pointer"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Middle Right - Quick Links */}
          <div>
            <h4 className="text-base sm:text-lg font-bold text-white mb-4 sm:mb-6">Chính sách</h4>
            <ul className="space-y-2 sm:space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-orange-600 transition-colors duration-300 text-xs sm:text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Right - Social Media */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h4 className="text-base sm:text-lg font-bold text-white mb-4 sm:mb-6">Kết nối với chúng tôi</h4>
            <div className="flex gap-3 sm:gap-4 mb-6 sm:mb-8">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-orange-600 transition-colors duration-300 group"
                  >
                    <Icon size={16} className="sm:w-5 sm:h-5 text-gray-300 group-hover:text-white transition-colors" />
                  </a>
                );
              })}
            </div>
            <p className="text-gray-400 text-xs sm:text-sm">Theo dõi chúng tôi trên mạng xã hội để cập nhật các ưu đãi mới nhất!</p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-6 sm:my-8"></div>

        {/* Bottom Footer */}
        <div className="py-6 sm:py-8 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          <p className="text-gray-500 text-xs sm:text-sm text-center sm:text-left">
            © {currentYear} Pham Xuan Duy. Bảo lưu mọi quyền.
          </p>

          <div className="flex items-center gap-2 text-gray-500 text-xs sm:text-sm">
            <span>Làm với</span>
            <Heart size={12} className="sm:w-4 sm:h-4 text-orange-600 fill-orange-600 animate-pulse" />
            <span>cho những người yêu cầu lông</span>
          </div>
        </div>
      </div>
    </footer>
  );
}