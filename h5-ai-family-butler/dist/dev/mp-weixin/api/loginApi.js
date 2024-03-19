"use strict";
const utils_request = require("../utils/request.js");
const login = {
  // 客户端获取用户家庭成员列表
  login: (data) => utils_request.http.post("/api/settings/user/login", data)
};
exports.login = login;
