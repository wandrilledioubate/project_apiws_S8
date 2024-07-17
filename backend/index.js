require('dotenv').config();
const connectToMongo = require('./db');
connectToMongo();

const express = require('express');
const cors = require('cors');
const session = require('express-session');
const passport = require('./Routes/auth');
const router = require('./Routes/router');

const app = express();

const port = 8080;

app.set("trust proxy", 1);

app.use(express.json());

app.use(cors());

app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: true,
    httpOnly: false,
    sameSite: 'none',
  }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(router);

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
});
