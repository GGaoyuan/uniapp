"use strict";
const common_vendor = require("../../common/vendor.js");
var test = "aaa";
const _sfc_main = {
  data() {
    return {
      title: "aaaasdasdad",
      text: "text",
      test
      //res: '',
    };
  },
  onLoad: function(option) {
    console.log("asd");
    var data = common_vendor.index.getStorageSync("data");
    common_vendor.index.removeStorageSync("data");
    JSON.parse(data);
    test = "asdasdads";
  },
  // onLoad: function(option) {
  // 	console.log(option.res)
  // 	res = option.res;
  // 	result = option.res;
  // },
  methods: {}
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($data.test)
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/zz/HBuilderX/host_app/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
