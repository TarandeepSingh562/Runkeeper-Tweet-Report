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

	var completedEvents = 0;
	var liveEvents = 0;
	var achievements = 0;
	var miscellaneous = 0;
	var written = 0;

	for (let i = 0; i < tweet_array.length; i++) {
		if(tweet_array[i].source == "completed_event"){
			completedEvents += 1;
			if(tweet_array[i].written){
				written += 1
			}
		}
		else if (tweet_array[i].source == "live_event"){
			liveEvents += 1;
		}
		else if (tweet_array[i].source == "achievement"){
			achievements += 1;
		}
		else if (tweet_array[i].source == "miscellaneous" ){
			miscellaneous += 1;
		}
	}

	var total = (completedEvents + liveEvents + achievements + miscellaneous);
	var completedEventsPct = 0;
	var liveEventsPct = 0; 
	var achievementsPct = 0;
	var miscellaneousPct = 0;

	completedEventsPct = ((completedEvents/total) * 100).toFixed(2) + "%";
	liveEventsPct = ((liveEvents/total) * 100).toFixed(2) + "%";
	achievementsPct = ((achievements/total) * 100).toFixed(2) + "%";
	miscellaneousPct = ((miscellaneous/total) * 100).toFixed(2) + "%";
	writtenPct = ((written/total) * 100).toFixed(2) + "%";

	$(".completedEvents").text(completedEvents);
	$(".liveEvents").text(liveEvents)
	$(".achievements").text(achievements)
	$(".miscellaneous").text(miscellaneous)
	$(".written").text(written)
	$(".completedEventsPct").text(completedEventsPct)
	$(".liveEventsPct").text(liveEventsPct)
	$(".achievementsPct").text(achievementsPct)
	$(".miscellaneousPct").text(miscellaneousPct)
	$(".writtenPct").text(writtenPct)

	//This line modifies the DOM, searching for the tag with the numberTweets ID and updating the text.
	//It works correctly, your task is to update the text of the other tags in the HTML file!
	document.getElementById(`numberTweets`).innerText = tweet_array.length;	
}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	loadSavedRunkeeperTweets().then(parseTweets);
});
