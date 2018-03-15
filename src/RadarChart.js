import React, { Component } from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Scatter, Legend, Tooltip, ResponsiveContainer } from 'recharts';

export class GenreRadar extends Component {
    constructor(props) {
        super(props);
        this.state={ 
            artist: this.props.artist, 
            albums: this.props.albums
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            artist: nextProps.artist,
            albums: nextProps.albums
        });
    }
    getGenreData() {
        if (this.state.albums !== []) {
            let genres = {};
            this.state.albums.map((d) => {
                let genre = d.primaryGenreName;
                if (!genres[genre]) {
                    genres[genre] = { count: 1 };
                } else if (genres[genre]) {
                    genres[genre].count++;
                }
                return genre;
            });
            let radarLabels = Object.keys(genres);
            let values = Object.values(genres);
            let radarValues = [];
            values.map((d) => {
                radarValues.push(d.count);
            });
            let data = []; 
            radarLabels.map((d, i) => {
                data.push({
                    genre: radarLabels[i], 
                    count: radarValues[i]
                })
            })
            return data; 
        }

    }
 
    render() {
        return (
            <ResponsiveContainer width='100%' height='100%'>
                <RadarChart outerRadius='75%' data={this.getGenreData()}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="genre" />
                    <PolarRadiusAxis />
                    <Radar name={this.state.artist} dataKey="count" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                </RadarChart>
            </ResponsiveContainer>
        )
    }
}