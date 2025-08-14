import React, { useContext } from 'react';
import { OrderContext } from '../contexts/OrderContext';

function Order({ order, updateQuantity, calculateTotal }) {
  const { addToOrder } = useContext(OrderContext); // Not used here but kept for consistency

  return (
    <div className="col-12 mb-4">
      <div className="card w-100">
        <div className="card-body">
          <h2 className="mt-3">Your Order</h2>
          {order.length === 0 ? (
            <p>Place your order.</p>
          ) : (
            <>
              <ul className="list-group mb-3">
                {order.map((item) => (
                  <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                      <h5>{item.name}</h5>
                      <p className="mb-0">${item.price.toFixed(2)} x {item.quantity}</p>
                    </div>
                    <div className="d-flex align-items-center">
                      <button className="btn btn-sm btn-outline-secondary me-2" onClick={() => updateQuantity(item.id, -1)}>
                        -
                      </button>
                      <span className="me-2">{item.quantity}</span>
                      <button className="btn btn-sm btn-outline-secondary" onClick={() => updateQuantity(item.id, 1)}>
                        +
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="d-flex justify-content-end">
                <h4>Total: ${calculateTotal()}</h4>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Order;