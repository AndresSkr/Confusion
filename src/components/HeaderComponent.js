import { Fragment } from "react";
import React from 'react';
import { Navbar, NavbarBrand, Jumbotron } from 'reactstrap';

const Header = (props) => {
    return (
        <>
            <Navbar dark color="primary">
                <div className="container">
                    <NavbarBrand href="/"> Ristorante con Fusion</NavbarBrand>
                </div>
            </Navbar>
            <Jumbotron>
                <div className="container">
                    <div className="row row-header">
                        <div className="col-12 col-sm-6">
                            <h1>Ristorante con Funsion</h1>
                            <p>We take inspiration from the World's best cuisines, and create a unique fusion experience. Our lipsmacking creations will tickle your culnary sense!</p>
                        </div>
                    </div>
                </div>
            </Jumbotron>
        </>
    );
}

export default Header;