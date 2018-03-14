import React, { Component } from 'react';
import { Comment } from './Comment.js';

// Renders all posts of a given category
export class Post extends Component {
    getPosts() {
        let posts = this.props.posts.filter((d) => {
            return d.artist === this.props.artist;
        });
        return posts;
    }

    render() {
        console.log(this.props.posts);
        // console.log(this.getPosts());
        return (
            <div className='postList'>
                {this.getPosts().map((d, i) => {
                    return <Comment key={'post' + i} info={d} />
                })}
            </div>
        )
    }
}