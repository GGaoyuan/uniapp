"use strict";
function ifDefPlatform() {
  let platform2;
  platform2 = "MP-WEIXIN";
  platform2 = "MP";
  return platform2;
}
const platform = ifDefPlatform();
const isH5 = platform === "H5";
const isDevelopment = true;
exports.isDevelopment = isDevelopment;
exports.isH5 = isH5;
