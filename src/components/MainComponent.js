import React, { useState } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import MenuComponent from './menuComponent';
import { DISHES } from '../shared/dishes';
import DishDetail from './DishdetailComponent';

const Main = () => {

  const [SelectedDish, setSelectedDish] = useState(null);

  const state = {
    dishes: DISHES
  };

  const DisheSelected = (dishID) => {
    console.log("llego", dishID);
    setSelectedDish(dishID);
    console.log("actulizado", SelectedDish);
  }

  return (
    <div>
      <Navbar dark color="primary">
        <div className="container">
          <NavbarBrand href="/"> Ristorante con Fusion</NavbarBrand>
        </div>
      </Navbar>
      <MenuComponent dishes={state.dishes} onClick={(dishID) => DisheSelected(dishID)} />
      <DishDetail dish={state.dishes.filter((dish) => dish.id === SelectedDish)[0]} />
    </div>
  );
}

export default Main;


