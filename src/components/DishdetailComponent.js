import React from 'react';
import { Card, CardBody, CardImg, CardText, CardTitle } from 'reactstrap';

const DishDetail = (props) => {

    const renderComments = () => {
        if (props.dish == null) {
            return <div></div>
        } else {
            const comments = props.dish.comments.map((comment) => {
                return (
                    <li key={comment.id}>
                        <p>{comment.comment}</p>
                        <p>-- {comment.author} , {new Intl.DateTimeFormat('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: '2-digit'
                        }).format(new Date(comment.date))}
                        </p>
                    </li>
                )
            })

            return (
                <div className="col-12 col-md-5 m-1">
                    <h4>Comments</h4>
                    <ul className="list-unstyled">
                        {comments}
                    </ul>
                </div>
            )
        }
    }

    const renderDish = () => {
        if (props.dish != null) {
            return (
                <div key={props.dish.id} className="col-12 col-md-5 m-1">
                    <Card>
                        <CardImg top src={props.dish.image} alt={props.dish.name} />
                        <CardBody>
                            <CardTitle>{props.dish.name}</CardTitle>
                            <CardText>{props.dish.description}</CardText>
                        </CardBody>
                    </Card>
                </div>
            );
        } else {
            return (
                <div></div>
            )
        }
    }

    return (
        <div className="container">
            <div className="row">
                {renderDish()}
                {renderComments()}
            </div>
        </div>

    )
}

export default DishDetail; 