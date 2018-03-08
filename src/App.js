import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.baseUrl = 'https://api.spotify.com/v1/search?q={searchArtist}&type=artist';

    }

    getSearchResults(artist) {
        artist = artist.replace(' ', '%20');
        let url = this.baseUrl.replace('{searchArtist}', artist);
        fetch(url)
            .then((response) => {
                let data = response.json();
                return data;
            })
            .then((data) => {
                console.log(data);
            });
    }

    render() {
        this.getSearchResults('beyonce');
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to reload.
        </p>
            </div>
        );
    }
}

export default App;
