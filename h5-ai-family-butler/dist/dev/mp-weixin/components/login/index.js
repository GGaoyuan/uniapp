"use strict";
const common_vendor = require("../../common/vendor.js");
require("../../utils/request.js");
require("../../utils/platform.js");
require("../../utils/router.js");
require("../../utils/shared.js");
require("../../utils/urlMap.js");
require("../../config/commonParams.js");
require("../../helper/pinia-auto-refs.js");
require("../../store/app.js");
require("../../store/setup.js");
require("../../store/test.js");
require("../../store/user.js");
require("../../config/env.js");
require("../../config/serviceLoading.js");
require("../ipViewComponents/core/message/MessageCenter.js");
require("../ipViewComponents/core/utils/pools/ObjectPool.js");
require("../../constants/MainPageConstants.js");
if (!Array) {
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  _easycom_uni_popup2();
}
const _easycom_uni_popup = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-popup/uni-popup.js";
if (!Math) {
  _easycom_uni_popup();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent$1({
  __name: "index",
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    data: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ["confirm", "close"],
  setup(__props, { emit: emits }) {
    const props = __props;
    common_vendor.watch(
      () => props.visible,
      (newVal, oldVal) => {
        if (newVal) {
          dialogShow();
        } else {
          dialogClose();
        }
      }
    );
    const loginPopup = common_vendor.ref(null);
    const dialogShow = () => {
      loginPopup.value.open();
    };
    const dialogClose = () => {
      emits("close");
      loginPopup.value.close();
    };
    common_vendor.ref([]);
    common_vendor.ref({});
    const clickMask = (val) => {
      emits("close");
    };
    const wxUserInfo = common_vendor.reactive({
      code: "",
      iv: "",
      encryptedData: "",
      userInfo: {
        avatarUrl: ""
      }
    });
    const wxLogin = () => {
      console.log();
      common_vendor.index.login({
        success(res) {
          if (res.code) {
            wxUserInfo.code = res.code;
            console.log(res, "我是登录返回");
            getUserProfile();
          } else {
            console.log("登录失败！" + res.errMsg);
          }
        }
      });
    };
    const getUserProfile = () => {
      common_vendor.index.getUserProfile({
        desc: "用于完善会员资料",
        // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        success: (res) => {
          wxUserInfo.iv = res.iv;
          wxUserInfo.encryptedData = res.encryptedData;
          wxUserInfo.userInfo = res.userInfo;
          goWxLogin();
        }
      });
    };
    const goWxLogin = () => {
      common_vendor.index.navigateTo({
        url: `plugin://myPlugin/wechatlogin?code=${encodeURIComponent(wxUserInfo.code)}&iv=${encodeURIComponent(wxUserInfo.iv)}&enc=${encodeURIComponent(wxUserInfo.encryptedData)}&userInfo=${JSON.stringify({ ...wxUserInfo.userInfo, avatarUrl: encodeURIComponent(wxUserInfo.userInfo.avatarUrl) })}`
      });
      dialogClose();
    };
    const goPhoneLogin = () => {
      common_vendor.index.getUserProfile({
        desc: "Wexin",
        // 这个参数是必须的
        success: (res) => {
          console.log("用户信息", res.rawData);
          common_vendor.index.navigateTo({
            url: "plugin://myPlugin/migulogin"
          });
          dialogClose();
        }
      });
    };
    common_vendor.ref("");
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
    common_vendor.onMounted(() => {
      getPlugin();
      wxLogin();
      if (props.visible) {
        dialogShow();
      }
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => getUserProfile()),
        b: common_vendor.o(($event) => goPhoneLogin()),
        c: common_vendor.sr(loginPopup, "08bacfb7-0", {
          "k": "loginPopup"
        }),
        d: common_vendor.o(clickMask),
        e: common_vendor.p({
          type: "bottom",
          ["safe-area"]: false
        })
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-08bacfb7"], ["__file", "/Users/apple/cd_iflytek_work/ai-family/h5-ai-family-butler/src/components/login/index.vue"]]);
wx.createComponent(Component);
