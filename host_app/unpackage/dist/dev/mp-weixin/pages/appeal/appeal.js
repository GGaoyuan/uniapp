"use strict";
const common_vendor = require("../../common/vendor.js");
var test = "aaa";
const _sfc_main = {
  data() {
    return {
      test
    };
  },
  onLoad() {
  },
  methods: {
    onClickTest() {
      common_vendor.index.scanCode({
        success: (res) => {
          this.test = res.result;
        }
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($data.test),
    b: common_vendor.o((...args) => $options.onClickTest && $options.onClickTest(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/zz/HBuilderX/host_app/pages/appeal/appeal.vue"]]);
wx.createPage(MiniProgramPage);
