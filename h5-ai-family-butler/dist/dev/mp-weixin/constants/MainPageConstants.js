"use strict";
var AniType = /* @__PURE__ */ ((AniType2) => {
  AniType2["IDLE"] = "ip_idle";
  AniType2["DANCE"] = "ip_dance";
  AniType2["SLEEP"] = "ip_sleep";
  AniType2["HOLIDAY"] = "ip_holiday";
  AniType2["RIGHT"] = "ip_topRight";
  AniType2["ERROR"] = "ip_topError";
  AniType2["CLICK"] = "ip_click1";
  AniType2["LOVER"] = "ip_lover";
  AniType2["BOOM"] = "ip_boom";
  AniType2["MONEY"] = "ip_money";
  AniType2["God"] = "ip_GodOfWealt";
  return AniType2;
})(AniType || {});
const ScreenInfo = {
  screenW: 0,
  screenH: 0
};
var LevelType = /* @__PURE__ */ ((LevelType2) => {
  LevelType2[LevelType2["MASTER"] = 0] = "MASTER";
  LevelType2[LevelType2["MANAGER"] = 1] = "MANAGER";
  LevelType2[LevelType2["PUBLIC"] = 2] = "PUBLIC";
  LevelType2[LevelType2["PRIVATE"] = 3] = "PRIVATE";
  LevelType2[LevelType2["NONE"] = 4] = "NONE";
  return LevelType2;
})(LevelType || {});
const gameState = {
  playEnd: false
};
var isGuide = {
  isGuide: false
};
exports.AniType = AniType;
exports.LevelType = LevelType;
exports.ScreenInfo = ScreenInfo;
exports.gameState = gameState;
exports.isGuide = isGuide;
