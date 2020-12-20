import React from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem, CardText } from 'reactstrap';
import { Link } from 'react-router-dom';

function RenderLeaders({ leaders }) {
    leaders = leaders.map((leader) => {
        console.log(leader);
        return (
            <>
            <li key={leader.id} className="mb-2">
                <div className="row">
                    <div className="col-12 col-md-2">
                        <img width="100%" src={leader.image} />
                    </div>
                    <div className="col-12 col-md-10">
                        <h4>
                            {leader.name}
                        </h4>
                        <div>
                            <p>
                                {leader.designation}
                            </p>
                        </div>
                        <div>
                            <p>
                                {leader.description}
                            </p>
                        </div>
                    </div>
                </div>

            </li>
            <hr/>
            </>
        )
    })
    return (
        <>
            {leaders}
        </>
    )

}

const About = (props) => {

    return (
        <div className="container">

            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem>
                        <Link to="/home">Home</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        About Us
                    </BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h1>About Us</h1>
                    <hr />
                </div>
            </div>

            <div className="row">

                <div className="col-8 col-md-6 m-1">
                    <h2>Our History</h2>
                    <p>Started in 2010, Ristorante con Fusion quickly established itself as a culinary
                    icon par excellence in Hong Kong. With its unique brand of world fusion cuisine
                    that can be found nowhere else, it enjoys patronage from the A-list clientele in
                    Hong Kong. Featuring four of the best three-star Michelin chefs in the world, you
                    never know what will arrive on your plate the next time you visit us.
                    </p>
                    <p>
                        The restaurant traces its humble beginnings to The Frying Pan,
                        a successful chain started by our CEO, Mr. Peter Pan, that featured
                        for the first time the world's best cuisines in a pan.
                    </p>

                </div>

                <div className="col-12 col-md-4 m-1">
                    <Card>
                        <CardTitle className="bg-primary text-white p-2 " center>
                            Facts At a Glance
                            </CardTitle>
                        <CardText className="p-2">
                            <div className="row">
                                <div className="col-6">
                                    <strong><p>Started</p></strong>

                                </div>
                                <div className="col-6">
                                    <p>Feb, 2013</p>
                                </div>

                                <div className="col-6">
                                    <strong> <p>Major Stake Holder </p></strong>

                                </div>
                                <div className="col-6">
                                    <p>HK Fine Foods Inc.</p>
                                </div>

                                <div className="col-6">
                                    <strong><p>Last Year's Turnover </p></strong>
                                </div>
                                <div className="col-6">
                                    <p>$1,250,375</p>
                                </div>

                                <div className="col-6">
                                    <strong>
                                        <p>Employeed</p>
                                    </strong>
                                </div>
                                <div className="col-6">
                                    <p>40</p>
                                </div>
                            </div>
                        </CardText>
                    </Card>
                </div>

                <blockquote className="blockquote mb-0 card-body">
                    <p>You better cut the pizza in four pieces because I'm not hungry enough to eat six.</p>
                    <footer className="blockquote-footer">
                        <small className="text-muted">
                        Yogi Berra, <cite title="Source Title">The Wit and Wisdom of Yogi Berra, P. Pepe, Diversion Books, 2014</cite>
                        </small>
                    </footer>
                </blockquote>
            </div>

            <hr />
            <div className="container">
                <ul style={{ listStyleType: "none" }} >
                    <RenderLeaders leaders={props.leaders} />
                </ul>
            </div>

        </div>
    );
}

export default About;