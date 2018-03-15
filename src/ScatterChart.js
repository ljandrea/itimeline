import React, { Component } from 'react';
import { ScatterChart, CartesianGrid, XAxis, YAxis, Scatter, Tooltip, ResponsiveContainer } from 'recharts';

export class GenreScatter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            artist: this.props.artist,
            albums: this.props.albums
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            artist: nextProps.artist,
            albums: nextProps.albums
        });
    }

    getScatterData() {
        if (this.state.albums !== []) {
            let albumsOnly = [];
            let colors = ['grey', '#eecf22', '#284183', '#8c0f2a', '#336a6b', '	#440845'];
            // Filters results to be only albums and singles of the artist
            this.state.albums.map((d) => {
                let artist = d.artistName.toString();
                if (artist === this.state.artist) {
                    return albumsOnly.push(d);
                }
                return artist;
            });

            // Filters albums by unique names
            let scatterData = {};
            albumsOnly.map((d) => {
                let key = d.collectionName.toString();
                if (!scatterData[key]) {
                    let album = {
                        genre: d.primaryGenreName.toString(),
                        x: Number(d.releaseDate.toString().slice(0, 4))
                    }
                    scatterData[key] = album;
                }
                return scatterData;
            });

            scatterData = Object.values(scatterData);

            // Collects unique genres
            let genres = scatterData.map(d => d.genre)
                .filter((item, i, ar) => { return ar.indexOf(item) === i; });
            console.log(genres);

            // Formats data for chart
            scatterData.map((d, i) => {
                d.y = genres.indexOf(d.genre) + 1;
                d.fill = colors[(genres.indexOf(d.genre) + 1) % colors.length];
                delete d.genre;
                return d;
            });

            console.log(scatterData);
            return { scatterData, genres };
        }
    }

    // Renders a legend to be used the chart
    scatterLegend(genres) {
        return (
            <div style={{ textAlign: 'center' }}>
                <ul style={{ listStyle: 'none' }}>
                    <li><strong>Legend:</strong></li>
                    {genres.map((d, i) => {
                        return <li key={'genre' + i} style={{ display: 'inline' }}>{i + 1}. {d}</li>
                    })}
                </ul>
            </div>);
    }

    render() {
        return (
            <div style={{ width: '100%', height: '100%' }}>
                <h5>Scatter</h5>
                <ResponsiveContainer width='100%' height="80%">
                    <ScatterChart
                        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                        <XAxis dataKey={'x'} type="number" name='year' scale={'time'} domain={['dataMin-1', 'dataMax+1']} tickCount={'dataMax' - 'dataMin'} />
                        <YAxis dataKey={'y'} type="number" name='genre' />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Scatter name='A school' data={this.getScatterData().scatterData} />
                        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                    </ScatterChart>
                </ResponsiveContainer>
                {this.scatterLegend(this.getScatterData().genres)}
            </div>
        )
    }
}