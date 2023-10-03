import React from 'react';
import './App.css';

function ReviewListing({prop}) {

    return (
        <div className = "review-listing">
            <p className='review-search-title'>
                Showing reviews for 
                {prop}...
            </p>
        </div>
    )
}

export default ReviewListing;