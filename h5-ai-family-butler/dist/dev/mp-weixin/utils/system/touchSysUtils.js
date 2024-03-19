"use strict";
const common_vendor = require("../../common/vendor.js");
const components_ipViewComponents_sysComponents_IpComponent = require("../../components/ipViewComponents/sysComponents/IpComponent.js");
function changePlayerTouchC(world, touched) {
  const touchQuery = common_vendor.createQuery([components_ipViewComponents_sysComponents_IpComponent.TouchC, components_ipViewComponents_sysComponents_IpComponent.PositionC], common_vendor.With(components_ipViewComponents_sysComponents_IpComponent.PlayerC));
  for (const [touch, pos] of touchQuery.exec(world)) {
    touch.touched = touched;
  }
}
exports.changePlayerTouchC = changePlayerTouchC;
