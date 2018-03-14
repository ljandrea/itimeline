import React, { Component } from 'react';
import { VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import './Timeline.css';
import FontAwesome from 'react-fontawesome';

export class TimelineElement extends Component {
    constructor(props) {
        super(props);
        this.data = this.props.data;
        this.audioState = {
            previewAudio: new Audio()
        };
        this.state = {
            song: ''
        };
    }

    formatDate(date) {
        let dateTemplate = 'MM/DD/YYYY';
        let dateArr = date.split('/');
        let formDate = dateTemplate.replace('MM', dateArr[1])
            .replace('DD', dateArr[2])
            .replace('YYYY', dateArr[0]);
        return formDate;
    }

    componentDidMount() {
        this.getSongOnAlbum(this.data.id)
            .then((response) => {
                this.setState({
                    song: response,
                    audio: new Audio(response)
                });
            });
    }

    getSongOnAlbum(albumId) {
        const URL_TEMPLATE = "https://itunes.apple.com/lookup?id={albumId}&entity=song";
        let url = URL_TEMPLATE.replace('{albumId}', albumId);
        return fetch(url)
            .then((response) => {
                let data = response.json();
                return data;
            })
            .then((data) => {
                return data.results[1].previewUrl;
            })
            .catch((err) => {
                console.log(err);
            });
    }

    //Plays the given track, spinning the given image.
    playTrackPreview(track) { //eslint-disable-line
        if (track !== '') {
            if (this.audioState.previewAudio.src !== track) { //if a new track to play
                this.audioState.previewAudio.pause(); //pause current
                this.audioState.previewAudio = new Audio(track); //create new audio
                this.audioState.previewAudio.play(); //play new
            } else {
                if (this.audioState.previewAudio.paused) {
                    this.audioState.previewAudio.play();
                } else {
                    this.audioState.previewAudio.pause();
                }
            }
        }
    }

    render() {
        let d = this.props.data;
        let artworkUrl = 'url(' + d.artwork + ')';
        console.log(this.state.song);
        // this.getSongOnAlbum(d.id);
        return (
            <VerticalTimelineElement
                className="vertical-timeline-element--work"
                date={this.formatDate(d.releaseDate)}
                iconStyle={{ backgroundImage: artworkUrl }}
            >
                <h3 className="vertical-timeline-element-title">
                    <a target="_blank" href={d.albumSite}>{d.albumName}</a>
                </h3>
                <h5 className="vertical-timeline-element-subtitle">{d.genre}</h5>
                <br />
                <button
                    id='audio'
                    className='btn btn-success'
                    onClick={() => this.playTrackPreview(this.state.song)}
                >
                    <FontAwesome className='fas fa-play' /> / <FontAwesome className='fas fa-pause' />
                </button>
                <p>
                    {/* {d.copyright} */}
                </p>
            </VerticalTimelineElement>
        )
    }
}