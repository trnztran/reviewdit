  /*global chrome*/
import React, {useState, useEffect} from 'react';
import './App.css';

function App() {

  const [apiKey, setApiKey] = useState();
  const [productName, setProductName] = useState();
  const [isLoading, setIsLoading] = useState();

  const getAccessToken = () =>{
    //retrieves accesstoken for reddit API

    fetch('http://localhost:5000/accessToken')
      .then(response => response.text())
      .then(result => {
        console.log(result);
        setApiKey(result)
      })
      .catch(err => {
        console.log(err.message);
      });
  }

  const getURL = (callback) => {
    return chrome.tabs.query({currentWindow: true, active: true}, function(tabs) {
        callback(tabs[0].url)});
  }

  const getProductName = (amazon_URL) => {
    setIsLoading(true);
    fetch('http://localhost:5000/productName?website='+amazon_URL)
      .then(response => response.text())
      // .then(text => console.log(text))
      .then(result => {
        console.log(result);
        setProductName(result);
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err.message);
      });
    // console.log(productName);
  }

  const handleClick = () => {
    getAccessToken();
    console.log(apiKey);
    getURL(getProductName);
  }

  return (
    <div className="App">
        <div className = "title">Reviewdit</div>
        <button onClick = {handleClick} className = "btn">Find Reviews</button>
        <div className = "review-listing">
          <p className= 'review-search-title'>
            Showing reviews for 
            {productName}...
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