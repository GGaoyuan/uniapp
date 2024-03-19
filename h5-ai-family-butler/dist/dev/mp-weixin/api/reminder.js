"use strict";
const utils_request = require("../utils/request.js");
const reminder = {
  // 客户端获取用户家庭成员列表
  getRelationList: (data) => utils_request.http.post("/api/user/relation/list", data),
  // 客户端根据时间范围获取提醒详情列表
  getListTaskInfoGroupByDay: (data) => utils_request.http.post("/api/reminder/listTaskInfoGroupByDay", data),
  // 客户端获取提醒详情列表
  getListTaskInfo: (data) => utils_request.http.post("/api/reminder/listTaskInfo", data),
  // 客户端获取提醒详情
  getFindTaskInfo: (data) => utils_request.http.post("/api/reminder/findTaskInfo", data),
  // 客户端获取提醒周期配置
  getListReminderCycle: (data) => utils_request.http.post("/api/reminder/listReminderCycle", data),
  // 查看权益提醒方式剩余量
  getReminderWay: (data) => utils_request.http.post("/api/settings/vip/getReminderWay", data),
  // 客户端新增提醒
  saveTask: (data) => utils_request.http.post("/api/reminder/saveTask", data),
  // 客户端修改提醒
  updateTask: (data) => utils_request.http.post("/api/reminder/updateTask", data),
  // 客户端删除提醒
  delTask: (data) => utils_request.http.post("/api/reminder/delTask", data),
  // 客户端获取用户家庭成员详情
  findInfo: (data) => utils_request.http.post("/api/user/relation/findInfo", data),
  // 客户端新增用户家庭成员关系
  relationSave: (data) => utils_request.http.post("/api/user/relation/save", data),
  // 通过开始日期和结束日期查询节日和假期
  startAndEndDate: (data) => utils_request.http.post("/api/homepage/festival/startAndEndDate", data),
  // 客户端获取用户家庭成员关系
  findType: (data) => utils_request.http.post("/api/user/relation/findType", data),
  // 客户端家庭成员关系验证码
  relationSms: (data) => utils_request.http.post("/api/user/relation/sms", data),
  // 客户端删除用户家庭成员关系
  relationDel: (data) => utils_request.http.post("/api/user/relation/delete", data)
};
exports.reminder = reminder;
