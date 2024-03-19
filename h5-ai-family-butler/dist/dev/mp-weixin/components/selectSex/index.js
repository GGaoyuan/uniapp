"use strict";
const common_vendor = require("../../common/vendor.js");
const api_userinfo = require("../../api/userinfo.js");
require("../../utils/request.js");
require("../../utils/platform.js");
require("../../utils/router.js");
require("../../utils/shared.js");
require("../../utils/urlMap.js");
require("../../config/commonParams.js");
require("../../helper/pinia-auto-refs.js");
require("../../store/app.js");
require("../../store/setup.js");
require("../../store/test.js");
require("../../store/user.js");
require("../../config/env.js");
require("../../config/serviceLoading.js");
require("../ipViewComponents/core/message/MessageCenter.js");
require("../ipViewComponents/core/utils/pools/ObjectPool.js");
require("../../constants/MainPageConstants.js");
if (!Array) {
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  _easycom_uni_popup2();
}
const _easycom_uni_popup = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-popup/uni-popup.js";
if (!Math) {
  _easycom_uni_popup();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent$1({
  __name: "index",
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    sex: {
      type: Number,
      default: 1
    }
  },
  emits: ["confirm", "close"],
  setup(__props, { emit: emits }) {
    const props = __props;
    common_vendor.watch(
      () => props.visible,
      (newVal, oldVal) => {
        if (newVal) {
          dialogShow();
        } else {
          dialogClose();
        }
      }
    );
    const sexPopup = common_vendor.ref(null);
    const selectSex = common_vendor.ref(-1);
    const dialogShow = () => {
      sexPopup.value.open();
    };
    const dialogClose = () => {
      emits("close");
      sexPopup.value.close();
    };
    common_vendor.ref([]);
    common_vendor.ref({});
    const closePopup = () => {
      sexPopup.value.close();
      emits("close");
    };
    const clickMask = (val) => {
      emits("close");
    };
    const changeSelectSex = (val) => {
      selectSex.value = val;
      console.log(selectSex.value, "我是选择的性别");
    };
    const changeSex = async () => {
      const res = await api_userinfo.userInfo.saveSex({ sex: selectSex.value });
      console.log(res);
      emits("confirm", selectSex.value);
      closePopup();
    };
    common_vendor.onMounted(() => {
      selectSex.value = props.sex;
      console.log(selectSex.value, "引入弹窗");
      if (props.visible) {
        dialogShow();
      }
    });
    common_vendor.onShow(() => {
      selectSex.value = props.sex;
      console.log(selectSex.value, "引入弹窗");
      if (props.visible) {
        dialogShow();
      }
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(selectSex) === 1
      }, common_vendor.unref(selectSex) === 1 ? {} : {}, {
        b: common_vendor.unref(selectSex) === 1 ? 1 : "",
        c: common_vendor.o(($event) => changeSelectSex(1)),
        d: common_vendor.unref(selectSex) === 0
      }, common_vendor.unref(selectSex) === 0 ? {} : {}, {
        e: common_vendor.unref(selectSex) === 0 ? 1 : "",
        f: common_vendor.o(($event) => changeSelectSex(0)),
        g: common_vendor.o(($event) => closePopup()),
        h: common_vendor.o(($event) => changeSex()),
        i: common_vendor.sr(sexPopup, "a4e61afe-0", {
          "k": "sexPopup"
        }),
        j: common_vendor.o(clickMask),
        k: common_vendor.p({
          type: "center"
        })
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-a4e61afe"], ["__file", "/Users/apple/cd_iflytek_work/ai-family/h5-ai-family-butler/src/components/selectSex/index.vue"]]);
wx.createComponent(Component);
