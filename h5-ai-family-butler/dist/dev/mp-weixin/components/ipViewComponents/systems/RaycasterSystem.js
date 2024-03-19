"use strict";
const components_ipViewComponents_define = require("../define.js");
const common_vendor = require("../../../common/vendor.js");
const components_ipViewComponents_sysComponents_IpComponent = require("../sysComponents/IpComponent.js");
const components_ipViewComponents_core_message_MessageCenter = require("../core/message/MessageCenter.js");
const rayQuery = common_vendor.createQuery([components_ipViewComponents_sysComponents_IpComponent.TouchC, components_ipViewComponents_sysComponents_IpComponent.PositionC], common_vendor.With(components_ipViewComponents_sysComponents_IpComponent.PlayerC));
const RaycasterSystem = components_ipViewComponents_define.defineSystem((params) => {
  let {
    world,
    _THREE,
    camera,
    scene,
    model,
    raycaster
  } = params;
  let touch_branch = null;
  for (let [touch, pos] of rayQuery.exec(world)) {
    if (touch.touched && pos.value) {
      touch_branch = touch;
      raycaster.setFromCamera(pos.value, camera);
      let intersections = raycaster.intersectObject(model, true);
      if (intersections.length > 0) {
        components_ipViewComponents_core_message_MessageCenter.messageCenter.dispatch("rayIntersectedModel", true);
        touch.touched = false;
      }
    }
  }
  touch_branch && (touch_branch.touched = false);
  touch_branch = null;
});
exports.RaycasterSystem = RaycasterSystem;
