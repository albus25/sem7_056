var express = require('express');
var redis = require('redis');
var Session = require('express-session');
var redisStore = require('connect-redis')(Session);
var bodyParser = require('body-parser');
var client = redis.createClient();
var app = express();

app.use(session({
    secret: 'INDIAN',
    store: new redisStore({ host:'localhost', port: 6379, client:client, ttl: 260}),
    saveUninitiaized: false,
    resave: false
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req,res) => {
    if(req.session.key) 
    {
        res.redirect('/login');
    } 
    else 
    { 
        res.render('loginApplication.html');
    }
});

app.post('/login', (req,res) => {
    req.session.destroy( (err) => {
        if(err) 
            console.log(err)
        else 
            res.redirect('/');
    })
});

app.listen(3000);