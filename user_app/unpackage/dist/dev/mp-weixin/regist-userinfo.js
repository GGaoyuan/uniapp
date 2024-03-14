"use strict";
const common_vendor = require("./common/vendor.js");
if (!Array) {
  const _easycom_uni_data_checkbox2 = common_vendor.resolveComponent("uni-data-checkbox");
  _easycom_uni_data_checkbox2();
}
const _easycom_uni_data_checkbox = () => "./uni_modules/uni-data-checkbox/components/uni-data-checkbox/uni-data-checkbox.js";
if (!Math) {
  _easycom_uni_data_checkbox();
}
const _sfc_main = {
  __name: "regist-userinfo",
  setup(__props) {
    const identity = [{
      text: "学生",
      value: 0
    }, {
      text: "教职工",
      value: 1
    }, {
      text: "其他",
      value: 2
    }];
    let radio1 = 0;
    function change() {
      console.log("change");
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(change),
        b: common_vendor.o(($event) => common_vendor.isRef(radio1) ? radio1.value = $event : radio1 = $event),
        c: common_vendor.p({
          localdata: identity,
          modelValue: common_vendor.unref(radio1)
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-b1d136e1"], ["__file", "/Users/zz/HBuilderX/user_app/pages/regist/components/regist-userinfo.vue"]]);
exports.MiniProgramPage = MiniProgramPage;
