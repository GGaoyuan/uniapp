"use strict";
const common_vendor = require("../common/vendor.js");
function isLogin() {
  let userVO = common_vendor.index.getStorageSync("userInfo");
  if (userVO && userVO.userInfoVO) {
    return true;
  }
  return false;
}
exports.isLogin = isLogin;
