import React, { Component } from 'react';
import snoowrap from 'snoowrap';
import axios from 'axios';

export async function scrapeSubreddit() {
    const r = new snoowrap({
        userAgent: 'Sentinel_Bot',
        clientId: 'zOHhypIQRETXqtUDV9v6DQ',
        clientSecret: 'EiEquyyIEJnu5CdEb-cifcTyp63uJw',
        refreshToken: '1284359538737-XFuGbFOs6vPCGSVumlLSW7vXSAeHQg'
    });

    const subreddit = await r.getSubreddit('funny');
    const topPosts = await subreddit.getTop({ time: 'week', limit: 10 });

    if (this.props.terms != null) {
        topPosts.forEach((post) => {
            this.props.terms.forEach((term) => {
                if (post.body.includes(term)) {
                    axios
                        .post("http://localhost:3000/targets/add", post.author)
                        .then((res) => console.log(res.data));
                    console.log(post.author);
                }
            });

        });
        axios
            .get("http://localhost:3000/targets")
            .then((res) => {
                this.setState({ targets: res });
                console.log(res.data);

            });
    }
    else { alert('no terms!') };
};

class StartButton extends React.Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);


    }


    handleSubmit(event) {
        scrapeSubreddit();
        alert('Performing reddit scrape.');
        event.preventDefault();
    }

    render() {

        return (
            <button onClick={this.handleSubmit}>Start
                </button>
        );
    }
}

export default StartButton;