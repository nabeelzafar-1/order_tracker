const paths = global.PATHS;
const models = require(paths.models);
const User = models.get("User");
const bcrypt = require("bcrypt");
const moment = require("moment");

/**
 *
 * @param {*} res our response object
 * @param {*} page the page to be rendered into view
 * @param {*} options the object that contains the data to be passed to the view
 */

module.exports.render = (res, page, options) => {
  res.render(page, options);
};
