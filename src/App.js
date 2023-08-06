import './App.css';

function App() {


  return (
    <div className="App">
        <div className = "title">Reviewdit</div>
        <button className = "btn">Find Reviews</button>
        <div className = "review-listing">
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