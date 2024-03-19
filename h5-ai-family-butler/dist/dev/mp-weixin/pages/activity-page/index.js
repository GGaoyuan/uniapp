"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_router = require("../../utils/router.js");
const api_profile = require("../../api/profile.js");
const api_loginApi = require("../../api/loginApi.js");
require("../../utils/shared.js");
require("../../utils/urlMap.js");
require("../../utils/request.js");
require("../../utils/platform.js");
require("../../config/commonParams.js");
require("../../helper/pinia-auto-refs.js");
require("../../store/app.js");
require("../../store/setup.js");
require("../../store/test.js");
require("../../store/user.js");
require("../../config/env.js");
require("../../config/serviceLoading.js");
require("../../components/ipViewComponents/core/message/MessageCenter.js");
require("../../components/ipViewComponents/core/utils/pools/ObjectPool.js");
require("../../constants/MainPageConstants.js");
if (!Math) {
  login();
}
const login = () => "../../components/login/index.js";
const _sfc_defineComponent = /* @__PURE__ */ common_vendor.defineComponent$1({
  __name: "index",
  setup(__props) {
    common_vendor.onLoad((option) => {
      console.log(option, "我是入参");
    });
    common_vendor.onShow(() => {
      getPlugin();
      goCheckToken();
      innerAudioContext.play();
      console.log("执行播放");
    });
    const innerAudioContext = common_vendor.index.createInnerAudioContext();
    innerAudioContext.src = "https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/music/new-year-music.mp3";
    const isPlayMusic = common_vendor.ref(true);
    const playStatusChange = () => {
      if (isPlayMusic.value) {
        isPlayMusic.value = false;
        innerAudioContext.pause();
      } else {
        isPlayMusic.value = true;
        innerAudioContext.play();
      }
    };
    common_vendor.onBeforeUnmount(() => {
      innerAudioContext.stop();
      console.log("执行暂停");
    });
    common_vendor.ref("");
    common_vendor.ref("");
    common_vendor.ref("");
    const id = common_vendor.ref("12312312313");
    const loginVisible = common_vendor.ref(false);
    const userInfo = common_vendor.ref({});
    const isLoigin = common_vendor.ref(false);
    async function getUserInfo() {
      userInfo.value = await api_profile.profile.findHomePageUserInfo({});
      common_vendor.index.setStorageSync("userInfo", userInfo.value);
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
          isLoigin.value = true;
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
            isLoigin.value = false;
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
    function loginStauts(data) {
      loginVisible.value = false;
      getUserInfo();
    }
    const loginPopupClose = (val) => {
      loginVisible.value = false;
    };
    common_vendor.onShareAppMessage((res) => {
      id.value = "321321321321321";
      return {
        title: "AI亲情提醒",
        path: `pages/main/index`
      };
    });
    const goShare = () => {
      if (!isLoigin.value) {
        loginVisible.value = true;
        return;
      }
      innerAudioContext.stop();
      utils_router.forward("activity-h5-page", {
        goType: "home"
      });
    };
    const goMyWish = () => {
      if (!isLoigin.value) {
        loginVisible.value = true;
        return;
      }
      innerAudioContext.stop();
      utils_router.forward("activity-h5-page", {
        goType: "wish"
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: isPlayMusic.value
      }, isPlayMusic.value ? {
        b: common_vendor.o(($event) => playStatusChange())
      } : {}, {
        c: !isPlayMusic.value
      }, !isPlayMusic.value ? {
        d: common_vendor.o(($event) => playStatusChange())
      } : {}, {
        e: isPlayMusic.value ? 1 : "",
        f: common_vendor.o(($event) => goMyWish()),
        g: common_vendor.o(goShare),
        h: common_vendor.o(loginStauts),
        i: common_vendor.o(loginPopupClose),
        j: common_vendor.p({
          visible: loginVisible.value
        })
      });
    };
  }
});
_sfc_defineComponent.__runtimeHooks = 6;
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_defineComponent, [["__scopeId", "data-v-841069cd"], ["__file", "/Users/apple/cd_iflytek_work/ai-family/h5-ai-family-butler/src/pages/activity-page/index.vue"]]);
wx.createPage(MiniProgramPage);
