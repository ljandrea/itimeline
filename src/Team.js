import React, { Component } from 'react';
import './Team.css';

export class Team extends Component {
    render() {
        return (
            <div id='team' style={{ paddingTop: '5em' }}>
                <h1>Meet the Team</h1>
                <div className='flex-grid'>
                    <div className='row'>
                        <div id='autumn' className='col card'>
                            <h3>Autumn Derr</h3>
                            <p>insert bio here</p>
                        </div>
                        <div id='andrea' className='col card'>
                            <h3>Andrea Jorge</h3>
                            <p>insert bio here</p>
                        </div>
                    </div>
                    <div className='row'>
                        <div id='maddie' className='col card'>
                            <h3>Maddie Holmes</h3>
                            <p>insert bio here</p>
                        </div>
                        <div id='billy' className='col card'>
                            <h3>Billy Wang</h3>
                            <p>insert bio here</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}