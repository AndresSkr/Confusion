import React, { useState } from 'react';
import {
    Card, CardBody, CardImg, CardText, CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody,
    Col, Row, Label
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponet';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

function CommentForm(props) {

    const [isModalOpen, setisModalOpen] = useState(false)

    const toggleModal = () => {
        setisModalOpen(!isModalOpen);
    }

    const hadleSubmit = (values) => {

        console.log(props);
        props.addComment(props.dishId, values.rating, values.author, values.comment);
    }

    return (

        <>
            <Button outline onClick={toggleModal}>
                <span className="fa fa-pencil fa-lg"></span> Add Comment
            </Button>
            <Modal isOpen={isModalOpen}
                toggle={toggleModal}>
                <ModalHeader toggle={toggleModal}>Submit Comment</ModalHeader>
                <ModalBody>
                    <LocalForm onSubmit={(values) => hadleSubmit(values)}>
                        <Row className="form-group">
                            <Label htmlFor="rating" className="ml-2">Rating</Label>

                            <Control.select model=".rating"
                                id="rating"
                                name="rating"
                                className="form-control m-2">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Control.select>


                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="author" className="ml-2">Your name</Label>

                            <Control.text model=".author"
                                id="author"
                                name="author"
                                className="form-control m-2"
                                placeholder="Author"
                                validators={{

                                    required,
                                    minLength: minLength(3),
                                    maxLength: maxLength(15)
                                }} />
                            <Errors
                                className="text-danger"
                                model=".author"
                                show="touched"
                                messages={{
                                    required: 'Required',
                                    minLength: ' Must be greater than 2 characters',
                                    maxLength: ' Must be 15 characters or less'
                                }}
                            />
                        </Row>

                        <Row className="form-group">
                            <Label htmlFor="comment" className="ml-2">Comment</Label>
                            <Control.textarea
                                model=".comment"
                                id="comment"
                                name="comment"
                                rows="6"
                                className="form-control m-2"
                                validators={{
                                    required,
                                }}>
                            </Control.textarea>

                            <Errors
                                className="text-danger ml-2"
                                model=".comment"
                                messages={{
                                    required: "requiered"
                                }}
                            />
                        </Row>
                        <Row>
                            <Col md={2}>
                                <Button type="submit" color="primary">Submit</Button>
                            </Col>
                        </Row>
                    </LocalForm>


                </ModalBody>
            </Modal>
        </>
    )
}

function RenderComments({ comments, addComment, dishId }) {

    comments = comments.map((comment) => {
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
            <CommentForm dishId={dishId}
                addComment={addComment} />
        </div>
    )

}

function RenderDish({ dish }) {
    return (
        <div key={dish.id} className="col-12 col-md-5 m-1">
            <Card>
                <CardImg top src={dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        </div>
    );
}

const DishDetail = (props) => {

    if (props.dishesLoading) {
        console.log('cargando');
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    } 
    else if (props.dish == null) {
        return (
            <div>

            </div>
        )
    } else {
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem>
                            <Link to='/home'>Home</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem>
                            <Link to='/menu'>Menu</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>
                            {props.dish.name}
                        </BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <RenderDish dish={props.dish} />
                    <RenderComments comments={props.comments}
                        addComment={props.addComment}
                        dishId={props.dish.id} />
                </div>

            </div>


        )
    }
}

export default DishDetail; 