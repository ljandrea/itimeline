import React, { Component } from 'react';
import './ArtistInfo.css';
import { Timeline } from './Timeline.js';
import { ArtistMessages } from './ArtistMessages.js';
import { Jumbotron } from './Jumbotron.js';


export class ArtistInfo extends Component {
    render() {
        return (
            <div id='artist-info' className="container">
                <Jumbotron artist={this.props.artist} />
                <div id='charts' className='panel panel-default jumptarget'>
                    <hr id='div-design' />
                    <h3 style={{ marginBottom: '1em' }}>charts</h3>
                    <div className='row'>
                        <div id='radar' className='col' >*insert radar chart here*</div>
                        <div id='scatter' className='col' >*insert scatter chart here*</div>
                    </div>
                </div>
                <div id='timeline'
                    className='panel panel-default jumptarget'
                    style={{ marginBottom: '0' }}>
                    <hr id='div-design' />
                    <Timeline query={this.props.query} artist={this.props.artist} albums={this.props.albums} />
                </div>
                <div id='comments'
                    className='panel panel-default jumptarget'
                    style={{ marginTop: '0', paddingBottom: '2em' }}
                >
                    <hr id='div-design' />
                    <ArtistMessages artist={this.props.artist} />
                </div>
            </div>
        );
    }
}