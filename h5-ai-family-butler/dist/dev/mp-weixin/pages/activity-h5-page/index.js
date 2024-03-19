"use strict";
const common_vendor = require("../../common/vendor.js");
require("../../utils/urlMap.js");
const _sfc_defineComponent = /* @__PURE__ */ common_vendor.defineComponent$1({
  __name: "index",
  setup(__props) {
    common_vendor.onLoad((option) => {
      console.log(option, "我是入参");
      goType.value = option.goType;
      getUserToken();
      console.log();
    });
    const userToken = common_vendor.ref("");
    const payUrl = common_vendor.ref("");
    const productId = common_vendor.ref("");
    const id = common_vendor.ref("12312312313");
    const goType = common_vendor.ref("home");
    const getUserToken = () => {
      userToken.value = common_vendor.index.getStorageSync("token");
      if (goType.value === "home") {
        payUrl.value = "https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/new-year-activity/#/?token=" + userToken.value + "&productId=" + productId.value;
      } else {
        payUrl.value = "https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/new-year-activity/#/mybless?token=" + userToken.value + "&productId=" + productId.value;
      }
      console.log(payUrl.value, "我是跳转url");
    };
    common_vendor.onShareAppMessage((res) => {
      id.value = "321321321321321";
      return {
        title: "试一试分享",
        path: `pages/first-guide/index?id=${id.value}`
      };
    });
    return (_ctx, _cache) => {
      return {
        a: payUrl.value
      };
    };
  }
});
_sfc_defineComponent.__runtimeHooks = 6;
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_defineComponent, [["__scopeId", "data-v-7d77f775"], ["__file", "/Users/apple/cd_iflytek_work/ai-family/h5-ai-family-butler/src/pages/activity-h5-page/index.vue"]]);
wx.createPage(MiniProgramPage);
