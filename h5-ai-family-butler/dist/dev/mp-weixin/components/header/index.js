"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_router = require("../../utils/router.js");
require("../../utils/shared.js");
require("../../utils/urlMap.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent$1({
  __name: "index",
  props: {
    title: {
      type: String,
      default: ""
    }
  },
  setup(__props) {
    const goBack = () => {
      utils_router.back(-1);
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => goBack()),
        b: common_vendor.t(__props.title)
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-3d2ca96a"], ["__file", "/Users/apple/cd_iflytek_work/ai-family/h5-ai-family-butler/src/components/header/index.vue"]]);
wx.createComponent(Component);
