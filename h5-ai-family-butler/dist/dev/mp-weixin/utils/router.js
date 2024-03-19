"use strict";
const common_vendor = require("../common/vendor.js");
const utils_shared = require("./shared.js");
const utils_urlMap = require("./urlMap.js");
function onUrlPage(e) {
  if (utils_shared.isFastClick())
    return;
  const { url } = e.currentTarget.dataset;
  if (!url)
    return;
  const urlType = utils_urlMap.getUrlType(url);
  const { name, path, query } = utils_shared.parseUrl(url);
  if (urlType === "topic") {
    forward("topic", Object.assign({ url: path }, query));
  } else if (urlType === "h5Hsq") {
    if (utils_urlMap.h5HsqMap.includes(name)) {
      if (utils_urlMap.needAuthPath.includes(name))
        return forward("login");
      forward("web-view", Object.assign({ url: path }, query));
    } else {
      forward(name, query);
    }
  } else if (urlType === "other" && utils_urlMap.pagesMap.find((i) => i.name === name)) {
    forward(name, query);
  } else
    ;
}
function forward(name, query = {}) {
  if (utils_urlMap.needAuthPath.includes(name))
    return forward("login");
  const targetPage = utils_urlMap.pagesMap.find((i) => i.name === name);
  if (!targetPage)
    return;
  const isReplace = query.replace;
  delete query.replace;
  const { type, path } = targetPage;
  const url = utils_shared.restoreUrl(path, query);
  const params = { url };
  if (!isReplace)
    return common_vendor.index.navigateTo(params);
  common_vendor.index.redirectTo(params);
}
function back(delta) {
  common_vendor.index.navigateBack({
    delta
  });
}
exports.back = back;
exports.forward = forward;
exports.onUrlPage = onUrlPage;
