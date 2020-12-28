import React, { useEffect } from 'react';
import MenuComponent from './MenuComponent';
import HeaderComponent from './HeaderComponent';
import FooterComponent from './FooterComponent';
import HomeComponent from './HomeComponent'
import ContactComponent from './ContactComponet';
import DishDetail from './DishdetailComponent';
import AboutComponent from './AboutComponent';

import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addComment, fetchDishes } from '../redux/ActionCreators';



const mapStateProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

const mapDispatchToProps = (dispatch) => ({
  addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment)),
  fetchDishes: () => { dispatch(fetchDishes()) }
});

const Main = (props) => {

  const componentDidMount = () => {
    props.fetchDishes();
  }

  useEffect(() => props.fetchDishes(), [])



  const HomePage = () => {
    return (
      <HomeComponent dish={props.dishes.dishes.filter((dish) => dish.featured)[0]}
        dishesLoading={props.dishes.isLoading}
        dishesErrMess={props.dishes.errMess}
        promotion={props.promotions.filter((promo) => promo.featured)[0]}
        leader={props.leaders.filter((leader) => leader.featured)[0]}
      />

    )
  }

  const DishWithId = ({ match }) => {
    return (
      <DishDetail dish={props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0]}
        dishesLoading={props.dishes.isLoading}
        errMess={props.dishes.errMess}
        comments={props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId, 10))}
        addComment={props.addComment}
        
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

        <Route exact path="/menu" component={() => <MenuComponent dishes={props.dishes} />} />
        <Route path="/menu/:dishId" component={DishWithId} />
        <Route path="/aboutus" component={() => <AboutComponent leaders={props.leaders} />} />
        <Redirect to="/home" />
      </Switch>
      <FooterComponent />
    </div >
  );
}

export default withRouter(connect(mapStateProps, mapDispatchToProps)(Main));


