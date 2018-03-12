import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.baseUrl = 'https://api.spotify.com/v1/';
        this.state = {
            artistQuery: '',
            artist: null,
            albums: []
        };
    }

    // inspired by: https://github.com/angularcity/spotifyexample
    getSearchResults() {
        // reformats query for api usability
        let artistQuery = this.state.artistQuery.replace(' ', '%20');
        // endpoint used to get artist object
        let artistSearch = '&type=artist';
        // endpoint used to get album object
        let albumSearch = '&type=album'

        // url used to search for an item
        let searchUrl = this.baseUrl + 'search?q=' + artistQuery;

        // EXPIRED - HOW DO WE REFRESH THIS ??
        let accessToken = 'BQCrL3QC-R_Kk8nbGpQQVZ13TCKqo459JAriSjtBEIohJRUOTehRTwjg_nuThOdvEiTZzSWB3P7HD1e507tXtIReREkIgnOpahBoISqkxx5sPGlnhRjqpOq8Q0uU6eDHysuv63G2B5H9cuDujH7W6oKgiwwgvMs';

        let myOptions = {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            mode: 'cors',
            cache: 'default'
        };

        let artist = '';
        let albums = [];

        fetch(searchUrl + artistSearch, myOptions)
            .then((response) => {
                let data = response.json();
                return data;
            })
            .then((data) => {
                console.log(data);
                this.setState({ artist: data.artists.items[0] });
            })
            .catch((err) => {
                console.log(err);
            });

        // fetch(searchUrl + albumSearch, myOptions)
        //     .then((response) => {
        //         let data = response.json();
        //         return data;
        //     })
        //     .then((data) => {
        //         let albumsRet = data.albums.items.filter((d) => {
        //             return d.album_type === 'album';
        //         });
        //         this.setState({ albums: albumsRet });
        //     });
        // console.log(this.state.albums);
        // let albumEndpoint = 'albums/{id}';
        // fetch()
    }

    render() {
        console.log('state:' + this.state);
        // this.getSearchResults('ed sheeran');
        let artist = {};
        if (this.state.artist !== null) {
            artist = this.state.artist;
        }
        console.log(artist);
        return (
            <div className="container">
                <hr />
                <div className="col-lg-6">
                    <div className="input-group">
                        <input type="text"
                            onChange={event => { this.setState({ artistQuery: event.target.value }) }}
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
                    <div> {artist.name}   </div>
                    <div> {'genres: ' + artist.genres} </div>
                </div>


            </div>
        );
    }
}

export default App;
