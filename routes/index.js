var express = require('express');
var router = express.Router();
var T = require("../system/twit");

var listDummyDB = [];
var streamDummyDB = [];
var i = 0;
// stream function
var stream = T.stream('statuses/filter', { track: ['#vwarena', '@vwarena'] });

stream.on('tweet', function (tweet) {
  streamData = tweet;
  streamDummyDB.push(tweet);
  //console.log("----------------------------------------------");
  //console.log(streamDummyDB[(streamDummyDB.length - 1)]);
  //console.log("----------------------------------------------");
});

router.post('/str', function (req, res, next) {

  //console.log(req.body.twtClr);
  res.status(200).json({ tweets: streamDummyDB[(streamDummyDB.length - 1)] });
  if (i == 30) {
    streamDummyDB = [];
    i = 0;
  }
  i++;

  console.log(streamDummyDB.length + " - " + i);

});

/* GET home page. */

router.get('/', function (req, res, next) {

  T.get('search/tweets', { q: 'facebook', count: 100 }, function (err, data, response) {

    var datalenght = Object.keys(data.statuses).length;
    
    console.log(response);

    for (let i = 0; i < datalenght; i++) {

      listDummyDB.push(data.statuses[i]);

    }
    res.render("index", { tweetList: listDummyDB });
    console.log(Object.keys(data.statuses).length);
  })

  console.log(listDummyDB.length);

});

module.exports = router;
