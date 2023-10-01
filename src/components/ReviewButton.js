/*global chrome*/
import React, { Component, useState } from 'react';
import './App.css';
import ReviewListing from './ReviewListing';

function ReviewButton() {
  // const [apiKey, setApiKey] = useState();
  // const [productName, setProductName] = useState();
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // const getAccessToken = async() =>{
  // //retrieves accesstoken for reddit API

  // // fetch('http://localhost:5000/accessToken')
  // //   .then(response => response.text())
  // //   .then(result => {
  // //     console.log(result);
  // //     return result;
  // //   })
  // //   .catch(err => {
  // //     console.log(err.message);
  // //   });
  // try{
  //     const res = await fetch('http://localhost:5000/accessToken');
  //     const text = await res.text();
  //     console.log("does it even reach this point wtf");
  //     return text;
  //   } catch(e){
  //     console.log(e);
  //   }
  // }

  const getURL = async (callback) => {
    // callback function to grab current URL that extension is being run on

      return chrome.tabs.query({currentWindow: true, active: true}, function(tabs) {
          callback(tabs[0].url)});
    }
    
  const getProductName = async (amazon_URL) => {
    // fetch request to server with amazon URL
    // server scrapes the amazon page and returns the product name

      fetch('http://localhost:5000/productName?website='+amazon_URL)
        .then(response => response.text())
        .then(result => {
          console.log(result);
          return(result);
        })
        .catch(err => {
          console.log(err.message);
        });
    }

  const handleClick = async (e) => {
    //performs all functions needed to grab product name

      e.preventDefault();
      console.log("start handleclick")
      try{
        setIsLoading(true);
        
        const productName = await getURL(getProductName);
        console.log("product name:", productName);

        const allResults = await Promise.all([productName]);
        console.log("product name:", productName);
        console.log("allresults:",allResults);
        setResults(allResults);
        
        setIsLoading(false);
        console.log("end handleclick");
      } catch(e){
        console.log('Error:', e);
        setIsLoading(false);
      }

  }


  return(
      <div>
        <button onClick = {handleClick} className = "btn">
          {isLoading ? 'Loading...' : 'Find Reviews'}
        </button>  
        <ReviewListing prop = {results} />
      </div>
  )
}

export default ReviewButton;