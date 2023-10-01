import React from 'react';
import './App.css';

function ReviewListing({prop}) {
    console.log("from reviewlisting:", prop);
    return (
        <div className = "review-listing">
            <p className='review-search-title'>
                {/* Showing reviews for 
                {prop[0]}... */}
                
                
                      <ul>
        {prop.map((result, index) => (
          <li key={index}>{result}</li>
        ))}
      </ul>
            </p>
        </div>
    )
}

export default ReviewListing;