"use strict";
const common_vendor = require("../../common/vendor.js");
const components_ipViewComponents_sysComponents_IpComponent = require("../../components/ipViewComponents/sysComponents/IpComponent.js");
function changePositionC_with_touchC(world, vec2) {
  const aniQuery = common_vendor.createQuery([components_ipViewComponents_sysComponents_IpComponent.PositionC], common_vendor.With(components_ipViewComponents_sysComponents_IpComponent.TouchC));
  for (const [pos] of aniQuery.exec(world)) {
    if (vec2 && vec2.x) {
      pos.value = { x: vec2.x, y: vec2.y };
    } else {
      pos.value = null;
    }
  }
}
exports.changePositionC_with_touchC = changePositionC_with_touchC;
