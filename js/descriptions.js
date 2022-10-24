function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}

	tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});
}


function addEventHandlerForSearch() {
	//TODO: Search the written tweets as text is entered into the search box, and add them to the table
	$('#textFilter').keyup(event => {
		$('#searchText').text(event.target.value);

		if(event.target.value == ''){
			$("#tweetTable").empty();
		}

		else {
			$("#tweetTable").empty();

			var searchTweets = tweet_array.filter(function(i) {
				if(i.written){
					var search = $("#searchText").text();
					return i.text.toLowerCase().includes(search.toLowerCase());
				}
			});
			$("#searchCount").text(searchTweets.length);

			for(let i = 0; i < searchTweets.length; i++) {
				$("#tweetTable").append(searchTweets[i].getHTMLTableRow(i + 1));
			}
		}
	});
}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	addEventHandlerForSearch();
	loadSavedRunkeeperTweets().then(parseTweets);
});