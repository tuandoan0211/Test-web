import { createContext, useContext, useState, useEffect } from 'react';

const OrderContext = createContext();

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState([]);
  const [currentOrder, setCurrentOrder] = useState(null);

  // Load orders from localStorage on mount
  useEffect(() => {
    const savedOrders = localStorage.getItem('orders');
    if (savedOrders) {
      try {
        setOrders(JSON.parse(savedOrders));
      } catch (error) {
        console.error('Error loading orders from localStorage:', error);
      }
    }
  }, []);

  // Save orders to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  const createOrder = (cartItems, totalPrice) => {
    const order = {
      id: `ORDER-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      items: cartItems.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
      })),
      totalPrice,
      status: 'pending', // pending, paid, cancelled
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 15 * 60 * 1000).toISOString(), // 15 minutes
    };

    setOrders((prev) => [...prev, order]);
    setCurrentOrder(order);
    return order;
  };

  const updateOrderStatus = (orderId, status) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status } : order
      )
    );
    
    if (currentOrder?.id === orderId) {
      setCurrentOrder((prev) => (prev ? { ...prev, status } : null));
    }
  };

  const getOrderById = (orderId) => {
    return orders.find((order) => order.id === orderId);
  };

  const clearCurrentOrder = () => {
    setCurrentOrder(null);
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        currentOrder,
        createOrder,
        updateOrderStatus,
        getOrderById,
        clearCurrentOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder() {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
}

