  /*global chrome*/
import React, {useState, useEffect} from 'react';
import './App.css';

function App() {

  const [productName, setProductName] = useState(null);

  function getURL(callback){
    return chrome.tabs.query({currentWindow: true, active: true}, function(tabs) {
        callback(tabs[0].url)});
  }

  const getProductName = async(url) => {
    // console.log(url);

    let amazon_URL = url;

    await fetch('http://localhost:5000/productName?website='+amazon_URL)
      .then(response => response.text())
      .then(text => console.log(text));
  }

  return (
    <div className="App">
        <div className = "title">Reviewdit</div>
        <button onClick = {getURL(getProductName)} className = "btn">Find Reviews</button>
        <div className = "review-listing">
          <p className= 'review-search-title'>
            Showing reviews for title..
          </p>
          <div className = "review">
            <span className="review-header">
              r/whatever by u/whoever posted blah
            </span>
            <p className = "review-title">
              Title name
            </p>
            <p className='review-content'>
              this is the stuff inside the post
            </p>
          </div>
          <div className = "review">
            <span className="review-header">
              r/whatever by u/whoever posted blah
            </span>
            <p className = "review-title">
              Title name
            </p>
          </div>
        </div>
    </div>
  );
}

export default App;