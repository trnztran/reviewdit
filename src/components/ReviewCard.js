import React, { useState } from 'react';
import './App.css';

function ReviewCard({reviewJson}){

  if(reviewJson === undefined){
    return(null)
  } else {
    return (
        <div className = "review">
            <span className="review-header">
                <p> {reviewJson.subreddit} </p>
                <p> {reviewJson.author} </p>
            </span>
            <p className = "review-title">
              {reviewJson.post_title}
            </p>
            <p className='review-content'>
              {reviewJson.post_content}
            </p>
          </div>
    )
  }
}

export default ReviewCard;