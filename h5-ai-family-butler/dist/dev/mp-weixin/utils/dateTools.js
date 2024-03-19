"use strict";
const common_vendor = require("../common/vendor.js");
const DATE_FORMAT = "YYYY-MM-DD";
const MONTH_FORMAT = "YYYY年MM月";
const getWeekDays = (date) => {
  const startIndex = 0;
  const endIndex = 7;
  const weekdays = [];
  for (let i = startIndex; i < endIndex; i++) {
    const _date = common_vendor.dayjs(date).startOf("week").add(i, "day");
    const dayItem = {
      date: _date,
      day: _date.format("D"),
      dateStr: _date.format(DATE_FORMAT)
    };
    weekdays.push(dayItem);
  }
  return weekdays;
};
const getTimeInterval = (start, end) => {
  const interval = common_vendor.dayjs(start).diff(end, "day");
  if (interval === 0) {
    return "今天";
  } else if (interval === -1) {
    return "明天";
  } else if (interval === 1) {
    return "昨天";
  } else if (interval > 0) {
    return `${interval > 99 ? "99+" : interval}天前`;
  } else {
    const absinterval = Math.abs(interval);
    return `${absinterval > 99 ? "99+" : absinterval}天后`;
  }
};
const getCutdown = (time) => {
  const endTime = common_vendor.dayjs(time);
  const nowTime = common_vendor.dayjs();
  if (endTime.valueOf() < nowTime.valueOf()) {
    return `0时0分0秒`;
  }
  const interval = endTime.diff(nowTime, "day");
  if (interval > 0) {
    return `剩余${interval}天`;
  }
  if (interval === 0) {
    const second = endTime.diff(nowTime, "second");
    const hour = parseInt(second / 60 / 60 % 24);
    const minute = parseInt(second / 60 % 60);
    const s = parseInt(second % 60);
    return `${hour}时${minute}分${s}秒`;
  }
  return "";
};
exports.DATE_FORMAT = DATE_FORMAT;
exports.MONTH_FORMAT = MONTH_FORMAT;
exports.getCutdown = getCutdown;
exports.getTimeInterval = getTimeInterval;
exports.getWeekDays = getWeekDays;
