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
import { postComment, fetchComments, fetchDishes, fetchPromos, fetchLeader,postFeedBack } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';

import { TransitionGroup, CSSTransition } from 'react-transition-group'

const mapStateProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

const mapDispatchToProps = (dispatch) => ({
  postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
  postFeedBack: (values) => dispatch(postFeedBack(values)),
  fetchDishes: () => { dispatch(fetchDishes()) },
  resetFeedbackForm: () => { dispatch(actions.reset('feedback')) },
  fetchComments: () => { dispatch(fetchComments()) },
  fetchPromos: () => { dispatch(fetchPromos()) },
  fetchLeader: () => { dispatch(fetchLeader()) }
});

const Main = (props) => {

  useEffect(() => {
    props.fetchDishes();
    props.fetchLeader();
    props.fetchComments();
    props.fetchPromos();
    
  }, [])

  const HomePage = () => {
    return (
      <HomeComponent dish={props.dishes.dishes.filter((dish) => dish.featured)[0]}
        dishesLoading={props.dishes.isLoading}
        dishesErrMess={props.dishes.errMess}
        promotion={props.promotions.promotions.filter((promo) => promo.featured)[0]}
        promosLoading={props.promotions.isLoading}
        promosErrMess={props.promotions.errMess}
        leader={props.leaders.leaders.filter((leader) => leader.featured)[0]}
        leaderLoading = { props.leaders.isLoading }
        leaderErrMess={props.leaders.errMess}
      />

    )
  }

  const DishWithId = ({ match }) => {
    return (
      <DishDetail dish={props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0]}
        dishesLoading={props.dishes.isLoading}
        errMess={props.dishes.errMess}
        comments={props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId, 10))}
        commentsErrMess={props.comments.errMess}
        postComment={props.postComment}

      />
    );
  }

  return (


    <div>
      <HeaderComponent />
      <TransitionGroup>
        <CSSTransition key={props.location.key} classNames="page" timeout={300}>
          <Switch>
            <Route path="/home" component={HomePage} />
            <Route exact path="/contactus" component={() => <ContactComponent resetFeedbackForm={props.resetFeedbackForm} postFeedBack={props.postFeedBack} />} />
            <Route exact path="/menu" component={() => <MenuComponent dishes={props.dishes} />} />
            <Route path="/menu/:dishId" component={DishWithId} />
            <Route exact path="/aboutus" component={() => <AboutComponent leaders={props.leaders} />} />
            <Redirect to="/home" />
          </Switch>
        </CSSTransition>
      </TransitionGroup>
      <FooterComponent />
    </div >
  );
}

export default withRouter(connect(mapStateProps, mapDispatchToProps)(Main));


