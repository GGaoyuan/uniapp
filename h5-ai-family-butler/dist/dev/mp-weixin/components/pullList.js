"use strict";
const common_vendor = require("../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent$1({
  __name: "pullList",
  props: {
    scrollTop: {
      type: Number,
      default: 0
    },
    onScrollToLower: {
      type: Function,
      default: () => {
        console.log("onScrollToLower");
      }
    },
    onScroll: {
      type: Function,
      default: () => {
        console.log("onScroll");
      }
    }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return {
        a: __props.scrollTop,
        b: common_vendor.o(
          //@ts-ignore
          (...args) => __props.onScrollToLower && __props.onScrollToLower(...args)
        ),
        c: common_vendor.o(
          //@ts-ignore
          (...args) => __props.onScroll && __props.onScroll(...args)
        )
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/apple/cd_iflytek_work/ai-family/h5-ai-family-butler/src/components/pullList.vue"]]);
wx.createComponent(Component);
