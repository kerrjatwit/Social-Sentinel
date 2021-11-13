
import './App.css';
import React, { Component } from 'react';
import TermForm from './components/TermForm';
import snoowrap from 'snoowrap';
import axios from 'axios';



export async function scrapeSubreddit(terms) {
    const r = new snoowrap({
        userAgent: 'Sentinel_Bot',
        clientId: 'zOHhypIQRETXqtUDV9v6DQ',
        clientSecret: 'EiEquyyIEJnu5CdEb-cifcTyp63uJw',
        refreshToken: '1284359538737-XFuGbFOs6vPCGSVumlLSW7vXSAeHQg'
    });
    console.log('Performing reddit scrape.\nSubreddit: funny\nTop 10 posts\nterms: ' + terms);
    const subreddit = await r.getSubreddit('explainlikeimfive');
    const topPosts = await subreddit.getTop({ time: 'week', limit: 20 });
    
    if (terms != null) {
        topPosts.forEach((post) => {
            console.log(post);
            if (post.body != null) {
                terms.forEach((term) => {

                    if (post.selftext.includes(term)||post.title.includes(term)) {
                        axios
                            .post("http://localhost:3000/targets/add", post.author )
                            .then((res) => console.log(res.data));
                        console.log(post.author);
                    }

                });
            }

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



class App extends Component {

    constructor(props) {
        super(props);

        this.state = { terms: [], targets: [] };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleCallback =(searchTerms)  => {
        this.setState({ terms: searchTerms });
    }

    handleSubmit(event) {
        scrapeSubreddit(this.state.terms);
        event.preventDefault();
    }

    render() {
      
        return (

            <div className="App">
                <div class="center">
              <TermForm parentCallback={this.handleCallback}/>
                <button onClick={this.handleSubmit}>Start
                </button>
                <p>Targets:</p>
                <ul>{this.state.targets.map(item => (
                    <li key={item}>{item}</li>
                ))}
                </ul>
              
      </div>
           </div>
      );
    }
}

export default App;
