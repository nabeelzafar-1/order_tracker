const paths = global.PATHS;
const models = require(paths.models);
const Usersession = models.get("Usersession");
const UserSessions = models.get("UserSessions");
const moment = require("moment");

module.exports.topDevice = async (req, res, next) => {
  const usersession = await Usersession.aggregate([
    {
      $group: { _id: "$device", count: { $sum: 1 } },
    },
  ]);

  return usersession;
};

module.exports.userByTime = async (req, res, next) => {
  const startOfWeek = moment().startOf("week");
  const currentDate = moment().format();

  const dates = await Usersession.find({
    start: { $gte: startOfWeek, $lt: currentDate },
  }).sort({ start: 1 });

  let sumOfSconds = 0;
  let arr = [];

  for (let i = 0; i < dates.length; i++) {
    const start = moment(dates[i].start);
    const end = moment(dates[i].end) || moment().format();

    const duration = moment.duration(end.diff(start)).asSeconds();
    const found = arr.findIndex(
      (el) => el.day === moment(dates[i].start).format("dddd")
    );
    if (found != -1) {
      arr[found].dur = arr[found].dur + duration;
    } else {
      const obj = {
        day: moment(dates[i].start).format("dddd"),
        dur: duration,
      };
      arr.push(obj);
    }

    sumOfSconds = sumOfSconds + duration;
  }
  const days = [];
  const timePerday = [];
  arr.forEach((el) => {
    days.push(el.day);
    const elementDuration = el.dur / 3600;
    timePerday.push(Math.round(elementDuration * 100) / 100);
  });

  return { days, timePerday };
};

module.exports.avgTimeVsUsageByPlayerPerGame = async (req, res, next) => {
  //Usage by player per game
  const endingDate = moment().add(15, "days");
  const startingDate = moment().subtract(15, "days");

  const dates = await UserSessions.find({
    start: { $gte: startingDate, $lt: endingDate },
  }).sort({ start: 1 });

  let sumOfSconds = 0;
  let arr = [];

  for (let i = 0; i < dates.length; i++) {
    const start = moment(dates[i].start);
    const end = moment(dates[i].end) || moment().format();

    const duration = moment.duration(end.diff(start)).asSeconds();
    const found = arr.findIndex(
      (el) => el.day === moment(dates[i].start).format("dddd")
    );
    if (found != -1) {
      arr[found].dur = arr[found].dur + duration;
    } else {
      const obj = {
        dur: duration,
      };

      arr.push(obj);
    }

    sumOfSconds = sumOfSconds + duration;
  }

  const gameTimePerday = [];
  arr.forEach((el) => {
    const elementDuration = el.dur / 3600;
    gameTimePerday.push(Math.round(elementDuration * 100) / 100);
  });
  //return { gameTimePerday };

  //avg time
  const startOfWeekdays = moment().subtract(4, "days");
  const endOfWeekdays = moment().add(4, "days");

  const weekdays = await Usersession.find({
    start: { $gte: startOfWeekdays, $lt: endOfWeekdays },
  }).sort({ start: 1 });

  let sumOfSeconds = 0;
  let array = [];

  for (let i = 0; i < weekdays.length; i++) {
    const start = moment(weekdays[i].start);
    const end = moment(weekdays[i].end) || moment().format();

    const duration = moment.duration(end.diff(start)).asSeconds();
    const found = array.findIndex(
      (el) => el.day === moment(weekdays[i].start).format("dddd")
    );
    if (found != -1) {
      array[found].dur = array[found].dur + duration;
    } else {
      const obj = {
        day: moment(weekdays[i].start).format("dddd"),
        dur: duration,
      };
      array.push(obj);
    }

    sumOfSeconds = sumOfSeconds + duration;
  }

  const timePrday = [];
  array.forEach((el) => {
    const elementDuration = el.dur / 3600;
    timePrday.push(Math.round(elementDuration * 100) / 100);
  });

  return { timePrday, gameTimePerday };
};
