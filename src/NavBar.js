import React, { Component } from 'react';
import { HashRouter as Router, Link } from "react-router-dom";
import './NavBar.css';

// Renders a NavBar based on if an artist has been searched or not
export class NavBar extends Component {
    render() {
        return (
            <Router>
                <nav className="navbar fixed-top navbar-toggleable-sm navbar-inverse bg-inverse">
                    <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <a className="navbar-brand" href="#" onClick={() => this.props.showCallback()}>Navbar</a>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav">
                            <li className="nav-item active">
                                <a href='#' onClick={() => this.props.showCallback()}>Search </a>
                            </li>
                        </ul>
                        {this.props.artist !== null && this.props.showIntro &&
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <a href='#charts'>Charts </a>
                                </li>
                                <li className="nav-item">
                                    <a href='#timeline'>Timeline</a>
                                </li>
                                <li className="nav-item">
                                    <a href='#comments'>Comments</a>
                                </li>
                            </ul>
                        }
                        <ul className="navbar-nav">
                            <li className="nav-item active">
                                <Link to='/meet-the-team' onClick={() => this.props.hideCallback()}>Meet the Team</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </Router>
        )
    }
}