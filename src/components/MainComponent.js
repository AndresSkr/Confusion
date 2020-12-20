import React, { useState } from 'react';

import MenuComponent from './MenuComponent';
import HeaderComponent from './HeaderComponent';
import FooterComponent from './FooterComponent';
import HomeComponent from './HomeComponent'
import ContactComponent from './ContactComponet';
import DishDetail from './DishdetailComponent';
import AboutComponent from './AboutComponent';

import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';
import { LEADERS } from '../shared/leaders';
import { PROMOTIONS } from '../shared/promotions';


import { Switch, Route, Redirect } from 'react-router-dom';
const Main = () => {

  const [SelectedDish, setSelectedDish] = useState(null);

  const state = {
    dishes: DISHES,
    comments: COMMENTS,
    promotions: PROMOTIONS,
    leaders: LEADERS
  };

  const DisheSelected = (dishID) => {
    console.log("llego", dishID);
    setSelectedDish(dishID);
    console.log("actulizado", SelectedDish);
  }
  const HomePage = () => {
    return (
      <HomeComponent dish={state.dishes.filter((dish) => dish.featured)[0]}
        promotion={state.promotions.filter((promo) => promo.featured)[0]}
        leader={state.leaders.filter((leader) => leader.featured)[0]}
      />

    )
  }

  const DishWithId = ({ match }) => {
    return (
      <DishDetail dish={state.dishes.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0]}
        comments={state.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId, 10))}
      />
    );
  }

  return (


    <div>
      <HeaderComponent />
      {/*  <MenuComponent dishes={state.dishes} onClick={(dishID) => DisheSelected(dishID)} /> */}
      {/* <DishDetail dish={state.dishes.filter((dish) => dish.id === SelectedDish)[0]} /> */}
      <Switch>
        <Route path="/home" component={HomePage} />
        <Route path="/contactus" component={ContactComponent} />

        <Route exact path="/menu" component={() => <MenuComponent dishes={state.dishes} />} />
        <Route path="/menu/:dishId" component={DishWithId} />
        <Route path="/aboutus" component={() => <AboutComponent leaders={state.leaders} />} />
        <Redirect to="/home" />
      </Switch>
      <FooterComponent />
    </div >
  );
}

export default Main;


