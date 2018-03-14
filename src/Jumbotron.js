import React, { Component } from 'react';
import './Introduction.css';

export class Jumbotron extends Component {
    render() {
        return (
            <div id='artist-jumbotron' style={{ marginBottom: '0', marginTop: '3em', padding: '0', textAlign: 'center' }}>
                <h1 className='display-4' >
                    {this.props.artist}
                </h1>
                {this.props.artist !== null &&
                    <div>
                        <a
                            target="_blank"
                            href={'https://en.wikipedia.org/wiki/' + this.props.artist.replace(' ', '_')}>
                            Learn more
                        </a>
                    </div>
                }
            </div>
        )
    }
}