import React from 'react';
import './App.css';

function ReviewListing({productName}) {

    if(productName === undefined){
        return(null)
    } else {
        return (
            <div className = "review-listing">
                <p className='review-search-title'>
                    Showing reviews for 
                    {productName}...
                </p>
            </div>
        )  
    }
}

export default ReviewListing;