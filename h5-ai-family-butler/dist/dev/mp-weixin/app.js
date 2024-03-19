"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
const api_loginApi = require("./api/loginApi.js");
const api_profile = require("./api/profile.js");
const store_index = require("./store/index.js");
require("./utils/request.js");
require("./utils/platform.js");
require("./utils/router.js");
require("./utils/shared.js");
require("./utils/urlMap.js");
require("./config/commonParams.js");
require("./helper/pinia-auto-refs.js");
require("./store/app.js");
require("./store/setup.js");
require("./store/test.js");
require("./store/user.js");
require("./config/env.js");
require("./config/serviceLoading.js");
require("./components/ipViewComponents/core/message/MessageCenter.js");
require("./components/ipViewComponents/core/utils/pools/ObjectPool.js");
require("./constants/MainPageConstants.js");
if (!Math) {
  "./pages/first-guide/index.js";
  "./pages/main/index.js";
  "./pages/remind/index.js";
  "./pages/remind/detail.js";
  "./pages/profile/index.js";
  "./pages/my-family/index.js";
  "./pages/user-info/index.js";
  "./pages/all-voice/index.js";
  "./pages/all-video/index.js";
  "./pages/guide/index.js";
  "./pages/feedback/index.js";
  "./pages/member-benefits/index.js";
  "./pages/migu-pay/index.js";
  "./pages/activity-page/index.js";
  "./pages/activity-share-page/index.js";
  "./pages/activity-h5-page/index.js";
  "./pages/test/test.js";
}
function getPlugin() {
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
}
function goCheckToken() {
  getPlugin().apiGetMiguToken({
    success: (miguToken) => {
      console.log("用户已登录，获取的一级token为:", miguToken);
      const userInfo = getPlugin().getMiguUserInfo();
      console.log(userInfo, "我是用户信息");
      if (miguToken) {
        api_loginApi.login.login({
          token: miguToken
        }).then((res) => {
          console.log(res, "我是内部登录返回");
          common_vendor.index.setStorageSync("token", res);
          getUserInfo();
        });
      }
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
    }
  });
}
async function getUserInfo() {
  await api_profile.profile.findHomePageUserInfo({}).then((res2) => {
    console.log(res2, "我是用户信息");
    common_vendor.index.setStorageSync("userInfo", res2);
  });
}
const _sfc_main = {
  globalData: {
    // 全局设置状态栏和导航栏高度
    statusBarH: 0,
    customBarH: 0,
    screenHeight: 0
  },
  // 初始化
  onLaunch(option) {
    console.log("进入app.vue事件");
    goCheckToken();
    common_vendor.index.getSystemInfo({
      success: (e) => {
        const statusBar = e.statusBarHeight;
        const menu = common_vendor.index.getMenuButtonBoundingClientRect();
        const customBar = menu.bottom + (menu.top - statusBar);
        this.globalData.statusBarH = statusBar;
        this.globalData.customBarH = customBar;
        this.globalData.screenHeight = e.screenHeight;
      }
    });
  }
};
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/apple/cd_iflytek_work/ai-family/h5-ai-family-butler/src/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App).use(store_index.store);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
