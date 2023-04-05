var path = require("path");
const throng = require("throng");
const extendPrototypes = require("./extendPrototypes");
extendPrototypes();

throng({
  // master: masterStartFunction,
  // worker: workerStartFunction,
  count: 1,
  worker: () => {
    const express = require("express");
    const mongoose = require("mongoose");
    const app = express();
    var cookieParser = require("cookie-parser");
    const passport = require("passport");
    require("dotenv").config();
    const session = require("express-session");
    var MongoDBStore = require("connect-mongodb-session")(session);
    var store = new MongoDBStore({
      uri: process.env.DATABASE,
      collection: "loginsessions",
    });
    var favicon = require("serve-favicon");
    global.PATHS = {
      controllers: `${__dirname}/controllers`,
      models: `${__dirname}/models`,
      routes: `${__dirname}/routes`,
      services: `${__dirname}/services`,
      middlewares: `${__dirname}/middleware`,
      queries: `${__dirname}/queries`,
      constants: `${__dirname}/constants.js`,
    };
    app.use(passport.initialize());
    //
    app.use(require("cookie-parser")(process.env.SESSION_SECRET));
    app.use(
      session({
        secret: process.env.SESSION_SECRET,
        cookie: {
          maxAge: 1000 * 60 * 60 * 24, // 1 day
        },
        store: store,
        resave: true,
        saveUninitialized: true,
      })
    );
    // middleware
    app.use(express.static("public"));
    // const mustacheExpress = require('mustache-express');
    const engine = require("ejs");
    // view engine
    // app.engine("html", engine.__express);
    app.set("view engine", "ejs");
    app.set("views", path.join(__dirname, "views"));
    app.use(express.json());

    const csrf = require("csurf");
    const bodyParser = require("body-parser");

    var csrfProtection = csrf({ cookie: true });
    var parseForm = bodyParser.urlencoded({ extended: false });
    app.get("*", csrfProtection, function (req, res, next) {
      res.locals._csrf = req.csrfToken();
      next();
    });

    // app.post("*", parseForm, (req, res, next) => {
    //     next();
    // });
    var flash = require("express-flash");
    app.use(flash());
    
    app.use(function (req, res, next) {
      // if there's a flash message in the session request, make it available in the response, then delete it
      res.locals.flash = req.session.flash;
      delete req.session.flash;
      next();
    });
    // app.use(function(req, res, next) {
    //     res.locals.success = req.flash('success');
    //     res.locals.error = req.flash('error');
    //     next();
    // });
    // app.use(bodyParser.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(function (req, res, next) {
      if (req.session && req.session.user) {
        res.locals.user = req.session.user;
        next();
      } else {
        next();
      }
    });
    // app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
    // database connection
    const dbURI = process.env.DATABASE;
    const port = process.env.PORT;
    mongoose
      .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
      .then((result) => {
        app.listen(port || 3000);
        console.log(`Server is listing on port: ${port}`);
      })
      .catch((err) => console.log(err));
    process.on("SIGINT", function () {
      mongoose.connection.close(function () {
        process.exit(0);
      });
    });

    function requireHTTPS(req, res, next) {
      if (
        !req.secure &&
        req.get("x-forwarded-proto") !== "https" &&
        process.env["NODE_ENV"] !== "development" &&
        process.env["IS_HEROKU"]
      ) {
        return res.redirect("https://" + req.get("host") + req.url);
      }
      next();
    }
    app.use(requireHTTPS);

    process.on("unhandledRejection", (reason, p) => {
      console.log("Unhandled Rejection at: Promise", p, "reason:", reason);
      // application specific logging, throwing an error, or other logic here
    });
    app.use(require("sanitize").middleware);
    require(global.PATHS.routes)(app);
  },
});
