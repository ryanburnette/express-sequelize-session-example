var express = require('express');
var db = require('./db');
var session = require('express-session');
var SequelizeStore = require('connect-session-sequelize')(session.Store);

var app = express();
app.use(require('body-parser')());

app.use(session({
  secret: 'keyboard cat', //TODO review
  resave: false,
  saveUninitialized: true,
  maxAge: 604800000,
  store: new SequelizeStore({
    db: db,
    table: 'Session'
  }),
  domain: 'demo123.local'
}));

app.use(function (req,res,next) {
  if (!req.session.views) {
    req.session.views = 0;
  }
  req.session.views = req.session.views + 1;
  console.log('session',req.session);
  next();
});

app.get('/api/users',function (req,res) {
  db.User.findAll()
    .then(function (users) {
      res.json(users);
    });
});

app.post('/api/users/create',function (req,res) {
  db.User.create(req.body)
    .then(function (results) {
      res.json(results);
    })
    .catch(function (err) {
      res.sendStatus(500);
    });
});

app.get('/api/users/:id',function (req,res) {
  db.User.findOne({
    where: {
      id: req.params.id
    }
  })
    .then(function (user) {
      res.json(user);
    })
    .catch(function (err) {
      res.sendStatus(500);
    });
});

app.listen(3069);
