// const express = require('express');
const Router = require("express").Router();
const fs = require("fs");
const path = require("path");
const PATHS = global.PATHS;
const controllers = require(PATHS.controllers);
const renderController = controllers.get("RenderController");
const ROUTES_PATH = PATHS.routes;
const middlewares = require(PATHS.middlewares);
const authMiddleware = middlewares.get("auth.auth");
const ROUTE_FILE_EXTENSION = ".js";
const MedicalPractice = require("../models/medicalPractice");
const MedicalProfessional = require("../models/medicalProfessional");
/**
 * recursively builds routes for all files in a directory and its subdirectories
 * @param routePath: path to directory to read files of and build routes for
 * @param {optional} baseRoute: ex files in the 'User' directory will have base route as '/user'
 * @param {optional} router: router to use instead of creating one
 * @return Express Router
 */
const buildRoutesForPath = (routePath, baseRoute = "", router) => {
  let r = router || Router;
  let p =
    routePath[routePath.length - 1] == "/"
      ? routePath.substr(0, routePath.length - 1)
      : routePath; // format to remove trailing '/'
  let subdirs = []; // dirs to recurse to
  // NOTE: it is important to 'require' all files before recursing to sub-directories as the 'index.js' file for each main sub-route will contain preconfigurations for all routes in its subdirectories
  fs.readdirSync(p).forEach((item) => {
    const ITEM_PATH = `${p}/${item}`;
    const stats = fs.statSync(ITEM_PATH);
    if (!stats.isDirectory()) {
      if (ITEM_PATH.indexOf(ROUTE_FILE_EXTENSION) != -1) {
        const definer = require(ITEM_PATH);
        if (typeof definer == "function") {
          definer(r, baseRoute);
        }
      }
    } else {
      subdirs.push(item);
    }
  });
  subdirs.forEach((subDir) =>
    buildRoutesForPath(
      `${p}/${subDir}`,
      `${baseRoute}/${subDir.toLowerCase()}`,
      r
    )
  ); // recurse
  return r;
};

/**
 * defines routes
 * @param app: express app to define all routes for
 */
const routeInitalizer = (app) => {

    app.get('/', (req, res, next) => {
        // console.log("in route ///", req.flash('error'));
        if (req.session && req.session.user) {
            res.redirect('secure/home')
        } else {
            renderController.render(res, 'public/login', { page: 'login' })
        }
    });
    app.get('/register', (req, res, next) => {
      renderController.render(res, 'public/register', { page: 'register' })
    });
    app.get('/medicalpractic/add', async(req, res, next) => {
      const medicalPractices = await MedicalPractice.find({})
      console.log("cu",medicalPractices)
      renderController.render(res, 'secure/medicalPractices/add', { page: 'add', medicalPractices})
    

    });

    app.get('/medicalprofessional/add/:id', async(req, res, next) => {
        const medicalPractice = await MedicalPractice.findOne({_id:req.params.id})
        const medicalProfessional = await MedicalProfessional.find({})
        console.log("md",medicalProfessional)
      renderController.render(res, 'secure/medicalprofessional/add', { page: 'add', medicalPractice,medicalProfessional })
    });
    // app.get('/', (req, res, next) => {
    //   renderController.render(res, '/coutomer', { page: 'coutomer' })
    // });
    app.get('/forbidden', (req, res, next) => {
        // console.log("in route ///", req.flash('error'));
        renderController.render(res, '403', { page: '403' })
    });

    app.use('/api', buildRoutesForPath(`${ROUTES_PATH}/api`));
    app.use('/public', buildRoutesForPath(`${ROUTES_PATH}/public`));
    app.use('/secure', userMiddleware, buildRoutesForPath(`${ROUTES_PATH}/secure`));
    // app.use('/admin', adminMiddleware, buildRoutesForPath(`${ROUTES_PATH}/admin`))
};
adminMiddleware = async (req, res, next) => {
  console.log("in admin middleware");
  const user = req.session.user;
  // decode token
  if (req.session && user) {
    if (user.status == "DISABLED") {
      req.session.flash = {
        class: "danger",
        type: "error",
        message:
          "Your account has been Disabled please contact at support@klg.com",
      };
      res.redirect("/");
    } else if (user.role == "ADMIN" || user.role == "SUPER_ADMIN") {
      req.user = user;
      next();
    } else {
      req.session.flash = {
        class: "danger",
        type: "error",
        message: "Forbidden",
      };
      res.redirect("/forbidden");
    }
  } else {
    req.session.flash = {
      class: "danger",
      type: "error",
      message: "Please Login",
    };
    res.redirect("/");
    // res.status(401).json({ message: 'No token provided.' });
  }
};
userMiddleware = async (req, res, next) => {
  console.log("in indexxxx");
  const user = req.session.user;
  // decode token
  if (req.session && user) {
    if (user.status == "DISABLED") {
      req.session.flash = {
        class: "danger",
        type: "error",
        message:
          "Your account has been Disabled please contact at support@klg.com",
      };
      res.redirect("/");
      req.session.destroy();
    } else {
      console.log("session-->>", req.session.user);
      req.user = user;
      next();
    }
    // verifies secret and checks exp
    // jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
    //     if (err) {
    //         console.log(err);
    //         res.status(401).json({ message: 'Invalid token.' });
    //     } else {
    //         console.log(decoded);
    //         const id = decoded.id;
    //         User.findOne({ _id: id }).then(user => {
    //             if (!user) {
    //                 res.status(401).json({ message: 'Invalid token no user.' });
    //             }
    //             console.log(user);
    //             req.user = user;
    //             next();
    //         }).catch(err => {
    //             throw err;
    //         });
    //     }
    // });
  } else {
    req.session.flash = {
      class: "danger",
      type: "error",
      message: "Please Login",
    };
    res.redirect("/");
    // res.status(401).json({ message: 'No token provided.' });
  }
};
module.exports = routeInitalizer;
