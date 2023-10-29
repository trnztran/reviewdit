import React, { useEffect, useState } from 'react';
import './App.css';

function ReviewCard({reviewJson}){
  useEffect(()=> {
    console.log("review cards: ", reviewJson);
  },[reviewJson]);

  if(reviewJson === undefined){
    return(null)
  } else {
    return (
        <div className = "review-listing">
          {Object.keys(reviewJson).map(key => (
            <div className = "review" key = {key}>
              <span className="review-header">
                  <p> {reviewJson[key].subreddit} </p>
                  <p> {reviewJson[key].author} </p>
              </span>
              <p className = "review-title">
                {reviewJson[key].post_title}
              </p>
              <p className='review-content'>
                {reviewJson[key].post_content}
              </p>
            </div>
            ))}
          </div>
    )
  }
}

export default ReviewCard;