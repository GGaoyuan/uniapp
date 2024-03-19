"use strict";
let lastClickTime = 0;
function isFastClick(num = 1e3) {
  const time = new Date().getTime();
  if (time - lastClickTime > num)
    return false;
  lastClickTime = time;
  return true;
}
function parseUrl(fullPath) {
  const [path, queryStr] = fullPath.split("?");
  const name = path.slice(path.lastIndexOf("/") + 1);
  const query = {};
  queryStr == null ? void 0 : queryStr.split("&").map((i) => i.split("=")).forEach((i) => query[i[0]] = i[1]);
  return {
    name,
    path,
    query
  };
}
function restoreUrl(path, query) {
  let count = 0;
  for (const key in query) {
    path += `${count === 0 ? "?" : "&"}${key}=${query[key]}`;
    count += 1;
  }
  return path;
}
exports.isFastClick = isFastClick;
exports.parseUrl = parseUrl;
exports.restoreUrl = restoreUrl;
