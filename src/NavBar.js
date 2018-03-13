import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Link } from "react-router-dom";
import './NavBar.css';

export class NavBar extends Component {
    render() {
        return (
            <Router>
                <nav className="navbar fixed-top navbar-toggleable-sm navbar-inverse bg-inverse">
                    <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <Link className="navbar-brand" to="/">Navbar</Link>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav">
                            <li className="nav-item active">
                                <a href='#search'>Search </a>
                                {/* <Link to='/'>Timeline</Link> */}
                            </li>
                            <li className="nav-item">
                                <a href='#charts'>Charts </a>
                                {/* <Link to='/'>Radar Chart </Link> */}
                            </li>
                            <li className="nav-item">
                                <a href='#timeline'>Timeline</a>
                                {/* <Link to='/'>Live - Comment</Link> */}
                            </li>
                            <li className="nav-item">
                                <a href='#comments'>Comments</a>
                                {/* <Link to='/'>Live - Comment</Link> */}
                            </li>
                        </ul>
                    </div>
                </nav>
            </Router>
        )
    }
}