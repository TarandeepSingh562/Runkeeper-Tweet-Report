function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}

	tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});

	var earliestTweet = tweet_array[tweet_array.length-1];
	var lastTweet = tweet_array[0];
	var options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
	$('#firstDate').text(earliestTweet.time.toLocaleDateString('en-US', options));
	$('#lastDate').text(lastTweet.time.toLocaleDateString('en-US', options));


	
	//This line modifies the DOM, searching for the tag with the numberTweets ID and updating the text.
	//It works correctly, your task is to update the text of the other tags in the HTML file!
	document.getElementById(`numberTweets`).innerText = tweet_array.length;	
}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	loadSavedRunkeeperTweets().then(parseTweets);
});
