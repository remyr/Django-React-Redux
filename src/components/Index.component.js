import React, { Component } from 'react'
import { NavDropdown, MenuItem} from 'react-bootstrap'
import { Link } from 'react-router'

const IndexComponent = (props) => {
    const { user, logout } = props;
    return (
        <nav className="navbar navbar-inverse">
            <div className="container">
                <div className="navbar-header">
                    <Link className="navbar-brand" to="/">React Django</Link>
                </div>
                <ul className="nav navbar-nav navbar-right">
                    <NavDropdown eventKey={3} title={user.username || 'Anonymous'} id="basic-nav-dropdown">
                        <MenuItem onClick={logout} eventKey={3.1}>Logout</MenuItem>
                    </NavDropdown>
                </ul>
            </div>
        </nav>
    )
};

export default IndexComponent