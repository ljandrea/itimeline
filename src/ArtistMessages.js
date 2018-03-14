import React, { Component } from 'react';
import { Comment } from './Comment';
import firebase from 'firebase';
import md5 from 'md5';
import { Post } from './Post.js';

export class ArtistMessages extends Component {
    constructor(props) {
        super(props);
        //<ArtistMessages artist = {this.state.artist} />
        this.state = {
            author: '',
            content: '',
            posts: []
        }
    }

    // Handles updating firebase and the list of comments for each Artist
    componentDidMount() {
        this.requestRef = firebase.database().ref("posts");
        this.requestRef.on('value', (snapshot) => {
            let posts = snapshot.val();
            // console.log(posts);
            this.setState({ posts: posts })
        })
    }

    // Takes in the current comment when it is sent.
    updateContent(event) {
        let content = event.target.value;
        this.setState({
            content: content
        })
    }

    updateAuthor(event) {
        let author = event.target.value;
        this.setState({
            author: author
        })
    }

    // Adds a comment to the database when it is created.
    addPost() {
        let post = {
            content: this.state.content,
            author: this.state.author,
            timestamp: firebase.database.ServerValue.TIMESTAMP,
            artist: this.props.artist,
            likes: 0
        }
        this.requestRef.push(post);
        this.setState({
            author: '',
            content: ''
        });
    }

    getPosts() {
        let posts = this.state.posts === null ? [] :
            Object.keys(this.state.posts).map((d) => {
                let post = this.state.posts[d];
                post.key = d;
                return post;
            })
        return posts;
    }

    render() {
        return (
            <div>
                <h3 style={{ marginBottom: '1em' }}>comments</h3>
                {/* This makes each comment for the specific artist */}
                <div style={{ paddingBottom: '1em' }}>
                    <Post posts={this.getPosts()} artist={this.props.artist} />
                </div>
                <hr />
                {/* This is the form for making a new comment */}
                <div style={{ margin: '0 1em' }}>
                    <h5>add a comment:</h5>
                    <input className="form-control "
                        name="name"
                        // value might be = {this.state.author} ??
                        value={this.state.author}
                        placeholder='name'
                        onChange={(event) => { this.updateAuthor(event) }}
                    />
                    <input className="form-control "
                        name="content"
                        placeholder='comment'
                        // value might be = {this.state.content} ??
                        value={this.state.content}
                        onChange={(event) => { this.updateContent(event) }}
                    />
                    <button className="btn btn-primary mr-2 mt-2" onClick={() => this.addPost()}>
                        submit
                    </button>
                </div>
            </div>
        )
    }
}