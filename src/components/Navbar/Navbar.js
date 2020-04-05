import React, { Component } from 'react'
import "./Navbar.scss";
import logo from "../../logo.png";
import {withRouter} from 'react-router-dom';

export class Navbar extends Component {
    state={
        linkPressed: ''
    }

    render() { 
        console.log(this.props.location)
        return (
            <nav className="navbar">
            <img src={logo} alt="img" />
            <ul className="nav-links">
                <li>
                    <a href="/" name="home" className="nav-link" onClick={this.setActiveTab}  className={`nav-link ${this.props.location.pathname === '/' ? "active": ""}`}>
                        home
                    </a>
                </li>
                <li>
                    <a href="/about" name="about" onClick={this.setActiveTab}  className={`nav-link ${this.props.location.pathname === '/about' ? "active": ""}`}>
                        about
                    </a>
                </li>
                <li>
                    <a href="/login" name="login" onClick={this.setActiveTab}  className={`nav-link ${this.props.location.pathname === '/login' ? "active": ""}`}>
                        Log In
                    </a>
                </li>
            </ul>
        </nav>
        );
    }
}

export default withRouter(Navbar);
