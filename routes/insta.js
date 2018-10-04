var express = require('express');
var router = express.Router();
var insta = require("node-instagram").default;

var listDummyDB = [];
var streamDummyDB = [];

const instagram = new insta({
    clientId: 'bd18e6ed71d843c39bcd231288714636',
    clientSecret: 'fbaeeff8152b46329fedff3f2b4367dd ',
    accessToken: '6975648601.bd18e6e.14f605b33f0741709472dc2ca2a3d812'
});

const stream = instagram.stream('tags/cacalonga/media/recent');


stream.on('messages', (messages) => {
    streamData = messages;
    streamDummyDB.push(messages);
    console.log(messages);
});


stream.on('error', (err) => {
   //console.log(err);
});

router.post('/str', function (req, res, next) {
    res.status(200).json({ instaStream: streamDummyDB[(streamDummyDB.length - 1)] });
});

router.get('/', function (req, res, next) {
    instagram.get('tags/cacalonga/media/recent').then((data) => {
        var datalenght = Object.keys(data.data).length;
        for (let i = 0; i < datalenght; i++) {
            listDummyDB.push(data.data[i]);
        }
        res.render('insta', { listDummyDB: listDummyDB });
        console.log(listDummyDB);
        listDummyDB = [];
    });
});
module.exports = router;