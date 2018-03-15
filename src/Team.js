import React, { Component } from 'react';
import './Team.css';

// Renders the Meet the Team page
export class Team extends Component {
    getTeamInfo() {
        let team = [
            {
                name: 'Autumn Derr',
                class: 'Sophomore, Informatics',
                webDev: ' I really like getting to the end product and seeing everything come together that I’ve worked on for so long.',
                spring: "I'm going to London!",
                favArtist: 'At the moment, probably Lorde and BØRNS.',
                thanks: "Thanks Rosemary and Mike! I’m so impressed with the skills I’ve learned and what I can do, can’t wait to start doing more projects in web dev!"
            },
            {
                name: 'Andrea Jorge',
                class: 'Junior, Informatics',
                webDev: "If I'm being honest, it's a struggle. But I part of me loves the grind and getting everything to work, especially when you get that bug you've been trying to figure out for 6 hours and turns out all you had to do was use 'this.state' instead of 'this.props'. =D",
                spring: "Hanging out with friends and family, going to Canada, and catching up on SLEEP !!!",
                favArtist: 'Hmm...either Kehlani or H.E.R.',
                thanks: "Mike, thank you for being such a great instructor all quarter! Definitely made web dev fun and interesting to learn. And Rosemary, thanks for being an amazing TA. You were so helpful and understanding! I learned so much from the both of you!"
            },
            {
                name: 'Maddie Holmes',
                class: 'Junior, Informatics',
                webDev: 'I really like being able to immediately see the results of my code. I especially like being able to see the style changes when I take a simple html document and stylize it.',
                spring: "I’m going to Portland, Boston, and Dover New Hampshire!",
                favArtist: 'Probably Khalid and Kesha right now.',
                thanks: "Thank you Mike and Rosemary for making this the best web dev class possible. I truly learned a lot, and feel confident in my web dev skills. I can’t wait to see the projects I create in the future!"
            },
            {
                name: 'Billy Wang',
                class: 'Junior, Geographic Information Systems, Informatics Minor',
                webDev: 'I like the creativity and personal expression I can show through webdev and my code. Its not all unicorns and rainbows though, webdev defintely prompts different problems and obstacles to overcome, but I enjoy trying to resolve these different problems, because it feels like a puzzle',
                spring: "Spring break is going to be a time to relax for me. I look forward to spending time with friends and family, especially watching Netflix and movies with my sister! Also, I'm going to try and read a lot of books. I'm going to get my drivers liscense. I'm going to get a haircut.",
                favArtist: 'Sam Feldt & G-eazy',
                thanks: "Thank you to Rosemary, who's been a great help & I'm very grateful that she's such a caring and understanding TA. And thank you to Mike, who makes class a lot of fun and engaging, which relieves the complexity of learning and lifts off the stress of assignments and projects."
            }
        ];

        return team;
    }

    render() {
        return (
            <div>
                {!this.props.showIntro &&
                    <section id='team' style={{ paddingTop: '3em' }} aria-label='meet the team'>
                        <h1>Meet the Team</h1>
                        <div style={{ paddingTop: '2em' }}>
                            {this.getTeamInfo().map((d, i) => {
                                return (
                                    <div aria-label='team member bio' key={'bio' + i}>
                                        <hr id='div-design' />
                                        <h3>{d.name}</h3>
                                        <h5>{d.class}</h5>
                                        <ol style={{ paddingTop: '1em' }}>
                                            <li>
                                                <strong>What is your favorite thing about web dev?</strong>
                                                <p>{d.webDev}</p>
                                            </li>
                                            <li>
                                                <strong>Who is your favorite musical artist?</strong>
                                                <p>{d.favArtist}</p>
                                            </li>
                                            <li>
                                                <strong>What are your plans for spring break?</strong>
                                                <p>{d.spring}</p>
                                            </li>
                                        </ol>
                                        <p style={{ paddingBottom: '1em' }}>{d.thanks}</p>
                                    </div>
                                )
                            })}
                        </div>
                    </section>
                }
            </div>
        )
    }
}