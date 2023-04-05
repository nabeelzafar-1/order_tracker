const paths = global.PATHS;
const models = require(paths.models);
const User = models.get("User");
const UserSession = models.get("Usersession");
const services = require(paths.services);
const controllers = require(paths.controllers);
const errorHandler = services.get("apiError");
const render = controllers.get("RenderController");
const makeTokens = services.get("maketokens");
const bcrypt = require("bcrypt");
const moment = require("moment");
const constants = require(global.PATHS.constants);
const mongoose = require("mongoose");

module.exports.usersession = async (req, res, next) => {
  const user = req.user;
  if (!user) {
    res.status(500).json({ message: constants.AUTH_ERROR });
  }
  const { device, long, lat, country, state, city, start, ip } = req.body;
  console.log("getting this in body ======>", req.body);
  const sessionInfo = {
    device,
    long,
    lat,
    country,
    state,
    city,
    start,
    ip,
    owner: user._id.toObjectId(),
  };
  await UserSession.create(sessionInfo)
    .then((created) => {
      res.status(200).json(created);
    })
    .catch((e) => {
      const errors = errorHandler(e);
      res.status(400).json({ errors: errors });
    });
};

module.exports.end = async (req, res, next) => {
  const user = req.user;
  if (!user) {
    res.status(500).json({ message: constants.AUTH_ERROR });
  }
  const { _id } = req.body;
  if (!_id) {
    res.status(500).json({ message: "Session id is required" });
  }
  //   const screenActivityEnd = { end, screen, owner: user._id.toObjectId() };
  await UserSession.findOne({ _id }).then((sessionEnd) => {
    const now = moment().format();
    // console.log("now------->>>>>>", screenActivityEnd);
    sessionEnd.end = now;
    sessionEnd
      .save()
      .then((saved) => {
        res
          .status(200)
          .json({ message: "Session end time has been noted.", saved });
      })
      .catch((e) => {
        res.status(400).json({ errors: e });
      });
  });
};

module.exports.google = async (req, res, next) => {};
