import React, { Component } from 'react';
import Burger from './Burger';
import Pizza from './Pizza';
import Fries from './Fries';

class Menu extends Component {
  render() {
    const { addToOrder } = this.props;

    return (
      <div className="row">
        <Burger addToOrder={addToOrder} />
        <Pizza addToOrder={addToOrder} />
        <Fries addToOrder={addToOrder} />
      </div>
    );
  }
}

export default Menu;