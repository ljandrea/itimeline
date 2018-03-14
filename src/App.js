import React, { Component } from 'react';
import './App.css';
import { NavBar } from './NavBar.js';
import { Introduction } from './Introduction.js';
import { SearchBar } from './SearchBar.js';
import { HashRouter as Router, Route, Redirect } from "react-router-dom";
import { ArtistInfo } from './ArtistInfo.js';
import { Team } from './Team.js';
import firebase from 'firebase';
import md5 from 'md5';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            artist: null,
            albums: [],
            showIntro: true
        };
        this.handleChange = this.handleChange.bind(this);
        this.getSearchResults = this.getSearchResults.bind(this);
        this.showIntro = this.showIntro.bind(this);
        this.hideIntro = this.hideIntro.bind(this);
    }

    showIntro() {
        console.log(this.state.showIntro);
        this.setState({ showIntro: true });
    }

    hideIntro() {
        this.setState({ showIntro: false });
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
                // console.log(data.results);
                this.setState({
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
                <NavBar showIntro={this.state.showIntro} artist={this.state.artist} showCallback={this.showIntro} hideCallback={this.hideIntro} />
                {this.state.showIntro &&
                    <div id='introduction'>
                        <Introduction />
                        <SearchBar changeCallback={this.handleChange} searchCallback={this.getSearchResults} />
                    </div>
                }
                {this.state.artist !== null && this.state.showIntro &&
                    <ArtistInfo query={this.state.query} artist={this.state.artist} albums={this.state.albums} />
                }
                <Router>
                    <div>
                        <Route path='/meet-the-team' component={Team} />
                    </div>
                </Router>

                {/* <Router>
                        <div>
                            <Route exact path="/" render={() => <Timeline query={this.state.query} artist={this.state.artist} albums={this.state.albums} />} />
                            <Route path="/timeline" render={() => (<Redirect to="/" />)} /> */}
                {/* <Route path="/jokes" component={pages.Jokes} />
                            <Route path="/til" component={pages.TIL} />
                            <Route path="/profile" component={pages.Profile} /> */}
                {/* </div>
                    </Router> */}

                {/* <div id='charts' className='row'>
                    <div id='radar' className='col' >*insert radar chart here*</div>
                    <div id='scatter' className='col' >*insert scatter chart here*</div>
                </div>
                <div id='timeline'>
                    <h3>Timeline</h3>
                    <Timeline query={this.state.query} artist={this.state.artist} albums={this.state.albums} />
                </div>
                <div id='comments'>
                    *insert comment section here* */}
                {/* <ArtistMessages /> */}
                {/* </div>
                <div id='end-padding'></div> */}
            </div >


        );
    }
}

export default App;