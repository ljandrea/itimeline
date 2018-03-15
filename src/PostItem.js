import React, { Component } from 'react';
import firebase from 'firebase';
import moment from 'moment';
import FontAwesome from 'react-fontawesome';

export class PostItem extends Component {
    // Upvotes and downvotes posts
    upvotePost() {
        let postRef = firebase.database().ref('posts/' + this.props.info.key + '/likes');
        postRef.transaction(function (currentClicks) {
            return (currentClicks || 0) + 1;
        });
    }
    downvotePost() {
        let postRef = firebase.database().ref('posts/' + this.props.info.key + '/likes');
        postRef.transaction((currentClicks) => {
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
            <div className='postList' style={{ marginBottom: '1.2em' }} aria-label='posted item about artist'>
                <div className='card' style={{ padding: '1em' }}>
                    <h4 className="card-title">
                        {this.props.info.content}
                    </h4>
                    <div className='btn-group'>
                        <button className='btn btn-success btn-sm' onClick={() => this.upvotePost()}>
                            <FontAwesome className='fas fa-arrow-circle-up' name='up' />
                        </button>
                        <button className='btn btn-danger btn-sm' onClick={() => this.downvotePost()}>
                            <FontAwesome className='fas fa-arrow-circle-down' name=' down' />
                        </button>
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