import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import exphbs from 'express-handlebars';
import connectDB from './config/db.mjs';
import routes from './routes/index.mjs';
import variables from './cjs.js'

const {__dirname} = variables;

// Load Global configs
dotenv.config({ path: './config/config.env' });

connectDB();

const app = express();

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Setup Handlebars Engine
app.engine('.hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', '.hbs');

// Static Files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', routes);

app.listen();

const PORT = process.env.PORT;
console.log(PORT);

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`),
);
