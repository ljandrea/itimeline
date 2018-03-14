import React, { Component } from 'react';
import firebase from 'firebase';
import moment from 'moment';

export class Comment extends Component {
    upvotePost() {
        let postRef = firebase.database().ref('posts/' + this.props.info.key + '/likes');
        postRef.transaction(function (currentClicks) {
            // If node/clicks has never been set, currentRank will be `null`.
            return (currentClicks || 0) + 1;
        });
    }

    downvotePost() {
        let postRef = firebase.database().ref('posts/' + this.props.info.key + '/likes');
        postRef.transaction((currentClicks) => {
            // If node/clicks has never been set, currentRank will be `null`.
            if (currentClicks >= 1) {
                return (currentClicks || 0) - 1;
            }
            else {
                currentClicks = 0;
            }
        });
    }

    render() {
        return (
            <div className='postList'>
                <div className='card p-2 m-2'>
                    <h4 className="card-title">
                        {this.props.info.content}
                    </h4>
                    <div className='btn-group'>
                        <button className='btn btn-success btn-sm' onClick={() => this.upvotePost()}>up</button>
                        <button className='btn btn-danger btn-sm' onClick={() => this.downvotePost()}>down</button>
                    </div>
                    <div className='card-subtitle mb-2 text-muted' style={{ paddingTop: '1em' }}>

                        <div>submitted by {this.props.info.author}, {moment(this.props.info.timestamp).fromNow()}</div>
                        {this.props.info.likes !== 1 ?
                            <p style={{ marginBottom: '0' }} className='stats'>{this.props.info.likes} likes </p> :
                            <p style={{ marginBottom: '0' }} className='stats'>{this.props.info.likes} like </p>
                        }
                    </div>
                </div>
            </div>
        )
    }

}