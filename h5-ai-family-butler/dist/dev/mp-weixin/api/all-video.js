"use strict";
const utils_request = require("../utils/request.js");
const allVideo = {
  // 查询视频列表信息
  getVideoList: (data) => utils_request.http.post("/api/settings/videoCallsPerson/find", data),
  // 保存视频列表信息
  saveOrUpdate: (data) => utils_request.http.post("/api/settings/videoCallsPerson/saveOrUpdate", data)
};
exports.allVideo = allVideo;
