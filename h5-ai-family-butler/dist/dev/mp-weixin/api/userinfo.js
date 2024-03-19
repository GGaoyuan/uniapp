"use strict";
const utils_request = require("../utils/request.js");
const userInfo = {
  // 查询会员权益信息
  changeHeadImg: (data) => utils_request.http.post("/api/settings/user/changeHeadImg", data),
  // 变更用户性别
  saveSex: (data) => utils_request.http.post("/api/settings/user/saveSex", data)
};
exports.userInfo = userInfo;
