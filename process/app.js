'use strict';

var Twitter = require('twitter');
var Q       = require('q');

exports.getData = function(settings){
    var deferred = Q.defer();
    
    var client = new Twitter({
        consumer_key: process.env.TWITTER_CONSUMER_KEY,
        consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
        access_token_key: process.env.TWITTER_ACCESS_TOKEN,
        access_token_secret: process.env.TWITTER_ACCESS_SECRET
    });
    
    var params = {q: settings.query}//, count:100};
    client.get('search/tweets', params, function(error, tweets, response){
        
        if (error) {
            deferred.reject(error);
        }
        
        deferred.resolve(tweets.statuses.map(pruneData));
    });
  

    return deferred.promise;
    
};

function pruneData(tweet){
    var user = tweet.user;
    return {
        created_at: tweet.created_at,
        text: tweet.text,
        retweet_count: tweet.retweet_count,
        favorite_count: tweet.favorite_count,
        user:{
            name:user.name,
            screen_name:user.screen_name,
            location:user.location,
            followers_count:user.followers_count,
            created_at:user.created_at
        },
        geo: tweet.geo,
        place: tweet.place
    };
}