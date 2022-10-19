function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}
	
	tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});

	//TODO: create a new array or manipulate tweet_array to create a graph of the number of tweets containing each type of activity.
	let activityCounter = [{act: 'running', counter: 0}, {act: 'skiiing', counter: 0},{act: 'hiking', counter: 0},
					   {act: 'skating', counter: 0}, {act: 'swimming', counter: 0}, {act: 'walking', counter: 0},
					   {act: 'biking', counter: 0}, {act: 'elliptical workout', counter: 0}, {act: 'yoga', counter: 0}];

	for(let i = 0; i < tweet_array.length; i++){
		if (tweet_array[i].activityType == 'running'){
			activityCounter[0].counter++;
		}
		else if (tweet_array[i].activityType == 'skiing'){
			activityCounter[1].counter++;
		}
		else if (tweet_array[i].activityType == 'hiking'){
			activityCounter[2].counter++;
		}
		else if (tweet_array[i].activityType == 'skating'){
			activityCounter[3].counter++;
		}
		else if (tweet_array[i].activityType == 'swimming'){
			activityCounter[4].counter++;
		}
		else if (tweet_array[i].activityType == 'walking'){
			activityCounter[5].counter++;
		}
		else if (tweet_array[i].activityType == 'biking'){
			activityCounter[6].counter++;
		}
		else if (tweet_array[i].activityType == 'elliptical workout'){
			activityCounter[7].counter++;
		}
		else if (tweet_array[i].activityType == 'yoga'){
			activityCounter[8].counter++;
		}
	}

	let sorted_array = activityCounter.sort((a, b) => a.counter - b.counter)


	document.getElementById('numberActivities').textContent = Object.keys(activityCounter).length;
	document.getElementById('firstMost').textContent = sorted_array[8].act;
	document.getElementById('secondMost').textContent = sorted_array[7].act;
	document.getElementById('thirdMost').textContent = activityCounter[6].act;



	activity_vis_spec = {
	  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
	  "description": "A graph of the number of Tweets containing each type of activity.",
	  "data": {
	    "values": tweet_array
	  }
	  //TODO: Add mark and encoding
	};
	vegaEmbed('#activityVis', activity_vis_spec, {actions:false});

	//TODO: create the visualizations which group the three most-tweeted activities by the day of the week.
	//Use those visualizations to answer the questions about which activities tended to be longest and when.
}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	loadSavedRunkeeperTweets().then(parseTweets);
});