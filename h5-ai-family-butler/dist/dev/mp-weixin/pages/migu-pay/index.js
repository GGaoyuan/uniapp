"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent$1({
  __name: "index",
  setup(__props) {
    common_vendor.onLoad((option) => {
      console.log(option, "我是入参");
      productId.value = option.productId;
      getUserToken();
    });
    const userToken = common_vendor.ref("");
    const payUrl = common_vendor.ref("");
    const productId = common_vendor.ref("");
    const getUserToken = () => {
      userToken.value = common_vendor.index.getStorageSync("token");
      payUrl.value = "https://ivr.migu.cn/ai-family-butler/static/butler/pay-ai-manage/#/?token=" + userToken.value + "&productId=" + productId.value;
      console.log(payUrl.value, "我是跳转url");
    };
    return (_ctx, _cache) => {
      return {
        a: payUrl.value
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-8a3980cf"], ["__file", "/Users/apple/cd_iflytek_work/ai-family/h5-ai-family-butler/src/pages/migu-pay/index.vue"]]);
wx.createPage(MiniProgramPage);
