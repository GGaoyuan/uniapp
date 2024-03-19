"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_limeShared_getRect_index = require("../../../lime-shared/getRect/index.js");
const uni_modules_limeShared_canIUseCanvas2d_index = require("../../../lime-shared/canIUseCanvas2d/index.js");
exports.isCanvas2d = uni_modules_limeShared_canIUseCanvas2d_index.canIUseCanvas2d();
async function getCanvas(canvasId, options) {
  let { context } = options;
  if (context.proxy)
    context = context.proxy;
  return uni_modules_limeShared_getRect_index.getRect("#" + canvasId, { context, type: exports.isCanvas2d ? "fields" : "boundingClientRect" }).then(({ node }) => {
    if (node) {
      return node;
    } else {
      exports.isCanvas2d = false;
      const ctx = common_vendor.index.createCanvasContext(canvasId, context);
      return {
        getContext(type) {
          if (type == "2d") {
            return ctx;
          }
        }
      };
    }
  });
}
exports.getCanvas = getCanvas;
