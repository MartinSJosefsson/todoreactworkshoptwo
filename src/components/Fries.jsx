import React from 'react';
import { useContext } from 'react';
import { OrderContext } from '../contexts/OrderContext';

function Fries() {
  const { addToOrder } = useContext(OrderContext);

  const item = {
    id: 3,
    name: 'Fries',
    description: 'Crispy golden fries served hot and fresh.',
    price: 3.99,
  };

  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100">
        <img src="/images/Fries.jpg" className="card-img-top" alt={item.name} style={{ height: '200px', objectFit: 'cover' }} />
        <div className="card-body">
          <h5 className="card-title">{item.name}</h5>
          <p className="card-text">{item.description}</p>
          <p className="card-text fw-bold">${item.price.toFixed(2)}</p>
          <button className="btn btn-primary" onClick={() => addToOrder(item)}>
            Add to Order
          </button>
        </div>
      </div>
    </div>
  );
}

export default Fries;