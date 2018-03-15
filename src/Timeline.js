import React, { Component } from 'react';
import { VerticalTimeline } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import './Timeline.css';
import { TimelineElement } from './TimelineElement.js';

export class Timeline extends Component {
    constructor(props) {
        super(props);
        this.state = {
            artist: this.props.artist,
            albums: this.props.albums
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            artist: nextProps.artist,
            albums: nextProps.albums
        });
    }

    getTimelineData() {
        if (this.state.albums !== []) {
            let albumsOnly = [];

            // filters results to be only albums of the artist
            this.state.albums.map((d) => {
                let artist = d.artistName.toString();
                if (artist === this.state.artist) {
                    return albumsOnly.push(d);
                }
                return artist;
            });

            // filters albums by unique names
            let uniqueAlbums = {};
            albumsOnly.map((d) => {
                let key = d.collectionName.toString();
                if (!uniqueAlbums[key]) {
                    let album = {
                        albumName: d.collectionName.toString(),
                        albumSite: d.collectionViewUrl.toString(),
                        artist: d.artistName.toString(),
                        artistSite: d.artistViewUrl.toString(),
                        id: d.collectionId.toString(),
                        genre: d.primaryGenreName.toString(),
                        releaseDate: d.releaseDate.toString().slice(0, 10).replace(/-/g, '/'),
                        artwork: d.artworkUrl100.toString()
                    }
                    uniqueAlbums[key] = album;
                }
                return uniqueAlbums;
            });
            // convert to array
            uniqueAlbums = Object.values(uniqueAlbums);

            // sorts albums by date
            uniqueAlbums.sort((a, b) => {
                return a.releaseDate > b.releaseDate ? 1 : a.releaseDate < b.releaseDate ? -1 : 0;
            });

            // console.log(uniqueAlbums);
            return uniqueAlbums;
        }
    }

    render() {
        // let data = this.getTimelineData();
        return (
            <div>
                <h3>Timeline</h3>
                <p>Explore how your artist has changed (or not) with each album and song released,
                            and take a listen at their sound!
                </p>
                <p>Some artists may not have audio previews available.</p>
                {this.state.artist !== null &&
                    <div id='timeline-inner'>
                        <VerticalTimeline>
                            {this.getTimelineData().map((d, i) => {
                                // console.log(d);
                                return <TimelineElement key={'time-el' + i} data={d} />
                            })}
                        </VerticalTimeline>
                    </div>}
            </div>
        )
    }
}