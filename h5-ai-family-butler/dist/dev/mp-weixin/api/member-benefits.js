"use strict";
const utils_request = require("../utils/request.js");
const memberBenefits = {
  // 查询会员权益信息
  getVipInfo: (data) => utils_request.http.post("/api/settings/vip/goods", data),
  // 支付接口
  orderBefit: (data) => utils_request.http.post("/api/settings/vip/orderBefit", data)
};
exports.memberBenefits = memberBenefits;
