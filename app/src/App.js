import logo from './logo.svg';
import './App.css';

import snoowrap from 'snoowrap';

export async function scrapeSubreddit() {
    const r = new snoowrap({
        userAgent: 'Sentinel_Bot',
        clientId: 'zOHhypIQRETXqtUDV9v6DQ',
        clientSecret: 'EiEquyyIEJnu5CdEb-cifcTyp63uJw',
        refreshToken: '1284359538737-XFuGbFOs6vPCGSVumlLSW7vXSAeHQg'
    });

    const subreddit = await r.getSubreddit('realEstate');
    const topPosts = await subreddit.getTop({ time: 'week', limit: 3 });

    let data = [];

    topPosts.forEach((post) => {
        data.push({
            link: post.url,
            text: post.title,
            score: post.score
        })
    });

    console.log(data);
};

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
