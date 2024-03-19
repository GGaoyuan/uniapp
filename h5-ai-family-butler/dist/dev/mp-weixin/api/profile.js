"use strict";
const utils_request = require("../utils/request.js");
const profile = {
  // 获取个人设置页用户信息
  findHomePageUserInfo: (data) => utils_request.http.post("/api/settings/user/findHomePageUserInfo", data),
  // 查询默认提醒人称
  reminderContentSelect: (data) => utils_request.http.post("/api/settings/reminderContentSelect/find", data),
  // 保存默认提醒人称
  reminderContentSave: (data) => utils_request.http.post("/api/settings/reminderContentSelect/saveOrUpdate", data),
  // 默认提醒方式查询
  reminderWaySelect: (data) => utils_request.http.post("/api/settings/reminderWayConfig/findConfig", data),
  // 默认提醒方式保存
  reminderWaySave: (data) => utils_request.http.post("/api/settings/reminderWayConfig/saveOrUpdateConfig", data),
  // mock登录操作
  mockLogin: (data) => utils_request.http.post("/api/settings/user/mockLogin", data),
  // 模拟查询所有可用账号
  mockAllUser: (data) => utils_request.http.post("/api/settings/user/mockAllUser", data)
};
exports.profile = profile;
