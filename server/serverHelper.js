
module.exports = function organizeResults(results){
  /*
  Rewrites the json results for easier processing
  */ 

  const results_length = Object.keys(results).length;
  const org_Results = {};

  for (let i = 0; i<results_length; i++) {
    let post_Num = `post_${i}`;
    let temp = {};

    temp["subreddit"] = "r/" + results[i].data.subreddit;
    temp["post_title"] = results[i].data.title;
    temp["author"] = "u/" + results[i].data.author;
    temp["upvotes"] = results[i].data.ups;
    temp["post_link"] = "http://reddit.com" + results[i].data.permalink;
    temp["post-content"] = results[i].data.selftext;
    temp["post-url-override"] = results[i].data.url;
    
    org_Results[post_Num] = temp;
  }

  return org_Results;
}
