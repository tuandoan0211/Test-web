import { useState } from 'react';
import { CartProvider } from './contexts/CartContext';
import { SearchProvider } from './contexts/SearchContext';
import { OrderProvider } from './contexts/OrderContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import Features from './components/Features';
import Testimonials from './components/Testimonials';
import StoreLocations from './components/StoreLocations';
import CTA from './components/CTA';
import Footer from './components/Footer';
import Login from './components/Login';
import Cart from './components/Cart';
import Payment from './components/Payment';
import './index.css';

function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsPaymentOpen(true);
  };

  const handlePaymentSuccess = (order) => {
    console.log('Payment successful:', order);
    // Có thể thêm thông báo thành công hoặc redirect ở đây
  };

  return (
    <SearchProvider>
      <OrderProvider>
        <CartProvider>
          <div className="w-full bg-white">
            <Navbar 
              onLoginClick={() => setIsLoginOpen(true)} 
              isLoggedIn={isLoggedIn}
              onCartClick={() => setIsCartOpen(true)}
            />
            <Login 
              isOpen={isLoginOpen} 
              onClose={() => setIsLoginOpen(false)} 
              onLoginSuccess={handleLoginSuccess}
            />
            <Cart 
              isOpen={isCartOpen}
              onClose={() => setIsCartOpen(false)}
              onCheckout={handleCheckout}
            />
            <Payment
              isOpen={isPaymentOpen}
              onClose={() => setIsPaymentOpen(false)}
              onPaymentSuccess={handlePaymentSuccess}
            />
            <Hero />
            <ProductGrid isLoggedIn={isLoggedIn} onLoginClick={() => setIsLoginOpen(true)} />
            <Features />
            <Testimonials />
            <StoreLocations />
            <CTA />
            <Footer />
          </div>
        </CartProvider>
      </OrderProvider>
    </SearchProvider>
  );
}

export default App;
