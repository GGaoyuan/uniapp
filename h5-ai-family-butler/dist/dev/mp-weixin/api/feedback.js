"use strict";
const utils_request = require("../utils/request.js");
const feedback = {
  // 查询会员权益信息
  feedbackSave: (data) => utils_request.http.post("/api/settings/feedback/saveConfig", data)
};
exports.feedback = feedback;
