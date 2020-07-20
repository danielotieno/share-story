const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const connectDB = require('./config/db');
const indexRoute = require('./routes/index');
const authRoute = require('./routes/auth');
const storyRoute = require('./routes/stories');
const passportAuth = require('./config/passport');

// Load Global configs
dotenv.config({ path: './config/config.env' });

// Passport Config
passportAuth(passport);

connectDB();

const app = express();

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

// parse application/json
app.use(express.json());

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Handlebars helpers

const { formatDate, stripTags, truncate, editIcon } = require('./helpers/hbs');

// Setup Handlebars Engine
app.engine(
  '.hbs',
  exphbs({
    helpers: { formatDate, stripTags, truncate, editIcon },
    defaultLayout: 'main',
    extname: '.hbs',
  }),
);
app.set('view engine', '.hbs');

// Express sessions
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  }),
);

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

// Setup Global variable
app.use(function (rrq, res, next) {
  res.locals.user = req.user || null;
  next();
});

// Static Files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', indexRoute);
app.use('/auth', authRoute);
app.use('/stories', storyRoute);

app.listen();

const PORT = process.env.PORT;
console.log(PORT);

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`),
);
