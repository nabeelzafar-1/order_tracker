const paths = global.PATHS;
const models = require(paths.models);
const Usersession = models.get("Usersession");
const queries = require(paths.queries);
const charts = queries.get("graph");
const controllers = require(PATHS.controllers);
const render = controllers.get("RenderController");
const Customer = require("../models/medicalPractice");

module.exports.home = async (req, res, next) => {
  //Top Devices
  // const messages = await req.consumeFlash('info');
  let perPage = 12;
  let page = req.query.page || 1;

  
  const total = await Usersession.countDocuments();
  try {
    const devices = await charts.topDevice();
    let deviceChart = [0, 0, 0];
    devices.map((item) => {
      if (item._id == "Android") {
        deviceChart[0] = (item.count / total) * 100;
      } else if (item._id == "iOS") {
        deviceChart[1] = (item.count / total) * 100;
      } else {
        deviceChart[2] = (item.count / total) * 100;
      }
    });


 
    // Weekly Users Time Per Day (Hours)
    const { days, timePerday } = await charts.userByTime();

    //Avg time vs Usage by Player Per Game
    const { gameTimePerday, timePrday } =
      await charts.avgTimeVsUsageByPlayerPerGame();

    render.render(res, "secure/home", {
      page: "home",
      deviceChart,
      days,
      timePerday,
      gameTimePerday,
      timePrday,
    });
  } catch (error) {
    console.log(error);
  }
};
