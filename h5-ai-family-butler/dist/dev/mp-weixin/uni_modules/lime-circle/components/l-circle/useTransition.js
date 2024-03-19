"use strict";
const uni_modules_limeCircle_components_lCircle_animation_ease = require("./animation/ease.js");
const uni_modules_limeCircle_components_lCircle_animation_index = require("./animation/index.js");
const common_vendor = require("../../../../common/vendor.js");
function useTransition(percent, options) {
  const current = common_vendor.ref(0);
  const { immediate, duration } = options;
  let tl = new uni_modules_limeCircle_components_lCircle_animation_index.Timeline();
  const stop = common_vendor.watch(() => percent.value, (v) => {
    tl.start();
    tl.add(
      new uni_modules_limeCircle_components_lCircle_animation_index.Animation(
        current.value,
        v,
        duration,
        0,
        uni_modules_limeCircle_components_lCircle_animation_ease.ease,
        (v2) => {
          current.value = v2 < 1e-4 ? 0 : v2;
        }
      )
    );
  }, { immediate });
  return [current, stop];
}
exports.useTransition = useTransition;
