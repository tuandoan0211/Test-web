# 🏸 SmashPro - Badminton Store Landing Page

A modern, fully responsive landing page for an online badminton racket store built with React, Tailwind CSS, and Framer Motion.

## ✨ Features

- **📱 Fully Responsive Design** - Mobile-first approach, works perfectly on all devices
- **🎨 Modern UI/UX** - Clean, sporty design with gradient accents
- **✨ Smooth Animations** - Beautiful entrance effects and hover animations using Framer Motion
- **🎯 High Performance** - Built with Vite for fast development and production builds
- **📦 Reusable Components** - Modular component architecture
- **🛍️ E-commerce Ready** - Product grid with hover details and CTA sections
- **♿ Accessible** - Semantic HTML and ARIA labels

## 🚀 Quick Start

### Prerequisites
- Node.js 16.0 or higher
- npm or yarn

### Installation

1. **Navigate to the project directory**
```bash
cd badminton-store
```

2. **Install frontend dependencies**
```bash
npm install
```

3. **Install backend dependencies**
```bash
cd server
npm install
cd ..
```

### Running the Application

**Bạn cần chạy cả frontend và backend:**

#### Terminal 1 - Backend Server:
```bash
cd server
node index.js
```
Server sẽ chạy tại: `http://localhost:3001`

#### Terminal 2 - Frontend:
```bash
npm run dev
```
Frontend sẽ chạy tại: `http://localhost:5173`

4. **Open in browser**
```
http://localhost:5173
```

> **Lưu ý:** Nếu bạn gặp lỗi "Failed to fetch", hãy chắc chắn bạn đã chạy `node index.js` ở thư mục `server` trước khi chạy frontend.

## 📚 Project Structure

```
badminton-store/
├── server/
│   ├── index.js                 # Backend server (Express)
│   └── package.json             # Server dependencies
├── src/
│   ├── components/
│   │   ├── Navbar.jsx           # Sticky navigation with mobile menu
│   │   ├── Hero.jsx             # Hero section with CTA
│   │   ├── ProductGrid.jsx      # Product cards with hover effects
│   │   ├── Features.jsx         # Why choose us section
│   │   ├── Testimonials.jsx     # Customer reviews
│   │   ├── StoreLocations.jsx   # Store locations section
│   │   ├── CTA.jsx              # Call-to-action section
│   │   └── Footer.jsx           # Footer with links
│   ├── App.jsx                  # Main app component
│   ├── index.css                # Tailwind directives
│   └── main.jsx                 # Entry point
├── tailwind.config.js           # Tailwind configuration
├── postcss.config.js            # PostCSS configuration
└── package.json                 # Frontend dependencies
```

## 🎨 Sections Overview

### 1. **Navigation Bar**
- Sticky header with shrink effect on scroll
- Brand logo and navigation links
- Responsive hamburger menu for mobile
- Shopping cart button

### 2. **Hero Section**
- Bold headline: "Power Your Game — Unleash Every Smash"
- Compelling subheadline
- Dual CTA buttons (Shop Now, View Reviews)
- Trust statistics (500+ Products, 4.9/5 Rating, 24h Shipping)

### 3. **Product Grid**
- Responsive 4-column layout (mobile: 1 column, tablet: 2 columns)
- Product cards with:
  - Image/emoji placeholder
  - Product name and rating
  - Original and sale price with discount percentage
  - Hover effects showing product specs
  - Add to Cart button

### 4. **Features Section**
- 4 feature cards highlighting unique selling points:
  - Premium Carbon Frames
  - Boost Your Smash Speed
  - Trusted by Professionals
  - Best Price Guarantee

### 5. **Testimonials**
- 3 customer testimonials in responsive grid
- Star ratings and quotes
- Customer avatars and roles
- Quote icons and styling

### 6. **Call-to-Action**
- Full-width dark section
- Animated background elements
- Bold headline with highlight
- Primary and secondary buttons
- Trust badges (money-back guarantee, free shipping, warranty)

### 7. **Footer**
- Logo and company slogan
- Quick links section
- Social media icons
- Copyright and made with love message

## 🎨 Color Scheme

- **Primary**: `#DC2626` (Red) - Main accent color
- **Secondary**: `#1E293B` (Dark Slate) - Text and headers
- **Accent**: `#0EA5E9` (Sky Blue) - Hover states
- **Background**: White with subtle gradients

## 🛠️ Technologies Used

- **React 18** - UI library
- **Tailwind CSS 4** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Lucide React** - Icon library
- **Vite** - Build tool and dev server

## 📝 Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 🔧 Customization

### Colors
Edit `tailwind.config.js` to change the color scheme:
```javascript
colors: {
  primary: '#DC2626',      // Change red to your preference
  secondary: '#1E293B',    // Change dark color
  accent: '#0EA5E9',       // Change accent color
}
```

### Products
Edit `src/components/ProductGrid.jsx` to update product data:
```javascript
const products = [
  {
    name: 'Your Product Name',
    price: 99.99,
    // ... other fields
  },
]
```

### Text Content
Search for text in each component and update as needed for your brand.

## 📱 Responsive Breakpoints

- **Mobile**: < 640px (sm)
- **Tablet**: 640px - 1024px (md)
- **Desktop**: > 1024px (lg)

All sections are optimized for these breakpoints.

## 🚀 Performance

- Lazy loaded components using `whileInView` in Framer Motion
- Optimized animations with GPU acceleration
- Minimal bundle size with Vite
- CSS optimized through Tailwind's purging

## 🎯 Future Enhancements

- [ ] Shopping cart functionality
- [ ] Product filtering and search
- [ ] Newsletter subscription
- [ ] Product detail page
- [ ] Image gallery
- [ ] Customer reviews section
- [ ] Comparison tool
- [ ] Live chat support

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Feel free to fork and submit pull requests.

## 📧 Support

For questions or support, please reach out to support@smashpro.com

---

**Made with ❤️ for badminton players worldwide** 🏸

