"use strict";
const utils_request = require("../utils/request.js");
const main = {
  // 查询会员权益信息
  getRecommendList: (data) => utils_request.http.post("/api/recommend/config/homepage", data)
};
exports.main = main;
