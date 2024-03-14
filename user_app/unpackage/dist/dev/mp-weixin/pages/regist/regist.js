"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Math) {
  (titleHeader + userinfo)();
}
const titleHeader = () => "./components/regist-header.js";
const userinfo = () => "./components/regist-userinfo2.js";
const _sfc_main = {
  __name: "regist",
  setup(__props) {
    const userinfoTitle = "用户信息";
    const carinfoTitle = "车辆信息";
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          title: userinfoTitle
        }),
        b: common_vendor.p({
          title: carinfoTitle
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e76916ba"], ["__file", "/Users/zz/HBuilderX/user_app/pages/regist/regist.vue"]]);
wx.createPage(MiniProgramPage);
