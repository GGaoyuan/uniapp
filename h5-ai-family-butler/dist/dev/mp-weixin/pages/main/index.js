"use strict";
const common_vendor = require("../../common/vendor.js");
const hooks_useInit = require("../../hooks/useInit.js");
const utils_router = require("../../utils/router.js");
const constants_MainPageConstants = require("../../constants/MainPageConstants.js");
const pages_main_ipView_IpScene = require("./ipView/IpScene.js");
const components_ipViewComponents_core_message_MessageCenter = require("../../components/ipViewComponents/core/message/MessageCenter.js");
const api_profile = require("../../api/profile.js");
const api_loginApi = require("../../api/loginApi.js");
const utils_request = require("../../utils/request.js");
const utils_loginState = require("../../utils/loginState.js");
const net_websocket_AIConnect = require("../../net/websocket/AIConnect.js");
const net_websocket_STTConnect = require("../../net/websocket/STTConnect.js");
const config_env = require("../../config/env.js");
const constants_MessageContants = require("../../constants/MessageContants.js");
require("../../utils/shared.js");
require("../../utils/urlMap.js");
require("../../components/ipViewComponents/core/loader/gltf-loader.js");
require("../../components/ipViewComponents/core/controls/orbit.js");
require("../../components/ipViewComponents/sysComponents/IpComponent.js");
require("../../components/ipViewComponents/systems/AnimateSystem.js");
require("../../components/ipViewComponents/define.js");
require("../../utils/system/animateSysUtils.js");
require("../../components/ipViewComponents/systems/StateSystem.js");
require("../../utils/system/touchSysUtils.js");
require("../../utils/system/baseSysUtils.js");
require("../../components/ipViewComponents/systems/RaycasterSystem.js");
require("../../components/ipViewComponents/core/utils/pools/ObjectPool.js");
require("../../utils/platform.js");
require("../../config/commonParams.js");
require("../../helper/pinia-auto-refs.js");
require("../../store/app.js");
require("../../store/setup.js");
require("../../store/test.js");
require("../../store/user.js");
require("../../config/serviceLoading.js");
require("../../constants/WSConstants.js");
if (!Math) {
  (messageList + inputBox + reminderSet + messageSelectTipsPopup + login)();
}
const messageList = () => "../../components/message/message-list.js";
const messageSelectTipsPopup = () => "../../components/message/message-selectTips-popup.js";
const inputBox = () => "../../components/input/input-box.js";
const reminderSet = () => "../../components/reminderSet.js";
const login = () => "../../components/login/index.js";
const _sfc_defineComponent = /* @__PURE__ */ common_vendor.defineComponent$1({
  __name: "index",
  setup(__props) {
    const nextFrameStartHooks = /* @__PURE__ */ new Set();
    function onNextFrameStart(fn) {
      nextFrameStartHooks.add(fn);
      return () => nextFrameStartHooks.delete(fn);
    }
    let _canvas;
    const animation = common_vendor.index.createAnimation({
      timingFunction: "ease"
    });
    const loadingHide = common_vendor.ref(null);
    function createThree() {
      const query = common_vendor.index.createSelectorQuery();
      const scene = query.select("#ipC");
      scene.node((res) => {
      }).exec((res) => {
        _canvas = res[0].node;
        const _three = common_vendor.dist.createScopedThreejs(_canvas);
        common_vendor.index._THREE = _three;
        const scene2 = new pages_main_ipView_IpScene.IpScene(nextFrameStartHooks, onNextFrameStart);
        scene2.initScene(_canvas, _three);
      });
      playLoading.value = true;
      animation.opacity(0).step({ duration: 500, delay: 100 });
    }
    function createWS() {
      let userVO = common_vendor.index.getStorageSync("userInfo");
      if (utils_loginState.isLogin()) {
        let _url = config_env.env.apiEnv === "dev" ? "wss://ivr.migu.cn/wb/ai-family-butler/client/ws" : "wss://ivr.migu.cn/wb/ai-family-butler/client/ws";
        !net_websocket_AIConnect.ws.socketTask && net_websocket_AIConnect.ws.initRequest(`${_url}?userId=${userVO.userInfoVO.id}&openId=${userVO.userInfoVO.openId}`, 15e3);
      }
      !net_websocket_STTConnect.stt.socketTask && net_websocket_STTConnect.stt.initRequest("wss://saasdev.51znyx.com/vcs-open-api-client/iat", 15e3);
    }
    function touchStart(e) {
      if (!_canvas)
        return;
      e.preventDefault();
      _canvas.dispatchTouchEvent({ ...e, type: "touchstart" });
    }
    function touchMove(e) {
      if (!_canvas)
        return;
      _canvas.dispatchTouchEvent({ ...e, type: "touchmove" });
    }
    function touchEnd(e) {
      if (!_canvas)
        return;
      _canvas.dispatchTouchEvent({ ...e, type: "touchend" });
      let touchs = e.touches[0] || e.changedTouches[0];
      if (touchs) {
        components_ipViewComponents_core_message_MessageCenter.messageCenter.dispatch("touched", true);
        let _x = parseInt(touchs.x + "");
        let _y = parseInt(touchs.y + "");
        let _w = parseInt(constants_MainPageConstants.ScreenInfo.screenW + "");
        let _h = parseInt(constants_MainPageConstants.ScreenInfo.screenH + "");
        let touInfo = {
          x: _x / _w * 2 - 1,
          y: -(_y / _h) * 2 + 1
        };
        components_ipViewComponents_core_message_MessageCenter.messageCenter.dispatch("touchInfo", touInfo);
      }
    }
    function goPersenal() {
      console.log("goPersenal");
      utils_router.forward("profile");
    }
    function goSetting() {
      if (utils_loginState.isLogin()) {
        utils_router.forward("remind", {
          a: 1
        });
      } else {
        loginPopupVisible(true);
      }
    }
    const loginVisible = common_vendor.ref(false);
    const finishPopupVisible = common_vendor.ref(false);
    const selectTipsVisible = common_vendor.ref(false);
    const finishData = common_vendor.ref(null);
    const promptsData = common_vendor.ref(null);
    const userAvatar = common_vendor.ref("");
    const playLoading = common_vendor.ref(false);
    common_vendor.ref(null);
    const userInfo = common_vendor.ref({});
    async function getMainMessageTip() {
      const data = await utils_request.http.post("/api/homepage/config/findCopywriting", {});
      console.log("首页提醒：", JSON.stringify(data));
      components_ipViewComponents_core_message_MessageCenter.messageCenter.dispatch("mainPageMessageTip", {
        prompts: data.homepageRemindRecommendList,
        tipTitle: data.tipTitle,
        tipContent: data.tipContent,
        id: data.id
      });
    }
    async function getMainMessagePrompt() {
      let data = await utils_request.http.post("/api/recommend/config/findRemindRecommend", {});
      console.log("提醒列表", JSON.stringify(data));
      promptsData.value = data;
    }
    function closeMessageSelectPopup() {
      selectTipsVisible.value = false;
    }
    function messageTipList() {
      components_ipViewComponents_core_message_MessageCenter.messageCenter.dispatch("sendPrompts", promptsData.value);
      selectTipsVisible.value = true;
    }
    function playLoadingHandler() {
      playLoading.value = false;
      loadingHide.value = animation.export();
    }
    function messagePopup(data) {
      console.log(data, "messagePopup");
      if (data) {
        finishData.value = JSON.parse(data);
      } else {
        finishData.value = {};
      }
      console.log("finishPopupVisible", finishPopupVisible.value);
      finishPopupVisible.value = true;
      components_ipViewComponents_core_message_MessageCenter.messageCenter.dispatch("hideGLB", true);
    }
    function finishSuccess(data) {
      console.log("finishSuccess 设置完成:", data);
      finishPopupVisible.value = false;
      components_ipViewComponents_core_message_MessageCenter.messageCenter.dispatch("hideGLB", false);
      components_ipViewComponents_core_message_MessageCenter.messageCenter.dispatch("playAnimate", constants_MainPageConstants.AniType.RIGHT);
      components_ipViewComponents_core_message_MessageCenter.messageCenter.dispatch("messageList", data, constants_MessageContants.MessageType.SYSTEM_POPUP);
    }
    function closeReminderSet() {
      console.log("closeReminderSet 取消设置");
      finishPopupVisible.value = false;
      components_ipViewComponents_core_message_MessageCenter.messageCenter.dispatch("hideGLB", false);
    }
    function loginPopupVisible(show) {
      loginVisible.value = show;
    }
    function loginStauts(data) {
      loginPopupVisible(false);
      getUserInfo();
      createWS();
    }
    async function getUserInfo() {
      var _a, _b;
      userInfo.value = await api_profile.profile.findHomePageUserInfo({});
      userAvatar.value = ((_b = (_a = userInfo.value) == null ? void 0 : _a.userInfoVO) == null ? void 0 : _b.avatar) || "https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/images/mainPage/main_top_userHead.png";
      common_vendor.index.setStorageSync("userInfo", userInfo.value);
      createWS();
      console.log(userInfo.value, "我是用户信息");
    }
    const getPlugin = () => {
      var _a;
      let _plugin;
      if (!_plugin) {
        _plugin = requirePlugin("myPlugin");
        (_a = _plugin.setOptions) == null ? void 0 : _a.call(_plugin, {
          requestDomain: "https://passport.migu.cn",
          sourceId: "220055",
          skin: "music",
          protocols: [
            ["服务协议", "/pages/protocol"],
            ["隐私政策", "/pages/privacy"]
          ]
        });
      }
      return _plugin;
    };
    function goCheckToken() {
      getPlugin().apiGetMiguToken({
        success: (miguToken) => {
          console.log("用户已登录，获取的一级token为:", miguToken);
          const userInfo2 = getPlugin().getMiguUserInfo();
          console.log(userInfo2, "我是用户信息");
          if (miguToken) {
            api_loginApi.login.login({
              token: miguToken
            }).then((res) => {
              console.log(res, "我是内部登录返回");
              common_vendor.index.setStorageSync("token", res);
              getUserInfo();
            });
          }
          checkToken();
        },
        fail: (err) => {
          if (getPlugin().getMiguUserInfo()) {
            console.log("用户已登录，但获取token失败，重试一次:", err);
            goCheckToken();
            return;
          } else {
            console.log(
              "获取一级token失败，用户未登录或会话已失效，需重新登录:",
              err
            );
            common_vendor.index.clearStorage();
          }
          checkToken();
        }
      });
    }
    function checkToken() {
      common_vendor.index.getStorage({
        key: "token",
        success: (res) => {
          getUserInfo();
        },
        fail: () => {
          console.log("查询失败");
        }
      });
    }
    function loginPopupClose() {
      console.log("loginPopupClose");
      loginPopupVisible(false);
    }
    const showtips = common_vendor.ref(false);
    const tipIndex = common_vendor.ref(1);
    common_vendor.ref(null);
    function tipsdialogShow() {
      console.log(constants_MainPageConstants.isGuide.isGuide, "tipsdialogShow");
      if (!common_vendor.index.getStorageSync("isGuide")) {
        constants_MainPageConstants.isGuide.isGuide = true;
        showtips.value = true;
        common_vendor.index.setStorageSync("isGuide", "true");
      } else {
        components_ipViewComponents_core_message_MessageCenter.messageCenter.dispatch("showModol");
      }
    }
    common_vendor.onShareAppMessage((res) => {
      id.value = "321321321321321";
      return {
        title: "2024新春说给爸妈的话",
        path: `pages/activity-share-page/index?templateId=${templateId.value}&share=true`
      };
    });
    function skipUp() {
      showtips.value = false;
      components_ipViewComponents_core_message_MessageCenter.messageCenter.dispatch("showModol");
    }
    function nextStep() {
      if (tipIndex.value == 4) {
        skipUp();
      } else {
        ++tipIndex.value;
      }
    }
    const screenWidth = common_vendor.ref(0);
    const sceenHeight = common_vendor.ref(0);
    const mainTopDistance = common_vendor.ref(0);
    common_vendor.onLoad(() => {
      const { pageName, pagePath, pageQuery } = hooks_useInit.useInit();
      console.log(pageName, pagePath, pageQuery, "pageName,pagePath, pageQuery");
      common_vendor.index.hideNavigationBarLoading();
    });
    common_vendor.onReady(() => {
      common_vendor.index.getSystemInfo({
        success: (res) => {
          console.log("页面高度:", res.windowHeight);
          const statusBarHeight = res.statusBarHeight || 0;
          const menuButtonInfo = common_vendor.index.getMenuButtonBoundingClientRect();
          const navBarHeight = menuButtonInfo.height + (menuButtonInfo.top - statusBarHeight) * 2;
          console.log("状态栏高度:", statusBarHeight, navBarHeight);
          const topIconDistance = statusBarHeight + navBarHeight;
          mainTopDistance.value = topIconDistance;
          const _canvash = res.windowHeight * 0.45;
          constants_MainPageConstants.ScreenInfo.screenW = screenWidth.value = res.windowWidth;
          constants_MainPageConstants.ScreenInfo.screenH = sceenHeight.value = _canvash;
          const _buttomH = 160 / 750 * res.windowWidth;
          const _listPX = res.windowHeight - _canvash - _buttomH;
          const _listRPX = _listPX * (750 / res.windowWidth);
          components_ipViewComponents_core_message_MessageCenter.messageCenter.dispatch("messageScrollHeight", _listRPX);
          tipsdialogShow();
          createThree();
          createWS();
        }
      });
      getMainMessageTip();
      getMainMessagePrompt();
      components_ipViewComponents_core_message_MessageCenter.messageCenter.listen("loginPopupVisible", loginPopupVisible, this);
      components_ipViewComponents_core_message_MessageCenter.messageCenter.listen("messageFinish", messagePopup, this);
      components_ipViewComponents_core_message_MessageCenter.messageCenter.listen("messageTipList", messageTipList, this);
      components_ipViewComponents_core_message_MessageCenter.messageCenter.listen("playLoading", playLoadingHandler, this);
      components_ipViewComponents_core_message_MessageCenter.messageCenter.listen(
        "closeMessageSelectPopup",
        closeMessageSelectPopup,
        this
      );
    });
    common_vendor.onShow(() => {
      var _a;
      getPlugin();
      goCheckToken();
      let userVO = common_vendor.index.getStorageSync("userInfo");
      userAvatar.value = ((_a = userVO == null ? void 0 : userVO.userInfoVO) == null ? void 0 : _a.avatar) || "https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/images/mainPage/main_top_userHead.png";
      getMainMessageTip();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.unref(userAvatar),
        b: common_vendor.o(goPersenal),
        c: common_vendor.o(goSetting),
        d: `${common_vendor.unref(mainTopDistance)}rpx`,
        e: `${common_vendor.unref(screenWidth)}px`,
        f: `${common_vendor.unref(sceenHeight)}px`,
        g: common_vendor.o(touchStart),
        h: common_vendor.o(touchMove),
        i: common_vendor.o(touchEnd),
        j: common_vendor.unref(playLoading),
        k: common_vendor.unref(loadingHide),
        l: common_vendor.o(closeReminderSet),
        m: common_vendor.o(finishSuccess),
        n: common_vendor.p({
          visible: common_vendor.unref(finishPopupVisible),
          data: common_vendor.unref(finishData)
        }),
        o: common_vendor.p({
          visible: common_vendor.unref(selectTipsVisible),
          ["safe-area"]: false
        }),
        p: common_vendor.o(loginStauts),
        q: common_vendor.o(loginPopupClose),
        r: common_vendor.p({
          visible: common_vendor.unref(loginVisible)
        }),
        s: `${common_vendor.unref(mainTopDistance) + 12}rpx`,
        t: common_vendor.o(skipUp),
        v: common_vendor.o(nextStep),
        w: common_vendor.unref(tipIndex) == 1,
        x: `${common_vendor.unref(mainTopDistance) + 12}rpx`,
        y: common_vendor.o(skipUp),
        z: common_vendor.o(nextStep),
        A: common_vendor.unref(tipIndex) == 2,
        B: common_vendor.o(skipUp),
        C: common_vendor.o(nextStep),
        D: common_vendor.unref(tipIndex) == 3,
        E: common_vendor.o(skipUp),
        F: common_vendor.o(nextStep),
        G: common_vendor.unref(tipIndex) == 4,
        H: common_vendor.unref(showtips)
      };
    };
  }
});
_sfc_defineComponent.__runtimeHooks = 6;
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_defineComponent, [["__scopeId", "data-v-530a6cb3"], ["__file", "/Users/apple/cd_iflytek_work/ai-family/h5-ai-family-butler/src/pages/main/index.vue"]]);
wx.createPage(MiniProgramPage);
