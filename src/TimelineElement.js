import React, { Component } from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import './Timeline.css';

export class TimelineElement extends Component {
    constructor(props) {
        super(props);
        this.data = this.props.data;
    }

    formatDate(date) {
        let dateTemplate = 'MM/DD/YYYY';
        let dateArr = date.split('/');
        let formDate = dateTemplate.replace('MM', dateArr[1])
            .replace('DD', dateArr[2])
            .replace('YYYY', dateArr[0]);
        return formDate;
    }

    render() {
        let d = this.props.data;
        let artworkUrl = 'url(' + d.artwork + ')';
        return (
            <VerticalTimelineElement
                className="vertical-timeline-element--work"
                date={this.formatDate(d.releaseDate)}
                iconStyle={{ backgroundImage: artworkUrl }}
            // icon={<WorkIcon />}
            >
                <h3 className="vertical-timeline-element-title">
                    <a target="_blank" href={d.albumSite}>{d.albumName}</a>
                </h3>
                <h5 className="vertical-timeline-element-subtitle">{d.genre}</h5>
                <p>
                    {/* {d.copyright} */}
                </p>
            </VerticalTimelineElement>
        )
    }
}