"use strict";
const common_vendor = require("../common/vendor.js");
const uniAsync = new Proxy({}, {
  get(_, name) {
    return (obj) => new Promise((resolve, reject) => {
      common_vendor.index[name]({
        ...obj,
        success: (ret) => {
          resolve(ret);
        },
        fail: (err) => {
          reject(err);
        }
      });
    });
  }
});
exports.uniAsync = uniAsync;
