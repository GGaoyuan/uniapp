"use strict";
const common_vendor = require("./common/vendor.js");
if (!Array) {
  const _easycom_uni_data_checkbox2 = common_vendor.resolveComponent("uni-data-checkbox");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  (_easycom_uni_data_checkbox2 + _easycom_uni_section2)();
}
const _easycom_uni_data_checkbox = () => "./uni_modules/uni-data-checkbox/components/uni-data-checkbox/uni-data-checkbox.js";
const _easycom_uni_section = () => "./uni_modules/uni-section/components/uni-section/uni-section.js";
if (!Math) {
  (_easycom_uni_data_checkbox + _easycom_uni_section)();
}
const _sfc_main = {
  __name: "regist-userinfo",
  setup(__props) {
    const sex = [{
      text: "男",
      value: 0
    }, {
      text: "女",
      value: 1
    }, {
      text: "未知",
      value: 2
    }];
    let radio1 = 0;
    var value = 0;
    var range = [{
      "value": 0,
      "text": "篮球"
    }, {
      "value": 1,
      "text": "足球"
    }, {
      "value": 2,
      "text": "游泳"
    }];
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(JSON.stringify(common_vendor.unref(radio1))),
        b: common_vendor.o(($event) => common_vendor.isRef(radio1) ? radio1.value = $event : radio1 = $event),
        c: common_vendor.p({
          localdata: sex,
          modelValue: common_vendor.unref(radio1)
        }),
        d: common_vendor.p({
          title: "单选",
          type: "line"
        }),
        e: common_vendor.o(($event) => common_vendor.isRef(value) ? value.value = $event : value = $event),
        f: common_vendor.p({
          localdata: common_vendor.unref(range),
          modelValue: common_vendor.unref(value)
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-b1d136e1"], ["__file", "/Users/zz/HBuilderX/user_app/pages/regist/components/regist-userinfo.vue"]]);
exports.MiniProgramPage = MiniProgramPage;
