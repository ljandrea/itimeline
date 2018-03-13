import React, { Component } from 'react';

export class Jumbotron extends Component {
    render() {
        return (
            <div className='jumbotron'>
                <h1 className='display-3'>
                    {this.props.artist === null ? "i'll fix this jumbotron lol" : this.props.artist}
                </h1>
                {this.props.artist !== null &&
                    <div>
                        <br />
                        <a
                            target="_blank"
                            className='btn btn-primary'
                            href={'https://en.wikipedia.org/wiki/' + this.props.artist.replace(' ', '_')}>
                            Learn more
                        </a>
                    </div>
                }
            </div>
        )
    }
}