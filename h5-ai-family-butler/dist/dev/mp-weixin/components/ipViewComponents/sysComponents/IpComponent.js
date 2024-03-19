"use strict";
const constants_MainPageConstants = require("../../../constants/MainPageConstants.js");
const common_vendor = require("../../../common/vendor.js");
const PlayerC = common_vendor.defineComponent();
const AnimateC = common_vendor.defineComponent(() => ({
  frameId: null
}));
const StateC = common_vendor.defineComponent(() => ({
  stateId: true,
  levelId: constants_MainPageConstants.LevelType.NONE
}));
const VelocityC = common_vendor.defineComponent(() => ({ value: { x: 0, y: 0 } }));
const SizeC = common_vendor.defineComponent(() => ({ value: 0 }));
const ColorC = common_vendor.defineComponent(() => ({ value: 16777215 }));
const PositionC = common_vendor.defineComponent(() => ({ value: { x: 0, y: 0 } }));
const TouchC = common_vendor.defineComponent(() => ({ touched: false }));
exports.AnimateC = AnimateC;
exports.ColorC = ColorC;
exports.PlayerC = PlayerC;
exports.PositionC = PositionC;
exports.SizeC = SizeC;
exports.StateC = StateC;
exports.TouchC = TouchC;
exports.VelocityC = VelocityC;
