"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Math) {
  (titleHeader + userinfo + carinfo)();
}
const titleHeader = () => "./components/regist-header.js";
const userinfo = () => "./components/regist-userinfo2.js";
const carinfo = () => "./components/regist-carinfo.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "regist",
  setup(__props) {
    let userinfoTitle = "用户信息";
    let carinfoTitle = "车辆信息";
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          title: common_vendor.unref(userinfoTitle)
        }),
        b: common_vendor.p({
          title: common_vendor.unref(carinfoTitle)
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e76916ba"], ["__file", "/Users/zz/HBuilderX/user_app/pages/regist/regist.vue"]]);
wx.createPage(MiniProgramPage);
