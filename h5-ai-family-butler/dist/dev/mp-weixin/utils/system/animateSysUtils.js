"use strict";
const common_vendor = require("../../common/vendor.js");
const components_ipViewComponents_sysComponents_IpComponent = require("../../components/ipViewComponents/sysComponents/IpComponent.js");
const components_ipViewComponents_core_message_MessageCenter = require("../../components/ipViewComponents/core/message/MessageCenter.js");
var previousAction;
function fadeToAction(name, duration = 0.5, activeAction, actions) {
  previousAction = activeAction;
  activeAction = actions[name];
  components_ipViewComponents_core_message_MessageCenter.messageCenter.dispatch("changeAction", activeAction);
  if (previousAction !== activeAction) {
    previousAction.fadeOut(duration);
  }
  activeAction.reset().setEffectiveTimeScale(1).setEffectiveWeight(1).fadeIn(duration).play();
  return activeAction;
}
function changePlayerAnimateC(world, name) {
  const aniQuery = common_vendor.createQuery([components_ipViewComponents_sysComponents_IpComponent.AnimateC, components_ipViewComponents_sysComponents_IpComponent.StateC], common_vendor.With(components_ipViewComponents_sysComponents_IpComponent.PlayerC));
  for (const [aniC, stateC] of aniQuery.exec(world)) {
    aniC.frameId = name;
  }
}
exports.changePlayerAnimateC = changePlayerAnimateC;
exports.fadeToAction = fadeToAction;
