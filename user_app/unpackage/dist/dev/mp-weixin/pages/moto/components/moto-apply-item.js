"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  __name: "moto-apply-item",
  props: {
    data: {
      type: Object,
      default: {}
    },
    title: String
  },
  setup(__props) {
    const props = __props;
    const typeStr = common_vendor.computed(() => {
      if (props.data.status == 0) {
        return "待审核";
      } else if (props.data.status == 1) {
        return "已通过";
      } else if (props.data.status == 2) {
        return "已安装";
      } else if (props.data.status == 3) {
        return "已驳回";
      } else if (props.data.status == 4) {
        return "已取消";
      }
      return "";
    });
    common_vendor.onLoad((option) => {
      console.log("script:onLoad");
    });
    common_vendor.onReady(() => {
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.t(props.data.motoType),
        b: common_vendor.t(common_vendor.unref(typeStr)),
        c: props.data.motoBrand.length > 0
      }, props.data.motoBrand.length > 0 ? {
        d: common_vendor.t(props.data.motoBrand)
      } : {}, {
        e: props.data.motoColor.length > 0
      }, props.data.motoColor.length > 0 ? {
        f: common_vendor.t(props.data.motoColor)
      } : {}, {
        g: props.data.motoNumber.length > 0
      }, props.data.motoNumber.length > 0 ? {
        h: common_vendor.t(props.data.motoNumber)
      } : {});
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-4871db27"], ["__file", "/Users/zz/HBuilderX/user_app/pages/moto/components/moto-apply-item.vue"]]);
wx.createComponent(Component);
