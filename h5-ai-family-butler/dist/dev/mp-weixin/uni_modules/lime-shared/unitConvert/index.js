"use strict";
const common_vendor = require("../../../common/vendor.js");
const uni_modules_limeShared_isString_index = require("../isString/index.js");
const uni_modules_limeShared_isNumeric_index = require("../isNumeric/index.js");
function unitConvert(value) {
  if (uni_modules_limeShared_isNumeric_index.isNumeric(value)) {
    return Number(value);
  }
  if (uni_modules_limeShared_isString_index.isString(value)) {
    const reg = /^-?([0-9]+)?([.]{1}[0-9]+){0,1}(em|rpx|px|%)$/g;
    const results = reg.exec(value);
    if (!value || !results) {
      return 0;
    }
    const unit = results[3];
    value = parseFloat(value);
    if (unit === "rpx") {
      return common_vendor.index.upx2px(value);
    }
    if (unit === "px") {
      return value * 1;
    }
  }
  return 0;
}
exports.unitConvert = unitConvert;
