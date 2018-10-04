var express = require('express');
var router = express.Router();

const Instagram = require('node-instagram').default;

const instagram = new Instagram({
  clientId: 'bd18e6ed71d843c39bcd231288714636',
  clientSecret: 'fbaeeff8152b46329fedff3f2b4367dd',
});

const redirectUri = 'http://localhost:3000/auth/instagram/callback';

/* GET users listing. */
router.get('/', function (req, res, next) {

});
router.get('/instagram', function (req, res, next) {
  res.redirect(instagram.getAuthorizationUrl(redirectUri, { scope: ['basic'] }));
});


router.get('/instagram/callback', function (req, res, next) {
  
  try {
    const data = instagram.authorizeUser(req.query.code, redirectUri);
    // access_token in data.access_token
    res.json(data);
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;
