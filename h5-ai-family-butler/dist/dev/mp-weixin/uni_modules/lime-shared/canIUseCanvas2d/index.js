"use strict";
const common_vendor = require("../../../common/vendor.js");
function compareVersion(v1, v2) {
  let a1 = v1.split(".");
  let a2 = v2.split(".");
  const len = Math.max(a1.length, a2.length);
  while (a1.length < len) {
    a1.push("0");
  }
  while (a2.length < len) {
    a2.push("0");
  }
  for (let i = 0; i < len; i++) {
    const num1 = parseInt(a1[i], 10);
    const num2 = parseInt(a2[i], 10);
    if (num1 > num2) {
      return 1;
    }
    if (num1 < num2) {
      return -1;
    }
  }
  return 0;
}
function gte(version) {
  let { SDKVersion } = common_vendor.index.getSystemInfoSync();
  return compareVersion(SDKVersion, version) >= 0;
}
function canIUseCanvas2d() {
  return gte("2.9.0");
}
exports.canIUseCanvas2d = canIUseCanvas2d;
