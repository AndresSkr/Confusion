import React, { useState } from 'react';
import MenuComponent from './menuComponent';
import { DISHES } from '../shared/dishes';
import DishDetail from './DishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
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
      <Header/>
      <MenuComponent dishes={state.dishes} onClick={(dishID) => DisheSelected(dishID)} />
      <DishDetail dish={state.dishes.filter((dish) => dish.id === SelectedDish)[0]} />
      <Footer/>
    </div>
  );
}

export default Main;


