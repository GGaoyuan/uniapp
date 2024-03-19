"use strict";
const utils_request = require("../utils/request.js");
const myFamily = {
  // 客户端获取用户家庭成员列表
  getRelationList: (data) => utils_request.http.post("/api/user/relation/list", data)
};
exports.myFamily = myFamily;
