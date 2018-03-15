import React, { Component } from 'react';
import { PostItem } from './PostItem.js';

// Filters posts based on the current artist to be rendered as a PostItem
export class Post extends Component {
    getPosts() {
        let posts = this.props.posts.filter((d) => {
            return d.artist === this.props.artist;
        });
        return posts;
    }

    render() {
        console.log(this.props.posts);
        return (
            <div className='postList'>
                {this.getPosts().map((d, i) => {
                    return <PostItem key={'post' + i} info={d} />
                })}
            </div>
        )
    }
}