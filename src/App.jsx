import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css'; // Ensure this is imported
import Burger from './components/Burger';
import Pizza from './components/Pizza';
import Fries from './components/Fries';
import Order from './components/Order';
import { OrderContext } from './contexts/OrderContext';

function App() {
  const [theme, setTheme] = useState('light');
  const [order, setOrder] = useState([]);

  useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', theme); // Only update Bootstrap theme
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const addToOrder = (item) => {
    setOrder((prevOrder) => {
      const existingItem = prevOrder.find((orderItem) => orderItem.id === item.id);
      if (existingItem) {
        return prevOrder.map((orderItem) =>
          orderItem.id === item.id ? { ...orderItem, quantity: orderItem.quantity + 1 } : orderItem
        );
      }
      return [...prevOrder, { ...item, quantity: 1 }];
    });
  };

  const updateQuantity = (id, delta) => {
    setOrder((prevOrder) =>
      prevOrder
        .map((item) => (item.id === id ? { ...item, quantity: item.quantity + delta } : item))
        .filter((item) => item.quantity > 0)
    );
  };

  const calculateTotal = () => {
    return order.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <OrderContext.Provider value={{ addToOrder }}>
      <div className={`container ${theme}`}>
        <div className="d-flex justify-content-center align-items-center mb-4 position-relative">
          <h1>Ristorante Italiana del Monde</h1>
          <button className="btn btn-outline-secondary position-absolute end-0" onClick={toggleTheme}>
            <i className={`bi bi-${theme === 'light' ? 'moon' : 'sun'}-fill me-2`}></i>
            {theme === 'light' ? 'Dark' : 'Light'} Mode
          </button>
        </div>

        <div className="row">
          <Burger />
          <Pizza />
          <Fries />
        </div>

        <Order order={order} updateQuantity={updateQuantity} calculateTotal={calculateTotal} />
      </div>
    </OrderContext.Provider>
  );
}

export default App;