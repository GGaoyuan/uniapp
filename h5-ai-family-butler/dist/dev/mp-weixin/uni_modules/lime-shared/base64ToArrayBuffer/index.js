"use strict";
const common_vendor = require("../../../common/vendor.js");
function base64ToArrayBuffer(base64) {
  const [, format, bodyData] = /data:image\/(\w+);base64,(.*)/.exec(base64) || [];
  if (common_vendor.index.base64ToArrayBuffer) {
    return common_vendor.index.base64ToArrayBuffer(bodyData);
  }
}
exports.base64ToArrayBuffer = base64ToArrayBuffer;
