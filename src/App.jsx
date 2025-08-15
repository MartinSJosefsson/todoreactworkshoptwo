import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css'; 
import Burger from './components/Burger';
import Pizza from './components/Pizza';
import Fries from './components/Fries';
import Order from './components/Order';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: 'light',
      order: [],
    };
  }

  componentDidMount() {
    document.documentElement.setAttribute('data-bs-theme', this.state.theme); // Set initial Bootstrap theme
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.theme !== this.state.theme) {
      document.documentElement.setAttribute('data-bs-theme', this.state.theme); // Update Bootstrap theme
    }
  }

  toggleTheme = () => {
    this.setState((prevState) => ({
      theme: prevState.theme === 'light' ? 'dark' : 'light',
    }));
  };

  addToOrder = (item) => {
    this.setState((prevState) => {
      const existingItem = prevState.order.find((orderItem) => orderItem.id === item.id);
      if (existingItem) {
        return {
          order: prevState.order.map((orderItem) =>
            orderItem.id === item.id ? { ...orderItem, quantity: orderItem.quantity + 1 } : orderItem
          ),
        };
      }
      return {
        order: [...prevState.order, { ...item, quantity: 1 }],
      };
    });
  };

  updateQuantity = (id, delta) => {
    this.setState((prevState) => ({
      order: prevState.order
        .map((item) => (item.id === id ? { ...item, quantity: item.quantity + delta } : item))
        .filter((item) => item.quantity > 0),
    }));
  };

  calculateTotal = () => {
    return this.state.order.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  render() {
    return (
      <div className={`container ${this.state.theme}`}>
        <div className="d-flex justify-content-center align-items-center mb-4 position-relative">
          <h1>Fast Food Menu</h1>
          <button className="btn btn-outline-secondary position-absolute end-0" onClick={this.toggleTheme}>
            <i className={`bi bi-${this.state.theme === 'light' ? 'moon' : 'sun'}-fill me-2`}></i>
            {this.state.theme === 'light' ? 'Dark' : 'Light'} Mode
          </button>
        </div>

        <div className="row">
          <Burger addToOrder={this.addToOrder} />
          <Pizza addToOrder={this.addToOrder} />
          <Fries addToOrder={this.addToOrder} />
        </div>

        <Order
          order={this.state.order}
          updateQuantity={this.updateQuantity}
          calculateTotal={this.calculateTotal}
        />
      </div>
    );
  }
}

export default App;