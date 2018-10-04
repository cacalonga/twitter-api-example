const express = require('express');
const Instagram = require('node-instagram').default;

const instagram = new Instagram({
    clientId: 'bd18e6ed71d843c39bcd231288714636',
    clientSecret: 'fbaeeff8152b46329fedff3f2b4367dd',
});

const redirectUri = 'http://localhost:3000/users';

/* 
module.exports = function (app) {

    // Redirect user to instagram oauth
    app.get('/auth/instagram', (req, res) => {
        res.redirect(instagram.getAuthorizationUrl(redirectUri, { scope: ['basic'] }));
    });

    // Handle auth code and get access_token for user
    app.get('/users', async (req, res) => {
        try {
            const data = await instagram.authorizeUser(req.query.code, redirectUri);
            // access_token in data.access_token
            res.json(data);
        } catch (err) {
            res.json(err);
        }
    });

} */