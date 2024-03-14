"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  __name: "moto-apply-item",
  props: {
    data: {
      type: Object,
      default: {}
    }
    //title: String
  },
  setup(__props) {
    const props = __props;
    const status = common_vendor.computed(() => {
      if (props.data.status == 0) {
        return {
          text: "待审核",
          color: "#3D77F0"
        };
      } else if (props.data.status == 1) {
        return {
          text: "已通过",
          color: "orange"
        };
      } else if (props.data.status == 2) {
        return {
          text: "已安装",
          color: "orange"
        };
      } else if (props.data.status == 3) {
        return {
          text: "已驳回",
          color: "red"
        };
      } else if (props.data.status == 4) {
        return {
          text: "已取消",
          color: "red"
        };
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
        b: common_vendor.t(status.value.text),
        c: status.value.color,
        d: props.data.motoBrand.length > 0
      }, props.data.motoBrand.length > 0 ? {
        e: common_vendor.t(props.data.motoBrand)
      } : {}, {
        f: props.data.motoColor.length > 0
      }, props.data.motoColor.length > 0 ? {
        g: common_vendor.t(props.data.motoColor)
      } : {}, {
        h: props.data.motoNumber.length > 0
      }, props.data.motoNumber.length > 0 ? {
        i: common_vendor.t(props.data.motoNumber)
      } : {});
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-4871db27"], ["__file", "/Users/zz/HBuilderX/user_app/pages/moto/components/moto-apply-item.vue"]]);
wx.createComponent(Component);
