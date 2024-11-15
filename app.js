const express = require('express');
const createHttpError = require('http-errors');
const morgan = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config();
const session = require('express-session');
const connectFlash = require('connect-flash');


//Initialization
const app = express();
app.use(morgan('dev'));
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));


// Init session 
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    // secure: true,
    httpOnly: true,
  }
})
);

app.use(connectFlash());
app.use((req, res, next) => {
  res.locals.messages = req.flash();
  next();
});



// Connect to MongoDB
const ConnectDB = async () => {
  let db = "";


  if (process.env.Environment === "dev" || process.env.Environment === "test") {
    db = `${process.env.MONGODB_URI}/${process.env.DB_NAME}`;
} else {
    db = `${process.env.MONGODB_URI}`;
}

  try {
    await mongoose.connect(db); 
    console.log(`Connected....`);
    app.listen(PORT, () => {
        console.log(`on port ${PORT}`);
        });
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1); 
  }
};

ConnectDB(); 

// Routes
app.use('/', require('./routes/index.route'));
app.use('/auth', require('./routes/auth.route'));
app.use('/user', require('./routes/user.route'));



app.use((req, res, next) => {

});

app.use((error, req, res, next) => {
  error.status = error.status || 500;
  res.status(error.status);
  res.render('error_40x', {error});
});

const PORT = process.env.PORT || 3000;



