const paths = global.PATHS;
const models = require(paths.models);
const User = models.get("User");
const UserScreenActivity = models.get("Userscreenactivity");
const services = require(paths.services);
const controllers = require(paths.controllers);
const errorHandler = services.get("apiError");
const render = controllers.get("RenderController");
const makeTokens = services.get("maketokens");
const bcrypt = require("bcrypt");
const moment = require("moment");
const constants = require(global.PATHS.constants);
const mongoose = require("mongoose");
// const objectId = mongoos.ob

module.exports.store = async (req, res, next) => {
  const user = req.user;
  if (!user) {
    res.status(500).json({ message: constants.AUTH_ERROR });
  }
  const { end, start, screen } = req.body;
  const activityCreator = {
    end,
    start,
    screen,
    owner: user._id.toObjectId(),
  };
  UserScreenActivity.create(activityCreator)
    .then((created) => {
      res.status(200).json(created);
    })
    .catch((e) => {
      const errors = errorHandler(e);
      res.status(400).json({ errors: errors });
    });
};

module.exports.endTime = async (req, res, next) => {
  const user = req.user;
  if (!user) {
    res.status(500).json({ message: constants.AUTH_ERROR });
  }
  const { _id } = req.body;
  if (!_id) {
    res.status(500).json({ message: "Screen activity id is required" });
  }
  //   const screenActivityEnd = { end, screen, owner: user._id.toObjectId() };
  await UserScreenActivity.findOne({ _id }).then((screenActivityEnd) => {
    const now = moment().format();
    // console.log("now------->>>>>>", screenActivityEnd);
    screenActivityEnd.end = now;
    screenActivityEnd
      .save()
      .then((saved) => {
        res
          .status(200)
          .json({ message: "Screen end time has been noted.", saved });
      })
      .catch((e) => {
        res.status(400).json({ errors: e });
      });
  });
};
