"use strict";
const common_vendor = require("../common/vendor.js");
let loadingCount = 0;
function showLoading(isLoading) {
  if (isLoading) {
    try {
      common_vendor.index.showLoading({
        title: "加载中"
      });
    } catch (e) {
    }
    loadingCount = loadingCount + 1;
  }
}
function hideLoading() {
  loadingCount = loadingCount - 1;
  if (loadingCount === 0) {
    try {
      common_vendor.index.hideLoading();
    } catch (e) {
    }
  }
}
exports.hideLoading = hideLoading;
exports.showLoading = showLoading;
