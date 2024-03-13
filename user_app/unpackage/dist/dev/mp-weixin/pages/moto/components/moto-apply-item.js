"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  __name: "moto-apply-item",
  props: {
    list: {
      type: Object,
      default: {}
    }
  },
  setup(__props) {
    const props = __props;
    common_vendor.onLoad((option) => {
      console.log("script:onLoad");
    });
    common_vendor.onReady(() => {
    });
    common_vendor.onMounted(() => {
      console.log("script:onMounted_" + props.list);
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(props.list.name),
        b: common_vendor.t(props.list.age)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-4871db27"], ["__file", "/Users/zz/HBuilderX/user_app/pages/moto/components/moto-apply-item.vue"]]);
wx.createComponent(Component);
