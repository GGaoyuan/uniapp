"use strict";
const utils_request = require("../utils/request.js");
const allVoice = {
  // 查询视频列表信息
  getVoiceList: (data) => utils_request.http.post("/api/settings/voiceCallsSpeaker/find", data),
  // 保存视频列表信息
  saveOrUpdate: (data) => utils_request.http.post("/api/settings/voiceCallsSpeaker/saveOrUpdate", data)
};
exports.allVoice = allVoice;
