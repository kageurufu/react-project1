/* @flow */

var path = require('path'),
    express = require('express'),
    webpack = require('webpack'),
    config = require('./webpack.config.dev'),
    mock = require('./mock/mock'),
    md5 = require('md5'),
    bodyParser = require('body-parser'),
    compiler = webpack(config),
    app = express();

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/api/login', function(req, res) {
  var user = mock.users.find(function(user) {
    return user.username === req.body.username;
  });

  if (!user) {
    res.status(401).json({error: 'user does not exist'});
  } else if (user.password !== md5(req.body.password)) {
    res.status(401).json({error: 'password does not match'});
  } else {
    res.status(200).json({
      id: user.id,
      username: user.username,
      email: user.email
    });
  }
})

app.post('/api/register', function(req, res) {
  if (req.body.username && req.body.password && req.body.email) {
    if(mock.users.find((u) => {return u.username == req.body.username})) {
      res.status(403).json({error: "username already exists"});
    } else {
      var user = {
        id: mock.users.length,
        username: req.body.username,
        password: md5(req.body.password),
        email: req.body.email
      };
      mock.users.push(user);

      res.status(201).json({
        id: user.id,
        username: user.username,
        email: user.email
      });
    }
  } else {
    res.status(405).json({
      error: 'must include username, password and email'
    })
  }
})

app.listen(3000, 'localhost', function(err) {
  if(err) {
    console.error(err);
    return;
  }

  console.log("Listening at http://localhost:3000");
});
