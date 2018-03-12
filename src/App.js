import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

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
            // console.log(genres);
            return genres;
        }
    }

    // doesn't actually render any data, just used it to test out the search bar/api calls
    render() {
        console.log(this.getGenreData());
        return (
            <div className="container">
                <hr />
                <div className="col-lg-6">
                    <div className="input-group">
                        <input type="text"
                            value={this.state.query}
                            onChange={(e) => this.handleChange(e)}
                            className="form-control" placeholder="Search for..." />
                        <span className="input-group-btn">
                            <button
                                onClick={() => this.getSearchResults()}
                                className="btn btn-default" type="button">Go!</button>
                        </span>
                    </div>
                </div>
                <hr />
                <div>
                    {/* Albums: {this.state.albums} */}
                </div>
            </div>
        );
    }
}

export default App;