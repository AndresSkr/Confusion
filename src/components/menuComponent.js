import React, { useState } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap'
import DishDetail from './DishdetailComponent';

const MenuComponent = (props) => {

    const [SelectedDish, setSelectedDish] = useState(null);

    const onDishSelect = (dish) => {
        setSelectedDish(dish);
    }
    const menu = props.dishes.map((dish) => {
        return (
            <div key={dish.id} className="col-12 col-md-5 m-1">
                <Card onClick={() => onDishSelect(dish)}>
                    <CardImg width="100%" src={dish.image} alt={dish.name} />
                    <CardImgOverlay>
                        <CardTitle>{dish.name}</CardTitle>
                    </CardImgOverlay>
                </Card>
            </div>
        );
    });

    return (
        <div className="container">
            <div className="row">
                {menu}
            </div>
            <DishDetail dish={SelectedDish} />
        </div>
    );
}

export default MenuComponent;