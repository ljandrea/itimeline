import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Timeline } from './Timeline.js';
import { NavBar } from './NavBar.js';
import { SearchBar } from './SearchBar.js';
import { HashRouter as Router, Route, Redirect } from "react-router-dom";
import { Jumbotron } from './Jumbotron.js';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            artist: null,
            albums: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.getSearchResults = this.getSearchResults.bind(this);
    }

    handleChange(event) {
        this.setState({ query: event.target.value });
    }

    getSearchResults() {
        const URL_TEMPLATE = "https://itunes.apple.com/search?entity=album&limit=50&term={query}";
        let url = URL_TEMPLATE.replace('{query}', this.state.query);
        fetch(url)
            .then((response) => {
                let data = response.json();
                return data;
            })
            .then((data) => {
                console.log(data.results);
                this.setState({
                    // albums: this.refactorAlbums(data.results)
                    albums: data.results,
                    artist: data.results[0].artistName
                });
                console.log(this.state.artist);
            })
            .catch((err) => {
                console.log(err);
            });

        this.setState({ query: '' });
    }

    // ignore this method i was doing something idk

    // refactorAlbums(albums) {
    //     let newAlbums = {};
    //     albums.map((d) => {
    //         let key = d.collectionName.toString();
    //         let album = {
    //             albumName: d.collectionName.toString(),
    //             artist: d.artistName.toString(),
    //             genre: d.primaryGenreName.toString(),
    //             releaseDate: d.releaseDate.toString(),
    //             artwork: d.artworkUrl100.toString()
    //         }
    //         newAlbums[key] = album;
    //     });
    //     console.log(newAlbums);
    //     // return newAlbums;
    // }

    // gets genre data based on the 50 results returned 
    // counts number of albums with the given primary album genre
    getGenreData() {
        if (this.state.albums !== []) {
            let genres = {};
            this.state.albums.map((d) => {
                let genre = d.primaryGenreName;
                if (!genres[genre]) {
                    genres[genre] = { count: 1 };
                } else if (genres[genre]) {
                    genres[genre].count++;
                }
            });
            return genres;
        }
    }

    render() {
        return (
            <div className="container">
                <NavBar />
                <div id='intro'>*insert intro here* - i.e. Search an artist!</div>
                <SearchBar changeCallback={this.handleChange} searchCallback={this.getSearchResults} />
                <hr />
                <Jumbotron artist={this.state.artist} />
                {/* <Router>
                    <div>
                        <Route exact path="/" render={() => <Timeline query={this.state.query} artist={this.state.artist} albums={this.state.albums} />} />
                        <Route path="/timeline" render={() => (<Redirect to="/" />)} /> */}
                {/* <Route path="/jokes" component={pages.Jokes} />
                        <Route path="/til" component={pages.TIL} />
                        <Route path="/profile" component={pages.Profile} /> */}
                {/* </div>
                </Router> */}
                <div id='charts' className='row'>
                    <div id='radar' className='col' >*insert radar chart here*</div>
                    <div id='scatter' className='col' >*insert scatter chart here*</div>
                </div>
                <div id='timeline'> *timeline is here*
                    <Timeline query={this.state.query} artist={this.state.artist} albums={this.state.albums} />
                </div>
                <div id='comments'>
                    *insert comment section here*
                </div>
                <div id='end-padding'></div>
            </div>
        );
    }
}

export default App;