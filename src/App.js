import React, { Component } from 'react';
import './App.css';
import { NavBar } from './NavBar.js';
import { Introduction } from './Introduction.js';
import { SearchBar } from './SearchBar.js';
import { HashRouter as Router, Route } from "react-router-dom";
import { ArtistInfo } from './ArtistInfo.js';
import { Team } from './Team.js';

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

    // Determines if introduction + search bar should be shown or hidden
    showIntro() {
        console.log(this.state.showIntro);
        this.setState({ showIntro: true });
    }
    hideIntro() {
        this.setState({ showIntro: false });
    }

    // Sets query value from input box
    handleChange(event) {
        this.setState({ query: event.target.value });
    }

    // Retrieves top 50 album search results from the user's query
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

    // Gets genre data based on the 50 results returned 
    // Counts number of albums with the given primary album genre
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
                return genre;
            });
            return genres;
        }
    }

    render() {
        return (
            <body className="container">
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
                        <Route path='/meet-the-team' render={() => <Team showIntro={this.state.showIntro} />} />
                    </div>
                </Router>
            </body >
        );
    }
}

export default App;