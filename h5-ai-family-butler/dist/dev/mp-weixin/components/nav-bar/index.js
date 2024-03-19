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
    },
    fixed: { type: [Boolean, String], default: true }
  },
  emits: ["confirm", "close"],
  setup(__props, { emit: emits }) {
    const app = getApp();
    const statusBarH = common_vendor.ref(app.globalData.statusBarH);
    const _customBarH = app.globalData.customBarH - app.globalData.statusBarH;
    const customBarH = common_vendor.ref(_customBarH);
    const goBack = () => {
      utils_router.back(-1);
    };
    common_vendor.onMounted(() => {
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(goBack),
        b: common_vendor.t(__props.title),
        c: __props.fixed ? 1 : "",
        d: `${common_vendor.unref(customBarH)}px`,
        e: `${common_vendor.unref(statusBarH)}px`
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-ca003b78"], ["__file", "/Users/apple/cd_iflytek_work/ai-family/h5-ai-family-butler/src/components/nav-bar/index.vue"]]);
wx.createComponent(Component);
