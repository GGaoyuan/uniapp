"use strict";
const components_ipViewComponents_define = require("../define.js");
const common_vendor = require("../../../common/vendor.js");
const components_ipViewComponents_sysComponents_IpComponent = require("../sysComponents/IpComponent.js");
const constants_MainPageConstants = require("../../../constants/MainPageConstants.js");
const utils_system_animateSysUtils = require("../../../utils/system/animateSysUtils.js");
const components_ipViewComponents_core_message_MessageCenter = require("../core/message/MessageCenter.js");
const aniQuery = common_vendor.createQuery([components_ipViewComponents_sysComponents_IpComponent.AnimateC, components_ipViewComponents_sysComponents_IpComponent.StateC], common_vendor.With(components_ipViewComponents_sysComponents_IpComponent.PlayerC));
const animateSystem = components_ipViewComponents_define.defineSystem((params) => {
  let {
    world,
    mixer,
    actions,
    activeAction,
    orbit
  } = params;
  for (const [aniC, stateC] of aniQuery.exec(world)) {
    if (!aniC.frameId) {
      return;
    }
    if (constants_MainPageConstants.gameState.playEnd) {
      if (aniC.frameId !== constants_MainPageConstants.AniType.RIGHT) {
        return;
      }
    }
    orbit.reset(true);
    let newActive = utils_system_animateSysUtils.fadeToAction(aniC.frameId, 0.2, activeAction, actions);
    if (!newActive._loop) {
      constants_MainPageConstants.gameState.playEnd = true;
      mixer.addEventListener("finished", restoreState.bind(void 0, mixer, aniC));
    } else {
      constants_MainPageConstants.gameState.playEnd = false;
    }
    aniC.frameId = null;
  }
});
function restoreState(mixer, aniC) {
  mixer.removeEventListener("finished", restoreState);
  aniC.frameId = constants_MainPageConstants.AniType.IDLE;
  constants_MainPageConstants.gameState.playEnd = false;
  components_ipViewComponents_core_message_MessageCenter.messageCenter.dispatch("startIdleAniTimer");
}
exports.animateSystem = animateSystem;
