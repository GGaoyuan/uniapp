"use strict";
const utils_request = require("../utils/request.js");
const activity = {
  // 分享接口
  share: (data) => utils_request.http.post("/spring/activity/share", data)
};
exports.activity = activity;
