require('dotenv').config();
const connectToMongo = require('./db');
connectToMongo();

const express = require('express');
const cors = require('cors');
const session = require('express-session');
const passport = require('./Routes/auth');
const router = require('./Routes/router');

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,
    httpOnly: false,
    sameSite: 'lax'
  }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(router);

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
});
