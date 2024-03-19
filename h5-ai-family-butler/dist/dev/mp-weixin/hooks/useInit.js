"use strict";
const utils_shared = require("../utils/shared.js");
const common_vendor = require("../common/vendor.js");
function useInit() {
  common_vendor.onShow(() => {
    console.log("Page Show");
  });
  common_vendor.onHide(() => {
    console.log("Page Hide");
  });
  const pages = getCurrentPages();
  const page = pages[pages.length - 1];
  const { fullPath } = page.$page;
  const {
    name: pageName,
    path: pagePath,
    query: pageQuery
  } = utils_shared.parseUrl(fullPath);
  return {
    pageName,
    pagePath,
    pageQuery
  };
}
exports.useInit = useInit;
