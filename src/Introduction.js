import React, { Component } from 'react';

export class Introduction extends Component {
    render() {
        return (
            <div aria-label='introduction to site'>
                <h1 className='display-4'>
                    this is *insert name here*.
                </h1>
                <p className="lead">
                    Learn about the genre evolution of your favorite music artists, courtesy of the iTunes API.
                </p>
                <hr style={{ width: '80%' }} />
                <p>Go ahead, search an artist.</p>
            </div>
        )
    }
}