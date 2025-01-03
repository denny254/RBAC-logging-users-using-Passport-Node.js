const express = require("express");
const createHttpError = require("http-errors");
const morgan = require("morgan");
const mongoose = require("mongoose");
require("dotenv").config();
const session = require("express-session");
const passport = require("passport");
const MongoStore = require("connect-mongo"); 
const connectEnsureLogin = require("connect-ensure-login");
const flash = require("connect-flash");


// Initialization
const app = express();
app.use(morgan("dev"));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Init session with connect-mongo
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
    },
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
      dbName: process.env.DB_NAME,
    }),
  })
);


// Initialize connect-flash
app.use(flash());

// Middleware to pass flash messages to views
app.use((req, res, next) => {
  res.locals.messages = req.flash();
  res.locals.user = req.user;
  next();
});


// For Passport JS Authentication
app.use(passport.initialize());
app.use(passport.session());
require('./utils/passport.auth');



// Connect to MongoDB
const ConnectDB = async () => {
  let db = process.env.MONGODB_URI;
  if (process.env.Environment === "dev" || process.env.Environment === "test") {
    db = `${process.env.MONGODB_URI}/${process.env.DB_NAME}`;
  }

  try {
    await mongoose.connect(db);
    console.log(`Connected to MongoDB`);
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
};

ConnectDB();

// Routes
app.use("/", require("./routes/index.route"));
app.use("/auth", require("./routes/auth.route"));
app.use("/user", connectEnsureLogin.ensureLoggedIn({redirectTo: '/auth/login'}), require("./routes/user.route"));

app.use((req, res, next) => {
  next(createHttpError(404, "Not Found"));
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.render("error_40x", { error });
});

const PORT = process.env.PORT || 3000;

// function ensureAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) {
//     return next();
//   }
//   res.redirect('/auth/login');
// }
