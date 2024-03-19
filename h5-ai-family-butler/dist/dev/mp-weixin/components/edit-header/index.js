"use strict";
const common_vendor = require("../../common/vendor.js");
const api_reminder = require("../../api/reminder.js");
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
    data: {
      type: Object,
      default: () => ({})
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
    const headerPopup = common_vendor.ref(null);
    const nowSelect = common_vendor.ref(-1);
    const nowSelectData = common_vendor.ref({});
    const dialogShow = () => {
      headerPopup.value.open();
    };
    const dialogClose = () => {
      emits("close");
      headerPopup.value.close();
    };
    const headerList = common_vendor.ref([]);
    const clickMask = (val) => {
      emits("close");
    };
    const selectChange = (item, index) => {
      nowSelect.value = index;
      nowSelectData.value = item;
    };
    async function getHeaderList() {
      const res = await api_reminder.reminder.findType({
        rangeFlag: 2
      });
      console.log(res, "我是头像返回");
      headerList.value = res;
      if (headerList.value) {
        emits("confirm", headerList.value);
      }
      console.log(headerList.value, "我是头像列表");
    }
    const changeHeaderImg = async () => {
      const res = await api_userinfo.userInfo.changeHeadImg({
        id: nowSelectData.value.id
      });
      console.log(res, "我是选中成功返回");
      clickMask();
    };
    common_vendor.onMounted(() => {
      getHeaderList();
      if (props.visible) {
        dialogShow();
      }
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(headerList), (item, index, i0) => {
          return common_vendor.e({
            a: item.headImage,
            b: common_vendor.unref(nowSelect) === index
          }, common_vendor.unref(nowSelect) === index ? {} : {}, {
            c: index,
            d: common_vendor.o(($event) => selectChange(item, index), index),
            e: common_vendor.unref(nowSelect) === index ? 1 : ""
          });
        }),
        b: common_vendor.o(($event) => clickMask()),
        c: common_vendor.o(($event) => changeHeaderImg()),
        d: common_vendor.sr(headerPopup, "f7599013-0", {
          "k": "headerPopup"
        }),
        e: common_vendor.o(clickMask),
        f: common_vendor.p({
          type: "bottom",
          ["safe-area"]: false
        })
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-f7599013"], ["__file", "/Users/apple/cd_iflytek_work/ai-family/h5-ai-family-butler/src/components/edit-header/index.vue"]]);
wx.createComponent(Component);
