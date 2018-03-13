import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Link } from "react-router-dom";
import './NavBar.css';

export class NavBar extends Component {
    render() {
        return (
            <Router>
                <nav class="navbar fixed-top navbar-toggleable-sm navbar-inverse bg-inverse">
                    <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <Link class="navbar-brand" to="/">Navbar</Link>
                    <div class="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul class="navbar-nav">
                            <li class="nav-item active">
                                <Link to='/'>Timeline</Link>
                            </li>
                            <li class="nav-item">
                                <Link to='/'>Radar Chart </Link>
                            </li>
                            <li class="nav-item">
                                <Link to='/'>Live - Comment</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </Router>
        )
    }
}