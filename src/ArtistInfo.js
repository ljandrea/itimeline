import React, { Component } from 'react';
import './ArtistInfo.css';
import { Timeline } from './Timeline.js';
import { ArtistMessages } from './ArtistMessages.js';
import { ArtistTitle } from './ArtistTitle.js';
import { GenreScatter } from './ScatterChart.js';
import { GenreRadar } from './RadarChart.js';

// Returns the body of information about the searched artist, including Wikipedia link,
// scatter and radar charts, timeline, and comment section
export class ArtistInfo extends Component {
    render() {
        return (
            <main id='artist-info' className="container"
                aria-label='artist information'>
                <ArtistTitle artist={this.props.artist} />
                <section id='charts'
                    className='panel panel-default jumptarget'
                    aria-label='charts of artist genres'>
                    <hr id='div-design' />
                    <h3>Charts</h3>
                    <p style={{ paddingTop: '0.5em' }}>
                        Take a look at the genres your artist has embraced over the years, and his/her/their overall genre trends.</p>
                    <div id='chart-render'>
                        <div id='radar' aria-label='radar chart'>
                            <GenreRadar albums={this.props.albums}/>
                        </div>
                        <div id='scatter' aria-label='scatter chart'>
                            <GenreScatter artist={this.props.artist} albums={this.props.albums} />
                        </div>
                    </div>
                </section>
                <section id='timeline'
                    className='panel panel-default jumptarget'
                    style={{ marginBottom: '0' }}
                    aria-label='timeline of artist albums and singles'>
                    <hr id='div-design' />
                    <Timeline query={this.props.query} artist={this.props.artist} albums={this.props.albums} />
                </section>
                <section id='comments'
                    className='panel panel-default jumptarget'
                    style={{ marginTop: '0', paddingBottom: '2em' }}
                    aria-label='public comment section for artist'>
                    <hr id='div-design' />
                    <ArtistMessages artist={this.props.artist} />
                </section>
            </main>
        );
    }
}