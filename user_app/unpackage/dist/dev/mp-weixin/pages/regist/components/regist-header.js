"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  __name: "regist-header",
  props: {
    title: String
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(props.title)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-6548a269"], ["__file", "/Users/zz/HBuilderX/user_app/pages/regist/components/regist-header.vue"]]);
wx.createComponent(Component);
