"use strict";
const helper_piniaAutoRefs = require("../helper/pinia-auto-refs.js");
const commonParams = {
  isLoading: true
  // appid: APP_ID,
  // v: APP_VERSION // 系统版本，用于获取最新版数据
};
function getCommonParams() {
  helper_piniaAutoRefs.useStore("user");
  return Object.assign(
    // { token: token.value, uuid: userId.value, timestamp: Date.now() },
    commonParams
  );
}
function setCommonParams(params) {
  Object.assign(commonParams, params);
}
exports.getCommonParams = getCommonParams;
exports.setCommonParams = setCommonParams;
