import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Timeline } from './Timeline.js';
import { NavBar } from './NavBar.js';
import './SearchBar.css';

export class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.props.changeCallback;
        this.getSearchResults = this.props.searchCallback;
    }

    render() {
        // console.log(this.getTimelineData());
        return (
            <div id='search' className="col-lg">
                <div className="input-group">
                    <input type="text"
                        value={this.props.query}
                        onChange={(e) => this.handleChange(e)}
                        className="form-control" placeholder="Search" />
                    <span className="input-group-btn">
                        <button
                            onClick={() => this.getSearchResults()}
                            className="btn btn-primary" type="button">Go!</button>
                    </span>
                </div>
            </div>
        );
    }
}