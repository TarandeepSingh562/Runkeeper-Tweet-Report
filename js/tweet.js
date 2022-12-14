"use strict";
class Tweet {
    constructor(tweet_text, tweet_time) {
        this.text = tweet_text;
        this.time = new Date(tweet_time); //, "ddd MMM D HH:mm:ss Z YYYY"
    }
    //returns either 'live_event', 'achievement', 'completed_event', or 'miscellaneous'
    get source() {
        if (this.text.includes("completed") || this.text.includes("posted")) {
            return "completed_event";
        }
        else if (this.text.startsWith('Achieved') || this.text.includes("set a goal")) {
            return "achievement";
        }
        else if (this.text.includes("right now")) {
            return "live_event";
        }
        else {
            return "miscellaneous";
        }
        //TODO: identify whether the source is a live event, an achievement, a completed event, or miscellaneous.
    }
    //returns a boolean, whether the text includes any content written by the person tweeting.
    get written() {
        //TODO: identify whether the tweet is written
        if (this.text.includes('-') && !this.text.includes('TomTom')) {
            return true;
        }
        return false;
    }
    get writtenText() {
        if (!this.written) {
            return "";
        }
        //TODO: parse the written text from the tweet
        const startIndex = this.text.indexOf('- ');
        const endIndex = this.text.indexOf('http');
        return this.text.substring(startIndex + 1, endIndex);
    }
    get activityType() {
        if (this.source != 'completed_event') {
            return "unknown";
        }
        if (this.text.includes('ski run')) {
            return "skiing";
        }
        else if (this.text.includes('mi run') || this.text.includes('km run')) {
            return "running";
        }
        else if (this.text.includes('hike')) {
            return "hiking";
        }
        else if (this.text.includes('skate')) {
            return "skating";
        }
        else if (this.text.includes('swim')) {
            return "swimming";
        }
        else if (this.text.includes('walk')) {
            return 'walking';
        }
        else if (this.text.includes('bike')) {
            return 'biking';
        }
        else if (this.text.includes('elliptical workout')) {
            return "elliptical workout";
        }
        else if (this.text.includes('yoga')) {
            return "yoga";
        }
        else if (this.text.includes('chair ride')) {
            return "chair riding";
        }
        else if (this.text.includes('Freestyle')) {
            return "freestyling";
        }
        else if (this.text.includes('row')) {
            return "rowing";
        }
        else if (this.text.includes('circuit workout')) {
            return "circuit workout";
        }
        else if (this.text.includes('mtn bike')) {
            return "mtn bike";
        }
        else if (this.text.includes('MySports Freestyle')) {
            return "mysports freestyle";
        }
        else if (this.text.includes('nordic walk')) {
            return "nordic walk";
        }
        //TODO: parse the activity type from the text of the tweet
        return "unknown";
    }
    get distance() {
        var distance = 0;
        if (this.source != 'completed_event') {
            return 0;
        }
        else {
            if (this.text.includes(" mi ")) {
                const index1 = this.text.indexOf(" mi ");
                const index2 = this.text.indexOf(" a ");
                const result = this.text.substring(index1, index2 + 3);
                const result_trim = result.trim();
                distance = parseFloat(result_trim);
            }
            else if (this.text.includes(" km ")) {
                const index1 = this.text.indexOf(" km ");
                const index2 = this.text.indexOf(" a ");
                const result = this.text.substring(index1, index2 + 3);
                const result_trim = result.trim();
                distance = parseFloat(result_trim) / 1.609;
            }
        }
        //TODO: prase the distance from the text of the tweet
        return distance;
    }
    getHTMLTableRow(rowNumber) {
        //TODO: return a table row which summarizes the tweet with a clickable link to the RunKeeper activity
        var tweet = this.text.split(" ");
        for (let i = 0; i < tweet.length; i++) {
            if (tweet[i].includes('#Runkeeper') || tweet[i].includes('https:')) {
                tweet[i] = "<" + "a" + "href" + "=" + tweet[i] + ">" + tweet[i] + "<" + "/" + "a" + ">";
            }
        }
        var theTweets = tweet.join(" ");
        return "<tr><td>" + rowNumber + "</td><td>" + this.activityType + "</td><td>" + theTweets + "</td></tr>";
    }
}
