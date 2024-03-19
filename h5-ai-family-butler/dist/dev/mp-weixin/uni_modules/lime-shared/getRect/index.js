"use strict";
const common_vendor = require("../../../common/vendor.js");
function getRect(selector, options = {}) {
  const typeDefault = "boundingClientRect";
  let { context, needAll, type = typeDefault } = options;
  if (context.proxy)
    context = context.proxy;
  return new Promise((resolve, reject) => {
    const dom = common_vendor.index.createSelectorQuery().in(context)[needAll ? "selectAll" : "select"](selector);
    const result = (rect) => {
      if (rect) {
        resolve(rect);
      } else {
        reject("no rect");
      }
    };
    if (type == typeDefault) {
      dom[type](result).exec();
    } else {
      dom[type]({
        node: true,
        size: true,
        rect: true
      }, result).exec();
    }
  });
}
exports.getRect = getRect;
