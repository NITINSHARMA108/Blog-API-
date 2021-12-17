const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

require('dotenv').config();

app.use(cors());
app.use(bodyParser.json());
const routes = require('./routes/index');

const mongoDb = process.env.CONNECTION;
mongoose.connect(mongoDb, { useUnifiedTopology: true, useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongo connection error'));

app.use(
  session({
    secret: 'session storage tutorial',
    resave: false,
    saveUninitialized: true,
    cookie: {
      _expires: 1000 * 60 * 60 * 24,

    },
  }),
);
require('./config/passport');

app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

app.use(routes);
const port = process.env.port || 5000;

app.listen(port, () => console.log(`listening to ${port}`));
