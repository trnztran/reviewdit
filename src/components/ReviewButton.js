/*global chrome*/
import React, { useEffect, useState } from 'react';
import './App.css';
import ReviewListing from './ReviewListing';

function ReviewButton() {
  const [apiKey, setApiKey] = useState();
  const [productName, setProductName] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [currentURL, setCurrentURL] = useState();

  const getProductName = async (currentURL) => {
    // fetch request to server with amazon URL
    // server scrapes the amazon page and returns the product name
    // product name is stored in productName

    await fetch(`http://localhost:5000/productName?website=${currentURL}`)
      .then(response => response.text())
      .then(result => {
        console.log("result: ",result);
        setProductName(result);
        console.log("fetch completed");
        return(result);
      })
      .catch(err => {
        console.log(err.message);
      });
  }
 
  const getAccessToken = async() => {
    // retrieves accesstoken for reddit API

    await fetch('http://localhost:5000/accessToken')
      .then(response => response.text())
      .then(result => {
        console.log("access token: ", result);
        setApiKey(result);
        // console.log("access token 2: ", apiKey);
        return result;
      })
      .catch(err => {
        console.log(err.message);
      });
      console.log("accesskey:", apiKey);
  }

  const fetchRedditReviews = async(apiKey, productName) => {
    // passes apiKey and productName to server for reddit api

    const apiKey1 = apiKey;
    const productName2 = productName;

    const url = `http://localhost:5000/retrieveRedditReview?apiKey=${apiKey1}&productName=${productName2}`;

    await fetch(url);
  }

  const handleClick = async (e) => {
    //performs all functions needed to grab product name

    e.preventDefault();
    setIsLoading(true);
    console.log("start handleclick");
    
    await getProductName(currentURL);
    await fetchRedditReviews(apiKey, productName);

    setIsLoading(false);
  }

  useEffect(()=> {
    // Grabs URL of current active tab and stores in currentURL
    // Grabs Access Token for reddit api and stores in apiKey
    
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const currentTab = tabs[0];
      const url = currentTab.url;
      setCurrentURL(url);
    });
    getAccessToken();
  }, []);

  return(
      <div>
        <button onClick = {handleClick} className = "btn">
          {isLoading ? 'Loading...' : 'Find Reviews'}
        </button>  
        <ReviewListing prop = {productName} />
      </div>
  )
}

export default ReviewButton; 
